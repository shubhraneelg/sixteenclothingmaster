import React, { Component } from 'react'
import Thumbnails from './Thumbnails'
import config from '../../config';
const query = `
{
    ourTeamMembersCollection {
      items {
        image {
          title
          url
        }
        name
        designation
        description
        socialMediaReference {
          icon
          facebookUrl
          twitterUrl
          linkedInUrl
          behanceUrl
        }
      }
    }
  }
  
  `

// const { REACT_APP_SPACE_ID } = process.env;

export class OurTeam extends Component {

    state = {
        thumbnailDetail: {
            thumbnails: [],
            imageUrl: [],
            socialMediaReference: []
        }

    }
    componentDidMount() {
        window.fetch(
            `https://graphql.contentful.com/content/v1/spaces/${config.REACT_APP_SPACE_ID}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer gj_n5GeHF7VyBk35wHm7KuXb7ymL0S6cubsu4iyofuI`
                },
                body: JSON.stringify({ query }),
            }
        ).then(res => res.json())
            .then(({ data }) => {
                let thumbnails = data.ourTeamMembersCollection.items;
                let socialMediaReference = data.ourTeamMembersCollection.items.map(item => item.socialMediaReference);
                let imageUrl = data.ourTeamMembersCollection.items.map(item => item.image.url);
    

                this.setState({
                    thumbnailDetail: {
                        thumbnails,
                        imageUrl,
                        socialMediaReference
                    }
                });
                //console.log(this.state.thumbnailDetail.thumbnails);
            })
            .catch(error => console.log(error));
    }

    render() {
        // console.log(thumbnailDetail)
        let thumbnails = null;
        thumbnails = (
            <>
                {this.state.thumbnailDetail.thumbnails.map(item => {
                    return <Thumbnails
                        src={item.image.url} name={item.name} designation={item.designation} description={item.description}/>
                })}
            </>
        )
        return (
            <div className="team-members">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-heading">
                                <h2>Our Team Members</h2>
                            </div>
                        </div>
                        {thumbnails}
                    </div>
                </div>
            </div>
        )
    }
}

export default OurTeam
