import {createStore, applyMiddleware, compose} from 'redux';
import {thunk} from 'redux-thunk';
import RootReducer from '../services/reducers/RootRedocer/RootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const Store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunk)));

export default Store;