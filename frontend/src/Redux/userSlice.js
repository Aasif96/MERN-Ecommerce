import {createSlice} from '@reduxjs/toolkit';


export const userSlice = createSlice({
    name:"user",
    initialState:{
        name:"john",
        email:"a.sakur81@gmail.com"
    },
    reducers:{
        update:(state,action) =>{
            
        }
    }
})