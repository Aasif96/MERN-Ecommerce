import './App.css';
import Header from './component/layout/Header/Header.js'
import { BrowserRouter as Router } from 'react-router-dom'
import webFont from "webfontloader";
import React, {useEffect} from 'react';
import Footer from './component/layout/Footer/Footer';

function App() {

  useEffect(()=>{
    webFont.load({
      google:{
        families:['Roboto', "Droid Sans", "Chilanka"]
      }
    })
  },[])

  return (
    <Router>
      <Header/>
      <Footer/>
    </Router>
  );
}

export default App;
