import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import globalStyles from "../styles/globalStyles";

const CustomBottomBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const tabs = [
    { name: "Home", label: "Anasayfa", icon: "home" },
    { name: "Fruits", label: "Meyve", icon: "fruit-cherries" },
    { name: "Vegetables", label: "Sebze", icon: "leaf" },
    { name: "Fish", label: "Balık", icon: "fish" },
    { name: "Favorites", label: "Favoriler", icon: "heart" },
  ];

  return (
    <View style={globalStyles.bottomBarContainer}>
      {tabs.map((tab) => {
        const isActive = route.name === tab.name;
        return (
          <TouchableOpacity
            key={tab.name}
            style={globalStyles.bottomBarButton}
            onPress={() => navigation.navigate(tab.name as never)}
          >
            <MaterialCommunityIcons
              name={tab.icon as any}
              size={28}
              color={isActive ? "#4CAF50" : "gray"}
            />
            <Text
              style={[
                globalStyles.bottomBarLabel,
                { color: isActive ? "#4CAF50" : "gray" },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomBottomBar;
