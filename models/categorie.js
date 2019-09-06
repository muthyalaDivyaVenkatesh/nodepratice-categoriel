const mongoose = require('mongoose');
// calling mongoose Schema
const Schema = mongoose.Schema

// create a  model 

const categorielSchema  =  new Schema({
    categorie:{
        type:String,
        required:false
    },

    description : {
        type:String,
        required:false
    },

    image:{
        type:String,
        required:false
    },
    creator : {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
})

module.exports = mongoose.model('categorial',categorielSchema);