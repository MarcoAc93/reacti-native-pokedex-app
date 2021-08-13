import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../screens/Home";
import { Pokemon } from "../screens/Pokemon";
import { PokemonType } from "../types";

export type RootStackParams = {
  Home: undefined;
  Pokemon: {
    pokemon: PokemonType;
    color: string;
  };
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigation = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: 'white'
      }
    }}
  >
    <Stack.Screen name='Home' component={Home} />
    <Stack.Screen name='Pokemon' component={Pokemon} />
  </Stack.Navigator>
);
