const User = require('../models/userModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require('../utils/jwToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');


// register user
exports.registerUser = catchAsyncErrors(async (req,res,next)=>{

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatar",
        width:150,
        crop:"scale",
    });

    const {name,email,password} = req.body;

    const user = await User.create({ 
        name,email,password,
        avatar:{
            public_id: myCloud.public_id,
            url:myCloud.secure_url,
        }
    }) 

    sendToken(user,201,res)
})

//Login user

exports.loginUser = catchAsyncErrors(async (req,res,next) =>{

    const { loginEmail, loginPassword } = req.body;
    const email = loginEmail;
    const password = loginPassword;

    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password',400));
    }

    const user = await User.findOne({email}).select("+password")   //selecte false kiya h user model mein isiye alg se specify karke likhna pada

    if(!user){
        return next(new ErrorHandler('Invalid Email or Password',401));   //401 unauthorized error
    }

    const isPasswordMatched = await user.comparePassword(password);

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

    const resetPasswordUrl = `${req.protocol}://${req.hostname}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is : \n\n ${resetPasswordUrl} \n\n if you have not requested this email then please ignore it`;

    try {

        await sendEmail({
            email:user.email,
            subject:`Ecommerce password recovery`,
            message,
        });

        res.status(200).json({
            success:true,
            message:`Email Sent to ${user.email} Successfully`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        
        await user.save({validateBeforeSave:false});
        
        return next(new ErrorHandler(error.message,500))
    }
})

// reset password

exports.resetPassword = catchAsyncErrors(async (req,res,next)=>{

  // creating hash token
  const resetPasswordToken = crypto
  .createHash("sha256")
  .update(req.params.token)
  .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire:{$gt : Date.now()}   //$ gt = greater than, $ gte = greater than equal
  })

  if(!user){
    return next(new ErrorHandler("Reset password token is invalid or has been expired"),400)
  }

  if(req.body.password !== req.body.confirmPassword){
    return next(new ErrorHandler("Password does not match"),400);
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user,200,res);

})


// Get user details
exports.getUserDetails = catchAsyncErrors(async (req,res,next)=>{

    const user = await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user,
    })

})

// Update User Password
exports.updatePassword = catchAsyncErrors(async (req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password");
    
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler('Old Password is incorrect',400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler('Password does not match',400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user,200,res)

})


// update user profile
exports.updateProfile = catchAsyncErrors(async (req,res,next)=>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email
    }

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });

})



// Get all users (admin)
exports.getAllUser = catchAsyncErrors(async (req,res,next)=>{

    const users = await User.find();

    res.status(200).json({
        success:true,
        users
    })
})

// Get single users (admin)
exports.getSingleUser = catchAsyncErrors(async (req,res,next)=>{

    const users = await User.findById(req.params.id);

    if(!users){
        return next(new ErrorHandler(`User doesn't exist with id ${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        users
    })
})


// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
  
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
    });
  });


// Delete User -- Admin

exports.deleteUser = catchAsyncErrors(async (req,res,next)=>{

    const user = await User.findById(req.params,id);
    //will add cloudinary later

    if(!user){
        return next(new ErrorHandler(`User does not exist with id ${req.params.id}`))
    }

    await user.remove();

    res.status(200).json({
        success:true,
        messsage:"User Deleted successfully"
    })

})