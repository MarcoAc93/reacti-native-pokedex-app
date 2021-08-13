import { useEffect, useState } from "react";
import { pokemonApi } from "../api";
import { PokemonDetailsType } from "../types";

export const usePokemon = (pokemonId: string): { isLoading: boolean, pokemonDetails: PokemonDetailsType } => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetailsType>({} as PokemonDetailsType);

  const getPokemonDetails = async () => {
    const response = await pokemonApi.get<PokemonDetailsType>(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const { data } = response;
    setPokemonDetails(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getPokemonDetails();
  }, []);

  return {
    isLoading,
    pokemonDetails,
  };
};
