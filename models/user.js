const mongoose = require('mongoose');
// calling the constructor function
let Schema = mongoose.Schema

const categorielSchema =  new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:false
    },
    resetToken: String,
    categorial: [
        {
            type: Schema.Types.ObjectId,
            ref:'categorial',
            required:false
        }
    ]
})


module.exports = mongoose.model('user',categorielSchema);