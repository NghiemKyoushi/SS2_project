import React from 'react'

class Content  extends React.Component{
    render(){
        return(
            <>
  {/* Start Categories of The Month */}
  <section className="container py-5">
    <div className="row text-center pt-3">
      <div className="col-lg-6 m-auto">
        <h1 className="h1">Categories of The Month</h1>
        
      </div>
    </div>
    <div className="row">
      <div className="col-12 col-md-4 p-5 mt-3">
        <a href="#"><img src="https://product.hstatic.net/1000230642/product/02800trg__2__cbeb1cd1c19544dfa6c6ed7b8507f77f_1024x1024.jpg" className="rounded-circle img-fluid border" /></a>
        <h5 className="text-center mt-3 mb-3">Biti's Hunter</h5>
        {/* <p className="text-center"><a className="btn btn-success">Go Shop</a></p> */}
      </div>
      <div className="col-12 col-md-4 p-5 mt-3">
        <a href="#"><img src="https://product.hstatic.net/1000230642/product/dsmh04200trg__3__23b5f7d04eae4a458202de31bf4e094a_1024x1024.jpg" className="rounded-circle img-fluid border" /></a>
        <h2 className="h5 text-center mt-3 mb-3">Biti's Hunter</h2>
        {/* <p className="text-center"><a className="btn btn-success">Go Shop</a></p> */}
      </div>
      <div className="col-12 col-md-4 p-5 mt-3">
        <a href="#"><img src="https://product.hstatic.net/1000230642/product/dsmh04200den__3__483c6547abee43c2acac5850822072f0_1024x1024.jpg" className="rounded-circle img-fluid border" /></a>
        <h2 className="h5 text-center mt-3 mb-3">Biti's Hunter</h2>
        {/* <p className="text-center"><a className="btn btn-success">Go Shop</a></p> */}
      </div>
    </div>
  </section>
  {/* End Categories of The Month */}
  {/* Start Featured Product */}
  <section className="bg-light">
    <div className="container py-5">
      <div className="row text-center py-3">
        <div className="col-lg-6 m-auto">
          <h1 className="h1">Featured Product</h1>
          {/* <p>
            Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident.
          </p> */}
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-4 mb-4">
          <div className="card h-100">
            <a href="shop-single.html">
              <img src="https://product.hstatic.net/1000230642/product/02800trg__2__cbeb1cd1c19544dfa6c6ed7b8507f77f_1024x1024.jpg" className="card-img-top" alt="..." />
            </a>
            <div className="card-body">
              <ul className="list-unstyled d-flex justify-content-between">
                <li>
                  <i className="text-warning fa fa-star" />
                  <i className="text-warning fa fa-star" />
                  <i className="text-warning fa fa-star" />
                  <i className="text-muted fa fa-star" />
                  <i className="text-muted fa fa-star" />
                </li>
                <li className="text-muted text-right">$240.00</li>
              </ul>
              <a href="shop-single.html" className="h2 text-decoration-none text-dark">Gym Weight</a>
              <p className="card-text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt in culpa qui officia deserunt.
              </p>
              <p className="text-muted">Reviews (24)</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 mb-4">
          <div className="card h-100">
            <a href="shop-single.html">
              <img src="https://product.hstatic.net/1000230642/product/02800trg__2__cbeb1cd1c19544dfa6c6ed7b8507f77f_1024x1024.jpg" className="card-img-top" alt="..." />
            </a>
            <div className="card-body">
              <ul className="list-unstyled d-flex justify-content-between">
                <li>
                  <i className="text-warning fa fa-star" />
                  <i className="text-warning fa fa-star" />
                  <i className="text-warning fa fa-star" />
                  <i className="text-muted fa fa-star" />
                  <i className="text-muted fa fa-star" />
                </li>
                <li className="text-muted text-right">$480.00</li>
              </ul>
              <a href="shop-single.html" className="h2 text-decoration-none text-dark">Cloud Nike Shoes</a>
              <p className="card-text">
                Aenean gravida dignissim finibus. Nullam ipsum diam, posuere vitae pharetra sed, commodo ullamcorper.
              </p>
              <p className="text-muted">Reviews (48)</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 mb-4">
          <div className="card h-100">
            <a href="shop-single.html">
              <img src="https://product.hstatic.net/1000230642/product/02800trg__2__cbeb1cd1c19544dfa6c6ed7b8507f77f_1024x1024.jpg" className="card-img-top" alt="..." />
            </a>
            <div className="card-body">
              <ul className="list-unstyled d-flex justify-content-between">
                <li>
                  <i className="text-warning fa fa-star" />
                  <i className="text-warning fa fa-star" />
                  <i className="text-warning fa fa-star" />
                  <i className="text-warning fa fa-star" />
                  <i className="text-warning fa fa-star" />
                </li>
                <li className="text-muted text-right">$360.00</li>
              </ul>
              <a href="shop-single.html" className="h2 text-decoration-none text-dark">Summer Addides Shoes</a>
              <p className="card-text">
                Curabitur ac mi sit amet diam luctus porta. Phasellus pulvinar sagittis diam, et scelerisque ipsum lobortis nec.
              </p>
              <p className="text-muted">Reviews (74)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* End Featured Product */}
</>

        )
    }
}

export default Content;