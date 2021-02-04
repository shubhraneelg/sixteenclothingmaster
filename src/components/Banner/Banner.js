import React, { Component } from 'react';
import Hero from './Hero';
import HeroCarousel from './HeroCarousel';
import config from '../../config'
/*(where:{
      category_contains: "Home"
    })*/
const query = `
{
    carouselBannerCollection{
      items{
        title,
        subtitle,
        category,
        backgroundImage{
          title,
          url
        }
      }
    }
  }
  `

// const { REACT_APP_SPACE_ID, REACT_APP_CDA_ACCESS_TOKEN } = process.env;

export default class Banner extends Component {

  state = {
    Banners: [],
    SimpleBanner: [],
    CarouselBanner: []
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
        let Banners = data.carouselBannerCollection.items;
        let SimpleBanner = Banners.filter(Banner => Banner.category !== "Home Carousel");
        let CarouselBanner = Banners.filter(Banner => Banner.category === "Home Carousel");
        this.setState({
          Banners,
          SimpleBanner,
          CarouselBanner
        });
        // console.log(this.state);
      })
      .catch(error => console.log(error));


  }

  render() {
    let Banner = null;
    
    // switch(this.props.type){
    //   case('simple'):
    //   Banner = <div className="page-heading products-heading header-text">
    //   <div className="container">
    //     <div className="row">


    //     <img className="img-responsive" src={this.state.SimpleBanner[0].backgroundImage.url} />
    //       <div className="col-md-12">
    //         <div className="text-content">
    //           <h4>new arrivals</h4>
    //           <h2>sixteen products</h2>
    //         </div>
    //       </div>



    //     </div>
    //   </div>
    // </div>;
    // break;

    // case('carousel'):
    // Banner= <div><h4>Iam just a  carousel</h4></div>;
    // }
    // const{title, subtitle, category, backgroundImage} = this.state.SimpleBanner;
    
      // const banner1 = this.state.SimpleBanner[0];
      const Title = Object.assign([], this.state.SimpleBanner.map(item => (
        item.title
      )));
      const SubTitle = Object.assign([], this.state.SimpleBanner.map(item => (
        item.subtitle
      )));
      const Bannerimages = Object.assign([], this.state.SimpleBanner.map(item => (
         item.backgroundImage.url
      ))); 
       const BannerimagesAlt = Object.assign([], this.state.SimpleBanner.map(item => (
         item.backgroundImage.title
      ))); 
      // console.log(Title)
      // console.log(SubTitle)
      // console.log(Bannerimages)
      // console.log(BannerimagesAlt)
      // console.log(this.state.CarouselBanner)
      // const CarouselData = Object.assign([], this.state.CarouselBanner);
      // console.log(CarouselData)

        const [title, subtitle, bgimagesUrl] = [this.state.CarouselBanner.map(datas => (datas.title)), this.state.CarouselBanner.map(datas => (datas.subtitle)), this.state.CarouselBanner.map(datas => (datas.backgroundImage.url))]
        
        // console.log([title , subtitle, bgimagesUrl]);

        // console.log(bgimages[0].title)
    if (this.props.type === "simple" && this.props.category === "About Us Banner") {
      Banner = (        
         <Hero title={Title[0]} subtitle={SubTitle[0]} src={Bannerimages[0]} alt={BannerimagesAlt[0]} />
      )
    }else if (this.props.type === "simple" && this.props.category === "Our Products Banner") {
      Banner = (        
        <Hero title={Title[1]} subtitle={SubTitle[1] } src={Bannerimages[1]} alt={BannerimagesAlt[1]} />
      )
    }else if(this.props.type === "simple" && this.props.category === "Contact Us Banner") {
      Banner = (        
        <Hero title={Title[2]} subtitle={SubTitle[2]} src={Bannerimages[2]} alt={BannerimagesAlt[2]} />
      )
    }
    
    else {
      Banner = (
        <HeroCarousel title={title}  subtitle={subtitle} src={bgimagesUrl}/>
      )
    }

    return (
      <>
        {Banner}
      </>
    )
  }
}
