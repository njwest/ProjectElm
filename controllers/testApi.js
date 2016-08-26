module.exports = {
    testApi: function(req, res) {
        res.status(200).json({
            msg: "Test Api Works"
        });
    },
    apiUsername: function(req, res){
        var name = req.session.user.username;
        db.User.findOne({
            where:
                {username: name}
            }).then(function(user){
            res.json(req.session.user)
        })
    }
};
