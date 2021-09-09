import AsyncStorageService from './AsyncStorageService';

const asyncStorageService = new AsyncStorageService()
export default createNewPlaylistService = async(playlistName,playlistValue)=>{
    
    const re = (name)=>{
        if (playlistName.includes(" ")) {
            return playlistName.replace(" ","_")
        }else{
            return name
        }
    }
    const replacePlaylistName = await re(playlistName)
    await asyncStorageService.setItem(replacePlaylistName,playlistValue)
    const allKeys = await asyncStorageService.getAllKeys()
    return await asyncStorageService.multiGet(allKeys)

}