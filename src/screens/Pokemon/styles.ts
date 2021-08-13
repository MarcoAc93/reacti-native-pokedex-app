import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.5
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -10
  }
});
