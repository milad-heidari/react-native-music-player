import tracksActions from './tracksActions'
const initState = {
    tracks: [],
    sortedTracks: [],
    sortedFilterItem: [],
    currentTrack: {},
    currentArtwork: null
}

const tracksReducer = (state = initState, action) => {

    let newState = state

    switch (action.type) {
        case tracksActions.ADD_MUSIC_TRACKS:
            console.log('REDUSER ADD_MUSIC_TRACKS', action.payload.title)
            newState = { ...state, tracks: [...state.tracks, action.payload] }
            break;
        case tracksActions.SET_CURRENT_TRACK:
            console.log('payloadsdffffff', action.payload.id)

            newState = { ...state, currentTrack: action.payload }
            break;
        case tracksActions.SET_CURRENT_ARTWORK:
            newState = { ...state, currentArtwork: action.payload }
            break;
        case tracksActions.ADD_SORTED_TRACKS:
            console.log('REDUSER UPDATE', action.payload.title)
            newState = { ...state, sortedTracks: [...state.sortedTracks, action.payload] }
            // [...state.sortedTracks,action.payload]
            break;
        case tracksActions.UPDATE_SORTED_TRACKS:
            // console.log('REDUSER UPDATE',action.payload)
            newState = { ...state, sortedTracks: action.payload }
            break;
        case tracksActions.ADD_SORTED_fILTER_ITEM:
            newState = { ...state, sortedFilterItem: action.payload }
            break;
        case tracksActions.RESET_TRACK_REDUX:
            console.log('reserT')
            newState = {
                tracks: [],
                sortedTracks: [],
                sortedFilterItem: [],
                currentTrack: {},
                currentArtwork: null
            }
            break;
        default:
            break;
    }
    // console.log('payloadsdfffffsssssf',newState)

    return newState
}

export default tracksReducer;