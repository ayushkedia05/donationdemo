const express = require('express');
let cors = require("cors");
const morgan = require('morgan');


const session=require('express-session')

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const Grid = require ('gridfs-stream') ;  
const app = express();

var cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(cors());



app.use (
  session ( {
  resave : false ,
  saveUninitialized : false ,
  secret : " session " ,
  cookie : {
  maxAge : 1000 * 60 * 60 ,
  sameSite : " none " ,
  secure : true ,
  },
   } )
  ) ;











// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
// app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  // console.log(req.headers)
  console.log('cookies',req.cookies)

  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES


     





app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
  