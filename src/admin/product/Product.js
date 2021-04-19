import React, { Component } from 'react'
import './Product.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getAllProducts, editProduct, createProduct, deleteProduct } from '../../utils/utils';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';
import AddIcon from '@material-ui/icons/Add';
import AddProductDiaglog from './AddProductDialog'
import EditProductDialog from './EditProductDialog'



class Product extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: null,
            isOpenDialogAdd: false,
            isOpenDialogEdit: false,
            pickedProduct: null
        }
        this.getProducts = this.getProducts.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
        this.addNewProduct = this.addNewProduct.bind(this);
        this.handleToggleDialogAdd = this.handleToggleDialogAdd.bind(this);
        this.handleToggleDialogEdit = this.handleToggleDialogEdit.bind(this);
        this.filterProduct = this.filterProduct.bind(this);
        this.editPickedProduct = this.editPickedProduct.bind(this);
    }

    async componentDidMount() {
        this.getProducts();
    }

    async getProducts() {
        const products = await getAllProducts();
        this.setState({
            products: products
        })
        console.log(products)
    }

    async deleteProduct(row) {
        if (window.confirm("Do you want to delete ?")) {
            const isDelete = await deleteProduct(row.target.parentNode.id);
            this.getProducts();
        }
    }

    async addNewProduct(data) {
        const result = await createProduct(data);
        this.handleToggleDialogAdd();
        this.getProducts();
    }

    async editPickedProduct(data) {
        const result = await editProduct(data);
        this.handleToggleDialogEdit();
        this.getProducts();
    }

    handleToggleDialogAdd() {
        this.setState((currentState) => ({
            isOpenDialogAdd: !currentState.isOpenDialogAdd
        }));
    }

    handleToggleDialogEdit(el) {
        this.setState((currentState) => ({
            isOpenDialogEdit: !currentState.isOpenDialogEdit,
        }))
        if (el) {
            const pickedProduct = this.filterProduct(el.target.parentNode.id);
            this.setState({
                pickedProduct: pickedProduct
            })
        }
    }

    filterProduct(id) {
        const { products } = this.state;
        const result = products.filter((product) => product._id === id)
        return result[0];
    }

    render() {
        const { products, isOpenDialogAdd, isOpenDialogEdit, pickedProduct } = this.state;
        return <div className="product">
            {
                isOpenDialogAdd && <AddProductDiaglog
                    open={isOpenDialogAdd}
                    handleToggleDialogAdd={this.handleToggleDialogAdd}
                    addNewProduct={this.addNewProduct}
                />
            }
            {
                isOpenDialogEdit && pickedProduct && <EditProductDialog
                    open={isOpenDialogEdit}
                    handleToggleDialogEdit={this.handleToggleDialogEdit}
                    editPickedProduct={this.editPickedProduct}
                    pickedProduct={pickedProduct}
                />
            }
            <h4>Product</h4>
            <div className="product-table">
                <div className="flex-center right-most">
                    <IconButton className="green-color" size="small" aria-label="add" onClick={this.handleToggleDialogAdd}><AddIcon /></IconButton>
                    <IconButton className="green-color" size="small" aria-label="reload" onClick={this.getProducts}><ReplayIcon /></IconButton>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Product Name</TableCell>
                                <TableCell align="left">Quantity</TableCell>
                                <TableCell align="left">Price</TableCell>
                                <TableCell align="left">Size</TableCell>
                                <TableCell align="left">Description</TableCell>
                                <TableCell align="left">Colors</TableCell>
                                <TableCell align="left">Gender</TableCell>
                                <TableCell align="left">Action</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products && products.map(product => {
                                return <TableRow key={product._id}>
                                    <TableCell align="left">{product.product_name}</TableCell>
                                    <TableCell align="left">{product.quantity}</TableCell>
                                    <TableCell align="left">{product.price}</TableCell>
                                    <TableCell align="left">{product.size.toString()}</TableCell>
                                    <TableCell align="left">{product.description}</TableCell>
                                    <TableCell align="left">
                                        <div className="product-colors flex-center">
                                            {product.colors.map(color => {
                                                return <div className="colors">
                                                    <p >{color.color}</p>
                                                    {/* <img src={`http://localhost:3030/${color.image}`} alt={color.color} /> */}
                                                    <img className="product-img" src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/9f5962a5-6eb6-46d4-b538-130e70618576/downshifter-10-running-shoe-CrpbbD.png" alt="" />
                                                </div>
                                            })}
                                        </div>
                                    </TableCell>
                                    <TableCell align="left">{product.gender || `null`}</TableCell>

                                    <TableCell align="left">
                                        <Button id={product._id} color="primary" onClick={this.handleToggleDialogEdit}>Edit</Button>
                                        <Button id={product._id} color="secondary" onClick={this.deleteProduct}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    }
}

export default Product