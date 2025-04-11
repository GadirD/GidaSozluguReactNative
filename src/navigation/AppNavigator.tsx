import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import MainScreen from '../screens/MainScreen';
import BalikScreen from '../screens/BalikScreen';
import MeyveScreen from '../screens/MeyveScreen';
import SebzeScreen from '../screens/SebzeScreen';
import FavoriScreen from '../screens/FavoriScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Ana Sayfa" component={MainScreen} />
        <Tab.Screen name="Balık" component={BalikScreen} />
        <Tab.Screen name="Meyve" component={MeyveScreen} />
        <Tab.Screen name="Sebze" component={SebzeScreen} />
        <Tab.Screen name="Favoriler" component={FavoriScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
