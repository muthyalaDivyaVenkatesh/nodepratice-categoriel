const express = require('express');

// router 
let router = express.Router();

// import the categorie routes 
let categorieRoutes = require('../controllers/categorial');

// use the following here 
const multer = require('multer')

//  import jwt token here
const JwToken = require('../middleware/jwt')


let now  = new Date();

// from here we are using multer 
var storage = multer.diskStorage({
   destination: function (req, file, cb) {
       cb(null, 'images')
   },
   filename: function (req, file, cb) {
        cb(null,  now.toISOString() + "-" + file.originalname)
}
})


let upload = multer({ storage : storage})
// Now use the upload  image is the name given to key in the ui   


// route for  adding the categorie
router.post('/addcategerie', upload.single('image'), JwToken ,categorieRoutes.addCategorie)

// get categoriel  products
router.get('/getallcategories' , JwToken, categorieRoutes.getAllCategories);

// get single product in the url 


// update the categorial 
router.put('/categorie/:id', categorieRoutes.editCategorie);


// delete the categorie

router.delete('/deletecategerie/:id', categorieRoutes.deleteCategorie);


module.exports = router;