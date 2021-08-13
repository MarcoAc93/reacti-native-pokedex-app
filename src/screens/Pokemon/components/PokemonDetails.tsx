import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { PokemonDetailsType } from "../../../types";
import { FadeInImage } from "../../Home/components/FadeInImage";

interface Props {
  pokemon: PokemonDetailsType
};

export const PokemonDetails = ({ pokemon }: Props) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{
      ...StyleSheet.absoluteFillObject,
    }}>
      <View style={{ ...styles.container }}>
        <Text style={{ ...styles.title, marginTop: 370 }}>Types</Text>
        <Text style={{ fontSize: 18 }}>
          {pokemon.types.map(({ type }) => type.name).join(', ')}
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Weight</Text>
        <Text style={{ fontSize: 18 }}>{pokemon.weight}kg</Text>
      </View>

      <View>
        <Text style={{ ...styles.title, ...styles.container }}>Sprites</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FadeInImage uri={pokemon.sprites.front_default} style={styles.basicSprite} />
          <FadeInImage uri={pokemon.sprites.back_default} style={styles.basicSprite} />
          <FadeInImage uri={pokemon.sprites.front_shiny} style={styles.basicSprite} />
          <FadeInImage uri={pokemon.sprites.back_shiny} style={styles.basicSprite} />
        </ScrollView>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Abilities</Text>
        <Text style={{ fontSize: 18 }}>
          {pokemon.abilities.map(({ ability }) => ability.name).join(', ')}
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Movements</Text>
        <Text style={{ fontSize: 18 }}>
          {pokemon.moves.map(({ move }) => move.name).join(', ')}
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Stats</Text>
        {pokemon.stats.map((stat, index) => (
          <View key={`stat-${index}`} style={{ flexDirection: 'row' }}>
            <Text style={{ marginRight: 10, fontSize: 18, width: 150 }}>{stat.stat.name}</Text>
            <Text style={{ marginRight: 10, fontSize: 18, fontWeight: 'bold' }}>{stat.base_stat}</Text>
          </View>
        ))}
      </View>

      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <FadeInImage uri={pokemon.sprites.front_shiny} style={{ width: 80, height: 80 }} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold'
  },
  basicSprite: {
    width: 100,
    height: 100
  }
});
