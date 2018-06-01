const express = require('express');
const app = express();

const genres = require('./routes/genres');

//Enable JSON body parsing
app.use(express.json());
app.use('/api/genres', genres);

app.get('/', (req, resp) => {
    resp.send('Welcome to Vidly API');
});

const port = process.env.PORT || 7777;

app.listen(port, () => {
    console.log(`Listening to ${port}`);
});