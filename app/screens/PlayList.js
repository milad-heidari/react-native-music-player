import React,{useEffect,useState} from 'react';
import {connect} from 'react-redux'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import TrackPlayer from 'react-native-track-player'
import Controler from '../layout/Controler';
import MusicList from '../layout/MusicList';
import MusicListWithImage from '../layout/MusicListWithImage';
import tracksActions from '../store/TracksRedux/tracksActions';
import LinearGradient from 'react-native-linear-gradient'

function PlayList({setCurrentTrackToRedux,currentTrackFromRedux}) {
  let isTrackChanged = false;
  const [artwork, setArtwork] = useState(currentTrackFromRedux.artwork)
  useEffect(()=>{
    isTrackChanged = false
    TrackPlayer.addEventListener('playback-track-changed',async ()=>{
      isTrackChanged = true
      const trackID=await TrackPlayer.getCurrentTrack()
      const getTrackInformationObject = await TrackPlayer.getTrack(trackID)
      await setCurrentTrackToRedux(getTrackInformationObject)
      setArtwork(getTrackInformationObject.artwork)
    })
  },[isTrackChanged]);

  return (
    <LinearGradient colors={['#204f69','#2b2549']} style={{
      height:"100%"
      }}>

<ImageBackground
        source={{uri:artwork}}
        style={{
          width: '100%',
          flex: 3,
            opacity: 0.9,
        }}>
    <ScrollView showsVerticalScrollIndicator={false} style={{
      backgroundColor: '#263a59',
      width:'100%',
    }}>

        <View style={styles.TitleContainer}>
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
              <Text style={styles.ScreenTitle}>P L A Y   L I S T</Text>
            </View>
          </View>
        </View>
        <View style={styles.containerControlerItems}>
          <Controler controlerTemplate='miniControler' />
          <MusicList /> 
        </View>
        
    </ScrollView>
      </ImageBackground>
    <View style={styles.DiscoverContainer}>
            <ImageBackground 
            source={require('../src/image/A2.png')}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              resizeMode: 'center',
            }}
            >
            {/* <View
              style={{
                margin: 0,
                padding: 0,
                backgroundColor: 'rgba(0, 0, 0,0)',
                backgroundColor:'red',
                alignItems: 'center',
                paddingTop: 4,
                flex: 2,
                flexDirection: 'column',
                position: 'relative',
              }}> */}
              {/* <View style={{backgroundColor:'rgba(0, 0, 0,0)'}}> */}
                {/* <Text style={styles.ScreenTitle}>S H O W M O R E</Text> */}
              {/* </View> */}
            {/* </View> */}
            <View style={styles.ListTitleContainer}>
              <Text style={{color: '#fff', padding: 0, fontSize: 20}}>
                Album
              </Text>
            </View>
            <View style={styles.MusicListImageContainer}>
              <MusicListWithImage />

              
            </View>
            </ImageBackground>
          </View>
    </LinearGradient>
  );
}

const mapState=(state)=>{
  return {
    currentTrackFromRedux : state.tracksRedux.currentTrack,
  }
}

const mapDispatch=(dispatch)=>{
  return{
    setCurrentTrackToRedux: (payload) =>{
      dispatch({
        type:tracksActions.SET_CURRENT_TRACK,
        payload:payload
      })
    },
  }
}

export default connect(mapState,mapDispatch)(PlayList);

const styles = StyleSheet.create({
  TitleContainer: {
    flex: 1,
    // flexDirection: 'column',
    // backgroundColor: 'rgba(43, 37, 73,0.97)',
    // backgroundColor:'blue'
  },

  DiscoverContainer : {
    // flex: 1,
    flexDirection: 'column',
    alignContent:'flex-end',
    backgroundColor: 'rgba(43,37,73,0)',
    // backgroundColor:'blue'
    // opacity: 0.9
  },

  ScreenTitle: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 8,
    fontSize: 12,
    borderRadius: 50,
    borderColor: '#fff',
    backgroundColor: '#ff4a6b',
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

  containerControlerItems: {
    // backgroundColor: 'rgba(43, 37, 73,0.97)',
    flex: 6,
  },

  ListTitleContainer: {
    flexDirection: 'column',
    // backgroundColor: '#fff',
    width: Dimensions.get('window').width - 20,
    alignItems: 'flex-start',
    // paddingLeft:60
    marginTop: 4,
    marginLeft: 20,
    marginRight: 20,
  },

  MusicListImageContainer: {
    flexDirection:"column",
    width:Dimensions.get('window').width ,
    // backgroundColor:'red'
    // flex: 1,
    // marginTop:6,
    // marginLeft:20,
    // marginRight:20,
    
  },
});
