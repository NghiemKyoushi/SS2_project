import React, { Component } from 'react'
import './Order.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';
import AddIcon from '@material-ui/icons/Add';
import { getOrders, deleteOrder } from '../../utils/utils'
class Order extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: []
        }
        this.getOrders = this.getOrders.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);
    }


    componentDidMount() {
        this.getOrders();

    }

    async getOrders() {
        const orders = await getOrders();
        this.setState({
            orders: orders
        })
    }

    async deleteOrder(el) {
        if (window.confirm("Do you want to delete ?")) {
            const order = await deleteOrder(el.target.parentNode.id);
            this.getOrders();
        }
    }

    render() {
        const { orders } = this.state;
        return <div className="cart">
            <h4>Cart</h4>
            <div className="cart-table">
                <div className="flex-center right-most">
                    <IconButton className="green-color" size="small" aria-label="reload" onClick={this.getOrders}><ReplayIcon /></IconButton>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Username</TableCell>
                                <TableCell align="left">Order Date</TableCell>
                                <TableCell align="center">Product</TableCell>
                                <TableCell align="left">Total Payment</TableCell>
                                <TableCell align="left">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders && orders.map(order => {
                                return <TableRow key={order._id}>
                                    <TableCell align="left">{order.username ? order.username : <p style={{ color: "red" }}>Deleted User</p>}</TableCell>
                                    <TableCell align="left">{new Date(order.order_date).toDateString()}</TableCell>
                                    <TableCell align="left">
                                        {order.products.map(product => {
                                            return <div className="product-box">
                                                <p>{product.name ? `Color: ${product.product_name}` : <p style={{ color: "red" }}>Deleted Product</p>}</p>
                                                <p>{product.quantity ? `Quantity: ${product.quantity}` : ''}</p>
                                                <p>{product.color ? `Size: ${product.size}` : ''}</p>
                                            </div>
                                        })}
                                    </TableCell>
                                    <TableCell align="left">{order.totalPayment}</TableCell>
                                    <TableCell align="left">
                                        <Button id={order._id} color="secondary" onClick={this.deleteOrder}>Delete</Button>
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

export default Order;