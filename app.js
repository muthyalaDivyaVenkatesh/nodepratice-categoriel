const express   = require('express');
const  app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// path 
const path  = require('path');

// get routes
const userRoutes = require('./routes/user')
const categerieRoutes = require('./routes/categorial')

// use bodyparesejson
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/images', express.static('images'))



// const multer = require('multer')

// let now  = new Date();
// // use multer here 
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '/images')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.image + '-' + now.toISOString())
//     }
// })


// let upload = multer({ storage : storage}).single('image')
// Now use the upload  image is the name given to key in the ui 
// app.use(upload)   


// use this as body parser  


// get the mongodb url 
const MONGODBURL = 'mongodb+srv://mdv:123ABCabc@cluster0-556nl.mongodb.net/completenode?retryWrites=true&w=majority';



app.use('/user', userRoutes);
app.use('/categerie',categerieRoutes );


// error handling  function  
app.use((error,req,res,next) =>{
    const status = error.status || 500;
    const message = error.message;
    res.status(status).json({message})
    return;
})


app.listen(3000 ,()=>{
    mongoose.connect(MONGODBURL,{useNewUrlParser:true}).then(()=>{
        console.log("we have connected to the mongodb");
        console.log("we are listing to the port 3000");
    })
    
})

