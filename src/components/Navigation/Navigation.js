import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

// const { REACT_APP_SPACE_ID, REACT_APP_CDA_ACCESS_TOKEN } = process.env;
import config from '../../config';

const query = `

{
    headerNavigationCollection(order:[
        sys_firstPublishedAt_ASC
    ]){
      items{
        pageLink
        pageName
      }
    }
  }
`;

class Navbar extends Component {

    state = {
        Navlinks: []
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
                // console.log(data);
                this.setState({
                    Navlinks: data.headerNavigationCollection.items,
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <Link to="/home" className="navbar-brand"><h2>Sixteen <em>Clothing</em></h2></Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                {
                                    this.state.Navlinks.map((nav, i) => {
                                        return (
                                            <li className="nav-item" key={i}><NavLink className="nav-link" to={`/${nav.pageLink}`}>{nav.pageName}</NavLink></li>
                                        )
                                    })
                                }

                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Navbar