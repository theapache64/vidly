const express = require('express');
const Joi = require('joi');
const app = express();

//Enable JSON body parsing
app.use(express.json());

const genres = [
    {id: 1, name: "Action"},
    {id: 2, name: "Horror"},
    {id: 3, name: "Adventure"},
    {id: 4, name: "Drama"},
];

app.get('/', (req, resp) => {
    resp.send('Welcome to Vidly API');
});

//GET
app.get('/api/genres', (req, resp) => {
    resp.send(genres)
});


//POST
app.post('/api/genres', (req, resp) => {

    const {error} = validateGenre(req.body);
    if (error) {
        return resp.status(400).send(error.details[0].message);
    }

    const newGenre = {
        id : genres.length + 1,
        name : req.body.name
    };

    genres.push(newGenre);
    resp.send(newGenre);
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

//UPDATE

//DELETE

const port = process.env.PORT || 7777;

app.listen(7777, () => {
    console.log(`Listening to ${port}`);
});