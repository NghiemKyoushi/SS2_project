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
import './AddProductDialog.css'
class AddHomestayDialog extends Component {

    constructor(props) {
        super(props)
        this.state = {

            numOfColors: 1
        };
        this.handeAdd = this.handeAdd.bind(this);
    }

    handeAdd() {
        const { addNewProduct } = this.props;
        const product_name = document.querySelector('.product_name').value;
        const quantity = document.querySelector('.quantity').value;
        const price = document.querySelector('.price').value;
        const size = document.querySelector('.size').value;
        const description = document.querySelector('.description').value;
        const colors = [];
        const images = [];
        document.querySelectorAll('.color').forEach(color => {
            colors.push(color.value)
        })
        document.querySelectorAll('.product-image-input').forEach(image => {
            images.push(image.files[0])
        })
        // ----------------------------
        const data = new FormData();
        data.append("product_name", product_name)
        data.append("quantity", quantity)
        data.append("price", price)
        data.append("description", description)
        data.append("size", size)
        colors.map(color => {
            data.append("colors", color)
            console.log(color)
        })
        images.map(image => {
            data.append("productImage", image)
        })
        addNewProduct(data);
    }

    render() {
        const { open, handleToggleDialogAdd } = this.props;
        const { numOfColors } = this.state;
        const colors = [];
        for (let i = 0; i < numOfColors; i++) {
            colors.push(
                <div className="full-size multiple-inputs">
                    <div>
                        <DialogContentText>
                            Color
                        </DialogContentText>
                        <input className="color" name="catalog_name" type="text" onChange={this.handleChangeInput} style={{ marginBottom: "5px" }} />
                    </div>
                    <div>
                        <DialogContentText>
                            Image
                        </DialogContentText>
                        <input className="product-image-input" name="catalog_name" type="file" accept="image/x-png,image/gif,image/jpeg" onChange={this.handleChangeInput} />
                    </div>
                </div>
            )
        }
        return (
            <Dialog open={open} >
                <DialogTitle id="form-dialog-title">Add New Product</DialogTitle>
                <DialogContent>
                    <div>
                        <DialogContentText>
                            Product Name
                        </DialogContentText>
                        <input className="product_name" name="product_name" type="text" onChange={this.handleChangeInput} />
                    </div>
                    <div>
                        <DialogContentText>
                            Quantity
                        </DialogContentText>
                        <input className="quantity" name="quantity" type="number" onChange={this.handleChangeInput} />
                    </div>
                    <div>
                        <DialogContentText>
                            Price
                        </DialogContentText>
                        <input className="price" name="price" type="number" onChange={this.handleChangeInput} />
                    </div>
                    <div>
                        <DialogContentText>
                            Size
                        </DialogContentText>
                        <input className="size" name="size" type="text" onChange={this.handleChangeInput} />
                    </div>
                    <div className="full-size">
                        <DialogContentText>
                            Description
                        </DialogContentText>
                        <textarea name="description" id="" className="description"></textarea>
                    </div>
                    {/*  */}

                    <>
                        <div className="flex-center right-most full-size" style={{ minHeight: "50px", marginBottom: "0px", marginTop: "10px", paddingBottom: "0px" }}>
                            <IconButton className="green-color" size="small" aria-label="add" onClick={() => { this.setState({ numOfColors: numOfColors + 1 }) }}><AddIcon /></IconButton>
                            <IconButton className="green-color" size="small" aria-label="remove" onClick={() => { this.setState({ numOfColors: numOfColors === 1 ? numOfColors : numOfColors - 1 }) }}><RemoveIcon /></IconButton>
                        </div>
                        {colors}
                    </>
                    <DialogActions>
                        <button className="action-btn" id="save-btn" onClick={this.handeAdd}>Save</button>
                        <button className="action-btn" id="close-btn" onClick={handleToggleDialogAdd} >Close</button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        )
    }
}

export default AddHomestayDialog;