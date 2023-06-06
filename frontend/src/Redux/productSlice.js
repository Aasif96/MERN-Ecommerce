import {createSlice} from '@reduxjs/toolkit';


export const productSlice = createSlice({
    name:"product",
    initialState:{
        products:[],
        loading:true,
        error:false,
    },
    reducers:{
        productRequest:(state)=>{
            state.loading=true;
        },
        produtSuccess:(state,action)=>{
            state.loading=false;
            state.products=action.payload;
        },
        productFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        }
    }
})


export const {productRequest, produtSuccess, productFail} = productSlice.actions;
export default productSlice.reducer;