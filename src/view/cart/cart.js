import React from 'react';

import './cart.style.scss';
import {findCart, addToCart} from '../../utils/fetchDataProduct'; 
import {getCookie} from '../../utils/fetchData';
class Cart extends React.Component{
  constructor(props){
    super(props);
    this.state={
      id_Cart:"",
      products:""
    }

  }
  componentDidMount(){
    // const userID = getCookie("userID");
    // console.log(userID);
    // const cart = findCart(userID).then(res => console.log(res));
  }

    render(){
        return (
            <>
            <div className="shopping-cart">
              <div className="column-labels">
                <label className="product-image">Image</label>
                <label className="product-details">Product</label>
                <label className="product-price">Price</label>
                <label className="product-quantity">Quantity</label>
                <label className="product-removal">Remove</label>
                <label className="product-line-price">Total</label>
              </div>
              <div className="product">
                <div className="product-image">
                  <img src="https://s.cdpn.io/3/dingo-dog-bones.jpg" />
                </div>
                <div className="product-details">
                  <div className="product-title">Dingo Dog Bones</div>
                  <p className="product-description">The best dog bones of all time. Holy crap. Your dog will be begging for these things! I got curious once and ate one myself. I'm a fan.</p>
                </div>
                <div className="product-price">12.99</div>
                <div className="product-quantity">
                  <input type="number" defaultValue={2} min={1} />
                </div>
                <div className="product-removal">
                  <button className="remove-product">
                    Remove
                  </button>
                </div>
                <div className="product-line-price">25.98</div>
              </div>
              
              
              <div className="totals">
                <div className="totals-item">
                  <label>Subtotal</label>
                  <div className="totals-value" id="cart-subtotal">71.97</div>
                </div>
                <div className="totals-item">
                  <label>Tax (5%)</label>
                  <div className="totals-value" id="cart-tax">3.60</div>
                </div>
                <div className="totals-item">
                  <label>Shipping</label>
                  <div className="totals-value" id="cart-shipping">15.00</div>
                </div>
                <div className="totals-item totals-item-total">
                  <label>Grand Total</label>
                  <div className="totals-value" id="cart-total">90.57</div>
                </div>
              </div>
              <button className="checkout">Checkout</button>
            </div></>
          
        )
    }
}
export default Cart;