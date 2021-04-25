import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Container from '@material-ui/core/Container';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { postImage } from '../../utils/utils'
class EditProductDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            numOfColors: this.props.pickedProduct.colors.length
        };
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }


    handleChangeInput(e) {
        const { name, value } = e.target;
        this.setState((currentState) => ({
            form: {
                ...currentState.form,
                [name]: value
            }
        }))
    }

    async handleEdit() {
        const { editPickedProduct, pickedProduct } = this.props;
        const product_name = document.querySelector('.product_name').value;
        const quantity = document.querySelector('.quantity').value;
        const price = document.querySelector('.price').value;
        const size = document.querySelector('.size').value.split(',');
        const description = document.querySelector('.description').value;
        const colors = [];
        const data = new FormData();
        document.querySelectorAll('.color').forEach((color, index) => {
            colors.push({ color: color.value })
        })
        document.querySelectorAll('.product-image-input').forEach(async (image, index) => {
            if (image.nextSibling && !image.files[0]) {
                colors[index].image = image.nextSibling.src.replace("http://localhost:3030/", "")
            }
            if (!image.nextSibling || image.files[0]) {
                data.append("productImage", image.files[0]);
            }
        })
        const images = await postImage(data);
        console.log(images)
        colors.map((cl, index) => {
            if (!cl.image) {
                cl.image = images.shift()
            }
        })
        // console.log({ _id: pickedProduct._id, colors, product_name, quantity, price, size, description })
        await editPickedProduct({ _id: pickedProduct._id, colors, product_name, quantity, price, size, description })

    }

    render() {
        const { open, handleToggleDialogEdit, pickedProduct } = this.props;
        const { numOfColors } = this.state;
        const { product_name, quantity, price, size, description, colors } = pickedProduct;
        // console.log('selectedItem', selectedItem)
        const colorInput = []
        for (let i = 0; i < numOfColors; i++) {
            colorInput.push(
                <div className="full-size multiple-inputs">
                    <div>
                        <DialogContentText>
                            Color
                        </DialogContentText>
                        <input defaultValue={colors[i] ? colors[i].color : ""} className="color" name="catalog_name" type="text" onChange={this.handleChangeInput} style={{ marginBottom: "5px" }} />
                    </div>
                    <div className="flex-center" style={{ marginBottom: "0px" }}>
                        <DialogContentText>
                            Image
                        </DialogContentText>
                        <input className="product-image-input" name="catalog_name" type="file" accept="image/x-png,image/gif,image/jpeg" onChange={this.handleChangeInput} />
                        {
                            colors[i] ? <img className="product-img" src={`http://localhost:3030/${colors[i].image}`} style={{ marginTop: '5px' }} alt=""></img> : <></>
                        }
                    </div>
                </div >
            )
        }
        return (
            <Dialog open={open} >
                <DialogTitle id="form-dialog-title">Edit Product</DialogTitle>
                <DialogContent>
                    <div>
                        <DialogContentText>
                            Product Name
                        </DialogContentText>
                        <input defaultValue={product_name} className="product_name" name="product_name" type="text" onChange={this.handleChangeInput} />
                    </div>
                    <div>
                        <DialogContentText>
                            Quantity
                        </DialogContentText>
                        <input defaultValue={quantity} className="quantity" name="quantity" type="number" onChange={this.handleChangeInput} />
                    </div>
                    <div>
                        <DialogContentText>
                            Price
                        </DialogContentText>
                        <input defaultValue={price} className="price" name="price" type="number" onChange={this.handleChangeInput} />
                    </div>
                    <div>
                        <DialogContentText>
                            Size
                        </DialogContentText>
                        <input defaultValue={size.toString()} className="size" name="size" type="text" onChange={this.handleChangeInput} />
                    </div>
                    <div className="full-size">
                        <DialogContentText>
                            Description
                        </DialogContentText>
                        <textarea defaultValue={description} name="description" id="" className="description"></textarea>
                    </div>
                    {/*  */}

                    <>
                        <div className="flex-center right-most full-size" style={{ minHeight: "50px", marginBottom: "0px", marginTop: "10px", paddingBottom: "0px" }}>
                            <IconButton className="green-color" size="small" aria-label="add" onClick={() => { this.setState({ numOfColors: numOfColors + 1 }) }}><AddIcon /></IconButton>
                            <IconButton className="green-color" size="small" aria-label="remove" onClick={() => { this.setState({ numOfColors: numOfColors === pickedProduct.colors.length ? numOfColors : numOfColors - 1 }) }}><RemoveIcon /></IconButton>
                        </div>
                        {colorInput}
                    </>
                    <DialogActions>
                        <button className="action-btn" id="save-btn" onClick={this.handleEdit}>Save</button>
                        <button className="action-btn" id="close-btn" onClick={handleToggleDialogEdit} >Close</button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        )
    }
}

export default EditProductDialog;