import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
    reducerPath:'productApi',       //in reducerpath unique key we defined a string in which we tells redux where to store cache
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1/',
    }),
    endpoints:(builder)=>({
        getAllProducts: builder.query({    // builder.query use when we want to get data, in insert & update we will use mutate
            query:()=>({
                url:'products',
                method:'GET'
            })
        })   
    })
})


export const {useGetAllProductsQuery} = productApi;