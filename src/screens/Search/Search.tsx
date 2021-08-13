import React, { useState } from "react";
import { View, Platform, FlatList, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SearchInput } from "./components/SearchInput";
import { PokemonCard } from "../Home/components/PokemonCard";
import { Loading } from "./components/Loading";
import { useSearch } from "../../hooks/useSearch";

const screenWidth = Dimensions.get('screen').width;
import { styles } from "./styles";
import { PokemonType } from "../../types";
import { useEffect } from "react";

export const Search = () => {
  const { top } = useSafeAreaInsets();
  const { isFetching, pokemons } = useSearch();
  const [textToSearch, setTextToSearch] = useState('');
  const [pokemonFiltered, setPokemonFiltered] = useState<PokemonType[]>([]);

  useEffect(() => {
    console.log(textToSearch);
    if (textToSearch.length === 0 || !textToSearch) return setPokemonFiltered([]);
    setPokemonFiltered(
      pokemons.filter(
        pokemon => pokemon.name.toLocaleLowerCase()
          .includes(textToSearch.toLocaleLowerCase()) || pokemon.id.includes(textToSearch)
      )
    );
  }, [textToSearch]);

  if (isFetching) return <Loading />;
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View>
        <SearchInput
          onDebounce={setTextToSearch}
          style={{
            zIndex: 999,
            width: screenWidth - 40, top: top + 10,
            position: 'relative'
          }}
        />
        <FlatList
          data={pokemonFiltered}
          keyExtractor={item => item.name}
          showsVerticalScrollIndicator={false}
          style={{ paddingTop: Platform.OS === 'android' ? 50 : 100 }}
          numColumns={2}
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
        />
      </View>
    </View>
  );
};
