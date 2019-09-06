const express = require('express');
// use express Router 
const router = express.Router();
// import controllel
const user = require('../controllers/user');
// import express validator 
const { body } = require('express-validator');

// import your db 

const User= require('../models/user') 


// use bodyparser 

// first route Signup 
router.post('/signup',[  body('conformpassword').custom((value, { req }) => {
    if (value !== req.body.password) {
        console.log("something fishey");
        console.log(new Error("bla bla"));
        throw new Error('Password confirmation does not match password');
        // throw new Error('Password confirmation does not match password');
    }
    return true;
}),
// email validation 
body('email').custom(value =>{
    console.log(value)
    return User.findOne({"email":value}).then(user => {
        if (user) {
          return Promise.reject('E-mail already in use');
        } 
}) 
})
],user.signUp)


// now for signin 

router.post('/login', user.login)






module.exports = router;





