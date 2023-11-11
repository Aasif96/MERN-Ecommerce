import React from 'react'
import { useLoadUserQuery } from '../services/User'
import { Route, Redirect } from 'react-router-dom';
import Loader from '../component/layout/Loader/Loader';

const ProtectedRoute = ({component:Component, ...rest}) => {

  const {data, isLoading, isError, isSuccess} = useLoadUserQuery();

  return (
    <>
    {
        isLoading ? <Loader/> : (
            <Route
    {...rest}
    render={(props)=>{
        if(!isSuccess){
            return <Redirect to="/login"/>
        }

        return <Component {...props}/>
    }}
    
    />
  )}
    </>
  )
}

export default ProtectedRoute