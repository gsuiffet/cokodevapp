var React = require('react');
var ReactDOM = require('react-dom');

var createStore =  require('redux').createStore;
var Provider    =  require('react-redux').Provider;

var App    =  require('./components/app');

var globalReducers =  require('./combineReducer/combineReducer');

const store = createStore(globalReducers);
//const store = createStore();


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('container')
);
