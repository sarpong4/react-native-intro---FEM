import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ColorBox = ({ ColorName, ColorHex }) => {
  const boxColor = {
    backgroundColor: ColorHex,
  };

  const textColor = {
    color:
      parseInt(ColorHex.replace("#", ""), 16) > 0xffffff / 1.1
        ? "black"
        : "white",
  };
  return (
    <View style={[styles.container, boxColor]}>
      <Text style={(styles.boxText, textColor)}>
        {ColorName}: {ColorHex}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "column",
    paddingHorizontal: 15,
    marginVertical: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  boxText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ColorBox;
