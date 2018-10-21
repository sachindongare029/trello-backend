//Require all routes
var express = require('express');
var router = express.Router();

var userController = require('./user')();

router.get('/',function(req, res){
	res.send("HOME..");
});

//user
router.post('/registration',userController.registration);
router.post('/login',userController.login);

//export router
module.exports = router;
