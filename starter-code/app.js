const express = require('express');
const hbs = require('hbs');
var path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'))
// add the routes here:
app.get('/', (req, res) => res.render("index"));

app.get('/beers', (req, res) => {
    const allBeers = punkAPI.getBeers();
    allBeers.then(allBeers => {
        res.render("beers", {
            allBeers
        });
    })
})

app.get('/random-beers', (req, res) => {
    const randomBeer = punkAPI.getRandom()
    randomBeer.then(randomBeer => {
        res.render("random-beers", {
            randomBeer
        })
    })
});



app.get('/beers/:id', (req, res) => {
    const beerID = req.params.id;
    const beerInfo = punkAPI.getBeer(beerID)
    beerInfo.then(beerInfo => {
        res.render('beer-Info', {
            beerInfo
        })
    })
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));