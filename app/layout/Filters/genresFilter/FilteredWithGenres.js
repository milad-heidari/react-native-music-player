import React from 'react';
import {View, Dimensions, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import FilteredWithGenresItem from './FilteredWithGenresItem';
function FilteredWithGenres({tracks, navigation}) {
  const genres = [];

  tracks.map((track) => {
    if (!genres.includes(track.genre)) {
      genres.push(track.genre);
    }
  });

  const renderGenresList = genres.map((genre) => {
    return (
      <FilteredWithGenresItem
        navigation={navigation}
        key={Math.random(10)}
        genre={genre}
      />
    );
  });

  return (
    <ScrollView
      style={{
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        flexDirection: 'column',
      }}>
      <View style={{flexDirection: 'column'}}>{renderGenresList}</View>
    </ScrollView>
  );
}

const mapState = (state) => {
  return {
    tracks: state.tracksRedux.tracks,
  };
};

export default connect(mapState)(FilteredWithGenres);
