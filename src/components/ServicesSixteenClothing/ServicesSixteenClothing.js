import React from "react";
import { Link } from 'react-router-dom';
import { ServiceContext } from '../../context/ServiceContext';

export default class ServicesSixteenClothing extends React.Component {

  state={
    services: []
  }

  static contextType = ServiceContext;
  render() {
    const { services } = this.context; 
    return (
      <div className="services">
        <div className="container">
          <div className="row">
            {
              services.map((service, index) => {
                return(
                <div key={index} className="col-md-4">
                  <div className="service-item">
                    <div className="icon">
                      <i className={service.serviceIcon}></i>
                    </div>
                    <div className="down-content">
                      <h4>{service.title}</h4>
                      <p>{service.summary}</p>
                        <Link className="filled-button" to={{
                          pathname: `services/${service.title}`,
                          service: service
                        }}>
                          {service.buttonText}
                        </Link>        
                    </div>
                  </div>
                </div>
                );
              })
            }
          </div>
        </div>
      </div>


    );
  }
}
