import {combineReducers, createSlice} from '@reduxjs/toolkit';


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
        },
        clearproductError:(state)=>{
            state.error=null
        }
    }
})

export const productDetailsSlice = createSlice({
    name:"productDetails",
    initialState:{
        productDetails:'',
        loading:true,
        error:false,
    },
    reducers:{
        productDetailsRequest:(state)=>{
            state.loading=true;
        },
        productDetailsSuccess:(state,action)=>{
            state.loading=false;
            state.productDetails=action.payload;
        },
        productDetailsFail:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        clearproductDetailsError:(state)=>{
            state.error=null
        }
    }
})


export const {productRequest, produtSuccess, productFail, clearproductError} = productSlice.actions;
export const {productDetailsRequest, productDetailsSuccess, productDetailsFail, clearproductDetailsError} = productDetailsSlice.actions;

//export default productSlice.reducer;

export default combineReducers({
    product: productSlice.reducer,
    productDetails: productDetailsSlice.reducer
});