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

    console.log(action);

    switch (action.type) {

        case GET_GENRES_SUCCESS:
            console.log('GET_GENRES_SUCCESS is ', action);
            return {
                ...state,
                genres: action.payload.data.genres
            };

        case ADD_GENRES_SUCCESS:
            return {
                ...state,
                newGenre : action.payload.data
            };

        case EDIT_GENRES_SUCCESS:
            return {
                editedGenre : action.payload.data
            };

        case DELETE_GENRES_SUCCESS:
            return {
                ...state,
                deletedGenre : action.payload.data
            };

        default:
            return state;
    }
}

//Action
export const loadGenres = () =>  {
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
        type : ADD_GENRES,
        payload:{
            request: {
                method : 'POST',
                url : '/genres',
                data : {
                    name : name
                }
            }
        }
    }
};

export const editGenre = (id, name) => {
    return {
        type : ADD_GENRES,
        payload:{
            request: {
                method : 'PUT',
                url : `/genres/${id}`,
                data : {
                    name : name
                }
            }
        }
    }
};

export const deleteGenre = (id) => {
    return {
        type : ADD_GENRES,
        payload:{
            request: {
                method : 'DELETE',
                url : `/genres/${id}`
            }
        }
    }
};