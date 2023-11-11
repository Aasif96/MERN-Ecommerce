import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../../Redux/productApiCall';
//import { clearproductError } from '../../Redux/productSlice';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import './Product.css'
import { useGetAllProductsQuery } from '../../services/Product';
import Pagination from 'react-js-pagination';

const Product = () => {
   const dispatch =  useDispatch();

   const [currentPage, setCurrentPage] = useState(1);

   const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

   const {data, isLoading, isError, isSuccess} = useGetAllProductsQuery();

  return (
    <>
    {
      isLoading ?  <Loader/> : 
      <>
        <h2 className='productsHeading'>Products</h2>

        <div className="products">
          {
            data.products && 
            data.products.map((product)=>(
              <ProductCard key={product._id} product={product}/>
            ))
          }
        </div>

        <div className='paginationBox'>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={data.resultPerPage}
            totalItemsCount={data.productsCount}
            onChange={setCurrentPageNo}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="1st"
            lastPageText="Last"
            itemClass="page-item"
            linkClass="page-link"
            activeClass="pageItemActive"
            activeLinkClass="pageLinkActive"
          />
        </div>
      </>
    }
    </>
  )
}

export default Product