/* eslint-disable */
import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
class EditUserInfoDialog extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: props.user.contacts.email,
            address: props.user.contacts.address,
            phoneNumber: props.user.contacts.phoneNumber,
        };
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleChangeInput(el) {
        const { name, value } = el.target
        this.setState({
            [name]: value
        })
    }

    async handleEdit(e) {
        e.preventDefault();
        const { email, address, phoneNumber } = this.state;
        const { editUserInfo, id } = this.props;
        await editUserInfo(id, { email, address, phoneNumber })
    }


    render() {
        const { open, handleToggleDialogEdit, user } = this.props;
        return (
            <Dialog open={open} >
                <form onSubmit={this.handleEdit}>
                    <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
                    <DialogContent>
                        <div>
                            <DialogContentText>
                                Email
                            </DialogContentText>
                            <input defaultValue={user.contacts.email && `${user.contacts.email}`} className="email" name="email" pattern=".+@gmail\.com" type="email" onChange={this.handleChangeInput} required />
                        </div>
                        <div>
                            <DialogContentText>
                                Address
                            </DialogContentText>
                            <input defaultValue={user.contacts.address && `${user.contacts.address}`} className="address" name="address" type="text" onChange={this.handleChangeInput} required />
                        </div>
                        <div>
                            <DialogContentText>
                                Phone Number
                            </DialogContentText>
                            <input defaultValue={user.contacts.phoneNumber && `${user.contacts.phoneNumber}`} className="phoneNumber" name="phoneNumber" type="number" onChange={this.handleChangeInput} required />
                        </div>
                        <div className="full-size">
                            {/*  */}
                            <DialogActions>
                                <button type="submit" className="action-btn" id="save-btn" >Save</button>
                                <button className="action-btn" id="close-btn" onClick={handleToggleDialogEdit} >Close</button>
                            </DialogActions>
                        </div>
                    </DialogContent>
                </form>
            </Dialog>
        )
    }
}

export default EditUserInfoDialog;