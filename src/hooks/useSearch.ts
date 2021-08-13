import { useEffect, useState } from "react";
import { pokemonApi } from "../api";
import { PokemonResults, PokemonType, PokemonResult } from "../types";

export const useSearch = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const allPokemonsUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1200';

  const mapPokemonList = (pokemonList: PokemonResult[]) => (
    pokemonList.map((pokemon: PokemonResult) => {
      const urlPaths = pokemon.url.split('/');
      const id = urlPaths[urlPaths.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      const name = pokemon.name;
      return { id, picture, name };
    })
  );

  const fetchPokemons = async () => {
    try {
      setIsFetching(true);
      const response = await pokemonApi.get<PokemonResults>(allPokemonsUrl);
      const { data: { results } } = response;
      setPokemons(mapPokemonList(results));
      setIsFetching(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return {
    isFetching,
    pokemons,
  };
};
