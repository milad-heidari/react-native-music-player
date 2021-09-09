import {combineReducers} from 'redux'

import playerRedux from './playerRedux/playerReducer'
import tracksRedux from './TracksRedux/tracksReducer'
import asyncStorageRedux from './AsyncStorage/asyncStorageReducer';
export default combineReducers({
    playerRedux,
    tracksRedux,
    asyncStorageRedux
});