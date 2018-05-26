const express = require('express');
const Joi = require('joi');
const Realm = require('realm');
const app = express();

const GenreSchema = {
    name: 'Genre',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        created_at: {type: 'date', default: Date()}
    }
};

const genreRealm = new Realm({
    path: "vidly.realm",
    schema: [GenreSchema],
    schemaVersion: 2
});

//Enable JSON body parsing
app.use(express.json());

app.get('/', (req, resp) => {
    resp.send('Welcome to Vidly API');
});


//GET
app.get('/api/genres', (req, resp) => {
    const data = {genres: Array.from(genreRealm.objects("Genre"))};
    resp.send(data);
});


//POST
app.post('/api/genres', (req, resp) => {

    const {error} = validateGenre(req.body);
    if (error) {
        return resp.status(400).send(error.details[0].message);
    }

    const genres = genreRealm.objects('Genre').sorted('id', true);
    const newId = parseInt(genres[0].id) + 1;
    const newGenre = {
        id: newId,
        name: req.body.name
    };

    genreRealm.write(() => {
        genreRealm.create('Genre', newGenre);
    });
    resp.send(newGenre);
});


//UPDATE
app.put('/api/genres/:id', (req, resp) => {

    //Checking if the genre exist
    //const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    const genre = genreRealm
        .objectForPrimaryKey('Genre', parseInt(req.params.id));

    if (!genre) {
        return resp.status(404).send(`Invalid genre ID ${req.params.id}`);
    }

    const {error} = validateGenre(req.body);
    if (error) {
        return resp.status(400).send(error.details[0].message);
    }

    //Updates
    genreRealm.write(() => {
        genre.name = req.body.name;
    });

    resp.send(genre);
});

//DELETE
app.delete('/api/genres/:id', (req, resp) => {

    //Checking if the genre exist
    const genre = genreRealm.objectForPrimaryKey('Genre', parseInt(req.params.id));

    if (!genre) {
        return resp.status(404).send(`Invalid genre ID ${req.params.id}`);
    }

    //Copy object
    const genreJsonString = JSON.stringify(genre);

    genreRealm.write(()=>{
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

const port = process.env.PORT || 7777;

app.listen(7777, () => {
    console.log(`Listening to ${port}`);
});