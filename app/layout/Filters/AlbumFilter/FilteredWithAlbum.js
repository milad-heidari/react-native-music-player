import React from 'react';
import {
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux'
import FilteredWithAlbumItem from './FilteredWithAlbumItem';
function FilteredWithAlbum({ tracks, navigation }) {


  const tracksAlbumNames = []
  const renderAlbumList = tracks.map((track) => {
    if (!tracksAlbumNames.includes(track.album)) {
      tracksAlbumNames.push(track.album)
      return <FilteredWithAlbumItem
        navigation={navigation}
        key={Math.random(10)}
        artwork={track.artwork}
        album={track.album}
        artist={track.artist} />
    }
  });




  return (

    <ScrollView
      style={
        {
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
          flexDirection: 'column',
        }}
    >
      <View style={{ flexDirection: 'column' }}>

        {renderAlbumList}
      </View>


    </ScrollView>

  );
}

const mapState = (state) => {
  return {
    tracks: state.tracksRedux.tracks
  }
}

const mapDispatch = (dispatch) => {
  return {

  }
}

export default connect(mapState, mapDispatch)(FilteredWithAlbum);
