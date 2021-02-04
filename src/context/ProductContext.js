import React, { Component, createContext } from 'react';
import config from '../config';
const ProdContext = createContext();



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
        details{
          json
        }
      }
    }
  }
  `;

  class ProdProvider extends Component {
    // constructor() {
    //     super();

    //     this.state = {
    //         products: [],
    //         loading: true,
    //         error: null
    //     };
    // }
    state = {
        products: [],
        loading: true,
        error: null
    };
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
            .then(({ data }) => {
                
                // const { data } = response;
                //console.log("My data is");
                //console.log(data);
                let products = data.productCollection.items;
                this.setState({
                    products,
                    loading: false,
                    // products: data ? data.productCollection.items : []

                });
                //console.log(this.state.products)
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error: error.message
                });
            })
    }
    getProduct = (title) =>{
        let tempProduct = [...this.state.products];
        const product = tempProduct.find(prod => prod.title === title);
        return product;
    }
    render() {

        return (

            <ProdContext.Provider value={{...this.state, getProduct: this.getProduct}}>
                {this.props.children}
            </ProdContext.Provider>

        );
    }
}
export { ProdProvider, ProdContext };