import React from 'react';
import { FlatList, Image, ActivityIndicator, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PokemonCard } from './components/PokemonCard';
import { usePokemons } from '../../hooks/usePokemons';  

import { appTheme } from '../../theme';
import { styles } from './styles';

export const Home = () => {
  const { top } = useSafeAreaInsets();
  const { isLoading, pokemons, getPokemons } = usePokemons();

  return (
    <>
      <Image source={require('../../assets/pokeball-black.png')} style={styles.pokeballImage} />
      <View style={{ alignItems: 'center' }}>
        <FlatList
          data={pokemons}
          keyExtractor={item => item.name}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={(
            <Text
              style={{
                ...appTheme.title,
                ...appTheme.globalMargin,
                top,
                marginBottom: top + 20
              }}
            >
              Pokedex
            </Text>
          )}
          // stickyHeaderIndices={[0]}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
          onEndReached={getPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={<ActivityIndicator style={{ height: 100 }} color='grey' />}
        />
      </View>
    </>
  );
};
