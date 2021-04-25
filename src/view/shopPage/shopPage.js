import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Link } from 'react-router-dom';
import './shopage.css';

import { getAllProduct} from '../../utils/fetchDataProduct';

class ShopPage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      product: []
    }
  }
  
  componentDidMount(){
    console.log("show product");
    const getProduct = getAllProduct().then(res => {

      console.log("show product", res);
      this.setState({
        product: res
      })
      console.log("product: ", this.state.product)
    });

  }
  render() {
    const {product} = this.state;
    const {isLogin} = this.props;
    return (
      <>
     
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-3">
            <h1 className="h2 pb-4">Categories</h1>
            <ul className="list-unstyled templatemo-accordion">
              <li className="pb-3">
                <p className="d-flex justify-content-between text-decoration-none h5" data-toggle="collapse" data-target="#collapseExample"  aria-expanded="false">
                  Gender
                  <i className="fa fa-fw fa-chevron-circle-down mt-1" />
                </p>
                <ul  className="collapse show list-unstyled pl-3">
                  <li>  
                    <p className="text-decoration-none collapse" id="collapseExample">
                      Men
                    </p>
                  </li>
                  <li>
                    <p className="text-decoration-none collapse" id="collapseExample">
                      Women
                    </p>
                  </li>
                </ul>
              </li>


              <li className="pb-3">
                <p className="d-flex justify-content-between text-decoration-none h5" data-toggle="collapse" data-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2">
                  Sale
                  <i className="pull-right fa fa-fw fa-chevron-circle-down mt-1" />
                </p>
                <ul  className=" collapse show list-unstyled pl-3">
                  <li>
                    <p className="collapse text-decoration-none"  id="collapseExample2">
                    Sport</p>
                  </li>
                  <li>
                    <p className="collapse text-decoration-none"  id="collapseExample2">
                      Luxury
                    </p>
                  </li>
                </ul>
              </li>



              <li className="pb-3">
                <p className="collapse d-flex justify-content-between text-decoration-none h5 " data-toggle="collapse" data-target="#collapseExample3" aria-expanded="false" aria-controls="collapseExample3">
                  Product
                  <i className="pull-right fa fa-fw fa-chevron-circle-down mt-1" />
                </p>
                <ul  className="collapse show list-unstyled pl-3">
                  <li>
                    <p className=" collapse text-decoration-none" id="collapseExample3">Bag</p>
                  </li>
                  <li>
                    <p className=" collapse text-decoration-none" id="collapseExample3">Sweather</p>
                  </li>
                  <li>
                    <p className=" collapse text-decoration-none" id="collapseExample3">Sunglass</p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="col-lg-9">
            <div className="row">
              <div className="col-md-6">
                <ul className="list-inline shop-top-menu pb-3 pt-1">
                  <li className="list-inline-item">
                    <a className="h3 text-dark text-decoration-none mr-3">
                      All
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="h3 text-dark text-decoration-none mr-3">
                      Men's
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="h3 text-dark text-decoration-none">Women's</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6 pb-4">
                <div className="d-flex">
                  <select className="form-control">
                    <option>Featured</option>
                    <option>A to Z</option>
                    <option>Item</option>
                  </select>
                </div>
              </div>
            </div>
            {/*  //card */}
           
            <div className="row">

            {
              (product) ? (
                product.map( (product, index) => {
                  return (
                    <div className="col-md-4" key ={index}>
                <div className="card mb-4 product-wap rounded-0 shadow">
                  <div className=" card rounded-0 ">
                    <img
                      className="card-img rounded-0 img-fluid "
                      src={`http://localhost:3030/${product.colors[0].image}`}
                    />
                    <div  className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center " >
                      <ul className="cardHover list-unstyled">
                        <li>
                          <a className="btn btn-success text-white">
                            <i className="far fa-heart" />
                          </a>
                        </li>
                        <li>
                          <Link to ={`/product/${product._id}`} className="btn btn-success text-white mt-2">
                            <i className="far fa-eye" />
                          </Link>
                        </li>
                        <li>
                          <a className="btn btn-success text-white mt-2">
                            <i className="fas fa-cart-plus" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="card-body">
                    <a className="h3 text-decoration-none">{product.product_name}</a>
                    <ul className="w-100 list-unstyled d-flex justify-content-between mb-0">
                      <li>{product.size}</li>
                      <li className="pt-2">
                        <span className="product-color-dot color-dot-red float-left rounded-circle ml-1" />
                        <span className="product-color-dot color-dot-blue float-left rounded-circle ml-1" />
                        <span className="product-color-dot color-dot-black float-left rounded-circle ml-1" />
                        <span className="product-color-dot color-dot-light float-left rounded-circle ml-1" />
                        <span className="product-color-dot color-dot-green float-left rounded-circle ml-1" />
                      </li>
                    </ul>
                    <ul className="list-unstyled d-flex justify-content-center mb-1">
                      <li>
                        <i className="text-warning fa fa-star" />
                        <i className="text-warning fa fa-star" />
                        <i className="text-warning fa fa-star" />
                        <i className="text-muted fa fa-star" />
                        <i className="text-muted fa fa-star" />
                      </li>
                    </ul>
                    <p className="text-center mb-0">{product.price}$</p>
                  </div>
                </div>
              </div>
                  )
                } )
              ) : " "
            }
              
            </div>
            {/* <div div="row">
              <ul className="pagination pagination-lg justify-content-end">
                <li className="page-item disabled">
                  <a
                    className="page-link active rounded-0 mr-3 shadow-sm border-top-0 border-left-0"
                    tabIndex={-1}
                  >
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link rounded-0 mr-3 shadow-sm border-top-0 border-left-0 text-dark">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link rounded-0 shadow-sm border-top-0 border-left-0 text-dark">
                    3
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default ShopPage;
