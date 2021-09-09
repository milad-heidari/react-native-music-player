import { takeLatest, put, call } from 'redux-saga/effects';
import asyncStorageActions from './asyncStorageActions';
import AsyncStorageService from '../../services/AsyncStorageService';
import {initGetPlaylistsService} from '../../services/InitGetPlaylistsService';
import {addTrackToCurrentCustomPlaylistService} from '../../services/AddTrackToCurrentCustomPlaylistService';
import removeTrackFromCustomPlaylistService from '../../services/RemoveTrackFromCustomPlaylistService';
import {checkPlaylistForExistingTracks} from '../../services/CheckPlaylistsForExistingtracks';
import createNewPlaylistService from '../../services/CreateNewPlaylistService';
const asyncStorageService = new AsyncStorageService()

const getItemWorker = function* (action) {
    // try {
    //     const result = yield call(()=>{
    //         const getPlaylist = asyncStorageService.getItem(action.payload.key)
    //         return getPlaylist
    //     })

    //     const parsedValue = JSON.parse(result)
    //     yield put({
    //         type:asyncStorageActions.GET_ITEM_METOD_FROM_ASYNC_STORAGE_SUCCESS,
    //         payload:{
    //             key: action.payload.key,
    //             reduxPlaylistName:action.payload.key.slice(19),
    //             playlistName: action.payload.key.slice(19).replace('_', ' '),
    //             value: parsedValue
    //         }
    //     })
        // console.log('PARSED',parsedValue)
        

    // } catch (error) {
    //     console.log('AsyncStorageSaga/getItemWorker', error)
        
    // }
}


export const getItemWatcher = function* () {
    yield takeLatest(asyncStorageActions.GET_ITEM_METOD_FROM_ASYNC_STORAGE, getItemWorker)
}



const setItemWorker = function* (action) {
    try {
        const result = yield call(async()=>{
          return await createNewPlaylistService(action.payload[0],action.payload[1])
        })

        console.log('setItemWorker',result)
        yield put ({
            type:asyncStorageActions.CREATE_NEW_PLAYLIST_WITH_ASYNC_STORAGE_SUCCESS,
            payload:result
        })
    } catch (e) {
        console.log('SAGA => setItemWorker', e)
    }
}

export const setItemWatcher = function* () {
    yield takeLatest(asyncStorageActions.CREATE_NEW_PLAYLIST_WITH_ASYNC_STORAGE, setItemWorker)
}


const addTrackToCurrentCustomPlaylistWorker = function* (action) {

    
    try {
        const result = yield call(async() => {
            return await addTrackToCurrentCustomPlaylistService(action.payload.key,action.payload.newTrackName)
        })
        
        console.log('AddTrackToCurrentCustomPlaylistService',result)

        yield put({
            type:asyncStorageActions.ADD_ITEM_FROM_ASYNC_STORAGE_SUCCESS,
            payload:result
        })


    } catch (e) {
        console.log('SAGA => addTrackToCustomPlaylistWorker', e)
    }
}

export const addTrackToCurrentCustomPlaylistWatcher = function* () {
    yield takeLatest(asyncStorageActions.ADD_ITEM_FROM_ASYNC_STORAGE, addTrackToCurrentCustomPlaylistWorker)
}

const removeTrackFromCustomPlaylistWorker = function* (action) {

    
    try {
        const result = yield call(async()=>{
            return await removeTrackFromCustomPlaylistService(action.payload.key,action.payload.removedTrackName)

        })

        yield put({
            type:asyncStorageActions.REMOVE_ITEM_FROM_ASYNC_STORAGE_SUCCESS,
            payload:result
        })

        // console.log('removeTrackFromCustomPlaylistWorker',result)
    } catch (error) {
        console.log('SAGA => removeTrackToCustomPlaylistWorker', e)
        
    }
}
export const removeTrackFromCustomPlaylistWatcher = function* () {
    yield takeLatest(asyncStorageActions.REMOVE_ITEM_FROM_ASYNC_STORAGE, removeTrackFromCustomPlaylistWorker)
}


const getAllPlaylistsNameAndContentWorker= function* (action) {

    

    try {
        const result = yield call(async()=>{
            const allPlaylistsNameAndValues = []
            const keys = action.payload
            await keys.forEach((playListKey)=>{
                 asyncStorageService.getItem(playListKey)
                .then(content=>{
                    const parsedValue = JSON.parse(content)
                    allPlaylistsNameAndValues.push({
                        key: playListKey,
                        playlistName: playListKey.slice(19).replace('_', ' '),
                        value: parsedValue
                    })
                })
            })
            return await allPlaylistsNameAndValues
        })
        const tt = result
        yield console.log('grgrg',tt)

            //  yield put({
            //      type: asyncStorageActions.GET_ALL_PLAYLIST_FROM_ASYNC_STORAGE_SUCCESS,
            //      payload: allPlaylistsNameAndValues
            //  })


    } catch (error) {
        console.log('saga/asyncStorageSaga/getAllPlaylistsNameAndContentWorker',error)
    }
}

export const getAllPlaylistsNameAndContentWatcher = function* (){
    yield takeLatest(asyncStorageActions.GET_ALL_PLAYLIST_FROM_ASYNC_STORAGE,getAllPlaylistsNameAndContentWorker)
}

const initGetPlaylistsWorker = function* (action){
    try {
        const result = yield call(()=>{
            return initGetPlaylistsService()
        })
        console.log('sagagag',result)
        yield put({
            type:asyncStorageActions.RESET_ALL_ASYNC_STORAGE_STATE,
            payload:{}
        })
        
        yield put({
            type:asyncStorageActions.INIT_GET_PLAYLIST_SUCCESS,
            payload:result
        })
    } catch (error) {
        console.log('saga/initGetPlaylistsWorker/ERROR',error)
    }
}

export const initGetPlaylistsWatcher = function* (){
    yield takeLatest(asyncStorageActions.INIT_GET_PLAYLIST,initGetPlaylistsWorker)
}

const checkPlaylistForExistingTracksWorker = function*(action){
    try {
        const result = yield call(async()=>{
            // console.log('sagaaaa',action.payload)
            return await checkPlaylistForExistingTracks(action.payload.tracks,action.payload.playlists)
        })

        console.log('checkPlaylistForExistingTracks',result)
        yield put({
            type:asyncStorageActions.CHECK_PLAYLIST_FOR_EXISTING_TRACKS_SUCCESS,
            payload:result
        })
    } catch (error) {
        console.log('saga/AsyncStorageSaga/checkPlaylistForExistingTracksWorker',error)
    }
}

export const checkPlaylistForExistingTracksWatcher = function*(){
    yield takeLatest(asyncStorageActions.CHECK_PLAYLIST_FOR_EXISTING_TRACKS,checkPlaylistForExistingTracksWorker)
}