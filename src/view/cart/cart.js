 /* eslint-disable */
import React from 'react';
import jwt_decode from "jwt-decode";
import './cart.style.scss';
import { findCart, checkoutService, removeProductFromCart } from '../../utils/fetchDataProduct';
import { getCookie } from '../../utils/fetchData';
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: null,
      subtotal: 0
    }
    this.caculateSubtotal = this.caculateSubtotal.bind(this);
    this.checkout = this.checkout.bind(this);
    this.getCart = this.getCart.bind(this);
    this.removeProductFromCart = this.removeProductFromCart.bind(this);
  }

  async componentDidMount() {
    const { checkStillLogin } = this.props;
    checkStillLogin();
    await this.getCart();

  }

  async getCart() {
    if (getCookie('login')) {
      const { sub } = jwt_decode(getCookie('login'));
      const cart = await findCart(sub);
      this.setState({ cart: cart })
      this.caculateSubtotal(cart);
    }
  }

  caculateSubtotal(cart) {
    let subtotal = 0
    cart.products.map(product => {
      subtotal += product.quantity * product.price
    })
    this.setState({
      subtotal: subtotal
    })
  }

  async checkout() {
    const { checkStillLogin } = this.props;
    checkStillLogin();
    if (getCookie('login')) {
      const { sub } = jwt_decode(getCookie('login'));
      const cart = await checkoutService({ userID: sub });
      if (!cart.err) {
        alert('CHECKOUT SUCCESSFULLY');
        this.getCart();
        checkStillLogin();
      }
    }
  }


  async removeProductFromCart(el) {
    const { checkStillLogin } = this.props;
    checkStillLogin();
    const { id } = el.target;
    if (id && getCookie('login') && window.confirm('Do you want to remove this item ?')) {
      const { sub } = jwt_decode(getCookie('login'));
      const result = await removeProductFromCart({ userID: sub, productID: id });
      if (result) {
        this.getCart();
      }
    }
  }

  render() {
    const { cart, subtotal } = this.state;
    return (
      <div className="shopping-cart flex-center" style={{ flexDirection: 'column' }}>
        {cart && cart.products == 0
          && <><h2>YOUR CART</h2>
            <div className="inner-shopping-cart flex-center" style={{ flexDirection: 'column' }}>
              <i style={{ fontSize: '200px' }} className="fas fa-cart-plus"></i>
              <p style={{ fontSize: '25px', color: '#f73e4c' }}>Your shopping cart is empty</p>
              <Link to="/product"><Button variant="contained">Continue shopping</Button></Link>
            </div></>
          ||
          <div className="active-cart">
            <h3 className="flex-center">CART</h3>
            <TableContainer >
              <Table className="cart-table" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Product Image</TableCell>
                    <TableCell align="center">Name of item</TableCell>
                    <TableCell align="center">Size</TableCell>
                    <TableCell align="center">Color</TableCell>
                    <TableCell align="center">Quantity</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart && cart.products.map(product => {
                    return <TableRow key={product.id}>
                      <TableCell align="center"><img className="sample-image" src={`http://localhost:3030/${product.image}`} alt="product image" /></TableCell>
                      <TableCell align="center">{product.product_name}</TableCell>
                      <TableCell align="center">{product.size}</TableCell>
                      <TableCell align="center">
                        <button id="buttonColor" className="color"
                          style={{ background: `${product.color}`, }}>
                        </button>
                      </TableCell>
                      <TableCell align="center">{product.quantity}</TableCell>
                      <TableCell className="price" align="center">$ {product.quantity * product.price}</TableCell>
                      <TableCell align="center" onClick={this.removeProductFromCart}><button id={product.id} className='btn' style={{ color: 'red' }}>REMOVE</button></TableCell>
                    </TableRow>
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="flex-spacebetween" style={{ padding: '30px' }}>
              <Link to="/product">&larr; Continue Shopping</Link>
              <div>
                <h5 className="text-right">Subtotal: <span className="price">${subtotal}</span></h5>
                <button className="mt-2 checkout-btn" onClick={this.checkout}>
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        }

      </div>
    )
  }
}
export default Cart;