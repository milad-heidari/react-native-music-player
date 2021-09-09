import AsyncStorageService from './AsyncStorageService';

const asyncStorageService = new AsyncStorageService()

export const addTrackToCurrentCustomPlaylistService = async (key, newTrackName) => {
    const createKey = `@storage_playlists_${key}`
    const getCurrentPlaylist = await asyncStorageService.getItem(createKey)
    const getAllKeys = await asyncStorageService.getAllKeys()
    if(getCurrentPlaylist.includes(newTrackName)){
        const alreadyPlaylists = await asyncStorageService.multiGet(getAllKeys)
        return alreadyPlaylists
    } else {

        getCurrentPlaylist.push(newTrackName)
        await asyncStorageService.setItem(key,getCurrentPlaylist)
        const newPlaylists = await asyncStorageService.multiGet(getAllKeys)
        return newPlaylists
    }
}