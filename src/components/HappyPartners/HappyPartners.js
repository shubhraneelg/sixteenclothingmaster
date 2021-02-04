import React, { Component } from 'react'
// import ScriptTag from 'react-script-tag'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// const { REACT_APP_SPACE_ID, REACT_APP_CDA_ACCESS_TOKEN } = process.env;
import config from '../../config';
const query = `{
    companyRelationCollection(order: name_ASC, where: {category_contains: "partner"}) {
      items {
        name
        profilePicture {
          title
          url
        }
      }
    }
  }
  `;
const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};
class HappyPartners extends Component {
    constructor() {
        super();

        this.state = {
            partners: [],
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
                // console.log(response);

                const { data } = response;
                this.setState({
                    loading: false,
                    partners: data ? data.companyRelationCollection.items : []
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
        const { partners } = this.state;
        return (
            <>
                <div className="happy-clients">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-heading">
                                    <h2>Happy Partners</h2>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <Carousel responsive={responsive}>
                                    {
                                        partners.map((partner, i) => {
                                           
                                            return (

                                                <div className="client-item">
                                                    <img
                                                        src={partner.profilePicture.url}
                                                        alt={partner.profilePicture.title}
                                                    />
                                                    <div className="happyClientText"> 
                                                            <p>{partner.name}</p></div>
                                                </div>
                                            )
                                        })
                                    }
                                         
                                    
                                </Carousel>
                        </div>
                    </div>
                </div>
            </div>

            </>)
    }
}

export default HappyPartners