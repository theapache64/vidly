// @flow
export const GET_GENRES = 'GET_GENRES';
export const GET_GENRES_SUCCESS = 'GET_GENRES_SUCCESS';
export const GET_GENRES_FAIL = 'GET_GENRES_FAIL';


export const ADD_GENRES = 'ADD_GENRES';
export const ADD_GENRES_SUCCESS = 'ADD_GENRES_SUCCESS';
export const ADD_GENRES_FAIL = 'ADD_GENRES_FAIL';


export const EDIT_GENRES = 'EDIT_GENRES';
export const EDIT_GENRES_SUCCESS = 'EDIT_GENRES_SUCCESS';
export const EDIT_GENRES_FAIL = 'EDIT_GENRES_FAIL';


export const DELETE_GENRES = 'DELETE_GENRES';
export const DELETE_GENRES_SUCCESS = 'DELETE_GENRES_SUCCESS';
export const DELETE_GENRES_FAIL = 'DELETE_GENRES_FAIL';


const initialState = {
    genres: []
};

//Reducer
export default function reducer(state = initialState, action) {

    switch (action.type) {

        case GET_GENRES_SUCCESS:
            return {
                ...state,
                genres: action.payload.data.genres
            };

        case ADD_GENRES_SUCCESS:
            return {
                ...state,
                genres: [...state.genres, action.payload.data],
                errorMessage: null
            };

        case EDIT_GENRES_SUCCESS:

            const editedGenre = action.payload.data;

            //Edit data
            const itemIndex = state.genres.findIndex(item => item.id === editedGenre.id);
            const genresCopy = [...state.genres];
            genresCopy[itemIndex] = editedGenre;


            //Returning new state
            return {
                ...state,
                genres : genresCopy
            };

        case DELETE_GENRES_SUCCESS:
            return {
                ...state,
                //Deleting item using filter. SO MAGIC :D
                genres: state.genres.filter(genre => genre.id !== action.payload.data.id),
                errorMessage: null
            };

        case ADD_GENRES_FAIL:
        case EDIT_GENRES_FAIL:
        case DELETE_GENRES_FAIL:
            console.log(action);
            return {
                ...state,
                errorMessage: action.error.response.data.message
            };

        default:
            return state;
    }
}

//Action
export const loadGenres = () => {
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

export const addGenre = (name) => {
    return {
        type: ADD_GENRES,
        payload: {
            request: {
                method: 'POST',
                url: '/genres',
                data: {
                    name: name
                }
            }
        }
    }
};

export const editGenre = (id, name) => {
    return {
        type: EDIT_GENRES,
        payload: {
            request: {
                method: 'PUT',
                url: `/genres/${id}`,
                data: {
                    name: name
                }
            }
        }
    }
};

export const deleteGenre = (id) => {
    return {
        type: DELETE_GENRES,
        payload: {
            request: {
                method: 'DELETE',
                url: `/genres/${id}`
            }
        }
    }
};