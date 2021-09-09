import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import NowPlaying from '../screens/NowPlaying';
import PlayList from '../screens/PlayList';
import Account from '../screens/Account';
import Filter from '../screens/Filter';
import ManagePlayLists from '../screens/ManagePlayLists';

const MaterialTab = createMaterialBottomTabNavigator();

function MainTabNavigator() {
  return (
    <MaterialTab.Navigator
      initialRouteName="filter"
      tabBarIcon={{ focused: true, }}
      // lazy={true}
      activeColor="#ff4a6b"
      shifting={true}
      // inactiveColor="#f9f9f9"
      barStyle={{ backgroundColor: '#2b2549' }}>

      <MaterialTab.Screen
        name="managePlaylists"
        component={ManagePlayLists}
        options={{
          tabBarLabel: 'manage playlists',
          tabBarIcon: ({ color }) => <Icon name="list" size={20} color={color} />,
        }}
      />

      <MaterialTab.Screen
        name="nowPlaying"
        component={NowPlaying}
        options={{
          tabBarLabel: 'now playing',
          tabBarIcon: ({ color }) => <Icon name="music" size={20} color={color} />,
        }}
      />
      <MaterialTab.Screen
        name="playList"
        component={PlayList}
        options={{
          tabBarLabel: 'playlist',
          tabBarIcon: ({ color }) => <Icon name="play" size={20} color={color} />,
        }}
      />


      <MaterialTab.Screen
        name="filter"
        component={Filter}
        options={{
          tabBarLabel: 'home',
          tabBarIcon: ({ color }) => <Icon name="home" size={20} color={color} />,
        }}
      />
    </MaterialTab.Navigator>
  );
}

export default MainTabNavigator;
