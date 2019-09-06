const Categorial = require('../models/categorie')
// we are using multer 
const fs = require('fs');
const path = require('path');
const User = require('../models/user');

// console.log(path.join(__dirname,'../images'));


const  IMAGE_URL = path.join(__dirname, "../images" + "noimage926126.png");

// i am exporing add categorie 
exports.addCategorie = (req, res, next) => {

   const categorie = req.body.categorie;
   const description = req.body.description;
   let imageUrl = req.file;
   let creator;
   // checking the image url 
   if (!imageUrl) {
      // we will define a  image url by default here 
      imageUrl = path.join(__dirname, "../images" + "noimage926126.png");
   }
   else {
      imageUrl = req.file.path;
   }
   // seeeing the req.file
   console.log(req.file);
   // creator is string but mongoose db will take care of it 
   let categorieData = new Categorial(
      { 
      "categorie": categorie,
       "description": description,
        "image": imageUrl, 
        "creator": req.userId 
      });
   categorieData.save().then((data) => {
      return User.findById(req.userId)
     
   }).then((user) =>{
      creator = user;
      user.categorial.push(categorieData);
      user.save()
   })
   .then((result) =>{
      res.status(200).json({data:categorieData,creator:creator.email})
   })
}

// get all categories 
exports.getAllCategories = (req, res, next) => {
   // now here we can get all the categories by pagination 
   let noPerPage = 3;
   let page = +req.query.page || 1;
   Categorial.find().skip(page * (noPerPage - 1)).limit(noPerPage).then((categoriedata) => {
      console.log(categoriedata.imageUrl);
      let imagePath = categoriedata.imageUrl;

      if (!categoriedata) {
         throw new Error("categorie data is undefined");
      }
   
    

      // const file = fs.readFileSync(path.resolve(__dirname, "/../images",imagePath));
      res.status(200).send({
         data: categoriedata,
      })
   })

}

// delete  the categorie
exports.deleteCategorie = (req,res,next) =>{
   // now we should delete user
   userId = req.params._id;
   // check whether the user who signed in and add the product is same
   Categorial.findOne({userId}).then((userdata)=>{
      if(userdata.creator !== userId) {
         err = new Error("you are not having the prevalages because your not one who added the product");
         next(err)
      }

      Categorial.findOneAndDelete({_id:req.params.id}).then((data) =>{
         // now how to unlink the data 
         if(data.imageUrl !== IMAGE_URL){
            fs.unlink(data.imageUrl);
         }
         res.status(200).json({data: "you have succesfully deleted the datass"})
      }) 
   })
  
}



// for edit the categoriel product with 
exports.editCategorie = (req, res, next) => {
   console.log("we are inside the edit categorie");
   Categorial.findOne({ _id: req.params.id }).then((categorie) => {
      categorie.categorie = req.body.categorie;

   })
}




// unlink the image 
