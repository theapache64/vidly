// @flow
import {combineReducers} from 'redux';
import genresReducer from '../actions/genresActions';

const rootReducer = combineReducers({
    genres: genresReducer
});

export default rootReducer;