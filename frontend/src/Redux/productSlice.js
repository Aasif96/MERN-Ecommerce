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
        }
    }
})

export const productDetailsSlice = createSlice({
    name:"productDetails",
    initialState:{
        productDetails:[],
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
            state.error=action.payload.product;
        }
    }
})


export const {productRequest, produtSuccess, productFail} = productSlice.actions;
export const {productDetailsRequest, productDetailsSuccess, productDetailsFail} = productDetailsSlice.actions;

//export default productSlice.reducer;

export default combineReducers({
    product: productSlice.reducer,
    productDetails: productDetailsSlice.reducer
});