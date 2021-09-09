export default {
    RESET_ALL_ASYNC_STORAGE_STATE:'RESET_ALL_ASYNC_STORAGE_STATE',

    INIT_GET_PLAYLIST:'INIT_GET_PLAYLIST',
    INIT_GET_PLAYLIST_SUCCESS:'INIT_GET_PLAYLIST_SUCCESS',
    INIT_GET_PLAYLIST_FAILED:'INIT_GET_PLAYLIST_FAILED',


    /**
     * this action for add NEW playlist to asyncStorage:
     * for this action requird 2 parametr:
     * 1 = type:'SET_ITEM_METOD_FROM_ASYNC_STORAGE'
     * 2 = payload:{
     *      key: '@storage_playlists_NEWPLAYLISTNAME'
     *      tracks: empty array for init value
     * }
     */
    CREATE_NEW_PLAYLIST_WITH_ASYNC_STORAGE:'CREATE_NEW_PLAYLIST_WITH_ASYNC_STORAGE',
    CREATE_NEW_PLAYLIST_WITH_ASYNC_STORAGE_SUCCESS:'CREATE_NEW_PLAYLIST_WITH_ASYNC_STORAGE_SUCCESS',
    CREATE_NEW_PLAYLIST_WITH_ASYNC_STORAGE_FAILED:'CREATE_NEW_PLAYLIST_WITH_ASYNC_STORAGE_FAILED',

    GET_ITEM_METOD_FROM_ASYNC_STORAGE:'GET_ITEM_METOD_FROM_ASYNC_STORAGE',
    GET_ITEM_METOD_FROM_ASYNC_STORAGE_SUCCESS:'GET_ITEM_METOD_FROM_ASYNC_STORAGE_SUCCESS',
    GET_ITEM_METOD_FROM_ASYNC_STORAGE_FAILED:'GET_ITEM_METOD_FROM_ASYNC_STORAGE_FAILED',

    /**
     * this action get all names and content playlists. 
     */
    GET_ALL_PLAYLIST_FROM_ASYNC_STORAGE:'GET_ALL_PLAYLIST_FROM_ASYNC_STORAGE',
    GET_ALL_PLAYLIST_FROM_ASYNC_STORAGE_SUCCESS:'GET_ALL_PLAYLIST_FROM_ASYNC_STORAGE_SUCCESS',
    GET_ALL_PLAYLIST_FROM_ASYNC_STORAGE_FAILED:'GET_ALL_PLAYLIST_FROM_ASYNC_STORAGE_FAILED',


    /**
     * this action for add track to CURRENT custom playlist:
     * for this action requird 2 parametr:
     * 1 = type:'ADD_ITEM_TO_ASYNC_STORAGE'
     * 2 = payload:{
     *      key: '@storage_playlists_PLAYLISTNAME'
     *      title: music title
     * }
     */
    ADD_ITEM_FROM_ASYNC_STORAGE:'ADD_ITEM_FROM_ASYNC_STORAGE',
    ADD_ITEM_FROM_ASYNC_STORAGE_SUCCESS:'ADD_ITEM_FROM_ASYNC_STORAGE_SUCCESS',
    ADD_ITEM_FROM_ASYNC_STORAGE_FAILED:'ADD_ITEM_FROM_ASYNC_STORAGE_FAILED',


        /**
     * this action for remove track from CURRENT custom playlist:
     * for this action requird 2 parametr:
     * 1 = type:'REMOVE_ITEM_FROM_ASYNC_STORAGE'
     * 2 = payload:{
     *      key: '@storage_playlists_PLAYLISTNAME'
     *      title: music title
     * }
     */
    REMOVE_ITEM_FROM_ASYNC_STORAGE:'REMOVE_ITEM_FROM_ASYNC_STORAGE',
    REMOVE_ITEM_FROM_ASYNC_STORAGE_SUCCESS:'REMOVE_ITEM_FROM_ASYNC_STORAGE_SUCCESS',
    REMOVE_ITEM_FROM_ASYNC_STORAGE_FAILED:'REMOVE_ITEM_FROM_ASYNC_STORAGE_FAILED',



    /**
     * this action send dispatch to AsyncStorageSaga.js and check playlist value
     * for existing tracks or not in the file system
     */
    CHECK_PLAYLIST_FOR_EXISTING_TRACKS:'CHECK_PLAYLIST_FOR_EXISTING_TRACKS',

    /**
     * this action put value to AsyncStorageReduser.js and updated state.
     */
    CHECK_PLAYLIST_FOR_EXISTING_TRACKS_SUCCESS:'CHECK_PLAYLIST_FOR_EXISTING_TRACKS_SUCCESS',
    
    /**
     * this action for handle error for CHECK_PLAYLIST_FOR_EXISTING_TRACKS 
     */
     CHECK_PLAYLIST_FOR_EXISTING_TRACKS_FAILED:'CHECK_PLAYLIST_FOR_EXISTING_TRACKS_FAILED',
}