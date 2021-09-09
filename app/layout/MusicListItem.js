import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Pressable, View, Text, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import TrackPlayer from 'react-native-track-player'

import asyncStorageActions from '../store/AsyncStorage/asyncStorageActions';
function MusicListItem({ 
  asyncStorageRemoveTrackFromLikedTracksPlaylist, 
  asyncStorageAddTrackToLikedTracksPlaylist, heartIcon,
  id, artist, title, artwork, currentTrack }) {

console.log('typeof',typeof id)
  const heartBtn = (
    <Icon.Button
      iconStyle={{
        margin: 0,
        marginRight:0,
        color: "rgb(248, 74, 107)",
        padding: 0,
      }}
      borderRadius={50}
      name={heartIcon}
      size={16}
      backgroundColor='rgba(255,255,255,0)'
      onPress={() => {
        if (heartIcon === 'heart') {
          // setHeartIcon('heart-o')
          asyncStorageRemoveTrackFromLikedTracksPlaylist({
            key:'liked_tracks',
            removedTrackName: title,
          })

        } else {
          // setHeartIcon('heart')
          asyncStorageAddTrackToLikedTracksPlaylist({
            key:'liked_tracks',
            newTrackName: title,
          })
        }
      }}
    />
  );

  /**
   * below function when is fire user press one of list.
   * this function update current Track in the app
   */
  const musicItemClickHandler = (e) => {
    TrackPlayer.skip(id)
    TrackPlayer.play()
  }

  return (
    <Pressable onPress={musicItemClickHandler} style={styles.miniControlerItem}>
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
          source={artwork === 'not image' ? require('../src/image/A6.png'):{ uri: artwork }}
        />
      </View>

      <View style={styles.slider}>
        <View style={styles.playerSliderContainer}>
          <View style={styles.trackInfo}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ color: '#fff', padding: 0, fontSize: 16 }}>
              {title}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ color: '#fafafa', padding: 0, fontSize: 14 }}>
              {artist}
            </Text>
            {id === parseInt(currentTrack.id) ? (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ color: '#fb8500', padding: 0, fontSize: 10 }}>
                now playing
              </Text>
            ) :               <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ color: '#fb8500', padding: 0, fontSize: 10 }}>
            not
          </Text>}
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 14,
        }}>

        {heartBtn}

      </View>
    </Pressable>
  );
}

const mapState = (state) => {
  return {
    currentTrack: state.tracksRedux.currentTrack,
  };
};

const mapDispatch = (dispatch) => {
  return {
    asyncStorageAddTrackToLikedTracksPlaylist: (payload) => {
      dispatch({
        type: asyncStorageActions.ADD_ITEM_FROM_ASYNC_STORAGE,
        payload
      })
    },
    asyncStorageRemoveTrackFromLikedTracksPlaylist: (payload) => {
      dispatch({
        type: asyncStorageActions.REMOVE_ITEM_FROM_ASYNC_STORAGE,
        payload
      })
    }
  }
}

export default connect(mapState, mapDispatch)(MusicListItem);

const styles = StyleSheet.create({
  miniControlerItem: {
    backgroundColor: 'rgba(0, 0, 0,0)',
    height: 80,
    marginTop: 0,
    marginBottom: 0,
    marginRight: 5,
    marginLeft: 5,
    flexDirection: 'row',
    alignContent: 'space-around',
  },

  playerSliderContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: Dimensions.get('window').width - 190,
    marginTop: 4
  },

  trackInfo: {
    flexDirection: 'column',
    width: Dimensions.get('window').width - 200,
    alignItems: 'flex-start',
    marginTop: 4,
  },
});
