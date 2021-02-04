import React, { Component } from 'react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import parse from 'html-react-parser';
import { ServiceContext } from '../../context/ServiceContext'


class ServiceDetail extends Component {

    state = {
        title: this.props.match.params.service_name
    }

    static contextType = ServiceContext;

    render() {
        const { getService } = this.context;
        const service = getService(this.state.title);
        if (!service) {
            return (
                <div className="banner header-text">
                    <div className="container text-center pad-5">
                        <h1>Sorry, No Such Service Found!!!</h1>
                    </div>
                </div>
            );
        }
        let description;

        if (service.description)
            description = service.description.json;
        else
            return (
                <p>No Description</p>
            )

        const rawRichTextField = description;
        let richTextSummary = documentToHtmlString(rawRichTextField);
        let serviceSummary = parse(richTextSummary);

        return (
            <>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="service-detail service-item">
                                <h2 className="service-detail-title">{service.title}</h2>
                            </div>
                            <br />
                            {

                                service.image &&
                                <img className="service-detail-image" src={service.image.url} alt={service.image.title} />
                            }
                            <br />
                            <br />
                            <section className="service-detail-description">
                                <article>
                                    {serviceSummary}
                                </article>
                            </section>
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default ServiceDetail;