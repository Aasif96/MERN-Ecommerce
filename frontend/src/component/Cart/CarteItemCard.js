import React from 'react'
import './CartItemCard.css';
import {Link} from 'react-router-dom'

const CarteItemCard = ({item}) => {
  return (
    <div className='CartItemCard'>
        <img src={item.image} alt='img'/>
        <div>
            <Link to={`/product/${item.product}`}>{item.name}</Link>
            <span>{`Price: ₹${item.price}`}</span>
            <p>Remove</p>
        </div>
    </div>
  )
}

export default CarteItemCard