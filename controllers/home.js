var bcrypt = require('bcrypt-nodejs');
var session = require('express-session');
var moment = require('moment');


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
    compareTime: function(req, res){
        var today = new Date();
        today = today.toISOstring();
        // returns 2016-08-19T16:55:45.635Z
        today = today.substr(0,10);
        //returns 2016-08-19

        sequelize.query('SELECT * FROM Userhabits WHERE id="IndividualUserID"', function(err, result){
            if (err) throw err;
            var timestamp = result.updatedAt;

            if(timestamp == null){
                res.send('This is the users first time');
            }

            timestamp = timestamp.toISOstring();
            // returns 2016-08-18T16:55:45.635Z
            timestamp = timestamp.substr(0,10);
            // returns 2016-08-18

            var time = moment.duration(1, 'd');
            var dayLater = timestamp.add(time).days();

            var check = moment(today).isSame(timestamp);
            if(check == true){
                res.send('deny');
            }
            else{
                var check2 = moment(today).isBetween(timestamp, dayLater);
                if(check2 == true){
                    res.send('user can press the button');
                }
                else{
                    sequelize.query('UPDATE Userhabits SET Streak="0" WHERE id="InidivdualUserID"', function(err, result){
                        if (err) throw err;
                        res.send('users streak has been reset');
                    })
                }
            }

        })
    },

    updateStreak : function(req, res){
        sequelize.query('SELECT * FROM Userhabits WHERE id="IndividualUserID"', function(err, result){
            if (err) throw err;
            var streak = result.streak;
            var streak = streak++;

            sequelize.query('UPDATE Userhabits SET Streak=""' + streak + 'WHERE id="IndividualUserID"', function(err, result){
                if (err) throw err;
            })
        })
    },

    resetStreak: function(req, res){
        sequelize.query('UPDATE Userhabits SET Streak="0" WHERE id="InidivdualUserID"', function(err, result){
            if (err) throw err;
                        
        })
    }

};
