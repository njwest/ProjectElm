var Habits          = require('../models')['Habits'];
var Achievements    = require('../models')['Achievements'];
var Users           = require('../models')['User'];
var UserHabits      = require('../models')['Userhabits'];

module.exports = {
    //Landing Page _________________________________/
    renderLanding: function(req, res) {
            res.render('landing');
    },
    //Login _________________________________/
    renderLogin: function(req,res) {
        res.render('login');
    },
    postLogin: function(req, res){
        // connection.query('INSERT INTO plans (plan) VALUES (?)', [req.body.plan], function(err, result) {
        //   if (err) throw err;
        //   res.redirect('/');
        // });
    },

    //Profile _________________________________/
    renderProfile: function(req, res){
        res.render('profile');
    },
    submitButton: function(req, res){

    },
    //Registration _________________________________/
    renderRegistration: function(req, res){
        Habits.findAll({}).then(function(results){
            console.log(results[0].habit);
            return res.render('registration', {
                habits: results
            });
        });
    },
    postUser: function(req, res){
        'user strict';
        var user = req.body;

        User.create({
            email: user.email,
            name: user.name,
            //Julian work your magic here
            password: user.password,
            habit: user.habit,
        }).then(function(insertedUser){
            console.log(insertedUser.dataValues)
        });
    },


};

//Login _________________________________/


//Profile _________________________________/

//Registration

//Account routes
