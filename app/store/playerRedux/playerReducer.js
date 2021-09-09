import playerActions from './playerActions';
import {state as playerState, STATE_PLAYING} from 'react-native-track-player';
const initState = {
  test: true,
  isPlaying: false,
  isPaused: true,
  isStoped: false,
  isEmpty: true,
  currentTrack: null,
  sliderValue: 0,
  isSeeking: false,
};

const playerReducers = (state = initState, action) => {
  let newState = state;

  switch (action.type) {
    case playerActions.CHANGE_IS_PLAYING:
      // console.log('pppppppppppppprrrrrrrrrrrrrrr',STATE_PLAYING)
      // console.log('REEEEEEEEEEEEEEEEE',action)
      newState = {...state, ...action.payload};
      break;
    case playerActions.CHANGE_IS_PAUSED:
      newState = {...state, ...action.payload};
      break;

    /**
     * for SET_IS_SEEKING just pass type argument and set value
     * from playerReducer.js auto if seekingValue equle false change to true
     * and if true change to false
     */
    case playerActions.SET_IS_SEEKING:
      if(state.isSeeking === false){
          newState = {...state,isSeeking:true}
      }else if(state.isSeeking === true) {
          newState = {...state,isSeeking:false}
      }
      break;
    case playerActions.SET_SLIDER_VALUE:
        newState = {...state,sliderValue:action.payload}
      break;
    default:
      break;
  }

  return newState;
};

export default playerReducers;
