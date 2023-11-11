import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const CartApi = createApi({
    reducerPath:'cartApi',       //in reducerpath unique key we defined a string in which we tells redux where to store cache
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1/',
    }),
    endpoints:(builder)=>({
        cartAdd: builder.mutation({
            query: (addUser) => {
             return {
              url: `login`,
              method: 'POST',
              body: addUser,
              headers: {
               'Content-type': 'application/json; charset=UTF-8',
              },
              credentials: "include"
             }
            },
            // invalidatesTags:['User']
           }),
    })
})


//export const {useLoginUserMutation,useRegisterUserMutation,useLoadUserQuery,useLogoutUserQuery,useLazyLogoutUserQuery,useLazyLoadUserQuery} = UserApi;
export const {useCartAddMutation} = CartApi;