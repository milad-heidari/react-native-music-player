import React from 'react'
import {connect} from 'react-redux';
import { View, Dimensions, Text, Pressable, Modal, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PlaylistItemForModal from '../layout/PlaylistItemforModal';
function EditPlaylistScreen({ route,playlists,allTracks }) {

    console.log('pppo',route.params.playlists)

    const title = route.params.title

    const playlistName = title.replace("_", " ")
  const currentPlaylistValue = playlists.filter(playlist => {
    if (playlist[0] === title) {
      // console.log('true',title,playlist[1])
      return playlist
    }

  })
  // console.log('rrrr', title)
  const filterExistTracksOncurrntPlaylist = allTracks.filter(track => {
    const values = currentPlaylistValue[0]
    if (values[1].includes(track.title)) {
      return {
        title: track.title,
        artist: track.artist,
      }
    }
  })
  const renderPlaylistItemForModal = filterExistTracksOncurrntPlaylist.map((track, index) => {
    return <PlaylistItemForModal
      key={index}
      playlistName={title}
      trackName={track.title}
      trackArtist={track.artist}
    />
  })





    return (
        <LinearGradient
            // colors={['#204f69', '#2b2549']}
            colors={['rgba(32,79,105,0.9)', 'rgba(43,37,73,0.9)']}
            style={{
                width: Dimensions.get('window').width,

                flexDirection: 'column',
                height: '100%',
                alignSelf: 'center',
            }}>
            <View
                style={{
                    // margin: 5,
                    marginTop: 14

                }}
            >

                <Text style={{
                    // marginBottom: 15,
                    color: '#fff',
                    // backgroundColor:'red',
                    textAlign: "center",
                    // marginTop: 10,
                    borderBottomColor: '#fff',
                    borderBottomWidth: 1,
                    marginLeft: 0,
                    marginRight: 0,
                    paddingBottom: 10,
                }}>
                    {`Edit Playlist ${playlistName}`}
                </Text>



                    {filterExistTracksOncurrntPlaylist.length > 0
                            ?
                            <ScrollView
                                style={{padding:0}}
                                showsVerticalScrollIndicator={false}>
                                    <View style={{marginBottom:100}}>
                                {renderPlaylistItemForModal}

                                    </View>
                            </ScrollView>

                            :
                            <Text
                                style={{
                                    marginTop: 30,
                                    fontSize: 18,
                                    color: '#fff',
                                    textAlign: "center",
                                }}
                            >
                                {`you don't have music in ${playlistName} playlist`}
                                </Text>
                                }

                {/* </View> */}
            </View>
        </LinearGradient>
    )
}


const mapState = (state)=>{
    return {
        playlists: state.asyncStorageRedux.playlists,
        allTracks: state.tracksRedux.tracks
    }
}

export default connect(mapState)(EditPlaylistScreen)
