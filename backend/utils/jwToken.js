const sendToken = (user,statusCode,res)=>{
    
    const token = user.getJWTToken();
    
    //options for cookies 
    const options = {
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,  //multiply by 24 to convert into hours, then 60 to mins, then 60 to sec, then 1000 to millisec
        ),
        httpOnly:true,
    }
    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        user,
        token
    })
}

module.exports = sendToken;