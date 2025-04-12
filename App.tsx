import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { FoodProvider } from "./src/context/FoodContext";

export default function App() {
  return (
    <FoodProvider>
      <AppNavigator />
    </FoodProvider>
  );
}
