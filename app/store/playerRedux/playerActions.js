export default {
    CHANGE_IS_PLAYING:'CHANGE_IS_PLAYING',
    CHANGE_IS_PAUSED: 'CHANGE_IS_PAUSED',
    SET_SLIDER_VALUE: 'SET_SLIDER_VALUE',
    
    /**
     * for SET_IS_SEEKING just pass type argument and set value 
     * from playerReducer.js auto if seekingValue equle false change to true
     * and if true change to false
     */
    SET_IS_SEEKING:'SET_IS_SEEKING',

    RESET_PLAYER_REDUX:'RESET_PLAYER_REDUX'
}