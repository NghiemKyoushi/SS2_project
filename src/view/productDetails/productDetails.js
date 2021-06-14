 /* eslint-disable */
import React from "react";

import { getAllProduct } from "../../utils/fetchDataProduct";
import { withRouter } from "react-router";
import { Carousel } from "react-bootstrap";
import axios from "axios";
import jwt_decode from "jwt-decode";
//_________________
import { findCart, addToCart, getAllComment } from "../../utils/fetchDataProduct";
import { getCookie } from "../../utils/fetchData";
import "./comment.css";
import Button from '@material-ui/core/Button';
const colorTemplate = {
  red: "red",
  black: "black",
  grey: "grey",
  yellow: "yellow",
  pink: "pink",
  purple: "purple",
  green: "green",
  blue: "#2196f3",
  red: "red"
};
class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      details: "",
      count: 0,
      quantity: 0,
      quantity_product: 0,
      size: "",
      linkImage: "",
      //comment
      comment: "",
      allComment: "",
      color: "",
      remind: false
    };
    this.handlePlus = this.handlePlus.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
    // this.addToCart = this.addToCart(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.pickSize = this.pickSize.bind(this);
    this.pickColor = this.pickColor.bind(this);
    //addToCart
    this.addToCart = this.addToCart.bind(this);
    //handleComment
    this.handleComment = this.handleComment.bind(this);
    // this.fetchAllComment = this.fetchAllComment(this);
  }
  // adjust quantity to buy
  handlePlus(e) {
    this.setState((currState) => {
      return { count: (currState.count + 1) }
    })
  }

  handleMinus(e) {
    this.setState((currState) => {
      return { count: (currState.count == 0) ? currState.count : (currState.count - 1) }
    })
  }

  handleChangeInput(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  pickSize(e) {
    e.preventDefault();
    this.setState({
      size: e.target.value,
    });
    //
    const buttons = document.querySelectorAll("#buttonSize");
    buttons.forEach((b) => {
      clearAll(buttons);
    });

    function clearAll(buttons) {
      buttons.forEach((b) => {
        b.className = b.className.replace("btn-active", "");
      });
    }
    e.target.classList.toggle("btn-active");

  }
  //pickColor________________________________________
  pickColor(e) {
    e.preventDefault();
    const buttons = document.querySelectorAll("#buttonColor");
    buttons.forEach((b) => {
      clearAll(buttons);
    });
    e.target.classList.toggle("toggle");

    function clearAll(buttons) {
      buttons.forEach((b) => {
        b.className = b.className.replace("toggle", "");
      });
    }

    const input = e.target.value;
    console.log({ input })
    const findIndex = this.state.details.colors.find(
      (color) => color.color === input
    );
    this.setState({
      color: input,
      linkImage: findIndex.image,
    });
  }

  checkValidProduct() {
    const { count, color, linkImage, size } = this.state;
    if (count > 0 && color && linkImage && size) {
      return true
    } else {
      this.toggleRemind(true)
    }
  }

  toggleRemind = (state) => {
    this.setState({
      remind: state
    })
  }

  // add to cart_________________________________________
  async addToCart(e) {
    e.preventDefault();
    const { details, count, quantity, color, linkImage, size } = this.state;
    if (this.checkValidProduct() && this.props.isLogin) {
      const userID = getCookie('userID');
      const cart = await findCart(userID);
      const product = {
        id: details._id,
        quantity: count,
        product_name: details.product_name,
        color: color,
        image: linkImage,
        size: size,
        gender: true,
        price: details.price
      }
      cart.products.push(product)
      try {
        const { data } = await addToCart(cart);
        if (data.products) {
          alert('Product added to cart ')
          this.props.reloadCart();
          this.toggleRemind(false);
        }
      } catch (err) {
        console.log(err.response.status)
        if (err.response.status == 404) {
          alert('Product out of stock !');
        }
        else if (err.response.status == 409) {
          alert('This product already in your cart !');
        }
      }
    }
    if (!this.props.isLogin) {
      this.props.history.push('/login');
    }

  }
  //comment button_______________________________________
  async handleComment(e) {
    e.preventDefault();
    if (this.props.isLogin) {
      const userID = jwt_decode(getCookie("login")).sub;
      console.log(userID)
      const apiComment = "http://localhost:3030/comment";
      const body = {
        userID: userID,
        productID: this.props.match.params.id,
        content: this.state.comment
      }
      const postComment = await axios.post(apiComment, body);
      if (postComment) {
        const allComment = await getAllComment(this.props.match.params.id);
        console.log(allComment)
        this.setState({
          allComment: allComment.reverse()
        })
      }
    } else {
      this.props.history.push('/login');
    }
  }

  async componentDidMount() {
    const userID = getCookie("userID");
    // console.log("userId", userID);
    const apiGetAllComment = `http://localhost:3030/comment/${this.props.match.params.id}`;
    const getComment = await axios.get(apiGetAllComment);
    this.setState({
      allComment: getComment.data.reverse()
    })
    const getProduct = getAllProduct().then((res) => {
      this.setState({
        products: res,
      });
      console.log("product: ", this.state.products);
      const details = this.state.products.map((item) => {
        if (item._id === this.props.match.params.id) {
          this.setState({
            details: item,
          });
        }
      });

    });
    // const getAllComment = this.fetchAllComment.then( res => console.log("iiwjwihiwhfwihfifh",res))

  }

  render() {
    const { details, allComment, remind } = this.state;
    return (
      <>
        {details !== "" ? (
          <>
            <section className="bg-light">
              <div className="container pb-5">
                <div className="row">
                  <div className="col-lg-5 mt-5">
                    <div className="card mb-3">
                      {this.state.linkImage !== "" ? (
                        <Carousel fade>
                          {details.colors.map((color, index) => {
                            return (
                              <Carousel.Item interval={10000000000}>
                                <div
                                  style={{ width: "450px", height: "440px" }}
                                >
                                  <img
                                    className="d-block w-100"
                                    src={`http://localhost:3030/${this.state.linkImage}`}
                                    alt="First slide"
                                  />
                                </div>
                              </Carousel.Item>
                            );
                          })}
                        </Carousel>
                      ) : (
                        <Carousel fade>
                          {details.colors.map((color, index) => {
                            return (
                              <Carousel.Item interval={10000000000}>
                                <img className="d-block w-100 h-100" src={`http://localhost:3030/${color.image}`} alt="First slide" />
                              </Carousel.Item>
                            );
                          })}
                        </Carousel>
                      )}
                    </div>
                    <div className="row"></div>
                  </div>
                  {/* col end */}
                  <div className="col-lg-7 mt-5">
                    <div className="card">
                      <div className="card-body">
                        <h1 className="h3">{`${details.product_name}`}<span style={{ fontSize: '16px' }}>({details.gender == true ? 'Male' : 'Female'})</span></h1>
                        <p className="h3 py-2 price-tag">${details.price}</p>

                        <h6>Description:</h6>
                        <p>{details.description}</p>
                        <ul className="list-inline flex-align-center">
                          <li className="list-inline-item">
                            <h6 style={{ marginBottom: '0px' }}>Avaliable Color :</h6>
                          </li>
                          <li className="list-inline-item">
                            <div className="pick-colors-product">
                              {details.colors.map((color, index) => {
                                return (
                                  <button key={index} id="buttonColor" onClick={this.pickColor} value={color.color} className="color"
                                    style={{ background: `${colorTemplate[color.color]}`, }}>
                                  </button>
                                );
                              })}
                            </div>
                          </li>
                        </ul>

                        <form>
                          <input
                            type="hidden"
                            name="product-title"
                            defaultValue="Activewear"
                          />
                          <div className="row">
                            <div id="containerSize" className="col-auto">
                              <ul className="list-inline pb-3">
                                <li className="list-inline-item">
                                  <h6> Size :</h6>
                                </li>
                                {details.size.map((size, index) => {
                                  return (
                                    <button key={index} onClick={this.pickSize} value={size} id="buttonSize" className="btn-size"
                                      style={{ marginLeft: 5 }}
                                    >
                                      {size}
                                    </button>);
                                })}
                              </ul>
                            </div>
                            <div className="col-auto">
                              <ul className="list-inline pb-3">
                                <li className="list-inline-item text-right">
                                  <h6>Quantity</h6>
                                </li>
                                <li className="list-inline-item">
                                  <Button size="small" className="" id="btn-minus" onClick={this.handleMinus}>
                                    <i className="fas fa-chevron-left"></i>
                                  </Button>
                                </li>
                                <li className="list-inline-item">
                                  <span className="" id="var-value">
                                    {this.state.count}
                                  </span>
                                </li>
                                <li className="list-inline-item">
                                  <Button size="small" className="" id="btn-plus" onClick={this.handlePlus}>
                                    <i className="fas fa-chevron-right"></i>
                                  </Button>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="row pb-3">
                            <div className="col d-grid">
                              <button type="submit" className="btn btn-success btn-lg addcart-btn" name="submit" value="addtocard" onClick={this.addToCart}>
                                Add To Cart
                              </button>
                            </div>
                          </div>
                          {remind == true ? <div className="remind">
                            Please select a shoe size, a color and quantity
                          </div> : <></>}

                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* comment */}
            <section className="content-item" id="comments">
              <div className="container">
                <div className="row">
                  <div className="col-sm-8">
                    <form>
                      <h3 className="pull-left price">Reviews</h3>
                      <fieldset>
                        <div className="row">
                          <div className="form-group col-xs-12 col-sm-9 col-lg-10">
                            <textarea className="form-control message-textarea" id="message" name="comment" placeholder="Your review"
                              onChange={this.handleChangeInput} required />
                            <button onClick={this.handleComment} type="submit" className="btn btn-success pull-right ">
                              Submit
                            </button>
                          </div>
                        </div>
                      </fieldset>
                    </form>
                    <h3 >{allComment.length} Reviews</h3>
                    {/* COMMENT 1 - START */}
                    <div className="media">
                      {(allComment !== "") ?
                        (allComment.map((allComment, index) => (
                          <div className="media-body mb-3">
                            <img className="media-object" src="https://cdn1.iconfinder.com/data/icons/app-user-interface-glyph/64/user_man_user_interface_app_person-512.png" />
                            <div>
                              <p className="h5 media-heading mb-1 ml-2 price">{allComment.username}</p>
                              <ul className="list-unstyled list-inline media-detail pull-right mb-2 ml-2">
                                <li>
                                  {new Date((allComment.date)).toDateString()}
                                </li>
                              </ul>
                              <p className="ml-2">{allComment.content}</p>
                            </div>
                          </div>
                        ))) : " "
                      }
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          ""
        )
        }
      </>
    );
  }
}

export default withRouter(ProductDetails);
