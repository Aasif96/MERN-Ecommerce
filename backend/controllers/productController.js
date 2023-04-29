const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


// create product -- Admin

exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  
    const product = await Product.create(req.body);
  
    res.status(201).json({
      success: true,
      product,
    });
  });


// Get all product 

exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
  
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();
  
    let products = await apiFeature.query;
  
    let filteredProductsCount = products.length;
  
    apiFeature.pagination(resultPerPage);
  
    products = await apiFeature.query;
  
    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    });
  });


// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
 
    const products = await apiFeature.Product.find()
  
    res.status(200).json({
      success: true,
      products,
    });
  });


  // get product

exports.getProductDetails = catchAsyncErrors(async(req,res,next)=>{
    let product = await  Product.findById(req.params.id)

    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }

    res.status(200).json({
        success:true,
        product
    })
    
        res.status(401).json(error.message)
    
});


// update product -- Admin

exports.updateProduct = catchAsyncErrors(async (req,res,next) =>{
    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
    
      res.status(200).json({
        success: true,
        product,
      });
});

// Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    await product.remove();
  
    res.status(200).json({
      success: true,
      message: "Product Delete Successfully",
    });
  });
  