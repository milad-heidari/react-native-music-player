import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Pressable,
  } from 'react-native';
import {connect} from 'react-redux'
import TrackPlayer from 'react-native-track-player'
import tracksActions from '../../../store/TracksRedux/tracksActions'



function FilteredWithArtistItem({navigation,album,artist,artwork,tracks,updateSortedTracks}) {

    const artistItemClickHandler = (e) => {
        const sortTracksWithArtist = tracks.filter(track=>{
          if(track.artist === artist){
              return track
          }
      })
      TrackPlayer.reset()
      TrackPlayer.add(sortTracksWithArtist)
      updateSortedTracks(sortTracksWithArtist)
      navigation.navigate('playList')
    };



    return (
        <Pressable
        onPress={artistItemClickHandler}
        style={PressableStyles.pressableContainer}>
        <View
          style={{
              margin: 4,
              padding: 0,
              flexDirection: 'column',
              alignItems: 'center',
          }}>
          <Image
                style={{
                    borderRadius: 20,
                    width: 65,
                    height: 65,
                  }}
                  source={artwork === 'not image' ? require('../../../src/image/A6.png'):{ uri: artwork }}
                  />
        </View>

        <View style={PressableStyles.slider}>
          <View style={PressableStyles.playerSliderContainer}>
            <View style={PressableStyles.trackInfo}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{color: '#fff', padding: 0, fontSize: 16}}>
                {artist}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{color: '#fafafa', padding: 0, fontSize: 14}}>
                {album}

              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    )
}

const mapState = (state) => {
    return {
      tracks:state.tracksRedux.tracks
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

export default connect(mapState,mapDispatch)(FilteredWithArtistItem)


const PressableStyles = StyleSheet.create({
  pressableContainer: {
    height: 80,
    width: Dimensions.get('window').width -0,
    marginBottom: 8,
    paddingTop:3,
    marginRight: 4,
    marginLeft: 4,
    flexDirection: 'row',
  },

  playerSliderContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: Dimensions.get('window').width - 190,
    marginTop: 4,
  },

  trackInfo: {
    flexDirection: 'column',
    width: Dimensions.get('window').width - 200,
    alignItems: 'flex-start',
    marginTop: 4,
  },


});
