var bcrypt = require('bcrypt-nodejs');
var session = require('express-session');


module.exports = {
    //Landing Page _________________________________/
    renderLanding: function(req, res) {
        res.render('landing');
    },
    isAuthenticated: function(req, res, next) {
        if (req.session.user) {
            console.log('here')
            return next();
        } else {
            res.redirect('/login');
        }

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
                res.json({
                    message: "User not found"
                });
            } else if (bcrypt.compareSync(req.body.password, dbUser.password)) {
                req.session.user = dbUser.dataValues;
                // delete req.session.user.password;
                res.redirect('/users/' + dbUser.username);

            } else {
                res.json({
                    message: "Invalid Password"
                });
            }
        });
    },

    //Profile _________________________________/
    renderProfile: function(req, res) {
        res.render('profile', {
            user: req.session.user
        });

    },


    submitButton: function(req, res) {
        //current time

        // db.userhabits.put({
        //     streak: time,
        //     userId: req.session.user.id,
        //     habitId: req.session.user.habitId,
        // });


    },
    //Registration _________________________________/
    renderRegistration: function(req, res) {
        db.Habits.findAll({}).then(function(results) {
            res.render('registration', {
                habits: results
            });
        });
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
            }).then(
                db.userhabits.create({

                })
            )
            .catch(function(err) {
                res.json({
                    message: err.message
                });
            });
        res.render('profile');

    },

};
