var bcrypt = require('bcrypt-nodejs');
var session = require('express-session');

module.exports = {
    //Landing Page _________________________________/
    renderLanding: function(req, res) {
        // if(req.session){
        //     res.redirect('/users/' + req.session.username);
        // } else {
        res.render('landing');
        // }

    },
    //Login _________________________________/
    renderLogin: function(req, res) {
        res.render('login');
    },
    postLogin: function(req, res, next) {
        var email = req.body.email;  
        var password = req.body.password;
        var dbUser = db.User.findOne({
            where: {
                username: req.body.username
            }
        }).then(function(dbUser) {
            if (!dbUser) {
                req.session.reset();
                res.json({
                    message: "User not found"
                });
            } else if (bcrypt.compareSync(req.body.password, dbUser.password)) {
                req.user = dbUser
                delete req.user.password
                req.session.user = dbUser;
                res.locals.user = dbUser
                res.redirect('/users/' + dbUser.username);
            } else {
                //if the password is invalid, we'll let the user know
                res.json({
                    message: "Invalid Password"
                });
            }
        });
    },

    //Profile _________________________________/
    renderProfile: function(req, res) {
        console.log(req.user);
        res.render('profile');

    },

    
    submitButton: function(req, res) {

    },
    //Registration _________________________________/
    renderRegistration: function(req, res) {
        res.render('registration');
    },
    postUser: function(req, res) {
        'user strict';
        var salt = bcrypt.genSaltSync(10);
        var user = req.body;
        var hash = bcrypt.hashSync(user.password, salt);

        db.User.create({
                email: user.email,
                username: user.username,
                password: hash,
                habit: user.habit,
            })
            .catch(function(err) {
                res.json({
                    message: err.message
                });
            });
        res.render('profile');

    },


};

//Login _________________________________/


//Profile _________________________________/

//Registration

//Account routes
