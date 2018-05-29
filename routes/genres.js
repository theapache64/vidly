// @flow
const express = require('express');
const Joi = require('joi');
const Realm = require('realm');
const GenreSchema = require('../realm/schemas/Genre')
const app = express.Router(null);

const genreRealm = new Realm({
    path: "vidly.realm",
    schema: [GenreSchema],
    schemaVersion: 2
});


app.get('/', (req, resp) => {
    const data = {genres: Array.from(genreRealm.objects("Genre"))};
    resp.send(data);
});


//POST
app.post('/', (req, resp) => {

    const {error} = validateGenre(req.body);

    if (error) {
        return resp.status(400).send(toError(error.details[0].message));
    }

    const lastGenre = genreRealm.objects('Genre').sorted('id', true)[0];
    const newId = lastGenre ? parseInt(lastGenre.id) + 1 : 1;
    const newGenre = {
        id: newId,
        name: req.body.name
    };

    genreRealm.write(() => {
        genreRealm.create('Genre', newGenre);
    });
    resp.send(newGenre);
});

const toError = (message) => {
    return {
        message: message
    }
};

//UPDATE
app.put('/:id', (req, resp) => {

    //Checking if the genre exist
    //const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    const genre = genreRealm
        .objectForPrimaryKey('Genre', parseInt(req.params.id));

    if (!genre) {
        return resp.status(404).send(toError(`Invalid genre ID ${req.params.id}`));
    }

    const {error} = validateGenre(req.body);
    if (error) {
        return resp.status(400).send(toError(error.details[0].message));
    }

    //Updates
    genreRealm.write(() => {
        genre.name = req.body.name;
    });

    resp.send(genre);
});

//DELETE
app.delete('/:id', (req, resp) => {

    //Checking if the genre exist
    const genre = genreRealm.objectForPrimaryKey('Genre', parseInt(req.params.id));

    if (!genre) {
        return resp.status(404).send(oError(`Invalid genre ID ${req.params.id}`));
    }

    //Copy object
    const genreJsonString = JSON.stringify(genre);

    genreRealm.write(() => {
        genreRealm.delete(genre);
    });

    resp.send(JSON.parse(genreJsonString));
});


//Base method to validate genre
function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(genre, schema);
}

module.exports = app;