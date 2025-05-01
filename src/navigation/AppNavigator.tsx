import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainScreen from "../screens/MainScreen";
import BalikScreen from "../screens/BalikScreen";
import MeyveScreen from "../screens/MeyveScreen";
import SebzeScreen from "../screens/SebzeScreen";
import FavoriScreen from "../screens/FavoriScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen 
        name="Home" 
        component={MainScreen} 
        options={{
          title: "Anasayfa"
        }}/>
      <Stack.Screen 
        name="Fruits" 
        component={MeyveScreen} 
        options={{
          title: "Meyve"
        }}/>
      <Stack.Screen 
        name="Vegetables" 
        component={SebzeScreen} 
        options={{
          title: "Sebze"
        }}/>
      <Stack.Screen 
        name="Fish" 
        component={BalikScreen} 
        options={{
          title: "Balık"
        }}/>
      <Stack.Screen 
        name="Favorites" 
        component={FavoriScreen} 
        options={{
          title: "Favoriler"
        }}/>
    </Stack.Navigator>
  );
};

export default AppNavigator;
