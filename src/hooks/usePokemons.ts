import { useEffect, useRef, useState } from "react";
import { pokemonApi } from "../api";
import { PokemonResults, PokemonType, PokemonResult } from "../types";

export const usePokemons = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  let paginationUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=50');

  const mapPokemonList = (pokemonList: PokemonResult[]) => (
    pokemonList.map((pokemon: PokemonResult) => {
      const urlPaths = pokemon.url.split('/');
      const id = urlPaths[urlPaths.length - 2];
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
      const name = pokemon.name;
      return { id, picture, name };
    })
  );

  const getPokemons = async () => {
    try {
      setIsLoading(true);
      const response = await pokemonApi.get<PokemonResults>(paginationUrl.current);
      paginationUrl.current = response.data.next;
      const { data: { results } } = response;
      setPokemons([...pokemons, ...mapPokemonList(results)]);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return {
    pokemons,
    isLoading,
    getPokemons,
  };
};
