import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
// thunk and redux dev tools

const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
const enhancers = [
    applyMiddleware(thunk)
];

if (isChrome) enhancers.push(composeWithDevTools());

const store = createStore(
    rootReducer,
    compose(...enhancers)
);

export default store;
