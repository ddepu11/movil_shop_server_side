import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from '../reducers';

const createAStore = () =>
  createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default createAStore;
