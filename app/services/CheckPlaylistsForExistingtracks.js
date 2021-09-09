/**
 * this function check playlists for exist or not exist tracks in the file System.
 */
import AsyncStorageService from '../services/AsyncStorageService';

const asyncStorageService = new AsyncStorageService()
export const checkPlaylistForExistingTracks = async(tracks,playlists)=>{

    const validTracksNames =await tracks.map(track=>track.title)
    const playlistValues = await playlists.map(pl=>{
        if (pl[1].length > 0) {
          return pl[1]
        }else{
            return []
        }
    })
    const playlistName = await playlists.map(pl=>pl[0])

    const newPlaylists = await playlistValues.forEach((plValue,index,array) => {
        const newValues = []
        console.log("plValue",typeof plValue,plValue)
        if(plValue.length > 0){

            plValue.filter(trackName=>{
                if(validTracksNames.includes(trackName)){
                    newValues.push(trackName)
                }
            })
        }
        console.log('ghghghghgh',[`@storage_playlists_${playlistName[index]}`,newValues])
        asyncStorageService.setItem(playlistName[index],newValues)
    });
    const allKeys =await asyncStorageService.getAllKeys()
    const updatedPlaylists = await asyncStorageService.multiGet(allKeys)
    return updatedPlaylists


}