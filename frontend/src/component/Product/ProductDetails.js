import React,{useEffect} from 'react'
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../../Redux/productApiCall';

const ProductDetails = ({match}) => {

    const dispatch = useDispatch();
    const data = useSelector((state) => state.products)
     console.log(data.productDetails.productDetails.product)

    useEffect(()=>{
        getProductDetails(dispatch,match.params.id)
    },[dispatch])

  return (
    <>
      <div className='productDetails'>

      <Carousel>
        {
          // data.productDetails.productDetails.product.images &&
          //   data.productDetails.productDetails.product.images.map((item,i) => (
          //       <img
          //       className='CarouselImage'
          //       key={item.url}
          //       src={item.url}
          //       alt={`${i} Slide`}
          //       />
          //    ))
        }
      </Carousel>

      </div>  
    </>
  )
}

export default ProductDetails