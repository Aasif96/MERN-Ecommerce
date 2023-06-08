import { productRequest, produtSuccess, productFail } from "./productSlice";
import { productDetailsRequest, productDetailsFail, productDetailsSuccess } from "./productSlice";
import axios from "axios"

export const getProducts = async (dispatch) =>{
     dispatch(productRequest())
     try {
        const res = await axios.get("http://localhost:5000/api/v1/products")    
        dispatch(produtSuccess(res.data.products))
     } catch (error) {
        dispatch(productFail(error.response.data.message))
     }
}

export const getProductDetails = async (dispatch,id) =>{
   dispatch(productDetailsRequest())
   try {
      const res = await axios.get(`http://localhost:5000/api/v1/product/${id}`)    
      dispatch(productDetailsSuccess(res.data))
   } catch (error) {
      dispatch(productDetailsFail(error.response.data.message))
   }
}