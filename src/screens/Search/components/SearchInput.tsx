import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { View, TextInput, Platform, StyleProp, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDebounce } from "../../../hooks/useDebounce";

interface Props {
  style?: StyleProp<ViewStyle>;
  onDebounce: (value: string) => void;
};

import { styles } from "../styles";
export const SearchInput = ({ style, onDebounce }: Props) => {
  const [value, setValue] = useState('');
  const { debounceValue } = useDebounce(value, 1000);

  useEffect(() => {
    console.log(debounceValue);
    onDebounce(debounceValue);
  }, [debounceValue]);

  return (
    <View style={{ ...styles.textBackground, ...style as any }}>
      <TextInput
        autoCapitalize='none'
        autoCorrect={false}
        placeholder='Search'
        style={{ ...styles.textInput, top: Platform.OS === 'android' ? 2 : 0 }}
        value={value}
        onChangeText={setValue}
      />
      <Icon name='search-outline' size={20}  />
    </View>
  );
};
