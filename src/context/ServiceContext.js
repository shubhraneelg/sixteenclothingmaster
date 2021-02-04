import React, { Component, createContext } from 'react';
import config from '../config';
const ServiceContext = createContext();
// const { REACT_APP_SPACE_ID, REACT_APP_CDA_ACCESS_TOKEN } = process.env;


const query =`
    {
        servicesCollection(order:[
          sys_firstPublishedAt_ASC
        ]){
          items{
            title,
            serviceIcon,
            buttonText,
            summary,
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

  class ServiceProvider extends Component {
    state = {
        services: [],
        loading: true,
        error: null
    };
    
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
            //console.log(data);
            this.setState({
              services: data.servicesCollection.items
            });
          })
          .catch(error => {
            this.setState({
                loading: false,
                error: error.message
            });
        })
      }
    
    getService = (title) =>{
        let tempService = [...this.state.services];
        const service = tempService.find(ser => ser.title === title);
        return service;
    }
    render() {

        return (

            <ServiceContext.Provider value={{...this.state, getService: this.getService}}>
                {this.props.children}
            </ServiceContext.Provider>

        );
    }
}
export { ServiceProvider, ServiceContext };