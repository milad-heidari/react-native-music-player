import AsyncStorageService from './AsyncStorageService';

const asyncStorageService = new AsyncStorageService()
export default removeTrackFromCustomPlaylistService =async (key,removedTrackName)=>{
    const createKey = `@storage_playlists_${key}`
    const getCurrentPlaylist = await asyncStorageService.getItem(createKey)
    const newP =await getCurrentPlaylist.filter(trackName=>{
        if (!(trackName === removedTrackName)) {
            return trackName
        }else {
            // console.log("getCurrentPlaylist", trackName)

        }
    })
    await asyncStorageService.setItem(key,newP)
     
    // console.log("getNewPlaylist",getNewPlaylist)
    const getAllKeys = await asyncStorageService.getAllKeys()
    const newPlaylists = await asyncStorageService.multiGet(getAllKeys)
    return newPlaylists
}