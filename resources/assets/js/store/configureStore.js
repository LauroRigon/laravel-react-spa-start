import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import multi from 'redux-multi';
import delayMiddleware from '../middlewares/delay'

export default function configureStore(initialState = {}) {
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

  const store = createStore(
    rootReducer,
    devTools,
    applyMiddleware(thunk, delayMiddleware, multi)
  );

  return store;
}