import {createStore,applyMiddleware} from 'redux'
import combineReducers from './combineReducers'
import makeSagaMiddleware from 'redux-saga';
import sagaApi from './mainSaga';

const sagaMiddleware = makeSagaMiddleware()

const store = createStore(combineReducers,applyMiddleware(sagaMiddleware))

sagaMiddleware.run(sagaApi)

export default store