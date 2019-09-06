// declare a jwtToken here 
var jwt = require('jsonwebtoken');

// using jwtToken here 
let jwtToken = (req, res, next) => {
    let token = req.get('jwt');
    console.log("we are inside jwt  validation");
    if (!token) {
        let error = new Error("plese send your jwt token");
        error.status = 401;
        throw error
    }

    jwt.verify(token, 'mdvenkatesh', function (err, decoded) {
        if (err) {
            throw new Error("your jwt token is expired")
        } // bar      
    });
    let decodedToken = jwt.verify(token,"mdvenkatesh")
    console.log('----------------------------==++')
    console.log(decodedToken);
    req.userId = decodedToken.loggedInUser._id 
    console.log(`we are printing the user id here ${req.userId}`);
    next();
}


// exporting jwttoken 
module.exports = jwtToken