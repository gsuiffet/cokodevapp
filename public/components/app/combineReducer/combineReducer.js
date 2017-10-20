var combineReducers = require('redux').combineReducers;
var formReducer = require('redux-form').reducer;

//var count   = require('../composantReducer/reducer/count.reducer');
//var message   = require('../composantReducer/reducer/message.reducer');

//var globalReducers = combineReducers({count, message});
var globalReducers = combineReducers({form: formReducer});

module.exports = globalReducers;