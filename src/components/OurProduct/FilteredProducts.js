import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ScriptTag from 'react-script-tag'
import { withRouter } from 'react-router-dom';
import { ProdContext } from '../../context/ProductContext';
import config from '../../config';
// const { REACT_APP_SPACE_ID, REACT_APP_CDA_ACCESS_TOKEN } = process.env;
const query = `{
    productCollection(order:sys_firstPublishedAt_ASC) {
      items {
        title
        description
        productPhoto {
          url
          title
        }
        price
        rating
        reviews
        category
        details{
            json
          }
      }
    }
  }
  `;

class FilteredProducts extends Component {
    static contextType = ProdContext;
    constructor() {
        super();

        this.state = {
            allProducts: [],
            loading: true,
            error: null
        };
    }
    componentDidMount() {
        window.fetch(
            `https://graphql.contentful.com/content/v1/spaces/${config.REACT_APP_SPACE_ID}`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${config.REACT_APP_CDA_ACCESS_TOKEN}`
                },
                body: JSON.stringify({
                    query
                })
            }
        )
            .then(res => res.json())
            .then(response => {
                //console.log(response);

                const { data } = response;
                this.setState({
                    loading: false,
                    allProducts: data ? data.productCollection.items : []
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: error.message
                });
            })
    }

    render() {
        const { products } = this.context;
        const { allProducts } = this.state;
        return (
            <>
                {
                    <div>
                        <ScriptTag isHydrating={true} type="text/javascript" src={process.env.PUBLIC_URL + 'assets/js/custom.js'} />
                        <ScriptTag isHydrating={true} type="text/javascript" src={process.env.PUBLIC_URL + 'assets/js/isotope.js'} />
                        <div className="products">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="filters">
                                            {/* <button onClick={this.filterMyProducts}>Hit me</button> */}
                                            <ul>
                                                <li className="active" data-filter="*">All Products</li>
                                                <li data-filter=".featured">Featured</li>
                                                <li data-filter=".flashDeals">Flash Deals</li>
                                                <li data-filter=".lastMinute">Last Minute</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="filters-content">
                                            <div className="row grid">
                                                {
                                                    allProducts.map((product, i) => {
                                                        return (
                                                            <>

                                                                <div className={'col-lg-4 col-md-4 all ' + product.category}>
                                                                    <div className="product-item">
                                                                    <Link to={{
                                                                                pathname: `products/${product.title}`,
                                                                                product: product
                                                                            }}>
                                                                               <img src={product.productPhoto.url} alt={product.productPhoto.title} />
                                                                            </Link>
                                                                        <div className="down-content">
                                                                            <Link to={{
                                                                                pathname: `products/${product.title}`,
                                                                                product: product
                                                                            }}>
                                                                                <h4>{product.title}</h4>
                                                                            </Link>

                                                                            <h6>${product.price}</h6>
                                                                            <p>{product.description}</p>
                                                                            <ul className="stars">
                                                                                <li><i className="fa fa-star"></i></li>
                                                                                <li><i className="fa fa-star"></i></li>
                                                                                <li><i className="fa fa-star"></i></li>
                                                                                <li><i className="fa fa-star"></i></li>
                                                                                <li><i className="fa fa-star"></i></li>
                                                                            </ul>
                                                                            <span>Reviews ({product.reviews})</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>)
    }
}


export default withRouter(FilteredProducts) 