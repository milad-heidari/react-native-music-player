import asyncStorageActions from './asyncStorageActions';

const initState = {

    // liked_tracks: {
    //     key: '',
    //     playlistName: '',
    //     value: []
    // },
    playlists: [],
    allPlaylistNames:[]
}

const asyncStorageReducer = (state = initState, action) => {
    let newState = state
    switch (action.type) {
        case asyncStorageActions.RESET_ALL_ASYNC_STORAGE_STATE:
            // console.log('reset')
            newState= {playlists:[],allPlaylistNames:[]}
            break;
        case asyncStorageActions.GET_ITEM_METOD_FROM_ASYNC_STORAGE_SUCCESS:
            // newState = {...state,playlists:[...state.playlists,action.payload]}
            // console.log('REDUCER',state.playlists)
            // const tt =state.playlists.map(playlist =>{
            //      for (const playlistName in playlist) {
            //         if (playlistName === 'reduxPlaylistName') {
            //             // newState = {...state,...playlist[playlistName]:[...playlist['value']]}
            //             // console.log('555',`${playlist[playlistName]}:${[...playlist['value']]}`)
            //             //  console.log('222',state.liked_tracks)
            //         }
            //     }
            // })
            break;
        case asyncStorageActions.ADD_ITEM_FROM_ASYNC_STORAGE_SUCCESS:
            // const playlist = [action.payload.playlistName,action.payload.values]
            console.log('kkkkkkkkkkkf',typeof action.payload)
            const addItemPlaylists = action.payload
           const addItemRenderedPlaylists = addItemPlaylists.map(playlist=>{
                return [
                    playlist[0].slice(19),
                    playlist[1]
                ]
            })
            const addItemAllPlaylistsNameForRedux=addItemPlaylists.map(list=> list[0].slice(19))
            newState = {
                ...state,
                allPlaylistNames:[...addItemAllPlaylistsNameForRedux],
                playlists:[...addItemRenderedPlaylists]
            }
            break;
        case asyncStorageActions.REMOVE_ITEM_FROM_ASYNC_STORAGE_SUCCESS:
            const removeItemPlaylists = action.payload
            const removeItemRenderedPlaylists = removeItemPlaylists.map(playlist=>{
                 return [
                     playlist[0].slice(19),
                     playlist[1]
                 ]
             })
             const removeItemAllPlaylistsNameForRedux=removeItemPlaylists.map(list=> list[0].slice(19))
             newState = {
                 ...state,
                 allPlaylistNames:[...removeItemAllPlaylistsNameForRedux],
                 playlists:[...removeItemRenderedPlaylists]
             }
            break;
        case asyncStorageActions.GET_ALL_PLAYLIST_FROM_ASYNC_STORAGE_SUCCESS:
            // console.log('aaaaaaaaaa',action.payload)
            // newState = {...state,}
            break;
        case asyncStorageActions.INIT_GET_PLAYLIST_SUCCESS:
           console.log("initGetPlaylistsREDUSER", action.payload)
           const playlists = action.payload
           const renderedPlaylists = playlists.map(playlist=>{
                return [
                    playlist[0].slice(19),
                    playlist[1]
                ]
            })
            const allPlaylistsNameForRedux=playlists.map(list=> list[0].slice(19))
            newState = {
                ...state,
                allPlaylistNames:[...allPlaylistsNameForRedux],
                playlists:[...renderedPlaylists]
            }
            break;
        case asyncStorageActions.CHECK_PLAYLIST_FOR_EXISTING_TRACKS_SUCCESS:
           const updatedPlaylists = action.payload
           const renderUpdatedPlaylists = updatedPlaylists.map(playlist=>{
               return [
                   playlist[0].slice(19),
                   playlist[1]
               ]
           })
            console.log('wwwwwwwwwww',  action.payload)
            newState = {...state,playlists:[...renderUpdatedPlaylists]}

            break;
        case asyncStorageActions.CREATE_NEW_PLAYLIST_WITH_ASYNC_STORAGE_SUCCESS:
            
            const createNewPlaylist = action.payload
            const reformatNewPlaylists = createNewPlaylist.map(playlist=>{
                return [
                    playlist[0].slice(19),
                    playlist[1]
                ]
            })

           const createNewPlaylistAllPlaylistsNameForRedux = createNewPlaylist.map(list=>list[0].slice(19))
            newState= {
                ...state,
                allPlaylistNames:createNewPlaylistAllPlaylistsNameForRedux,
                playlists:reformatNewPlaylists
            }
            break;
        default:
            break;
    }
    // console.log('allPlaylists',state)
    return newState
}


// success {
//      "key": "@storage_playlists_liked_tracks", 
//      "liked_tracks": {
//           "key": "", 
//           "playlistName": "", 
//           "value": [] }, 
//      "playlistName": "liked tracks",
//      "reduxPlaylistName": 
//      "liked_tracks", 
//      "value": ["Shabhaye Tehroon", "The magic of the orchid", "2 late evening", "The magic of the orchid"] }


export default asyncStorageReducer