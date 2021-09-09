import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import MainTabNavigator from '../navigators/MainTabNavigator'
import TrackPlayer,{Capability,Event,useTrackPlayerEvents} from 'react-native-track-player'
import tracksActions from '../store/TracksRedux/tracksActions';


function MainScreen({setCurrentTrackToRedux,tracks}) {

    let isTrackChanged = false;
    useEffect(async() => {
        console.log(' mainScreen Inside useEffect')
      isTrackChanged = false;
     await TrackPlayer.setupPlayer()
    //  await TrackPlayer.updateOptions({
    //     stopWithApp: true,
    //     capabilities: [
    //       Capability.Play,
    //       Capability.Pause,
    //       Capability.JumpForward,
    //       Capability.JumpBackward,
    //       Capability.SkipToNext,
    //       Capability.SkipToPrevious,
    //     ],
    //     compactCapabilities: [Capability.Play, Capability.Pause],
    //   });
      /**
       * in below line code add music tracks to the player:
       *   tracks: this array get from tracksRedux and set for player.
       */
     await TrackPlayer.add(tracks);
      useTrackPlayerEvents ([Event.PlaybackTrackChanged], async (event) => {
        if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
            // const track = await TrackPlayer.getTrack(event.nextTrack);
            // const {title} = track || {};
            // setTrackTitle(title);
            isTrackChanged = true;
            const trackID = await TrackPlayer.getCurrentTrack();
            console.log('tttdfdftttt', TrackPlayer.getCurrentTrack())
            const getTrackInformationObject = await TrackPlayer.getTrack(trackID);
            await setCurrentTrackToRedux(getTrackInformationObject);
            // const image =`data:image/jpg;base64,${currentTrackFromRedux.artwork}`
        }
      });
    }, [isTrackChanged]);



    return (
        <MainTabNavigator/>
    )
}

const mapState =(state)=>{
    return {
        tracks:state.tracksRedux.tracks
    }
}

const mapDispatch = (dispatch)=>{
    return {
        setCurrentTrackToRedux : (payload)=>{
            dispatch({
                type:tracksActions.SET_CURRENT_TRACK,
                payload:payload
            })
        },
    }
}


export default connect(mapState,mapDispatch)(MainScreen)
