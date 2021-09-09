import React, { useEffect} from 'react'
import {connect} from 'react-redux';
import { View } from 'react-native';
import PlaylistsItem from './PlaylistsItem';
import uuid from 'react-native-uuid';
function Playlists({playlists}) {

    console.log('playlistssssss',playlists)

    useEffect(() => {
        
    }, [])

    const renderListsOfPlaylistName = 
        playlists.map(playlist => 
            <PlaylistsItem 
                key={uuid.v1()} 
                playlistLength={playlist[1].length} 
                title={playlist[0]}/>
        )

    return (
        <View >
            {renderListsOfPlaylistName}
        </View>
    )
}

const mapState = (state)=>{
    return {
        playlists:state.asyncStorageRedux.playlists
    }
}

export default connect(mapState)(Playlists)
