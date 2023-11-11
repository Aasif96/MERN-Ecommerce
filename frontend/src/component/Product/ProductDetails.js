import React,{useEffect, useState} from 'react'
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../../Redux/productApiCall';
import Loader from '../layout/Loader/Loader';
import ReactStars from 'react-rating-stars-component'
import ReviewCard from './ReviewCard.js'
import { useAlert } from "react-alert";
import { clearproductDetailsError } from '../../Redux/productSlice';
import { addToCart } from '../../Redux/cartSlice';
import { addItemsToCart } from '../../Redux/cartApiCall';

const ProductDetails = ({match}) => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const data = useSelector((state) => state.products.productDetails)

    const addToCartHandler = () =>{
      dispatch(addItemsToCart(match.params.id,quantity));
      alert.success("Item Added To Cart");
    }

    useEffect(()=>{
      if(data.error){
        alert.error(data.error);
        dispatch(clearproductDetailsError())
      }
      getProductDetails(dispatch,match.params.id)
    },[dispatch,match.params.id,data.error,alert])

    const options = {
      edit:false,
      color:"rgba(20,20,20,0.1)",
      activeColor:"tomato",
      size:window.innerWidth < 600 ? 20 : 25,
      value:4,
      isHalf:true,
  }

  const [quantity,setQuantity] = useState(1);

  const increaseQuantity = () =>{
    if(data.productDetails.product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty)
  }

  const decreaseQuantity = () =>{
    if(1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty)
  }

  return (
    <>
    {
      data.loading ?

      <Loader/> : 

      <>
      <div className='ProductDetails'>
      <div>
      <Carousel>
        {
          data.productDetails.product.images &&
            data.productDetails.product.images.map((item,i) => (
              <img
              className="CarouselImage"
              key={i}
              src={item.url}
              alt={`${i} Slide`}
            />
             ))
        }
      </Carousel>
      </div>

      <div>
        <div className="detailsBlock-1">
          <h2>{data.productDetails.product.name}</h2>
          <p>Product # {data.productDetails.product._id}</p>
        </div>
        <div className='detailsBlock-2'>
          <ReactStars {...options}/>
          <span>({data.productDetails.product.numOfReviews}) Reviews</span>
        </div>
        <div className="detailsBlock-3">
          <h1>{`₹${data.productDetails.product.price}`}</h1>
          <div className="detailsBlock-3-1">
            <div className="detailsBlock-3-1-1">
            <button onClick={decreaseQuantity}>-</button>
            <input type="number" value={quantity} />
            <button onClick={increaseQuantity}>+</button>
            </div>{" "}
            <button onClick={addToCartHandler}>Add to Cart</button>
          </div>
          <p>
            Status:{" "}
            <b className={data.productDetails.product.Stock < 1 ? "redColor" : "greenColor"}>
              {data.productDetails.product.Stock < 1 ? "OutOfStock" : "InStock"}
            </b>
          </p>
        </div>

        <div className="detailsBlock-4">
          Description : <p>{data.productDetails.product.description}</p>
        </div>

        <button className='submitReview'>Submit Review</button>
       </div>
      </div>

      <h3 className='reviewsHeading'>REVIEWS</h3>
        
      {
        data.productDetails.product.reviews && 
        data.productDetails.product.reviews[0] ? (
          <div className="reviews">
            {data.productDetails.product.reviews && 
            data.productDetails.product.reviews.map((review,i) => <ReviewCard key={i} review={review}/>)}
          </div>
        ) : <p className='noReviews'>No Reviews yet</p>
      }

    </>

    }
    </>
  )
}

export default ProductDetails