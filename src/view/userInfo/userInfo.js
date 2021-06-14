/* eslint-disable */
import React, { Component } from 'react'
import './userInfo.css'
import Button from '@material-ui/core/Button';
import { getUser, editUserInfo, getUserOrders } from '../../utils/fetchDataProduct'
import { withRouter } from 'react-router';
import EditUserInfoDialog from './EditUserInfoDialog';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            orders: null,
            isOpenDialogEdit: false,
            information: true
        }
        this.handleToggleDialogEdit = this.handleToggleDialogEdit.bind(this);
        this.editUserInfo = this.editUserInfo.bind(this);
    }

    async componentDidMount() {
        const id = this.props.location.pathname.split("/").reverse()[0];
        Promise.all([this.getUser(id), this.getUserOrders(id)])
    }

    async getUser(id) {
        const user = await getUser(id);
        if (user) {
            this.setState({
                user: user
            })
        }
    }

    async getUserOrders(id) {
        const orders = await getUserOrders(id);
        if (orders) {
            console.log(orders)
            this.setState({
                orders: orders
            })
        }
    }

    handleToggleDialogEdit() {
        this.setState((currentState) => ({
            isOpenDialogEdit: !currentState.isOpenDialogEdit,
        }))
    }

    async editUserInfo(id, data) {
        const result = await editUserInfo(id, data);
        this.handleToggleDialogEdit();
        this.getUser(id);
    }

    render() {
        const { user, isOpenDialogEdit, information, orders } = this.state;
        return <div className="userInfo pt-5 pb-5">
            {
                isOpenDialogEdit && <EditUserInfoDialog
                    open={isOpenDialogEdit}
                    handleToggleDialogEdit={this.handleToggleDialogEdit}
                    editUserInfo={this.editUserInfo}
                    user={user}
                    id={this.props.location.pathname.split("/").reverse()[0]}
                />
            }
            <p className="h5 text-center">ACCOUNT INFORMATION</p>
            <section style={{ padding: "50px 50px " }} className="d-flex">
                <aside style={{ width: "250px" }}>
                    <p className="h6 mb-3">MANAGE MY ACCOUNT</p>
                    <div>
                        <p style={{ cursor: "pointer" }} className={information ? "chosen font-weight-bold mb-2" : "mb-2"}
                            onClick={() => { this.setState({ information: true }) }}>Account Information
                        </p>
                        <p style={{ cursor: "pointer" }} className={!information ? "chosen font-weight-bold mb-2" : "mb-2"}
                            onClick={() => { this.setState({ information: false }) }}>My Orders
                        </p>
                    </div>
                </aside>
                <main>
                    {information ? <>
                        <p className="h5" style={{ color: "green" }}>Personal Profile</p>
                        {user && <>
                            <hr />
                            <p><b>Full Name:</b> {`${user.username}`}</p>
                            <p><b>Email:</b> {`${user.contacts.email}`}</p>
                            <p><b>Address:</b> {user.contacts.address ? `${user.contacts.address}` : ''}</p>
                            <p><b>Phone:</b> {user.contacts.address ? `${user.contacts.phoneNumber}` : ''}</p>
                            <Button variant="contained" color="primary" onClick={this.handleToggleDialogEdit}>Update account information</Button>
                        </>}
                    </> : <>
                        <p className="h5" style={{ color: "green" }}>My Orders</p>
                        {orders && <>
                            <hr />
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Product detail</TableCell>
                                            <TableCell align="left">Total payment</TableCell>
                                            <TableCell align="left">Order date</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orders.map((o) => (
                                            <TableRow key={o._id}>
                                                <TableCell align="left">{o.products.map(p => {
                                                    return <p><span className="font-weight-bold">{`${p.product_name}`}</span>{` (color: ${p.color}, size: ${p.size}, quantity: ${p.quantity} )`}</p>
                                                })}
                                                </TableCell>
                                                <TableCell align="left"><span style={{ color: "red" }}>$ {o.totalPayment}</span></TableCell>
                                                <TableCell align="left">{new Date(o.order_date).toDateString()}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                        }
                    </>}
                </main>
            </section>
        </div>
    }
}

export default withRouter(UserInfo);