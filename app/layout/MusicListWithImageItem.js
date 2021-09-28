import React from 'react'
import { connect } from 'react-redux'
import { View, Pressable } from 'react-native'
import { Image } from 'react-native-elements'
import TrackPlayer from 'react-native-track-player'
import tracksActions from '../store/TracksRedux/tracksActions'
function MusicListWithImageItem({ artwork, album, tracks, updateSortedTracks }) {

  const albumListClickHandler = () => {
    const sortTracksWithAlbum = tracks.filter(track => {
      if (track.album === album) {
        return track
      }
    })
    TrackPlayer.reset()
    TrackPlayer.add(sortTracksWithAlbum)
    updateSortedTracks(sortTracksWithAlbum)
  }

  return (
    <Pressable onPress={albumListClickHandler}>
      <View style={{
        alignItems: 'center',
        margin: 8,
        borderRadius: 30,
        borderColor: '#fff',
        width: 100,
        height: 100,
        shadowColor: '#ffffff',
        // shadowOffset: {
        //   width: 1,
        //   height: 1,
        // },
        // shadowOpacity: 0.5,
        // shadowRadius: 1,
        // elevation: 2,
      }}>
        <Image
          source={artwork === 'not image' ? require('../src/image/A6.png') : { uri: artwork }}
          style={{
            borderRadius: 30,
            width: 100,
            height: 100,
          }} />
      </View>
    </Pressable>
  )
}

const mapState = (state) => {
  return {
    tracks: state.tracksRedux.tracks
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateSortedTracks: (payload) => {
      dispatch({
        type: tracksActions.UPDATE_SORTED_TRACKS,
        payload: payload,
      });
    },
  }
}


export default connect(mapState, mapDispatch)(MusicListWithImageItem)
