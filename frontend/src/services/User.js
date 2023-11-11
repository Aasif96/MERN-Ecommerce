import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const UserApi = createApi({
    reducerPath:'userApi',       //in reducerpath unique key we defined a string in which we tells redux where to store cache
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api/v1/',
    }),
    endpoints:(builder)=>({
        loginUser: builder.mutation({
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
            invalidatesTags:['User']
           }),
           registerUser: builder.mutation({
            query: (regUser) => {
             const config = { headers: { "Content-Type": "multipart/form-data" } };

             return {
              url: `register`,
              method: 'POST',
              body: regUser,
              config,
              credentials: "include"
             }
            }
           }),
           loadUser: builder.query({    // builder.query use when we want to get data, in insert & update we will use mutate
             query:()=>({
                url:'me',
                method:'GET',
                credentials: "include",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                }),
                providesTags:['User','Log']
            }),
            logoutUser: builder.query({    // builder.query use when we want to get data, in insert & update we will use mutate
                query:()=>({
                   url:'logout',
                   method:'GET',
                   credentials: "include",
                   headers: {
                       Accept: 'application/json',
                       'Content-Type': 'application/json',
                     },
                   }),
                   invalidatesTags:['Log']
               }) 
    })
})


export const {useLoginUserMutation,useRegisterUserMutation,useLoadUserQuery,useLogoutUserQuery,useLazyLogoutUserQuery,useLazyLoadUserQuery} = UserApi;