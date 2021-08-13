import React from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParams } from '../../navigation/StackNavigation';
import { FadeInImage } from '../Home/components/FadeInImage';
import { PokemonDetails } from './components/PokemonDetails';

import { styles } from './styles';
interface Props extends StackScreenProps<RootStackParams, 'Pokemon'>{};

import { usePokemon } from '../../hooks/usePokemon';

export const Pokemon = ({ navigation, route }: Props) => {
  const { top } = useSafeAreaInsets();
  const { color } = route.params;
  const { name, id, picture } = route.params.pokemon;
  const { pokemonDetails, isLoading } = usePokemon(id);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ ...styles.headerContainer, backgroundColor: color }}>
        <TouchableOpacity activeOpacity={0.5}  style={{ ...styles.backButton, top: top + 5 }} onPress={navigation.goBack}>
          <Icon name='arrow-back-outline' color='white' size={30} />
        </TouchableOpacity>

        <Text style={{ ...styles.pokemonName, top: top + 40 }}>
          {`${name} \n# ${id}`}
        </Text>

        <Image source={require('../../assets/pokeball.png')} style={styles.pokeball} />

        <FadeInImage uri={picture} style={styles.pokemonImage} />
      </View>

      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemonDetails} />
      )}

    </View>
  );
};
