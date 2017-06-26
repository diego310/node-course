const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT | 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', hbs);

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log(err);
        }
    });
    next();
});

/*
app.use((req,res,next) => {
    res.render('down.hbs');
});
*/

app.use(express.static(__dirname  + '/public'));

hbs.registerHelper('screamIt', (text) => text.toUpperCase())

app.get('/', (req, res) => {
    res.render('home.hbs',{
        title: 'Home page',
        msg: 'Welcome to some site'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        title: 'About page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'an error'
    });
});

app.listen(port, () => {
    console.log('server us up at port: ' + port);
});