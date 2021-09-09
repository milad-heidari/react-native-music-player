import {all} from 'redux-saga/effects';
import {
            getItemWatcher,
            setItemWatcher,
            addTrackToCurrentCustomPlaylistWatcher,
            removeTrackFromCustomPlaylistWatcher,
            getAllPlaylistsNameAndContentWatcher,
            initGetPlaylistsWatcher,
            checkPlaylistForExistingTracksWatcher
       } 
from './AsyncStorage/AsyncStorageSaga';
export default function* root(){

    yield all([
        getItemWatcher(),
        setItemWatcher(),
        addTrackToCurrentCustomPlaylistWatcher(),
        removeTrackFromCustomPlaylistWatcher(),
        getAllPlaylistsNameAndContentWatcher(),
        initGetPlaylistsWatcher(),
        checkPlaylistForExistingTracksWatcher()
    ])

}