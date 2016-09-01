var bcrypt = require('bcrypt-nodejs');
var session = require('express-session');
// var moment = require('moment');



module.exports = {
    //Landing Page _________________________________/
    renderLanding: function(req, res) {
        db.Habits.findAll({}).then(function(results) {
            res.render('landing', {
                habits: results
            });
        });
    },
    isAuthenticated: function(req, res, next) {
        if (req.session.user)  <script type="text/javascript" src="/js/commentscript.js"></script>{
            return next();
        } else {
            res.redirect('/login');
        }

    },
    //Login _________________________________/
    renderLogin: function(req, res) {
        res.render('login');
    },
    //User name authentication
    postLogin: function(req, res, next) {
        var email = req.body.email;  
        var password = req.body.password;
        var dbUser = db.User.findOne({
            where: {
                username: req.body.username
            }
        }).then(function(dbUser) {
            if (!dbUser) {
                res.render('login', {
                    error: "User not found"
                });
            } else if (bcrypt.compareSync(req.body.password, dbUser.password)) {
                req.session.user = dbUser.dataValues;
                db.Habits.findOne({
                    where: {
                        id: dbUser.dataValues.HabitId
                    }
                }).then(function(result) {
                    req.session.user.habit = result.dataValues.habit;
                    delete req.session.user.password;
                    res.redirect('/users/' + dbUser.dataValues.username);
                });


            } else {
                res.render('landing', {
                    error: 'Invalid password'
                });
            }
        });
    },

    //Profile _________________________________/
    renderProfile: function(req, res) {
        if (req.params.username == req.session.user.username) {
            console.log('yo this shit is right here!!!!: ', req.session.user)
            res.render('dashboard', {
                user: req.session.user
            });
        } else {
            res.redirect('/login');
        }


    },


    submitButton: function(req, res) {

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
                HabitId: user.habit,
                include: [{
                    model: db.userhabits,

                }]
            }).then(function(dbuser) {
                req.session.user = dbuser.dataValues;
                return db.Userhabits.create({
                    UserId: dbuser.id,
                    HabitId: dbuser.HabitId
                })
            }).then(function(dbuser) {
                res.redirect('/users/' + req.session.user.username);
            })
            .catch(function(err) {
                res.render('landing',{
                    error: err.message
                });
            });


    },
    compareTime: function(req, res) {
        var today = new Date().toISOString().substr(0, 10);
        // //     // returns 2016-08-19T16:55:45.635Z
        // //     //returns 2016-08-19
        db.Userhabits.findOne({
            where: {
                UserId: req.session.user.id
            }
        }).then(function(user) {
            if (user) {
                var updatedStreak = user.streak + 1;
                return user.update({
                    streak: updatedStreak
                })
            }
        }).then(function(user) {
            res.json(user);
        })


    },
    compareTime: function(req, res) {
        db.Userhabits.findOne({
            where: {
                UserId: req.session.user.id
            }
        }).then(function(user) {
            if (user) {
                var timestamp = user.updatedAt;
                //timestamp = moment().format(timestamp);
                var today = moment().toDate();

                if (timestamp == null) {
                    res.json('This is the users first time');
                }

                var dayLater = moment(timestamp).add(1, 'd');
                var check = moment(today).isSame(timestamp, 'day');
                var check2 = moment(today).isSame(dayLater, 'day');

                if (check == true) {
                    res.json('deny');
                } else if (check2 == true) {
                    res.json('approve');
                } else {
                    res.json('update');
                }

            }
        })

    },

    resetStreak: function(req, res) {
        db.Userhabits.findOne({
            where: {
                UserId: req.session.user.id
            }
        }).then(function(user) {
            if (user) {

                user.update({
                    streak: 0
                }).then(function() {
                    res.json({
                        success: true
                    });
                })
            }
        })
    },

    progressBar: function(req, res) {
        db.Userhabits.findOne({
            where: {
                UserId: req.session.user.id
            }
        }).then(function(user) {
            if (user) {
                res.json(user.streak);
            }
        })
    },

    logout: function(req, res) {
        delete req.session.user
        res.redirect('/');
    },

    dashboard: function(req, res) {
        res.render('dashboard');
    }
};
