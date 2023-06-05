import React,{useEffect} from 'react'
import {CgMouse} from 'react-icons/all'
import './Home.css'
import Product from './Product.js';
import MetaData from '../layout/MetaData.js';
import {useDispatch, useSelector} from 'react-redux'
import { getProducts } from '../../Redux/productApiCall';

const Home = () => {

  const dispatch = useDispatch();

  const {products,loading,error, productsCount} = useSelector(state => state.products);

  useEffect(()=>{
    getProducts(dispatch)
  },[dispatch])

  return (
    <>
    <MetaData title="Aasif Ecommerce"/>
      <div className="banner">
        <p>Welcome To Ecommerce</p>
        <h1>Find Amazing Products Below</h1>
        <a href="#container">
            <button>
            Scroll <CgMouse/>
            </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        {/* <Product product={product}/> */}

        {
          products.map((product)=>(
            <Product product={product}/>
          ))
        }
      </div>
    </>
  )
}

export default Home