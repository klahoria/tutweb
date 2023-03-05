const app = require('express').Router();
const auth = require('../controller/controllers')

app.route('/').get((req, res, next) => {
    res.send('hello')
});


app.route('/register').post(auth.register);
app.route('/login').post(auth.login);
app.route('/createHash').post(auth.createHash);
app.route('/compareHash').post(auth.compareHash);


module.exports = app;