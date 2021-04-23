import React from "react";

import { getAllProduct } from "../../utils/fetchDataProduct";
import { withRouter } from "react-router";
import { Carousel } from "react-bootstrap";
import axios from "axios";
//_________________
import { findCart, addToCart } from "../../utils/fetchDataProduct";
import { getCookie } from "../../utils/fetchData";
import "./comment.css";

const colorTemplate = {
  red: "red",
  black: "black",
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
      allComment: ""
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
    // console.log("plus", this.state.count);
    this.setState({
      count: this.state.quantity++,
    });
  }
  handleMinus(e) {
    // console.log("minus", this.state.count);

    if (this.state.count > 0) {
      this.setState({
        count: this.state.quantity--,
      });
    } else if (this.state.count == 0) {
      this.setState({
        count: 0,
      });
    }
  }
  handleChangeInput(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  pickSize(e) {
    e.preventDefault();

    console.log(e.target.value);
    this.setState({
      size: e.target.value,
    });
    console.log("size", this.state.size);
    //
    const buttons = document.querySelectorAll("#buttonSize");
    buttons.forEach((b) => {
        clearAll(buttons);
     
    });

    function clearAll(buttons) {
      buttons.forEach((b) => {
        b.className = b.className.replace("active", "");
      });
    }
    e.target.classList.toggle("active");

  }
  //pickColor________________________________________
 pickColor(e) {
    e.preventDefault();
    const buttons =  document.querySelectorAll("#buttonColor");
    buttons.forEach( (b) => {
        clearAll(buttons);
    });
    e.target.classList.toggle("toggle");

     function clearAll(buttons) {
      buttons.forEach((b) => {
        b.className = b.className.replace("toggle", "");
      });
    }

    const input = e.target.value;
    const findIndex = this.state.details.colors.find(
      (color) => color.color === input
    );
     // console.log(findIndex);
     this.setState({
      linkImage: findIndex.image,
    });
  }
  // add to cart_________________________________________
  addToCart(e) {
    e.preventDefault();
    const userID = getCookie("userID");
    console.log(userID);

    const cart = findCart(userID).then((res) => console.log( "cart", res));
  }
  //comment button_______________________________________
 async handleComment(e){
    e.preventDefault();
   
    const userID = getCookie("userID");
    if(userID){
      const apiComment = "http://localhost:3030/comment";
      // const apiGetAllComment = `http://localhost:3030/comment/${userID}`
      const body={
        userID: userID,
        productID: this.props.match.params.id,
        content: this.state.comment
      }
      const postComment = await axios.post(apiComment, body);
      console.log("comment", postComment.data);

      // const getComment = await axios.get(apiGetAllComment);
      // console.log("get comment fetch", apiGetAllComment.data);
    }else{
      alert("have no user");
    }
   
    //post data
   


  }

//  async fetchAllComment(){
//             return getComment.data;
//}

  async componentDidMount() {
    const userID = getCookie("userID");
    // console.log("userId", userID);

  const apiGetAllComment = `http://localhost:3030/comment/${this.props.match.params.id}`;
  console.log("api",apiGetAllComment);
   const getComment = await axios.get(apiGetAllComment);
   this.setState({
     allComment: getComment.data
   })
   console.log(getComment.data);

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
    const { details, allComment } = this.state;
    return (
      <>
        {details !== "" ? (
          <>
            <section className="bg-light">
                <div className="container pb-5">
                <div className="row">
                  <div className="col-lg-5 mt-5">
                    <div className="card mb-3">
                      {/* <img
                        className="card-img img-fluid"
                        src={`http://localhost:3030/${details.colors[this.state.index].image}`}
                        alt="Card image cap"
                        id="product-detail"
                      /> */}

                      {this.state.linkImage !== "" ? (
                        <Carousel fade>
                          {details.colors.map((color, index) => {
                            return (
                              <Carousel.Item>
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
                              <Carousel.Item>
                                <img
                                  className="d-block w-100"
                                  src={`http://localhost:3030/${color.image}`}
                                  alt="First slide"
                                />
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
                        <h1 className="h2">{details.product_name}</h1>
                        <p className="h3 py-2">${details.price}</p>
                        <p className="py-2">
                          <i className="fa fa-star text-warning" />
                          <i className="fa fa-star text-warning" />
                          <i className="fa fa-star text-warning" />
                          <i className="fa fa-star text-warning" />
                          <i className="fa fa-star text-secondary" />
                          <span className="list-inline-item text-dark">
                            Rating 4.8 | 36 Comments
                          </span>
                        </p>
                        <h6>Description:</h6>
                        <p>{details.description}</p>
                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <h6>Avaliable Color :</h6>
                          </li>
                          <li className="list-inline-item">
                            <p
                              className="text-muted"
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              {details.colors.map((color, index) => {
                                return (
                                  <button
                                    key={index}
                                    id="buttonColor"
                                    onClick={this.pickColor}
                                    value={color.color}
                                    className="color"
                                    style={{
                                      background: `${
                                        colorTemplate[color.color]
                                      }`,
                                    }}
                                  ></button>
                                );
                              })}
                            </p>
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
                                  Size :
                                  {/* <input
                                    type="hidden"
                                    name="product-size"
                                    id="product-size"
                                    defaultValue="S"
                                  /> */}
                                </li>
                                {details.size.map((size, index) => {
                                  return (
                                    <button
                                      key={index}
                                      onClick={this.pickSize}
                                      value={size}
                                      id = "buttonSize"
                                      className="btn btn-success btn-size"
                                      style={{ marginLeft: 5 }}
                                    >
                                      {size}
                                    </button>
                                  );
                                })}
                              </ul>
                            </div>
                            <div className="col-auto">
                              <ul className="list-inline pb-3">
                                <li className="list-inline-item text-right">
                                  Quantity
                                  <input
                                    type="hidden"
                                    name="product-quanity"
                                    id="product-quanity"
                                    defaultValue={1}
                                  />
                                </li>
                                <li className="list-inline-item">
                                  <span
                                    className="btn btn-success"
                                    id="btn-minus"
                                    onClick={this.handleMinus}
                                  >
                                    -
                                  </span>
                                </li>
                                <li className="list-inline-item">
                                  <span
                                    className="badge bg-secondary"
                                    id="var-value"
                                  >
                                    {this.state.count}
                                  </span>
                                </li>
                                <li className="list-inline-item">
                                  <span
                                    className="btn btn-success"
                                    id="btn-plus"
                                    onClick={this.handlePlus}
                                  >
                                    +
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="row pb-3">
                            <div className="col d-grid">
                              <button
                                type="submit"
                                className="btn btn-success btn-lg"
                                name="submit"
                                value="addtocard"
                                onClick= {this.addToCart}
                              >
                                Add To Cart
                              </button>
                            </div>
                          </div>
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
                      <h3 className="pull-left">Comment</h3>
                      <fieldset>
                        <div className="row">
                          <div className="col-sm-3 col-lg-2 hidden-xs">
                            {/* <img className="img-responsive" src="https://bootdey.com/img/Content/avatar/avatar1.png" alt /> */}
                          </div>
                          <div className="form-group col-xs-12 col-sm-9 col-lg-10">
                            <textarea
                              className="form-control"
                              id="message"
                              name ="comment"
                              placeholder="Your message"
                              onChange = {this.handleChangeInput}
                              required
                              defaultValue=""
                            />
                            <button
                              onClick ={this.handleComment}
                              type="submit"
                              className="btn btn-success pull-right "
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </fieldset>
                    </form>
                    <h3>{allComment.length} Comments</h3>
                    {/* COMMENT 1 - START */}
                    
                    <div className="media">
                    {
                      (allComment !== "") ? 
                      (
                        allComment.map( (allComment, index) => (
                          <div>
                        <a className="pull-left" href="#">
                        <img
                          className="media-object"
                          src="https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"
                          alt
                        />
                      </a>
                      <div className="media-body">
                        <h4 className="media-heading">{allComment.username}</h4>
                        <p>{allComment.content}</p>
                        <ul className="list-unstyled list-inline media-detail pull-right">
                          <li>
                            <i className="fa fa-calendar" />
                            {allComment.date}
                          </li>
                        </ul>
                   
                      </div>
                        </div>
                        ))
                       
                       
                      ) : " "
                    }
                   
                    </div>
                    {/* COMMENT 1 - END */}
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          ""
        )}
      </>
    );
  }
}

export default withRouter(ProductDetails);
