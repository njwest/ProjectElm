//Login _________________________________/
app.get('/login', function(req, res) {
    res.render('login');
});

app.post('/login', function(req, res) {
    connection.query('INSERT INTO plans (plan) VALUES (?)', [req.body.plan], function(err, result) {
      if (err) throw err;
      res.redirect('/');
    });
});
