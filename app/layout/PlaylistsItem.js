import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TrackPlayer from 'react-native-track-player'
import tracksActions from '../store/TracksRedux/tracksActions'
function PlaylistsItem({ playlists, allTracks, title, playlistLength,updateSortedTracks }) {

  const navigation = useNavigation()

  const playlistName = title.replace("_", " ")

  useEffect(() => {

  }, [])

  const onPressPlaylistHandler = ()=>{
      playlists.filter(playlist => {
      if (playlist[0]=== title) {
        console.log('milad2',playlist[1])

       const st = allTracks.filter(track =>{
          if (playlist[1].includes(track.title)) {
            return track
          }
        })

        TrackPlayer.reset()
        TrackPlayer.add(st)
        updateSortedTracks(st)
        navigation.navigate('playList')
      }
    })

  }


  return (
    <View style={{
      margin: 10,
      flexDirection: 'row',
    }}>

      <Pressable
        style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderTopLeftRadius: 50,
          borderBottomLeftRadius: 50,
          borderRightWidth: 1,
          borderRightColor: 'rgba(255,255,255,0.5)',
          paddingLeft: 30,
          paddingRight: 14,
          paddingBottom: 10,
          paddingTop: 10,
          flex: 2,
        }}
        onPress={onPressPlaylistHandler}
      >
        <Text style={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: 16,
        }}>
          {playlistName}
        </Text>
        <Text style={{
          color: '#fff',
          fontSize: 14,
        }}>
          {playlistLength > 1 ? `${playlistLength} songs` : `${playlistLength} song`}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate(
            'EditPlaylistScreen',
            {
              title: title,
              playlists: playlists,
              allTracks: allTracks
            }
          )

        }}
        style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          flex: 1,
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
          justifyContent: 'center',
        }}
      >
        <Text style={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: 16,
          textAlign: "center"
        }}>
          Edit
        </Text>
      </Pressable>
    </View>
  )
}

const mapState = (state) => {
  return {
    playlists: state.asyncStorageRedux.playlists,
    allTracks: state.tracksRedux.tracks
  }
}

const mapDispatch = (dispatch)=>{
  return {
    updateSortedTracks: (payload) => {
      dispatch({
        type: tracksActions.UPDATE_SORTED_TRACKS,
        payload: payload,
      });
    },
  }
}

export default connect(mapState,mapDispatch)(PlaylistsItem)
