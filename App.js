import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './app/store';
import Account from './app/screens/Account';
import NowPlaying from './app/screens/NowPlaying';
import MainScreen from './app/screens/MainScreen';
import PlayList from './app/screens/PlayList';
import TrackPlayer,{Capability,Event,useTrackPlayerEvents} from 'react-native-track-player'
import ManagePlayLists from './app/screens/ManagePlayLists';
import EditPlaylistScreen from './app/screens/EditPlaylistScreen';
import ListOfPlaylistsNameScreen from './app/screens/ListOfPlaylistsNameScreen';
const Stack = createStackNavigator();

const App = () => {

  let isTrackChanged = false;
  useEffect(async() => {
    isTrackChanged = false;
  //  await TrackPlayer.setupPlayer()
  //  await TrackPlayer.updateOptions({
      // stopWithApp: true,
      // capabilities: [
      //   Capability.Play,
      //   Capability.Pause,
      //   Capability.JumpForward,
      //   Capability.JumpBackward,
      //   Capability.SkipToNext,
      //   Capability.SkipToPrevious,
      // ],
      // compactCapabilities: [Capability.Play, Capability.Pause],
    // });
  }, [isTrackChanged]);





  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Account"
            component={Account}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="NowPlaying"
            component={NowPlaying}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PlayList"
            component={PlayList}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Manage Playlist"
            component={ManagePlayLists}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="EditPlaylistScreen"
            component={EditPlaylistScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ListOfPlaylistsNameScreen"
            component={ListOfPlaylistsNameScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
