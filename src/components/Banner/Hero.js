import React from 'react';
import './Hero.css';

const Hero = (props) => {
    return (
        <div className="page-heading products-heading header-text Banner-wrapper">
            <img className="img-responsive Banner-img" src={props.src} alt={props.alt} />
            <div className="overlay">
                <div className="content-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="text-content">
                                    <h4>{props.title}</h4>
                                    <h2>{props.subtitle}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
