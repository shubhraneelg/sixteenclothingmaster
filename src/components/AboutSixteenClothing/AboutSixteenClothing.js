import React, { Component } from "react";

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import parse from 'html-react-parser';

import { Link } from "react-router-dom";
// const { REACT_APP_SPACE_ID, REACT_APP_CDA_ACCESS_TOKEN } = process.env
import config from '../../config';

const query = `

{
  sixteenClothingCollection(where:{
    sys:{
      id_contains: "3q30sDIia6rFa2RnDOGWcL"
    }
  }){
    items{
      sys{
        id
      }
      title,
      subTitle,
      buttonText,
      description{
        json
      },
      image{
        title,
        url
      }
    }
  }
}

`;

class AboutSixteenClothing extends Component {

  state = {
    aboutSixteenClothing: [],
    creativeSixteenClothingProducts: []
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
          aboutSixteenClothing: data.sixteenClothingCollection.items
        });
      })
      .catch(error => console.log(error));
  }

  navigate(e){
    e.preventDefault();
    console.log(this.props);
  }

  render() {

    return (
      <div className="best-features">
        <div className="container">
          <div className="row">
            <div className="col-md-12">

              {
                this.state.aboutSixteenClothing.map((content, index) => {
                  const rawRichTextField = content.description.json;
                    let richTextDescription = documentToHtmlString(rawRichTextField);
                  let description = parse(richTextDescription);

                  return (
                    <div key={index} className="row">
                      <div className="col-md-12">
                        <div className="section-heading">
							<h1>Testing CI/CD wow !!!!</h1>
                          <h2>{content.title}</h2>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="left-content">
                          <h4>{content.subTitle}</h4>
                                  {description}
                          <Link to="/about" className="filled-button">{content.buttonText}</Link>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="right-image">
                          {
                            content.image && <img src={content.image.url} alt={content.image.title} />
                          }
                        </div>
                      </div>

                    </div>
                    
                  );
                })
              }
            </div>
          </div>
     
        </div>
     
      </div>
      

    );
  }
}

export default AboutSixteenClothing;

