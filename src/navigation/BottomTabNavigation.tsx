import React from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { RootStackParams, StackNavigation } from './StackNavigation';

import { Search } from '../screens/Search';
import { Pokemon } from '../screens/Pokemon';

const BottomTab = createBottomTabNavigator();
const StackTab = createStackNavigator<RootStackParams>();

export const SearchNavigation = () => (
  <StackTab.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: 'white'
      }
    }}
  >
    <StackTab.Screen name='Home' component={Search} />
    <StackTab.Screen name='Pokemon' component={Pokemon} />
  </StackTab.Navigator>
);

export const BottomTabNavigation = () => (
  <BottomTab.Navigator
    sceneContainerStyle={{
      backgroundColor: 'white'
    }}
    tabBarOptions={{
      activeTintColor: '#5856D6',
      labelStyle: {
        marginBottom: (Platform.OS === 'ios' ? 0 : 10)
      },
      style: {
        borderWidth: 0,
        elevation: 0,
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.90)'
      }
    }}
  >
    <BottomTab.Screen
      name='Home'
      component={StackNavigation}
      options={{
        tabBarLabel: 'All Pokemons',
        tabBarIcon: ({ color }) => <Icon size={25} name='list-outline' color={color} />
      }}
    />
    
    <BottomTab.Screen
      name='Search'
      component={SearchNavigation}
      options={{
        tabBarLabel: 'Search Pokemon',
        tabBarIcon: ({ color }) => <Icon size={25} name='search-outline' color={color} />
      }}
    />
  </BottomTab.Navigator>
);
