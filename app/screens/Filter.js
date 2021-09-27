import React, {useState,useEffect} from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import FilteredWithAlbum from '../layout/Filters/AlbumFilter/FilteredWithAlbum';
import FilteredWithArtist from '../layout/Filters/ArtistFilter/FilteredWithArtist'
import FilteredWithGenres from '../layout/Filters/genresFilter/FilteredWithGenres'
import LinearGradient from 'react-native-linear-gradient'
import asyncStorageActions from '../store/AsyncStorage/asyncStorageActions';

function Filter({navigation,playlists,tracks,checkPlaylistForExistingTracks}) {

  /**
   * this state just for change style for filter buttons.
   */
  const [ActiveButtonStyles, setActiveButtonStyles] = useState('Album');
  console.log('MILAD',typeof playlists)
  useEffect(async() => {
    console.log('ggggggggg',playlists)
   await checkPlaylistForExistingTracks({tracks:tracks,playlists:playlists})
  }, [])

  const filterWithAlbumButton = (e) => {
    // console.log('oooooooMUSIC ITEMS',musicItems)

    // console.log('clicked-Login');
    setActiveButtonStyles('Album');
  };

  const filterWithArtistButton = (e) => {
    setActiveButtonStyles('Artist');
  };

  const filterWithGenresButton = (e) => {
    // navigation.push('MainScreen');
    setActiveButtonStyles('Genres');
  };

  const renderedActiveFilterLayout = ()=>{

    let ActiveFilteredLayout  
    switch (ActiveButtonStyles) {
      case 'Album':
        ActiveFilteredLayout = <FilteredWithAlbum navigation={navigation} />
        break;
      case 'Artist':
        ActiveFilteredLayout = <FilteredWithArtist navigation={navigation}/>
        break;
      case 'Genres':
        ActiveFilteredLayout = <FilteredWithGenres navigation={navigation} />
        break;
      default:
        break;
    }
    return ActiveFilteredLayout
  }

  return (
    <LinearGradient style={styles.container} colors={['#204f69','#2b2549']}>
      <View style={styles.ScreenTitleContianer}>
        <Text style={styles.ScreenTitle}>H O M E</Text>
      </View>
      <View style={styles.FilteredBy__Container}>
        <Text style={styles.FilteredBy__Title}>Filtered By</Text>
        <View>
    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{flexDirection:"row"}}>

        <Text
          style={
            ActiveButtonStyles === 'Album'
            ? styles.ActiveFilterButton
            : styles.InactiveFilterButton
          }
          onPress={filterWithAlbumButton}>
          Album
        </Text>
        <Text
          style={
            ActiveButtonStyles === 'Artist'
            ? styles.ActiveFilterButton
            : styles.InactiveFilterButton
          }
          onPress={filterWithArtistButton}>
          Artist
        </Text>
        <Text
          style={
            ActiveButtonStyles === 'Genres'
            ? styles.ActiveFilterButton
            : styles.InactiveFilterButton
          }
          onPress={filterWithGenresButton}>
          Genres
        </Text>

        
        
            </ScrollView>
            </View>
      </View>

      <View style={{marginTop: 30, alignItems: 'center'}}>
        <Text style={styles.FilteredBy__Title}>
          {ActiveButtonStyles}
        </Text>
      </View>
      {renderedActiveFilterLayout()}
    </LinearGradient>
  );
}

const mapState = (state)=>{
  return {
    playlists:state.asyncStorageRedux.playlists,
    tracks:state.tracksRedux.tracks
  }
}

const mapDispatch = (dispatch)=>{
  return {
    checkPlaylistForExistingTracks:(payload)=>{
      dispatch({
        type:asyncStorageActions.CHECK_PLAYLIST_FOR_EXISTING_TRACKS,
        payload
      })
    }
  }
}

export default connect(mapState,mapDispatch)(Filter);

const styles = StyleSheet.create({
  container: {
    // height: "",
    backgroundColor: '#252a52',
    flexDirection: 'column',
    padding: 0,
    flex: 1,
    // borderWidth: 2,
    // borderColor: '#fff',
  },
  ScreenTitleContianer: {
    margin: 0,
    height: 75,
    padding: 0,
    alignItems: 'center',
    paddingTop: 16,
    // flex: 1,
    flexDirection: 'column',
    // position: 'relative',
    // borderWidth: 2,
    // borderColor: '#fff',
  },
  ScreenTitle: {
    color: '#fff',
    textAlign: 'center',
    alignContent: 'center',
    paddingTop: 8,
    fontSize: 12,
    borderRadius: 50,
    // borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#ff4a6b',
    // bottom: 300,
    width: 150,
    height: 30,
    shadowColor: '#303030',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2.22,

    elevation: 6,
  },

  FilteredBy__Container: {
    // marginTop: 30,
    // alignItems: 'center',
    // borderWidth: 2,
    // borderColor: 'red',
    // paddingBottom:0,
    // borderColor:'#858585',
    // borderBottomWidth:2,
  },

  FilteredBy__Title: {
    color: '#fff',
    // textAlign: 'c',
    alignItems: 'flex-start',
    // marginTop: 22,
    paddingTop: 4,
    fontSize: 22,
    // borderRadius: 50,
    // borderWidth: 2,
    // borderColor: '#fff',
    // backgroundColor: 'rgb(248, 74, 107)',
    // bottom: 300,
    width: Dimensions.get('window').width - 10,
    // height: 40,
    // borderWidth: 2,
    // borderColor: '#fff',
  },
  FilteredByText: {
    color: '#fff',
    // textAlign: 'c',
    // alignContent:'space-between',
    alignItems: 'flex-start',
    // marginTop: 22,
    // paddingTop: 4,
    fontSize: 18,
    // borderRadius: 50,
    // borderWidth: 2,
    // borderColor: '#fff',
    // backgroundColor: 'rgb(248, 74, 107)',
    // bottom: 300,
    width: Dimensions.get('window').width - 10,
    // height: 40,
  },
  ActiveFilterButton: {
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 14,
    marginLeft:8,
    marginRight:8,
    paddingLeft:16,
    paddingRight:16,
    paddingTop: 8,
    fontSize: 18,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: 'rgb(248, 74, 107)',
    // bottom: 300,
    // width: Dimensions.get('window').width - 150,
    height: 40,
  },
  InactiveFilterButton: {
    color: '#c6cad7',
    backgroundColor:'#6e7aa4',
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 14,
    marginLeft:8,
    marginRight:8,
    paddingLeft:16,
    paddingRight:16,
    paddingTop: 8,
    fontSize: 18,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    // bottom: 300,
    // width: Dimensions.get('window').width - 180,
    height: 40,
  },
  // GenresButton: {
  //   color: '#fff',
  //   textAlign: 'center',
  //   alignItems: 'center',
  //   marginTop: 14,
  //   paddingTop: 8,
  //   fontSize: 18,
  //   borderRadius: 50,
  //   borderWidth: 2,
  //   borderColor: '#fff',
  //   // bottom: 300,
  //   width: Dimensions.get('window').width - 100,
  //   height: 40,
  // },
});
