import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../Redux/productApiCall';
import { clearproductError } from '../../Redux/productSlice';

const Product = () => {

   const dispatch =  useDispatch();

  return (
    <div>Product</div>
  )
}

export default Product