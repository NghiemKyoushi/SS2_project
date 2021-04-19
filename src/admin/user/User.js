import React, { Component } from 'react'
import './User.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getAllUsers, deleteUser } from '../../utils/utils';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ReplayIcon from '@material-ui/icons/Replay';
class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: null
        }
        this.deleteUser = this.deleteUser.bind(this);
        this.getUsers = this.getUsers.bind(this);
    }

    async componentDidMount() {
        this.getUsers();
    }

    async deleteUser(row) {
        if (window.confirm("Do you want to delete ?")) {
            const isDelete = await deleteUser(row.target.parentNode.id);
            if (isDelete) {
                this.getUsers();
            }
        }
    }

    async getUsers() {
        const users = await getAllUsers();
        this.setState({
            users: users
        })
    }

    render() {
        const { users } = this.state;
        return <div className="user">
            <h4>User</h4>
            <div className="user-table">
                <div className="flex-center right-most">
                    <IconButton className="green-color" size="small" aria-label="reload" onClick={this.getUsers}><ReplayIcon /></IconButton>
                </div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Username</TableCell>
                                <TableCell align="left">Contacts</TableCell>
                                <TableCell align="left">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users && users.map(user => {
                                return <TableRow key={user._id}>
                                    <TableCell align="left">{user.username}</TableCell>
                                    <TableCell align="left">{user.contacts.email}</TableCell>
                                    <TableCell align="left">
                                        <Button id={user._id} color="secondary" onClick={this.deleteUser}>Delete</Button>
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

export default User