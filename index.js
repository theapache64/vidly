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
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(newGenre);
    resp.send(newGenre);
});


//UPDATE
app.put('/api/genres/:id', (req, resp) => {

    //Checking if the genre exist
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));

    if (!genre) {
        return resp.status(404).send(`Invalid genre ID ${req.params.id}`);
    }

    const {error} = validateGenre(req.body);
    if (error) {
        return resp.status(400).send(error.details[0].message);
    }

    //Updates
    genre.name = req.body.name;
    resp.send(genre);
});

//DELETE

//Base method to validate genre
function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

const port = process.env.PORT || 7777;

app.listen(7777, () => {
    console.log(`Listening to ${port}`);
});