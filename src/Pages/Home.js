import React from 'react';
import Banner from '../components/Banner/Banner'
import AboutSixteenClothing from '../components/AboutSixteenClothing/AboutSixteenClothing';
import CreativeSixteenProducts from '../components/CreativeSixteenProducts/CreativeSixteenProducts';
import LatestProducts from '../components/OurProduct/LatestProducts';


const Home = () => {
    return (
        <>  
            <Banner type="carousel" />
            <LatestProducts />
            <AboutSixteenClothing />
            <CreativeSixteenProducts />
           
            
        </>
    )
}



export default Home;