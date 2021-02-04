import React, { Component } from 'react'
import ScriptTag from 'react-script-tag'
import config from '../../config';
// const { REACT_APP_SPACE_ID, REACT_APP_CDA_ACCESS_TOKEN } = process.env;

const query = `{
    accordionCollection(order:sys_firstPublishedAt_ASC){
      items{
        title
        summary
   }
    }
  }
  `;

class Accordion extends Component {
    constructor() {
        super();

        this.state = {
            accords: [],
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
                

                const { data } = response;
                this.setState({
                    loading: false,
                    accords: data ? data.accordionCollection.items : []
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

        const { accords } = this.state;

        return (
            <>
                { <div>

                    
                    <ScriptTag isHydrating={true} type="text/javascript" src={process.env.PUBLIC_URL + 'assets/js/custom.js'} />
                    
                    <ScriptTag isHydrating={true} type="text/javascript" src={process.env.PUBLIC_URL + 'assets/js/accordions.js'} />

                    <ul className="accordion">
                        {
                            accords.map((content,index) => {
                                return (
                                    <>
                                        <li key={index}>
                                            <a>
                                                {content.title}
                                            </a>
                                            <div className="content">
                                                <p>
                                                    {content.summary}
                                                </p>
                                            </div>
                                        </li>

                                    </>

                                );
                            })
                        }
                    </ul>
                </div>

                }
            </>
        )



    }
}

export default Accordion