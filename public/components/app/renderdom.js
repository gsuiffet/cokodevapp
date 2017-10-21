var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router-dom').BrowserRouter
var Route = require('react-router-dom').Route
var Link = require('react-router-dom').Link

//Initialisation de Redux pour le Store
var createStore =  require('redux').createStore;
var Provider    =  require('react-redux').Provider;

var App    =  require('./components/app');
var Signup= require('./components/signup');
var Login= require('./components/login');
var Folder= require('./components/folder');
//Reducer global
var globalReducers =  require('./combineReducer/combineReducer');

//Création du Store
const store = createStore(globalReducers);
//const store = createStore();

//Rendre le store accessible à tous les éléments
ReactDOM.render(
    <Provider store={store}>
    <Router>
        <div>
            <Route exact path="/" component={App}/>
             <Route  path="/signup" component={Signup}/>
               <Route path="/login" component={Login}/>
               <Route path="/folder" component={Folder}/>

        </div>
     </Router>
      </Provider>,
    document.getElementById('container')
);
