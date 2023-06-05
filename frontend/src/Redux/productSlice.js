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
        productFail:(state)=>{
            state.error=true;
            state.loading=false;
        }
    }
})


export const {productRequest, produtSuccess, productFail} = productSlice.actions;
export default productSlice.reducer;