import React from 'react'
import {
    View,
    Dimensions,
    ScrollView,
  } from 'react-native';
  import {connect} from 'react-redux'
  import FilteredWithArtistItem from './FilteredWithArtistItem';
function FilteredWithArtist({tracks,navigation}) {


      const tracksArtistNames = []
      const renderArtistList = tracks.map((track) => {

        if (!tracksArtistNames.includes(track.artist)) {
          tracksArtistNames.push(track.artist) 
          return <FilteredWithArtistItem 
          navigation={navigation}
          key={Math.random(10)}
          artwork={track.artwork}
          album={track.album}
          artist={track.artist}/>
        }
      });

    return (
        <ScrollView 
        style={
          {
            height:Dimensions.get('window').height,
            width: Dimensions.get('window').width  ,
            flexDirection:'column',
          }}
          >
        <View style={{flexDirection:'column'}}>
  
            {renderArtistList}
        </View>
         
         
          </ScrollView>
    )
}

const mapState = (state)=>{
    return {
      tracks:state.tracksRedux.tracks
    }
  }


export default connect(mapState)(FilteredWithArtist)
