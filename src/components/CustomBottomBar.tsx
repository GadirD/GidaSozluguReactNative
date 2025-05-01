import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CustomBottomBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const tabs = [
    { name: "Home", label:"Anasayfa", icon: "home" },
    { name: "Fruits", label:"Meyve", icon: "fruit-cherries" },
    { name: "Vegetables", label:"Sebze", icon: "leaf" },
    { name: "Fish", label:"Balık", icon: "fish" },
    { name: "Favorites", label:"Favoriler", icon: "heart" },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = route.name === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.button}
            onPress={() => navigation.navigate(tab.name as never)}
          >
            <MaterialCommunityIcons
              name={tab.icon as any}
              size={28}
              color={isActive ? "#4CAF50" : "gray"}
            />
            <Text style={[styles.label, { color: isActive ? "#4CAF50" : "gray" }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomBottomBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  button: {
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    marginTop: 2,
  },
});
