import React from 'react'
import { connect } from 'react-redux';
import asyncStorageActions from '../store/AsyncStorage/asyncStorageActions';
import Text from '../components/partials/Text';
import View from '../components/partials/View';
import LinearGradient from 'react-native-linear-gradient';
import Pressable from '../components/partials/Pressable';
import ItemForLists from '../layout/ItemForLists';
import { ToastAndroid } from 'react-native';
function ListOfPlaylistsNameScreen({ route, AllPlaylistNames, playlists, addTrackToCurrentCustomPlaylist }) {

    const renderList = AllPlaylistNames.map((playlistName, index) => {
        const replacedName = playlistName.replace('_', " ")

        return <ItemForLists key={index} >
            <Pressable
                styles={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderTopLeftRadius: 50,
                    borderBottomLeftRadius: 50,
                    borderTopRightRadius: 50,
                    borderBottomRightRadius: 50,
                    borderRightColor: 'rgba(255,255,255,0.5)',
                    paddingLeft: 30,
                    paddingRight: 14,
                    paddingBottom: 10,
                    paddingTop: 10,
                    flex: 2,
                }}
                onPress={() => {
                    const currentPlaylist = playlists.filter(playlist => playlist[0] === playlistName)
                    // console.log('playlistsRL',currentPlaylist[0][1])
                    if (currentPlaylist[0][1].includes(route.params.title)) {
                        ToastAndroid.showWithGravity(
                            "this track already exist in playlist",
                            ToastAndroid.LONG,
                            ToastAndroid.CENTER,
                            ToastAndroid.BOTTOM
                        )
                    } else {

                        addTrackToCurrentCustomPlaylist({
                            key: playlistName,
                            newTrackName: route.params.title,
                        })
                        ToastAndroid.showWithGravity(
                            "added successfully",
                            ToastAndroid.LONG,
                            ToastAndroid.CENTER,
                            ToastAndroid.BOTTOM
                        )
                    }

                }}>
                <Text styles={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 16,
                }} text={replacedName} />
            </Pressable>
        </ItemForLists>
    })



    return (
        <LinearGradient
            style={{
                backgroundColor: '#252a52',
                flexDirection: 'column',
                padding: 0,
                flex: 1,
            }}
            colors={['#204f69', '#2b2549']} >

            <Text
                text={'Add to Playlist'}
                styles={{
                    color: '#fff',
                    textAlign: "center",
                    borderBottomColor: '#fff',
                    borderBottomWidth: 1,
                    marginLeft: 0,
                    marginRight: 0,
                    marginTop: 14,
                    paddingBottom: 10,

                }} />
            <View
                styles={{}}
            >
                {renderList}
            </View>
        </LinearGradient>
    )
}

const mapState = (state) => {
    return {
        AllPlaylistNames: state.asyncStorageRedux.allPlaylistNames,
        playlists: state.asyncStorageRedux.playlists,
    }
}

const mapDispatch = (dispatch) => {
    return {
        addTrackToCurrentCustomPlaylist: (payload) => {
            dispatch({
                type: asyncStorageActions.ADD_ITEM_FROM_ASYNC_STORAGE,
                payload
            })
        }
    }
}

export default connect(mapState, mapDispatch)(ListOfPlaylistsNameScreen)
