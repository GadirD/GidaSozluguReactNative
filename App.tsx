import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/AppNavigator";
import { FoodProvider } from "./src/context/FoodContext";

const App = () => {
  return (
    <FoodProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </FoodProvider>
  );
};

export default App;
