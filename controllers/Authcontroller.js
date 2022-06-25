// const req = require('express/lib/request');
const User = require('../models/usermodel.js');
const jwt = require('jsonwebtoken');
const {promisify}=require('util');
const Apperror = require('../appError.js');


const catchAsync = require('./../catchAsync');
const AppError = require('./../appError');



  const Signtoken = id => {


    return jwt.sign({ id: id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
  };



// const createSentToken=(user,statusCode,res)=>{
//   const token

// }
exports.signup = async (req, res, next) => {
  try {
    // console.log(req.body);
    const newUser = await User.create(req.body);

    const token = Signtoken(newUser.id);

    const cookieOptions = {
      // expires: new Date(
      //   Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      // ),
      httpOnly: true  
    };
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  



    res.cookie("jwt", token, cookieOptions);
    console.log(newUser, token,"ugg");
      
  

    // console.log(req.cookies);

    // console.log(newUser);
    res.status(201).json({
      status: 'success',
      token,
      data: {
        newUser
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err
      // console.log(err);
    });
  }
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // if email password exist
  if (!email || !password) {
    return next(new Apperror('please provide email and password', 400));
  }

  try {
    const user = await User.findOne({ email }).select('+password');
    console.log(password);
    console.log('ff');
    console.log(user.id);

    const correct = await user.correctpassword(password, user.password);

    console.log(correct);

    if (!user || !correct) {
      return next(new Apperror('Incorrect email or password', 401));
    }

    console.log(user.password);

    console.log(correct);
    console.log('sffs');
    const token = Signtoken(user._id);
    res.status(200).json({
      status: 'success',
      token
    });
  } catch (err) {
    status: 'fail', err;
  }
});


exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // 4) Check if user changed password after the token was issued
  // if (currentUser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new AppError('User recently changed password! Please log in again.', 401)
  //   );
  // }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});




//only for rendered pages 
exports.islogedin = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  
console.log(res.cookies);
  // if(req.cookies.jwt)
  // {
   
  // // 2) Verification token
  // const decoded = await promisify(jwt.verify)(req.cookie.jwt, process.env.JWT_SECRET);

  // // 3) Check if user still exists
  // const currentUser = await User.findById(decoded.id);
  // if (!currentUser) {
  //    next();
   
  //   // return next(
  //   //   new AppError(
  //   //     'The user belonging to this token does no longer exist.',
  //   //     401
  //   //   )
  //   // );
  // }

  // // 4) Check if user changed password after the token was issued
  // // if (currentUser.changedPasswordAfter(decoded.iat)) {
  // //   return next(
  // //     new AppError('User recently changed password! Please log in again.', 401)
  // //   );
  // // }

  // // GRANT ACCESS TO PROTECTED ROUTE

  // res.locals.user=currentUser;
  // // req.user = currentUser;
  next();
}
);
