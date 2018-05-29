// @flow
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers';
import axios from 'axios';
import thunk from 'redux-thunk';
import axiosMiddleware from 'redux-axios-middleware';

const axiosClient = axios.create({
    baseURL : 'http://localhost:3000/api',
    responseType: 'json'
});

const store = createStore(rootReducer,{},compose(applyMiddleware(thunk,axiosMiddleware(axiosClient)),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
export default store;