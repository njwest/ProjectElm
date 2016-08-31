var cheerio = require('cheerio');
var request = require('request');

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
    },
    renderTips: function(req, res){
        var habit = req.session.user.habit;
        var results = [];
        request('https://www.google.com/search?q=quit+'+habit+'&num=10', function(error, respsonse, html){
            var $ = cheerio.load(html);
            $('h3').each(function(i, element){
                var title = $(this).text()
                var link = element.children[0].attribs.href.replace('/url?q=', '');
                results.push({title: title, link: link})
                console.log(element.children[0].attribs.href);
            });
            res.json(results);
        });

    }
};
