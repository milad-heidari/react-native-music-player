import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux'
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  ImageBackground,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Controler from '../layout/Controler';
import tracksActions from '../store/TracksRedux/tracksActions';
import LinearGradient from 'react-native-linear-gradient'

function NowPlaying({setCurrentArtwork,setCurrentTrackToRedux,currentTrackFromRedux,currentArtwork}) {
  let isTrackChanged = false;
  const [artwork, setArtwork] = useState(currentTrackFromRedux.artwork)
  const [firstNavigate, setFirstNavigate] = useState(true)

  useEffect(()=>{
    isTrackChanged = false
    // const getArtwork = currentTrackFromRedux.artwork
    TrackPlayer.addEventListener('playback-track-changed',async ()=>{
      isTrackChanged = true
      // console.log('ppppppppppppp',isTrackChanged)
      const trackID=await TrackPlayer.getCurrentTrack()
      const getTrackInformationObject = await TrackPlayer.getTrack(trackID)
      // console.log("getTrackInformationObject",getTrackInformationObject)
      await setCurrentTrackToRedux(getTrackInformationObject)
      setArtwork(getTrackInformationObject.artwork)
      // const image =`data:image/jpg;base64,${currentTrackFromRedux.artwork}`
      // setCurrentArtwork(image)
    })
  },[isTrackChanged]);
  
  // const image =`data:image/jpg;base64,${currentTrackFromRedux.artwork}`
  // console.log('dddddddddddd',image)
  return (
    <ImageBackground
      // source={require('../src/image/pic3.png')}
      source={{uri:artwork}}
      
      style={{
        width: '100%',
        height: '100%',
        opacity: 0.9,
      }}>
      <LinearGradient colors={['#204f69','#2b2549']} style={styles.container}>
        <View
          style={{
            margin: 0,
            padding: 0,
            alignItems: 'center',
            paddingTop: 16,
            flex: 1,
            flexDirection: 'column',
            position: 'relative',
          }}>
          <View>
            <Text style={styles.ScreenTitle}>N O W  P L A Y I N G</Text>
          </View>

          {/* <Image
          source={require('../src/image/pic3.png')}
          style={styles.backgroundImage}
          /> */}
        </View>
        <View style={styles.controlerContainer}>
          <Controler controlerTemplate='mainControler' />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const mapState = (state) => {
  return {
    currentTrackFromRedux : state.tracksRedux.currentTrack,
    currentArtwork:state.tracksRedux.currentArtwork
  }
}


const mapDispatch = (dispatch)=>{
  return {
    setCurrentArtwork : (payload)=>{
      dispatch({
        type:tracksActions.SET_CURRENT_ARTWORK,
        payload:payload
      })
    },
    setCurrentTrackToRedux: (payload) =>{
      dispatch({
        type:tracksActions.SET_CURRENT_TRACK,
        payload:payload
      })
    },
  }
}

export default connect(mapState,mapDispatch)(NowPlaying);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'column',
    // backgroundColor: 'rgba(43, 37, 73,0.9)',
    // backgroundColor:'red'
    // height:Dimensions.get('window').height,
  },
  controlerContainer: {},
  backgroundImage: {
    resizeMode: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 400,
    opacity: 0.3,
    // bottom: 110,
  },

  ScreenTitle: {
    color: '#fff',
    textAlign: 'center',
    // alignContent:'center',
    paddingTop: 8,
    fontSize: 12,
    borderRadius: 50,
    // borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#ff4a6b',
    // bottom: 300,
    width: 150,
    height: 30,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.22,

    elevation: 6,
  },
});
