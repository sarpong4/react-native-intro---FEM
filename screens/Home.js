import React, { useState, useCallback, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Text,
} from "react-native";
import PalettePreview from "../components/PalettePreview";

const Home = ({ navigation, route }) => {
  const newColorPalette = route.params
    ? route.params.newColorPalette
    : undefined;
  const [colorPalette, setColorPalette] = useState([]);
  const [Isrefreshing, setIsrefreshing] = useState(false);

  const fetchColorPalette = useCallback(async () => {
    const result = await fetch(
      "https://color-palette-api.kadikraman.now.sh/palettes"
    );
    if (result.ok) {
      const palettes = await result.json();
      setColorPalette(palettes);
    }
  }, []);

  useEffect(() => {
    fetchColorPalette();
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsrefreshing(true);
    await fetchColorPalette();
    setTimeout(() => {
      setIsrefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (newColorPalette) {
      setColorPalette((palette) => [newColorPalette, ...palette]);
    }
  }, [newColorPalette]);

  return (
    <FlatList
      styles={styles.list}
      data={colorPalette}
      keyExtractor={(item) => item.paletteName}
      renderItem={({ item }) => (
        <PalettePreview
          onPress={() => navigation.push("ColorPalette", item)}
          palette={item}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={Isrefreshing} onrefresh={handleRefresh} />
      }
      ListHeaderComponent={
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ColorPaletteModal");
          }}
        >
          <Text style={styles.buttonText}>Add a color Scheme</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "teal",
    marginBottom: 10,
  },
});

export default Home;

// color-palette-api.kadikraman.now.sh/palette
