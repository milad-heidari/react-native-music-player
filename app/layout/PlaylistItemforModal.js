import React from 'react'
import {connect} from 'react-redux';
import { View, Text, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import asyncStorageActions from '../store/AsyncStorage/asyncStorageActions';
function PlaylistItemforModal({ asyncStorageRemoveTrackFromLikedTracksPlaylist,trackName, trackArtist,playlistName }) {

  const deleteBtn = (
    <Icon.Button
      iconStyle={{
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        backfaceVisibility: 'hidden',
        includeFontPadding: false,
        textAlign: 'center',
        margin: 0,
        padding: 0,
        marginRight:0,

      }}
      borderRadius={50}
      name="trash"
      size={15}

      backgroundColor='rgba(255,255,255,0)'
      onPress={() => {
        asyncStorageRemoveTrackFromLikedTracksPlaylist({
          key:playlistName,
          removedTrackName:trackName
        })
       }}></Icon.Button>
  );

  return (
    <View style={{
      margin: 5,
      flexDirection: 'row',
    }}>

      <Pressable
        style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderTopLeftRadius: 50,
          borderBottomLeftRadius: 50,
          borderRightWidth: 1,
          borderRightColor: 'rgba(255,255,255,0.5)',
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 10,
          paddingTop: 10,
          flex: 5,

        }}
      >
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ color: '#fff', padding: 0, fontSize: 16 }}
          >
          {trackName}
        </Text>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ color: '#fff', padding: 0, fontSize: 12 }}
          >
          {trackArtist}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => { }}
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
          {deleteBtn}
        </Text>
      </Pressable>
    </View>
  )
}


const mapDispatch = (dispatch)=>{
  return {
    asyncStorageRemoveTrackFromLikedTracksPlaylist: (payload) => {
      dispatch({
        type: asyncStorageActions.REMOVE_ITEM_FROM_ASYNC_STORAGE,
        payload
      })
    }
  }
}

export default connect(null,mapDispatch)(PlaylistItemforModal)
