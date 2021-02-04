import React from 'react';
import Accordian from '../Accordion/Accordion';
import ContactForm from '../ContactForm/ContactForm';
const SendUsMessageContainer = () => {
    return (
        <div className="send-message">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-heading">
                            <h2>Send us a Message</h2>
                        </div>
                    </div>
                    <div className="col-md-8">
                    <ContactForm/>
                    </div>
                    <div className="col-md-4">
                        <Accordian/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SendUsMessageContainer;