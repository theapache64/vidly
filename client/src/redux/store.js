// @flow
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import axios from 'axios';
import thunk from 'redux-thunk';
import axiosMiddleware from 'redux-axios-middleware';

const axiosClient = axios.create({
    baseURL : 'http://localhost:3000/api',
    responseType: 'json'
});

const store = createStore(rootReducer,{},applyMiddleware(thunk,axiosMiddleware(axiosClient)));
export default store;