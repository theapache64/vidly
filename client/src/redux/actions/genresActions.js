// @flow
export const GET_GENRES = 'GET_GENRES';
export const GET_GENRES_SUCCESS = 'GET_GENRES_SUCCESS';
export const GET_GENRES_FAIL = 'GET_GENRES_FAIL';

const initialState = {
    genres: []
};

//Reducer
export default function reducer(state = initialState, action) {

    switch (action.type) {

        case GET_GENRES_SUCCESS:
            console.log('GET_GENRES_SUCCESS is ', action);
            return {
                ...state,
                genres: action.payload.data.genres
            };

        default:
            return state;
    }
}

//Action
export const loadGenres = ()=>  {
    console.log('Loading genres');
    return {
        type: GET_GENRES,
        payload: {
            request: {
                url: '/genres'
            }
        }
    }
};