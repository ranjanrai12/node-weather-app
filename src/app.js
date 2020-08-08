const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port  =  process.env.PORT || 3000;

const hbs = require('hbs');

const app = express();

// paths for config file
const publicPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// setup handlebar location and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

//setup static directory to serve 
app.use(express.static(publicPath));

app.get('', (req, res) => {
    // the file which have to render
    res.render('index', {
        title: 'weather app',
        name: 'Ranjan'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Ranjan',
        title: 'About me'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            errorMessage: 'You must provide the address term!'
        })
    }
    geocode(req.query.address, (err,  {latitude, longitude, location} = {}) => {
        if (err) {
            // return console.log(err);
            return res.send({errorMessage: err});
            
        }
        // callback chaining
        forecast(latitude, longitude, (err, forecastResponse) => {
            if (err) {
                // return console.log(err);
                return res.send({errorMessage: err})
            }
            
            const weather = {
                forecast: forecastResponse,
                location,
                address: req.query.address
            }
            res.send(weather);            
        })
        
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            errorMessage: 'You must provide the search term'
        })
    }
    res.send({
        products: []
    })

});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'ranjan',
        errorMessage: 'Help title not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'ranjan',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log("server is up and running on port"+ port);
})