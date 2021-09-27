/**
 * this component for playerControler.
 */
import React, {useEffect,useState} from 'react';

import {connect} from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import TrackPlayer, {
  useProgress,
  useTrackPlayerEvents,
  Event,
  State,
  RepeatMode,
} from 'react-native-track-player';


import SmoothSlider from 'react-native-smooth-slider';
import playerActions from '../store/playerRedux/playerActions';
import tracksActions from '../store/TracksRedux/tracksActions';
import asyncStorageActions from '../store/AsyncStorage/asyncStorageActions';

function Controler({
  controlerTemplate,
  isPlaying,
  isPaused,
  isSeeking,
  sliderValue,
  changeIsPlaying,
  changeIsPaused,
  setIsSeeking,
  setSliderValue,
  currentTrackFromRedux,
  addTrackToCurrentCustomPlaylist,
  removeTrackFromCurrentCustomPlaylist,
  playlists
}) {
  const {position, duration} = useProgress();
  const [repeatModeIcon, setRepeatModeIcon] = useState('repeat-off')
  const navigationNavigator = useNavigation()

  //this hook updates the value of the slider whenever the current position of the song changes
  useEffect(() => {
    // console.log('REPEAT MODE',TrackPlayer.getRepeatMode())
    if (!isSeeking && position && duration) {
      setSliderValue(position / duration);
    }
  }, [position, duration]);

  const filterLikedTracksPlaylist = playlists.filter(playlist =>{
    if(playlist[0] === 'liked_tracks'){
        return playlist
    }
})
const likedTracksPlaylist = filterLikedTracksPlaylist[0]

  useTrackPlayerEvents([Event.PlaybackState], (event) => {
    if (event.state === State.Playing) {
      changeIsPlaying({isPlaying: true});
    } else {
      changeIsPlaying({isPlaying: false});
    }
  });

  // START: this part for main controler buttons handler

  const backwardBtnHandler = (e) => {
    TrackPlayer.skipToPrevious();
  };

  const playBtnHandler = (e) => {
    changeIsPlaying({
      isPlaying: true,
    });
    changeIsPaused({
      isPaused: false,
    });
    TrackPlayer.play();
  };

  const pauseBtnHandler = (e) => {
    changeIsPlaying({
      isPlaying: false,
    });
    changeIsPaused({
      isPaused: true,
    });
    TrackPlayer.pause();
  };

  const forwardBtnHandler = (e) => {
    TrackPlayer.skipToNext();
  };

  const heartBtnHandler = (e)=>{
    if(likedTracksPlaylist[1].includes(currentTrackFromRedux.title)){
      removeTrackFromCurrentCustomPlaylist({
        key:'liked_tracks',
        removedTrackName: currentTrackFromRedux.title,
      })
    }else {
      addTrackToCurrentCustomPlaylist({
        key:'liked_tracks',
        newTrackName: currentTrackFromRedux.title,
      })
    }
  };

  const addToPlaylistBtnHandler = (e)=>{
    navigationNavigator.navigate('ListOfPlaylistsNameScreen',currentTrackFromRedux)
  }

  const repeatModeHandler =async (e)=>{
    
    if (repeatModeIcon === 'repeat-off') {
      setRepeatModeIcon('repeat-once') // repeat-once === RepeatMode.Track
      await TrackPlayer.setRepeatMode(RepeatMode.Track)
    } else if (repeatModeIcon === 'repeat-once') {
      setRepeatModeIcon('repeat') // repeat === RepeatMode.Queue
      await TrackPlayer.setRepeatMode(RepeatMode.Queue)
    } else {
      setRepeatModeIcon('repeat-off')
      await TrackPlayer.setRepeatMode(RepeatMode.Off)
    }

    // console.log('repeatModeIcon',typeof await TrackPlayer.getRepeatMode())
  }

  // END: this part for main controler buttons handler

  // START: this part for create main controler buttons
  const backwardBtn = (
    <Icon.Button
      iconStyle={{
        margin: 10,
        color: '#ff4a6b',
      }}
      name="backward"
      size={20}
      backgroundColor="#0c3757"
      borderRadius={100}
      onPress={backwardBtnHandler}></Icon.Button>
  );

  const playBtn = (
    <Icon.Button
      iconStyle={{
        margin: 10,
        color: 'rgb(248, 74, 107)',
      }}
      name="play"
      size={20}
      backgroundColor="#0c3757"
      borderRadius={100}
      onPress={playBtnHandler}></Icon.Button>
  );

  const pauseBtn = (
    <Icon.Button
      iconStyle={{
        margin: 10,
        color: 'rgb(248, 74, 107)',
      }}
      name="pause"
      size={20}
      backgroundColor="#0c3757"
      borderRadius={100}
      onPress={pauseBtnHandler}></Icon.Button>
  );

  const forwardBtn = (
    <Icon.Button
      iconStyle={{
        margin: 10,
        color: 'rgb(248, 74, 107)',
      }}
      name="forward"
      size={20}
      backgroundColor="#0c3757"
      borderRadius={100}
      onPress={forwardBtnHandler}></Icon.Button>
  );

  const addToPlaylistBtn = (
    <Icon.Button
      iconStyle={{
        margin: 0,
        marginRight:0,
        color: 'rgb(248, 74, 107)',
      }}
      // name="plus-square-o"
      name='plus'
      size={20}
      backgroundColor="rgba(0,0,0,0)"
      borderRadius={100}
      onPress={addToPlaylistBtnHandler}></Icon.Button>
  );

  const heartBtn = (
    <FontAwesomeIcon.Button
      iconStyle={{
        margin: 0,
        marginRight:0,
        color: 'rgb(248, 74, 107)',
      }}
      name={likedTracksPlaylist[1].includes(currentTrackFromRedux.title)? 'heart' : 'heart-o'}
      size={20}
      backgroundColor="rgba(0,0,0,0)"
      borderRadius={100}
      onPress={heartBtnHandler}></FontAwesomeIcon.Button>
  );

  const repeatModeBtn = (
    <MaterialCommunityIcons.Button
      iconStyle={{
        margin: 0,
        marginRight:0,
        color: 'rgb(248, 74, 107)',
      }}
      name={ repeatModeIcon }
      size={20}
      backgroundColor="rgba(0,0,0,0)"
      borderRadius={100}
      onPress={repeatModeHandler}></MaterialCommunityIcons.Button>
  );

  // END: this part for create main controler buttons

  // START: this part for MINI controler buttons handler

  const miniPlayBtnHandler = (e) => {
    changeIsPlaying({
      isPlaying: true,
    });
    changeIsPaused({
      isPaused: false,
    });
    TrackPlayer.play();
  };

  const miniPauseBtnHandler = (e) => {
    changeIsPlaying({
      isPlaying: false,
    });
    changeIsPaused({
      isPaused: true,
    });
    TrackPlayer.pause();
  };

  // END: this part for MINI controler buttons handler

  // START: this part for create mini controler buttons
  const miniPlayBtn = (
    <Icon.Button
      iconStyle={{
        margin: 10,
        color: 'rgba(253,253,254,255)',
      }}
      name="play"
      size={20}
      backgroundColor="#ff4a6b"
      borderRadius={100}
      onPress={miniPlayBtnHandler}></Icon.Button>
  );

  const miniPauseBtn = (
    <Icon.Button
      iconStyle={{
        margin: 10,
        color: 'rgba(253,253,254,255)',
      }}
      name="pause"
      size={20}
      backgroundColor="#ff4a6b"
      borderRadius={100}
      onPress={miniPauseBtnHandler}></Icon.Button>
  );

  const miniHeartBtn = (
    <Icon.Button
      iconStyle={{
        margin: 0,
        color: 'rgb(248, 74, 107)',
      }}
      name="heart"
      size={14}
      backgroundColor="'rgba(253,253,254,0)'"
      borderRadius={100}></Icon.Button>
  );
  // END: this part for create mini controler buttons

  let buildPosition = (position) => {
    const hours = Math.floor(position / 3600);
    const minutes = Math.floor(position / 60);
    const seconds = Math.floor(position % 60);

    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');
    if (hours > 0) {
      return `${hours}:${minutesStr}:${secondsStr}`;
    }

    return `${minutesStr}:${secondsStr}`;
  };

  let buildDuration = (duration) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);

    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');
    if (hours > 0) {
      return `${hours}:${minutesStr}:${secondsStr}`;
    }

    return `${minutesStr}:${secondsStr}`;
  };

  const slidingStarted = () => {
    setIsSeeking();
  };

  const slidingCompleted = async (value) => {
    await TrackPlayer.seekTo(value * duration);
    setSliderValue(value);
    setIsSeeking();
  };

  return (
    <>
      {controlerTemplate === 'mainControler' ? (
        <View style={styles.container}>
          <ImageBackground
                    imageStyle={{
                      // display: 'flex',
                      // flexDirection: 'column',
                      paddingTop:100,
                      // alignItems: 'center',
                      width: '128%',
                      resizeMode: 'cover',
                      height: '160%',
                    }}
            source={require('../src/image/A2.png')}
            // style={styles.imageBackground}
            style={{}}
            >
            <View style={styles.playerSliderContainer}>
              <View style={styles.trackInfo}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{color: '#fff', padding: 0, fontSize: 20}}>
                  {currentTrackFromRedux.title}
                </Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{color: '#fafafa', padding: 0, fontSize: 14}}>
                  {currentTrackFromRedux.artist}
                </Text>
              </View>
              <View
                // style={{backgroundColor:'#fff', padding:0}}
              >

              <SmoothSlider
                value={sliderValue}
                minimumValue={0}
                maximumValue={1}
                onSlidingStart={slidingStarted}
                onSlidingComplete={slidingCompleted}
                thumbImage={require('../src/image/thumb.png')}
                trackStyle={{
                  height: 10,
                  width: 300,
                  borderRadius: 4,
                  backgroundColor: '#0d2742',
                  shadowColor: 'black',
                  shadowOffset: {width: 0, height: 1},
                  shadowRadius: 1,
                  // shadowOpacity: 0.15,
                }}
                minimumTrackTintColor="#e44fde"
                maximumTrackTintColor="#0d2742"
                // minimumTrackTintColor="radial-gradient(circle, rgb(32,79,105) 0%, rgb(43,37,73) 100%);"
                />
                </View>
              <View style={styles.trackInfoTimer}>
                <Text style={{color: '#fff', padding: 0, fontSize: 10}}>
                  {buildPosition(position)}
                </Text>
                <Text style={{color: '#fafafa', padding: 0, fontSize: 10}}>
                  {buildDuration(duration)}
                </Text>
              </View>
            </View>
            <View style={styles.btnContainer}>
              <View style={{
                marginRight: 10, 
                marginLeft: 10,
                backgroundColor:'#0c3757',
                borderRadius:100,
                shadow: {  
                  // borderColor:'#000', // if you need 
                  borderWidth:1,
                  overflow: 'hidden',
                  shadowColor: '#000',
                  shadowRadius: 10,
                  shadowOpacity: 1,
                }
                }}>
                {backwardBtn}
              </View>
              <View style={{
                marginRight: 10, 
                marginLeft: 10,
                backgroundColor:'#0c3757',
                borderRadius:100,
                shadow: {  
                  // borderColor:'#000', // if you need 
                  borderWidth:1,
                  overflow: 'hidden',
                  shadowColor: '#000',
                  shadowRadius: 10,
                  shadowOpacity: 1,
                }
                }}>
                {isPlaying === false && isPaused === true ? playBtn : pauseBtn}
              </View>
              <View style={{
                marginRight: 10, 
                marginLeft: 10,
                backgroundColor:'#0c3757',
                borderRadius:100,
                shadow: {  
                  // borderColor:'#000', // if you need 
                  borderWidth:1,
                  overflow: 'hidden',
                  shadowColor: '#000',
                  shadowRadius: 10,
                  shadowOpacity: 1,
                }
                }}>
                {forwardBtn}
              </View>
            </View>
            <View style={styles.btnContainer}>
            <View style={{
              marginRight: 10, 
              marginLeft: 10,
              borderRadius:100,
              // backgroundColor:'#0c3757',
              }}>
                {heartBtn}
              </View>
              <View style={{marginRight: 10, marginLeft: 10}}>
                {addToPlaylistBtn}
              </View>
              <View style={{marginRight: 10, marginLeft: 10}}>
                {repeatModeBtn}
              </View>
            </View>
          </ImageBackground>
        </View>
      ) : (
        <View style={miniControlerStyles.miniControlerItem}>
          <View style={miniControlerStyles.playPauseBtn}>
            {isPlaying === false && isPaused === true
              ? miniPlayBtn
              : miniPauseBtn}
          </View>

          <View style={miniControlerStyles.sliderContiner}>
            <View style={miniControlerStyles.playerSliderContainer}>
              <View style={miniControlerStyles.trackInfo}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={miniControlerStyles.sliderTitle}>
                  {currentTrackFromRedux.title}
                </Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={miniControlerStyles.sliderSubTitle}>
                  {currentTrackFromRedux.artist}
                </Text>
                <SmoothSlider
                  value={sliderValue}
                  minimumValue={0}
                  maximumValue={1}
                  onSlidingStart={slidingStarted}
                  onSlidingComplete={slidingCompleted}
                  thumbImage={require('../src/image/thumb.png')}
                  trackStyle={{
                    height: 10,
                    width: 250,
                    borderRadius: 4,
                    backgroundColor: '#0d2742',
                    shadowColor: 'black',
                    shadowOffset: {width: 0, height: 1},
                    shadowRadius: 1,
                    shadowOpacity: 0.15,
                  }}
                  // minimumTrackTintColor="linear-gradient(linear, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%);"
                  // maximumTrackTintColor="red"
                  minimumTrackTintColor="#e44fde"
                />

                <View style={miniControlerStyles.trackInfoTimerContiner}>
                  <Text style={miniControlerStyles.trackInfoTimer}>
                    {buildPosition(position)}
                  </Text>
                  <Text style={miniControlerStyles.trackInfoTimer}>
                    {buildDuration(duration)}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* <View style={miniControlerStyles.heartBtnContiner}>
            <View style={miniControlerStyles.heartBtn}>{miniHeartBtn}</View>
          </View> */}
        </View>
      )}
    </>
  );
}

const mapState = (state) => {
  return {
    isPlaying: state.playerRedux.isPlaying,
    isPaused: state.playerRedux.isPaused,

    //isSeeking: this value for check when user press the seek or not,
    isSeeking: state.playerRedux.isSeeking,

    //sliderValue: this value for react-native-slider value.
    sliderValue: state.playerRedux.sliderValue,
    tracks: state.tracksRedux.tracks,
    currentTrackFromRedux: state.tracksRedux.currentTrack,

    playlists:state.asyncStorageRedux.playlists
  };
};

const mapDispatch = (dispatch) => {
  return {
    changeIsPlaying: (payload) => {
      dispatch({
        type: playerActions.CHANGE_IS_PLAYING,
        payload: payload,
      });
    },
    changeIsPaused: (payload) => {
      dispatch({
        type: playerActions.CHANGE_IS_PAUSED,
        payload: payload,
      });
    },
    setIsSeeking: () => {
      dispatch({
        type: playerActions.SET_IS_SEEKING,
      });
    },
    setSliderValue: (payload) => {
      dispatch({
        type: playerActions.SET_SLIDER_VALUE,
        payload: payload,
      });
    },
    setCurrentTrackToRedux: (payload) => {
      dispatch({
        type: tracksActions.SET_CURRENT_TRACK,
        payload: payload,
      });
    },
    addTrackToCurrentCustomPlaylist:(payload)=>{
      dispatch({
        type: asyncStorageActions.ADD_ITEM_FROM_ASYNC_STORAGE,
        payload
      })
    },
    removeTrackFromCurrentCustomPlaylist:(payload)=>{
      dispatch({
        type: asyncStorageActions.REMOVE_ITEM_FROM_ASYNC_STORAGE,
        payload
      })
    }
  };
};

export default connect(mapState, mapDispatch)(Controler);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    // marginTop: 30,
    height: 245,
    // paddingBottom: 12,
    // paddingTop:12,
    // height: 260,
    // borderColor:'red',
    // borderWidth:1,
    backgroundColor: '#2b2549',
    // backgroundColor: 'blue',
    // shadowColor: '#fff',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 1.22,

    // elevation:0.8,
  },

  // imageBackground: {
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   width: '100%',
  //   // height: '100%',
  //   // backgroundColor:'red',
  //   // paddingBottom:10,

  //   resizeMode: 'cover',
  // },

  trackInfo: {
    flexDirection: 'column',
    // backgroundColor: '#fff',
    width: Dimensions.get('window').width - 120,
    alignItems: 'flex-start',
    // paddingLeft:60
    marginTop: 4,
  },

  trackInfoTimer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: Dimensions.get('window').width - 140,
  },

  playerSliderContainer: {
    // flexDirection: 'column',
    // justifyContent: 'center',
    // marginTop:0,
    alignItems: 'center',
    // justifyContent: 'flex-start',
    // backgroundColor: 'rgba(0, 0, 0, 1)',
    // width: Dimensions.get('window').width - 120,
    // padding: 10,
  },

  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});

const miniControlerStyles = StyleSheet.create({
  miniControlerItem: {
    // backgroundColor: 'rgba(0, 0, 0,0)',
    // height: 100,
    // marginTop: 4,
    marginBottom: 4,
    // marginRight: 4,
    marginLeft: 4,
    flexDirection: 'row',
    alignContent: 'space-around',
  },

  playPauseBtn: {
    width: 76,
    // margin: 4,
    // backgroundColor:'blue',
    // padding: 0,
    justifyContent:'center',
    flexDirection: 'row',
    alignItems: 'center',
  },

  heartBtnContiner: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 10,
    //   marginRight:6,
    //   backgroundColor:'blue',
  },

  heartBtn: {
    margin: 4,
    //   backgroundColor:'blue',
    padding: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },

  sliderContiner: {
    flexDirection: 'column',
  },

  sliderTitle: {
    color: '#fff',
    padding: 0,
    fontSize: 16,
  },

  sliderSubTitle: {
    color: '#fafafa',
    padding: 0,
    fontSize: 14,
  },

  playerSliderContainer: {
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: Dimensions.get('window').width - 120,
    // padding: 10,
  },

  trackInfo: {
    flexDirection: 'column',
    // backgroundColor: '#fff',
    width: Dimensions.get('window').width - 125,
    alignItems: 'flex-start',
    // paddingLeft:60
    marginTop: 4,
  },

  trackInfoTimerContiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: Dimensions.get('window').width - 160,
  },

  trackInfoTimer: {
    color: '#fff',
    padding: 0,
    fontSize: 8,
  },
});
