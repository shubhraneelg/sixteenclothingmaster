import React  from "react";

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import parse from 'html-react-parser';
import config from '../../config';

// const { REACT_APP_SPACE_ID, REACT_APP_CDA_ACCESS_TOKEN } = process.env

const query = `
{
    sixteenClothingCollection(where:{
      sys:{
        id_contains: "7czLdDm7FFbuUsQ7jMJrmP"
      }
    }){
      items{
        sys{
          id
        }
        title,
        subTitle,
        description{
          json
        },
        image{
          title,
          url
        }
        socialMedia{
          icon
          facebookUrl
          twitterUrl
          linkedInUrl
          behanceUrl
        }
      }
    }
  }

`;
class OurBackground extends React.Component {

    state = {
        ourBackgroundDetails: []
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
                    ourBackgroundDetails: data.sixteenClothingCollection.items
                });

            })
            .catch(error => console.log(error));
    }
    render() {

        return (
            <div className="best-features about-features">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {
                                this.state.ourBackgroundDetails.map((content, index) => {
                                    const rawRichTextField = content.description.json;
                                    let richTextDescription = documentToHtmlString(rawRichTextField);
                                    let description = parse(richTextDescription);

                                    return (
                                        <div key={index} className="row">
                                            <div className="col-md-12">
                                                <div className="section-heading">
                                                    <h2>{content.title}</h2>
                                                </div>
                                            </div>

                                            <div className="col-md-6">
                                                <div className="right-image">
                                                    {
                                                        content.image && <img src={content.image.url} alt={content.image.title} />
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="left-content">
                                                    <h4>{content.subTitle}</h4>

                                                    {description}



                                                    <ul className="social-icons">
                                                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                                        <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                                        <li><a href="#"><i className="fa fa-behance"></i></a></li>
                                                    </ul>

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
export default OurBackground