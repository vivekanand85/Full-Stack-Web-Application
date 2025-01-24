const express=require('express');
const {registerUser,loginuser,forgotuser,resetuser}=require('../model/useController');
const router=express.Router();

router.post('/register',registerUser);
router.post('/login', loginuser);
router.post('/forgot-password',forgotuser);
router.post('/reset-password',resetuser);
module.exports=router;

