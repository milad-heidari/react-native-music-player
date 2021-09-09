/**
 * this layout create list of music with musicListItem.js 
 * and import to PlayList.js screen. 
 */
import React, { useEffect } from 'react';
import MusicListItem from './MusicListItem';
import { connect } from 'react-redux'

function MusicList({ sortedTracks,tracks,playlists }) {

    useEffect(() => {
    }, [])

    const filterLikedTracksPlaylist = playlists.filter(playlist =>{
        if(playlist[0] === 'liked_tracks'){
            return playlist
        }
    })
    const likedTracksPlaylist = filterLikedTracksPlaylist[0]

    const render = ()=>{
        if (sortedTracks === undefined) {
            console.log('TRACKS')
            const WithAllTracks = tracks.map((musicInfo,index) => {
                return <MusicListItem
                key={index}
                id={musicInfo.id}
                artist={musicInfo.artist}
                title={musicInfo.title}
                artwork={musicInfo.artwork}
                heartIcon={likedTracksPlaylist[1].includes(musicInfo.title)? 'heart' : 'heart-o' }
                />
                
            })
            return WithAllTracks
        } else {
            console.log('SORTEDTRACKS')
            const withSortedTracks = sortedTracks.map((musicInfo,index) => {
                return <MusicListItem
                key={index}
                id={musicInfo.id}
                artist={musicInfo.artist}
                title={musicInfo.title}
                artwork={musicInfo.artwork}
                heartIcon={likedTracksPlaylist[1].includes(musicInfo.title)? 'heart' : 'heart-o' }
                />
                
            })
            return withSortedTracks
        }

    }

    return (
        <>

            {render()}


        </>
    )
}

const mapState = (state) => {
    return {
        sortedTracks: state.tracksRedux.sortedTracks,
        playlists:state.asyncStorageRedux.playlists,
        tracks:state.tracksRedux.tracks
    }
}



export default connect(mapState)(MusicList)
