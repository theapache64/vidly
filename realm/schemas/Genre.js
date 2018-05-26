// @flow
const GenreSchema = {
    name: 'Genre',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        created_at: {type: 'date', default: Date()}
    }
};

module.exports = GenreSchema;