import React from 'react'
import './content.css'
import { getAllProduct } from '../../utils/fetchDataProduct'
class Content extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      products: null
    }
  }

  componentDidMount() {
    this.getAllProduct()
  }

  async getAllProduct() {
    const products = await getAllProduct();
    this.setState({
      products: products
    })
  }

  render() {
    const { products } = this.state;
    return (
      <>
        {/* Start Featured Product */}
        <section className="bg-light">
          <div className="container py-5">
            <div className="row text-center py-3">
              <div className="col-lg-6 m-auto">
                <h3 className="h3">Featured Product</h3>
              </div>
            </div>
            <div className="featured-product ">
              {products && products.length > 0 && products.map(p => {
                return <div className="col-12 col-md-4 mb-4">
                  <div className="card h-100">
                    <a href="shop-single.html">
                      <img src={`http://localhost:3030/${p.colors[0].image}`} className="card-img-top" alt="..." />
                    </a>
                    <div className="card-body">
                      <ul className="list-unstyled d-flex justify-content-between">
                        <li className="text-muted text-right">${p.price}</li>
                      </ul>
                      <a href="shop-single.html" className="h4 text-decoration-none text-dark">{p.product_name}</a>
                      <p className="mt-2 card-text">
                        {p.description}
                      </p>
                    </div>
                  </div>
                </div>
              })}

            </div>
          </div>
        </section>
        {/* End Featured Product */}
      </>

    )
  }
}

export default Content;