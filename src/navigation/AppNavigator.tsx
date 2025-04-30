import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Alt menü için
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer, useNavigation } from "@react-navigation/native"; // useNavigation'ı buradan import et

import MainScreen from "../screens/MainScreen";
import BalikScreen from "../screens/BalikScreen";
import MeyveScreen from "../screens/MeyveScreen";
import SebzeScreen from "../screens/SebzeScreen";
import FavoriScreen from "../screens/FavoriScreen";

const Tab = createBottomTabNavigator(); // createBottomTabNavigator'ı kullanıyoruz

const AppNavigator = () => {
  const navigation = useNavigation(); // NavigationContext'i almak için useNavigation

  // Sayfa sıfırlama örneği: Ana sayfadan başka bir sayfaya gidildiğinde önceki ekranları temizle
  const resetNavigation = (screen: string) => {
    navigation.reset({
      index: 0, // Yeni yığın başlatacak
      routes: [{ name: screen }],
    });
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = ""; // İkon ismi için string tipinde bir değişken

          if (route.name === "Ana Sayfa") {
            iconName = "home";
          } else if (route.name === "Meyve") {
            iconName = "fruit-cherries"; // Meyve için alternatif ikon
          } else if (route.name === "Sebze") {
            iconName = "leaf"; // Sebze için yaprak ikonu
          } else if (route.name === "Balık") {
            iconName = "fish"; // Balık için ikon
          } else if (route.name === "Favoriler") {
            iconName = "heart"; // Favoriler için kalp ikonu
          }

          return (
            <MaterialCommunityIcons
              name={iconName as keyof typeof MaterialCommunityIcons.glyphMap}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="Ana Sayfa"
        component={MainScreen}
        listeners={{
          tabPress: () => {
            resetNavigation("Ana Sayfa");
          },
        }}
      />
      <Tab.Screen
        name="Meyve"
        component={MeyveScreen}
        listeners={{
          tabPress: () => {
            resetNavigation("Meyve");
          },
        }}
      />
      <Tab.Screen
        name="Sebze"
        component={SebzeScreen}
        listeners={{
          tabPress: () => {
            resetNavigation("Sebze");
          },
        }}
      />
      <Tab.Screen
        name="Balık"
        component={BalikScreen}
        listeners={{
          tabPress: () => {
            resetNavigation("Balık");
          },
        }}
      />
      <Tab.Screen
        name="Favoriler"
        component={FavoriScreen}
        listeners={{
          tabPress: () => {
            resetNavigation("Favoriler");
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
