
import React from 'react';
import Banner from '../components/Banner/Banner'
import OurBackground from '../components/OurBackground/OurBackground';
import OurTeam from '../components/OurTeam/OurTeam';
import ServicesSixteenClothing from "../components/ServicesSixteenClothing/ServicesSixteenClothing";
import HappyPartners from "../components/HappyPartners/HappyPartners";




const AboutUs = () => {
    return (
        <>
            <Banner type="simple" category="About Us Banner" />
            <OurBackground/>
            <OurTeam />
            <ServicesSixteenClothing />
            <HappyPartners/>

        </>
    );
}

export default AboutUs;
