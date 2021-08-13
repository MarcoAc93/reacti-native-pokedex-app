import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

import { styles } from "../styles";
export const Loading = () => {
  return (
    <View style={styles.activityIndicator}>
      <ActivityIndicator size={50} color='grey' />
      <Text>Loading...</Text>
    </View>
  );
};