import React, { useState, useEffect, useRef} from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, Image } from "react-native";
import ImageColors from 'react-native-image-colors'
import { useNavigation } from "@react-navigation/native";

import { FadeInImage } from "./FadeInImage";

import { PokemonType } from '../../../types'

interface PokemonCardProps {
  pokemon: PokemonType;
};

const width = Dimensions.get('window').width;

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const navigation = useNavigation();
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);

  useEffect(() => {
    const fetchColors = async () => {
      if (!isMounted) return;

      const colors = await ImageColors.getColors(pokemon.picture, { fallback: 'grey' });
      if (Platform.OS === 'android') {
        setBgColor(colors.dominant);
      } else {
        setBgColor(colors.background);
      }
    }
    fetchColors();

    return () => {
      isMounted.current = false;
    }
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => navigation.navigate('Pokemon', { pokemon, color: bgColor })}
    >
      <View style={{
        ...styles.container,
        width: width * 0.4,
        backgroundColor: bgColor
      }}>
        <Text style={{...styles.name}}>
          {pokemon.name}
          {'\n#' + pokemon.id}
        </Text>

        <View style={styles.pokeballContainer}>
          <Image source={require('../../../assets/pokeball.png')} style={styles.pokeball} />
        </View>

        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    height: 120,
    width: 150,
    marginBottom: 25,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 20
  },
  pokeball: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -25,
    bottom: -25
  },
  pokemonImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -5,
    bottom: -10
  },
  pokeballContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.6
  }
});
