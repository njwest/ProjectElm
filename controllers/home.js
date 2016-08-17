var bcrypt = require('bcrypt-nodejs');
module.exports = {
    //Landing Page _________________________________/
    renderLanding: function(req, res) {
        res.render('landing');
    },
    //Login _________________________________/
    renderLogin: function(req, res) {
        res.render('login');
    },
    postLogin: function(req, res) {
        // connection.query('INSERT INTO plans (plan) VALUES (?)', [req.body.plan], function(err, result) {
        //   if (err) throw err;
        //   res.redirect('/');
        // });
        var email = req.body.email;  
        var password = req.body.password;
        // db.Users.findAll({})
          
        // connection.query('USE DatabaseName', function(err, result) {    
        //     if (err) throw err;  
        // })  
        // connection.query('SELECT * FROM Users', function(err, result) {    
        //     if (err) throw err;
        //
        //         
        //     for (i = 0; i < result.length; i++) {      
        //         if (email == result[i].email) {        
        //             var sqlEmail = result[i].email;        
        //             return sqlEmail;      
        //         }
        //
        //             
        //     }.then(sqlEmail) {      
        //         connection.query('SELECT * FROM User WHERE Email=' + sqlEmail, function(err, result) {        
        //             if (err) throw err;                
        //             if (password == result.password) {           //login is succesful
        //                         }      
        //         })    
        //     }  
        // })
    },

//Profile _________________________________/
renderProfile: function(req, res) {
        res.render('profile');
    },
    submitButton: function(req, res) {

    },
    //Registration _________________________________/
    renderRegistration: function(req, res) {
        db.Habits.findAll({}).then(function(results) {
            return res.render('registration', {
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
        })
        .catch(function(err){
            res.json({message: err.message});
        });
        res.render('profile');

    },


};

//Login _________________________________/


//Profile _________________________________/

//Registration

//Account routes
