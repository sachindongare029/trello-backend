//Require all modules
var mongoose = require('mongoose'),
    _ = require('lodash'),
    user = require('./user'),
    tasks = require('./tasks'),
    lists = require('./lists'),
    boards = require('./boards');


var connections = {};

module.exports =  () => {

    var mongoModels = {};

    mongoModels.user =  () => {
        return mongoose.model('user', user);
    };

     mongoModels.tasks =  () => {
        return mongoose.model('tasks', tasks);
    };

     mongoModels.lists =  () => {
        return mongoose.model('lists', lists);
    };

    mongoModels.boards =  () => {
        return mongoose.model('boards', boards);
    };

  return mongoModels;
};