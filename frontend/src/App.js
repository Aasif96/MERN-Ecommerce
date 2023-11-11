import './App.css';
import Header from './component/layout/Header/Header.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import WebFont from "webfontloader";
import React, {useEffect} from 'react';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home.js'
import ProductDetails from './component/Product/ProductDetails.js';
import Products from './component/Product/Product.js'
import Search from './component/Product/Search.js'
import Profile from './component/User/Profile.js'
import LoginSignUp from './component/User/LoginSignUp';
import Cart from './component/Cart/Cart.js';
import {store} from './Redux/store';
import { useLoadUserQuery } from './services/User';
import UserOptions from './component/layout/Header/UserOptions.js'
import ProtectedRoute from './Route/ProtectedRoute';

function App() {

  const {data, isLoading, isError, isSuccess} = useLoadUserQuery();

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    
  }, [data,isSuccess]);

  return (
    <Router>
      <Header/>
      {isSuccess && <UserOptions user={data.user}/>}
      <Route exact path="/" component={Home}/>
      <Route exact path="/product/:id" component={ProductDetails}/>
      <Route exact path="/products" component={Products}/>
      <Route exact path="/search" component={Search}/>
      <ProtectedRoute exact path="/account" component={Profile}/>
      <Route exact path="/login" component={LoginSignUp}/>
      <Route exact path="/cart" component={Cart}/>
      <Footer/>
    </Router>
  );
}

export default App;
