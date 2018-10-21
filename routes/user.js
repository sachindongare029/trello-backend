var passwordHash = require('password-hash');
var mongoModels = require('../mongoModels/index')();
var User = mongoModels.user();
module.exports = () => {
  var result = {};
  result.registration = (req, res) => {
    console.log("Inside registration");
    var name = req.body.user.name;
    var email = req.body.user.email;
    var password = req.body.user.password;
    if ((typeof name == undefined) || name == "") {
      res.json({
        success: false,
        message: "name not defined"
      })
    } else if ((typeof email == undefined) || email == "") {
      res.json({
        success: false,
        message: "email not defined"
      })
    } else if ((typeof password == undefined) || password == "") {
      res.json({
        success: false,
        message: "password not defined"
      })
    } else {
      User.findOne({
        email: email
      }).exec((err, userInfo) => {
        if (userInfo) {
          res.json({
            success: false,
            message: "Email already exists."
          })
        } else {
          var hashedPassword = passwordHash.generate(password);
          console.log(hashedPassword)
          console.log(password)
          var user = new User({
            name: name,
            email: email,
            password: hashedPassword
          });
          //save user information in dbs
          user.save((err, userResult) => {
            // console.log("userResult : " , userResult);
            if (userResult) {
              res.json({
                success: true,
                message: "User Registration Successfully.",
                data: userResult
              });
            } else {
              res.json({
                success: false,
                message: "Error in Saving User Registration"
              });
            }
          }) //save
        }
      }) //findone
    } //else
  } //registration
  result.login = (req, res) => {
    console.log("Inside login");
    //console.log("req.body : " ,req.body.user.email)
    var email = req.body.user.email;
    var password = req.body.user.password;
    //console.log(email , password)
    if (email == undefined || email == "") {
      res.json({
        success: false,
        message: "Enter Email.."
      })
    } else if (password == undefined || password == "") {
      res.json({
        message: "Enter Password.."
      })
    } else {
      User.findOne({
        email: email
      }).exec((err, userInfo) => {
        //if email is found in database
        if (userInfo) {
          var hashPass = (passwordHash.verify(password, userInfo.password));
          if (hashPass == true) {
            res.json({
              success: true,
              name: userInfo.name,
              email: userInfo.email
            });
          } else {
            res.json({
              success: false,
              message: 'Incorrect Password..'
            });
          }
        } else {
          res.json({
            success: false,
            message: 'Email Not Register Please SignUp..'
          });
        }
      }) //find One
    }
  }
  return result;
}