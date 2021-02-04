import React from 'react';
import './App.css';
import Home from './Pages/Home';
import OurProducts from './Pages/OurProducts';
import AboutUs from './Pages/AboutUs';
import ContactUS from './Pages/ContactUs';
import Navigation from './components/Navigation/Navigation';
import ServiceDetail from "./components/ServicesSixteenClothing/ServiceDetail";
// import ProductDetail from "./components/OurProducts/ProductDetails";
import ProductDetail from './components/OurProduct/ProductDetail';
import ErrorPage from './Pages/Error';
import { Route, Switch } from 'react-router-dom';
import FooterIdentity from './components/footer/FooterIdentity';

//Testing CI/CD

// class App extends Component {
//   render() {
function App() {
  return (
          <>
      <Navigation />
      <Switch>
        <Route path="/" exact>
          <Home />
          </Route>
          <Route path="/home" exact>
          <Home />
          </Route>
          <Route exact path="/products" component={OurProducts} />
          <Route exact path="/about" component={AboutUs} />
          <Route exact path="/contact" component={ContactUS} />
          <Route exact path="/services/:service_name" component={ServiceDetail} />
          <Route path="/products/:title" component={ProductDetail} />
          <Route><ErrorPage /></Route>
         </Switch>     
         <FooterIdentity/>
      </>

    );
  }


export default App;
