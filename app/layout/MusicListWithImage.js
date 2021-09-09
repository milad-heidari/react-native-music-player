import React from 'react';
import {View, ScrollView} from 'react-native';
import MusicListWithImageItem from './MusicListWithImageItem';
import { connect } from 'react-redux';
function MusicListWithImage({ tracks }) {
  
  const tracksAlbumNames = []
  const renderAlbumList = tracks.map((track) => {
    if (!tracksAlbumNames.includes(track.album)) {
      tracksAlbumNames.push(track.album)
      return (
        <MusicListWithImageItem
        key={Math.random(10)}
        // id={track.id}
        artwork={track.artwork}
        album={track.album}
        />
        );
      }
  });

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      style={{ width: '100%' }}>
      <View style={{ flexDirection: 'row' }}>
        {renderAlbumList}
      </View>
    </ScrollView>
  );
}

const mapState = (state) => {
  return {
    tracks: state.tracksRedux.tracks,
  };
};

export default connect(mapState)(MusicListWithImage);
