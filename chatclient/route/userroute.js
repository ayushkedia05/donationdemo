const express = require('express');
const router=express.Router();
// const { router } = require('../app');

const Authcontroller = require('../controller/Authcontroller.js');
const { signup, login, streamRegister } = require('../controller/Authcontroller');


router.route('/signup').post(streamRegister); 
// router.post('/login', login);
router.route('/login').post(login); 


module.exports=router; 