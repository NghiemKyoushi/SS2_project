import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from 'react-router-dom';
import './shopage.css';

import { getAllProduct } from '../../utils/fetchDataProduct';
import { colors } from "@material-ui/core";

class ShopPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      colors: ['red', 'black', 'orange', 'brown', 'green', 'white', 'blue', 'pink', 'grey'],
      filterColor: null,
      filterGender: null
    }
    this.changeColor = this.changeColor.bind(this);
    this.filterColor = this.filterColor.bind(this);
    this.filterGender = this.filterGender.bind(this);
  }

  componentDidMount() {
    const getProduct = getAllProduct().then(res => {
      this.setState({
        product: res
      })
    });
  }

  changeColor(color) {
    this.setState({
      filterGender: null,
      filterColor: color
    })
  }

  filterColor(products) {
    const { filterColor } = this.state;
    if (filterColor != null) {
      return products.filter(product => {
        return (product.colors.filter(color => color.color == filterColor).length > 0) ? true : false
      })
    }
    return products;
  }

  filterByGender(gender) {
    this.setState({
      filterColor: null,
      filterGender: gender
    })
  }

  filterGender(products) {
    const { filterGender } = this.state;
    if (filterGender != null) {
      return products.filter(product => product.gender == filterGender)
    }
    return products;
  }


  //product.colors
  getImageByColor(colors) {
    const { filterColor } = this.state;
    if (filterColor != null) {
      return colors.filter(color => color.color == filterColor)[0].image;
    }
    return colors.length > 0 ? colors[0].image : null;
  }

  genderToString(gender) {
    return (gender == true) ? 'Male' : 'Female'
  }

  render() {
    const { product, colors, filterColor, filterGender } = this.state;
    const { isLogin } = this.props;
    return (
      <>
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-3">
              <p className="h5 pb-4" style={{ color: 'green' }}>Categories</p>
              <ul className="list-unstyled templatemo-accordion">
                <li className="pb-2">
                  <p className="d-flex justify-content-between text-decoration-none h6" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false">
                    GENDER
                    <i className="fas fa-chevron-down "></i>
                  </p>
                  <ul className="collapse show list-unstyled pl-3 pt-2">
                    <li onClick={() => { this.filterByGender(true) }}>
                      <p className="text-decoration-none collapse hover-green" style={{ fontSize: '15px' }} id="collapseExample">
                        Men
                      </p>
                    </li>
                    <li onClick={() => { this.filterByGender(false) }}>
                      <p className="text-decoration-none collapse hover-green" style={{ fontSize: '15px' }} id="collapseExample">
                        Women
                      </p>
                    </li>
                  </ul>
                </li>
                <li className="pb-3">
                  <p className="collapse d-flex justify-content-between text-decoration-none h6" data-toggle="collapse" data-target="#collapseExample3" aria-expanded="false" aria-controls="collapseExample3">
                    COLORS
                    <i className="fas fa-chevron-down "></i>
                  </p>
                  <ul className="collapse colors-list show list-unstyled p-1 pt-1">
                    {colors.map((c, index) => {
                      return <li>
                        <div className="pick-colors collapse text-decoration-none"
                          style={{ fontSize: '14px', backgroundColor: `${c}` }} id="collapseExample3"
                          onClick={() => { this.changeColor(c) }}>
                        </div>
                      </li>
                    })}
                  </ul>
                </li>
              </ul>
            </div>
            <div className="col-lg-9">
              <div className="d-flex justify-content-between w-100">
                <div> FILTER BY: {`${filterColor && filterColor.toUpperCase() || filterGender != null && this.genderToString(filterGender) || ''}`} </div>
                <div className="row">
                  <div className=" d-flex ">
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
                  (product && this.filterColor(product).length > 0 &&
                    this.filterGender(this.filterColor(product)).map((product, index) => {
                      return (
                        <div className="col-md-4" key={index}>
                          <div className="card mb-4 product-wap rounded-0 shadow" style={{ position: 'relative' }}>
                            <div className=" card rounded-0 ">
                              <img className="card-img rounded-0 img-fluid shopPage-img" src={`http://localhost:3030/${this.getImageByColor(product.colors)}`} />
                              <div className="card-img-overlay rounded-0 product-overlay d-flex align-items-center justify-content-center " > </div>
                            </div>
                            <Link to={`/product/${product._id}`} className="card-body">
                              <p className="title-name text-decoration-none ">{product.product_name} <span>{product.gender == true ? 'Male' : 'Female'}</span></p>
                              <ul className="w-100 flex-wrap list-unstyled d-flex justify-content-start mb-0 text-dark" > Sizes:	&nbsp;
                                {product.size.map(s => {
                                  return <button className="btn-size mr-1 ">{s}</button>
                                })}
                              </ul>
                              <button className="text-center mb-0 mt-4 btn w-100 buy-btn " style={{ fontSize: "16px" }}>$ {product.price}</button>
                            </Link>
                          </div>
                        </div>
                      )
                    })
                  ) || <p className="w-100 text-center"> No item in this categories !</p>
                }

              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ShopPage;
