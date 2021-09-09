import React,{useState,useEffect} from 'react'
import { View, Text, StyleSheet, TextInput,ToastAndroid, Pressable, ScrollView } from 'react-native';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Playlists from '../layout/Playlists';
import asyncStorageActions from '../store/AsyncStorage/asyncStorageActions';
function ManagePlayLists({allPlaylistNames,createPlayListBtnHandler}) {
    useEffect(() => {

    },[])

    /**
     * inputTextCreatePlayList state get value from InputText and onChangeText attribute.
     */
    const [inputTextCreatePlayList, setInputTextCreatePlayList] = useState('')
    const createPlayListBtnHandlerfunc = ()=>{
        if(inputTextCreatePlayList === ''){
            ToastAndroid.showWithGravity(
                'type name for playlist',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                ToastAndroid.BOTTOM
            )
        }else{

        
        const allPlaylistNamesUpperCase = allPlaylistNames.map(name => name.replace(" ","_").toUpperCase())
        const newPlaylistNameUpperCase = inputTextCreatePlayList.replace(" ","_").toUpperCase()
        console.log(newPlaylistNameUpperCase)
        console.log(allPlaylistNamesUpperCase)
        if (allPlaylistNamesUpperCase.includes(newPlaylistNameUpperCase)) {
            console.log('innnn')
            ToastAndroid.showWithGravity(
                'this playlist already exist',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                ToastAndroid.BOTTOM
            )
        }else {

            createPlayListBtnHandler([
                inputTextCreatePlayList,
                []
            ])
            setInputTextCreatePlayList('')
            ToastAndroid.showWithGravity(
                'playlist created',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                ToastAndroid.BOTTOM
            )
        }
    }
    }
    

    return (
        <LinearGradient style={styles.container} colors={['#204f69', '#2b2549']}>

            <View style={{
                flexDirection: 'row',
                margin: 10,
            }}>
                <TextInput
                    placeholder='create new playlist'
                    onChangeText={(textValue) => {
                    setInputTextCreatePlayList(textValue)
                    }}
                    value={inputTextCreatePlayList}
                    maxLength={30}
                    
                    style={{
                        backgroundColor: 'rgba(255,255,255,0.9)',
                        borderTopLeftRadius:50,
                        borderBottomLeftRadius:50,
                        flex: 2,
                        paddingLeft: 14,
                        paddingRight: 14,
                    }} />

                <Pressable
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        paddingBottom: 6,
                        borderTopRightRadius:50,
                        borderBottomRightRadius:50,
                        backgroundColor: "rgb(248, 74, 107)",
                    }}
                    onPress={
                        createPlayListBtnHandlerfunc
                    }
                >
                    <Text style={{
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 16,
                        textAlign: "center"
                    }}>create</Text>
                </Pressable>

            </View>
            <View style={{
                flexDirection:'column',
                flex: 1,
            }}>
                <View style={{
                    marginTop: 10,
                    borderBottomColor: '#fff',
                    borderBottomWidth: 1,
                    marginLeft: 10,
                    marginRight: 10,
                    padding: 10,
                }} >
                    <Text style={{

                        color: '#fff',
                        fontWeight: "bold",
                        fontSize: 16,
                        textAlign: "center"
                    }} >your playlists</Text>
                </View>
                <ScrollView style={{
                    }} showsVerticalScrollIndicator={false}>
                        <Playlists/>
                </ScrollView>
            </View>
        </LinearGradient>
    )
}

const mapState = (state)=>{
    return {
        allPlaylistNames:state.asyncStorageRedux.allPlaylistNames
    }
}

const mapDispatch = (dispatch)=>{
    return {
        createPlayListBtnHandler:(payload)=>{
            dispatch({
                type:asyncStorageActions.CREATE_NEW_PLAYLIST_WITH_ASYNC_STORAGE,
                payload
            })
        }
    }
}

export default connect(mapState,mapDispatch)(ManagePlayLists)


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#252a52',
        flexDirection: 'column',
        padding: 0,
        flex: 1,
    },
})