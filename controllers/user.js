// create a jwt token 
var jwt = require('jsonwebtoken');
// use byscript to hash the passwords
const bcrypt = require('bcrypt');
// import models
const Usermodel = require('../models/user');


// we are writting signup post 
exports.signUp = (req,res,next) =>{
    console.log("we are inside signUp method")
    const email = req.body.email;
    const password = req.body.password;
    saltRounds = 10;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        if(err) {
            const error = new Error()
             error.stausode = 500;
            throw new  error('There is some error in hashing yoyr password')
        }
       
        const user = new Usermodel({"email":email,"password":hash});
        user.save().then((user)=>{
            res.status(200).json({user:user})
        })
      });

}

// we are writting the login post 

exports.login = (req,res,next) =>{
    console.log("we are inside login method");
    const email = req.body.email;
    const password = req.body.password
    // check whether the password and db are same 
    Usermodel.findOne({email:email}).then((user) =>{
        let hashedPassword = user.password;
        bcrypt.compare(password, hashedPassword , function(err, result) {
            if(err) {
                error = new Error("passwords didn't math")
                throw error
            }
            // here we are storing the userid who  is loggedin 
            req.userId = user._id
            console.log(user)
            console.log(req.userId)
            // end here 
            let loggedInUser = user;
            let token = jwt.sign({loggedInUser},"mdvenkatesh", { expiresIn: '8h' })
                // created jwt token 
                res.status(200).json({data:"sucesfully loggedin" , token: token,})
            }); 
    })
}

// forgat  password use nodemail 

