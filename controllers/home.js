
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
        db.Habits.findAll({}).then(function(results){
            console.log(results[0].habit);
            return res.render('registration', {
                habits: results
            });
        });
    },
    postUser: function(req, res){
        'user strict';
        var user = req.body;

        db.User.create({
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
