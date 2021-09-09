import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import TrackPlayer from 'react-native-track-player';
import tracksActions from '../../../store/TracksRedux/tracksActions';

function FilteredWithGenresItem({
  navigation,
  genre,
  tracks,
  updateSortedTracks,
}) {
  const genreItemClickHandler = (e) => {
    const sortTracksWithGenre = tracks.filter((track) => {
      if (track.genre === genre) {
        return track;
      }
    });
    TrackPlayer.reset();
    TrackPlayer.add(sortTracksWithGenre);
    updateSortedTracks(sortTracksWithGenre);
    navigation.navigate('playList');
  };

  return (
      <View style={Styles.GenreTitleContianer}>
        <Text onPress={genreItemClickHandler} style={Styles.GenreTitle}>{genre}</Text>
      </View>
  );
}

const mapState = (state) => {
  return {
    tracks: state.tracksRedux.tracks,
  };
};

const mapDispatch = (dispatch) => {
  return {
    updateSortedTracks: (payload) => {
      dispatch({
        type: tracksActions.UPDATE_SORTED_TRACKS,
        payload: payload,
      });
    },
  };
};

export default connect(mapState, mapDispatch)(FilteredWithGenresItem);

const Styles = StyleSheet.create({
  GenreTitleContianer: {
    width: Dimensions.get('window').width ,
    marginTop: 16,
    marginRight: 4,
    marginLeft: 8,
    flexDirection: 'row',
  },
  GenreTitle: {
    color: '#fff',
    textAlign: 'center',
    alignContent: 'center',
    paddingTop: 6,
    paddingLeft:8,
    paddingRight:8,
    fontSize: 12,
    borderRadius: 50,
    borderColor: '#fff',
    backgroundColor: 'rgb(248, 74, 107)',
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
