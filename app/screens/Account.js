/**
 * this screen including 3 layout:
 *  1: login button for navigate to login.js screen.
 *  2: register Button for navigate to register.js screen.
 *  3: skip Button for navigate to main screen without login or register.
 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import uuid from 'react-native-uuid';
import MediaMeta from 'react-native-media-meta';
import defultImage from '../src/image/pic.jpg'
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  PermissionsAndroid,
} from 'react-native';
import RNFS from 'react-native-fs';
import tracksActions from '../store/TracksRedux/tracksActions';
import playerActions from '../store/playerRedux/playerActions'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from "@react-native-async-storage/async-storage";
import asyncStorageActions from '../store/AsyncStorage/asyncStorageActions';
function Account(
  { navigation,
    getAllPlylistNameAndContent,
    initGetLikedTracksPlaylist,
    resetPlayerRedux,
    resetTrackRedux,
    initGetPlaylists, asyncStorageSetItem,
    addMusicTracks, addSortedTracks, setSliderValue }) {

  const FilteredDirectories = [];
  const forbidenDIRS = [
    'Android',
    'DCIM',
    'Movies',
    'Notifications',
    'Documents',
    'Pictures',
  ];
  const REQUEST_READ_EXTERNAL_STORAGE_PERMISSION = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'this App needs use your read stprage',
          message:
            'this App needs use your read stprage' + 'so you can use App',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        RNFS.readDir(RNFS.ExternalStorageDirectoryPath).then(
          (ResultPhoneDirectories) => {
            ResultPhoneDirectories.filter((phoneDir) => {
              if (!forbidenDIRS.includes(phoneDir.name)) {
                FilteredDirectories.push(phoneDir);
              }
            });

            FilteredDirectories.forEach((item) => {
              RNFS.readDir(item.path).then((DirctoryContent) => {
                if (DirctoryContent.length >= 1) {
                  DirctoryContent.map((musicItem) => {
                    if (musicItem.name.endsWith('.mp3')) {
                      MediaMeta.get(musicItem.path).then((meta) => {
                        if (meta.title === undefined) {
                        }else {

                          
                          const track = {
                            id:uuid.v1(),
                            url: musicItem.path,
                            artist: meta.artist === undefined ? 'no artist' : meta.artist,
                            title: meta.title === undefined ? 'no title' : meta.title,
                            artwork: meta.thumb === undefined ? 'not image' : `data:image/jpg;base64,${meta.thumb}`,
                            album: meta.album === undefined ? 'no album' : meta.album,
                            genre: meta.genre === undefined ? 'no genre' : meta.genre,
                          }
                          
                          addMusicTracks(track)
                          addSortedTracks(track)
                          console.log('test',track.id)
                          
                        }
                      });
                    }
                  });
                }
              });
            });
          },
        );

      } else {
        // console.log('READ_EXTERNAL_STORAGE permission denied');
      }
    } catch (err) {
      // console.warn(err);
    }
  };

  const REQUEST_WRITE_EXTERNAL_STORAGE_PERMISSION = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'this App needs use your write stprage',
          message:
            'this App needs use your write stprage' + 'so you can use App',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      )
    } catch (error) {

    }
  }

  const ExternalDirectoryPath = []
  RNFS.readDir(RNFS.ExternalDirectoryPath).then(res => {
    res.map(i => {
      console.log('ExternalDirectoryPath', i)
      ExternalDirectoryPath.push(i.name)
    })
  })
  const ExternalStorageDirectoryPath = []
  RNFS.readDir(RNFS.ExternalStorageDirectoryPath).then(res => {
    res.map(i => ExternalStorageDirectoryPath.push(i.name))
  })

  useEffect(async () => {
    resetPlayerRedux()
    resetTrackRedux()
    // AsyncStorage.clear()
    const createStoragePlaylistsLikedTracks = []
    /**
     * initGetPlaylists() dispatch init get for get playlist and content.
     */
    initGetPlaylists()
    const getAllKeys = await AsyncStorage.getAllKeys()
    if (!getAllKeys.includes('@storage_playlists_liked_tracks')) {
      // console.log('not exist')      
      asyncStorageSetItem([
        'liked_tracks',
        createStoragePlaylistsLikedTracks]
      )
    } else {
      initGetLikedTracksPlaylist({
        key: '@storage_playlists_liked_tracks',
      })
    }
    await REQUEST_WRITE_EXTERNAL_STORAGE_PERMISSION()
    await REQUEST_READ_EXTERNAL_STORAGE_PERMISSION()

    const updateGetAllKeys = await AsyncStorage.getAllKeys()
    updateGetAllKeys.forEach(key => {
      getAllPlylistNameAndContent({
        key: key
      })
    })
    setSliderValue(0)

    // alert(`ExternalStorageDirectoryPath:${( ExternalStorageDirectoryPath).map(e=>e)}`)
    // alert(FilteredDirectories.map(item=>item.name))
  }, [FilteredDirectories.length]);
  const clickLogin = (e) => {
    // console.log('oooooooMUSIC ITEMS',musicItems)
    alert(`ExternalDirectoryPath:${ExternalDirectoryPath}`)
    // alert(FilteredDirectories.map(item=>item.name))
    // console.log('clicked-Login');
  };

  const clickCreateAccount = (e) => {
    alert(`ExternalStorageDirectoryPath:${ExternalStorageDirectoryPath}`)

  };

  const clickSkipButton = (e) => {
    // console.log('qqqqsssq', tracks);
    // addMusicTracks(tracks);
    // addSortedTracks(tracks)

    navigation.push('MainScreen');
  };

  return (
    <LinearGradient style={styles.container} colors={['#204f69', '#2b2549']}>

      {/* <View style={styles.container}> */}
      <View>
        <Image source={require('../src/image/A6.png')} style={styles.logo} />
      </View>
      <View>
        <Image
          source={require('../src/image/a1.png')}
          style={styles.backgroundImage}
        />
      </View>
      <View>
        {/* <Text style={styles.LoginButton} onPress={clickLogin}>
          Login
        </Text> */}
        {/* <Text style={styles.CreateAccountButton} onPress={clickCreateAccount}>
          Create account
        </Text> */}
        <Text style={styles.SkipButton} onPress={clickSkipButton}>
          {/* {FilteredDirectories[0].name} */}
          skip
        </Text>
      </View>
      {/* </View> */}
    </LinearGradient>
  );
}


const mapDispatch = (dispatch) => {
  return {
    addMusicTracks: (payload) => {
      dispatch({
        type: tracksActions.ADD_MUSIC_TRACKS,
        payload: payload,
      });
    },
    setSliderValue: (payload) => {
      dispatch({
        type: playerActions.SET_SLIDER_VALUE,
        payload: payload,
      });
    },
    addSortedTracks: (payload) => {
      dispatch({
        type: tracksActions.ADD_SORTED_TRACKS,
        payload: payload,
      });
    },
    asyncStorageSetItem: (payload) => {
      dispatch({
        type: asyncStorageActions.CREATE_NEW_PLAYLIST_WITH_ASYNC_STORAGE,
        payload
      })
    },
    initGetLikedTracksPlaylist: (payload) => {
      dispatch({
        type: asyncStorageActions.GET_ITEM_METOD_FROM_ASYNC_STORAGE,
        payload
      })
    },
    initGetPlaylists: (payload) => {
      dispatch({
        type: asyncStorageActions.INIT_GET_PLAYLIST,
        payload
      })
    },
    getAllPlylistNameAndContent: (payload) => {
      dispatch({
        type: asyncStorageActions.GET_ITEM_METOD_FROM_ASYNC_STORAGE,
        payload
      })
    },
    resetTrackRedux:()=>{
      dispatch(
        {
          type:tracksActions.RESET_TRACK_REDUX,
        }
      )
    },
    resetPlayerRedux:()=>{
      dispatch(
        {
          type:playerActions.RESET_PLAYER_REDUX,
        }
      )
    },
  };
};

export default connect(null, mapDispatch)(Account);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
  },
  logo: {
    top: 30,
    width: 120,
    height: 120,
  },
  backgroundImage: {
    resizeMode: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    bottom: 70,
  },
  LoginButton: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 8,
    fontSize: 18,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'rgb(248, 74, 107)',
    bottom: 300,
    width: 180,
    height: 40,
  },
  CreateAccountButton: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
    paddingTop: 8,
    fontSize: 18,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    bottom: 300,
    width: 180,
    height: 40,
  },
  SkipButton: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
    paddingTop: 8,
    fontSize: 18,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    bottom: 300,
    width: 180,
    height: 40,
  },
});
