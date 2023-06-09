import React,{useEffect} from 'react'
import {CgMouse} from 'react-icons/all'
import './Home.css'
import ProductCard from './ProductCard.js';
import MetaData from '../layout/MetaData.js';
import {useDispatch, useSelector} from 'react-redux'
import { getProducts } from '../../Redux/productApiCall';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';

const Home = () => {

  const dispatch = useDispatch();
  const alert = useAlert();

  const {products,loading,error, productsCount} = useSelector(state => state.products.product);

  useEffect(()=>{

    if(error){
      return alert.error(error)
    }

    getProducts(dispatch)
  },[dispatch,error,alert])

  return (
    <>
    {
      loading ? 
      
      <Loader/> 
      : 
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
          products.map((product,i)=>(
            <ProductCard key={i} product={product}/>
          ))
        }
      </div>
    </>
    }
    </>
  )
}

export default Home