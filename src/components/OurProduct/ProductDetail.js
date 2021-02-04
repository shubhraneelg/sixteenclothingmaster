import React, { Component } from 'react'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import parse from 'html-react-parser';
import { ProdContext } from '../../context/ProductContext';

export default class ProductDetailShubh extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props);
        this.state = {
            title: this.props.match.params.title
        };
    }
    static contextType = ProdContext;
    render() {
        const { getProduct } = this.context;
        const product = getProduct(this.state.title);
        if (!product) {
            return (
                <div className="banner header-text">
                    <div className="container text-center pad-5">
                        <h1>Sorry, No Such Product Found!!!</h1>

                    </div>
                </div>
            );
        }
        // console.log(product);
        let description;
        description = product.details.json;
        const rawRichTextField = description;
        let richTextSummary = documentToHtmlString(rawRichTextField);
        let productSummary = parse(richTextSummary);
        return (
            <>
             <div className="container">
               <div className="row">
                  <div className="col-md-12">
                        
                    <div className="productDetail">
                      <h1 className="productDetailTitle">{product.title}</h1>
                      <hr></hr>
                    </div>
                    <br/>
                        {
                               product.productPhoto && 
                                <img className="productDetailImage" src={product.productPhoto.url} alt={product.title} />
                        }
                        <br/>
                    <br/>
                    <div className="row">
                        <div className="col-md-6">
                        <div className="productPrice">
                    <h2>Price: ${product.price} </h2>
                   

                    </div>

                        </div>
                        <div className="col-md-6">
                        <div className="prod">
                    <div className="productReview">
                    <ul className="starContainer">
                                <li><i className="fa fa-star"></i></li>
                                <li><i className="fa fa-star"></i></li>
                                <li><i className="fa fa-star"></i></li>
                                <li><i className="fa fa-star"></i></li>
                                <li><i className="fa fa-star"></i></li>
                    </ul>
                    </div>
                    </div>
                        </div>
                    </div>
                   
                    <div className="productDetailDescription">
                    <div>
                       {productSummary}
                    </div> 
                    </div>
                  </div>
                  </div>
                </div>
               </> 
            
        )
    }
}
