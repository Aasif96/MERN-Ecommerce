const User = require('../models/userModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require('../utils/jwToken');


// register user
exports.registerUser = catchAsyncErrors(async (req,res,next)=>{

    const {name,email,password} = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:'sample id',
            url:'profilepic1'
        }
    }) 

    sendToken(user,201,res)
})

//Login user

exports.loginUser = catchAsyncErrors(async (req,res,next) =>{

    const {email,password} = req.body;
    
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password',400));
    }

    const user = await User.findOne({email}).select("+password")   //selecte false kiya h user model mein isiye alg se specify karke likhna pada

    if(!user){
        return next(new ErrorHandler('Invalid Email or Password',401));   //401 unauthorized error
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Email or Password',401));
    }

    sendToken(user,200,res)

})

//Logout user

exports.logoutUser = catchAsyncErrors(async (req,res,next)=>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    })

    res.status(200).json({
        success:true,
        messgae:'Logged Out'
    })

})


// Forgot Password

exports.fortgotPassword = catchAsyncErrors(async (req,res,next)=>{

    const user = await User.findOne({email:req.body.email})

    if(!user){
        return next(new ErrorHandler('User not found',404));
    }


    //get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.host}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is : \n\n ${resetPasswordUrl} \n\n if you have not requested this email then please ignore it`;

    try {

        await sendEmail({
            
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        
        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(error.message,500))
    }
})