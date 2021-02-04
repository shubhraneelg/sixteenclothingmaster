import React from "react";
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import parse from 'html-react-parser';
import { Link } from "react-router-dom";
import config from '../../config'


// const { REACT_APP_SPACE_ID, REACT_APP_CDA_ACCESS_TOKEN } = process.env

const query = `

{
  sixteenClothingCollection(where:{
    sys:{
      id_contains: "6D7CqU4xicyqGYoudI30NK"
    }
  }){
    items{
      sys{
        id
      }
      subTitle,
      buttonText,
      description{
        json
      },
    }
  }
}

`;

class CreativeSixteenProducts extends React.Component {

  state = {
    creativeSixteenProducts: []
  }

  componentDidMount() {
    window.fetch(
      `https://graphql.contentful.com/content/v1/spaces/${config.REACT_APP_SPACE_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.REACT_APP_CDA_ACCESS_TOKEN}`
        },
        body: JSON.stringify({ query }),
      }
    ).then(res => res.json())
      .then(({ data }) => {
        this.setState({
          creativeSixteenProducts: data.sixteenClothingCollection.items
        });
      })
      .catch(error => console.log(error));
  }


  render() {



    return (
      <div className="call-to-action">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="inner-content">

                {
                  this.state.creativeSixteenProducts.map((content, index) => {
                    const rawRichTextField = content.description.json;
                    let richTextDescription = documentToHtmlString(rawRichTextField);
                  let description = parse(richTextDescription);

                    return (
                      <div key={index} className="row">

                        <div className="col-md-8">
                          <h4>{content.subTitle}</h4>
                          {description}
                        </div>

                        <div className="col-md-4">
                          <Link to="/products" className="filled-button">{content.buttonText}</Link>


                        </div>

                      
                      </div>

                    );
                  })
                }


              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreativeSixteenProducts;
