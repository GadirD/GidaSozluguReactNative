import React, { useEffect, useState, useContext } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import FoodCard from "../components/FoodCard";
import { FoodItem } from "../context/FoodContext";
import { FoodContext } from "../context/FoodContext";

const MainScreen: React.FC = () => {
  const [data, setData] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { foodData } = useContext(FoodContext);

  const mainItems = foodData;

  return (
    <FlatList
      initialNumToRender={10}
      maintainVisibleContentPosition={{
        minIndexForVisible: 0,
      }}
      data={mainItems}
      renderItem={({ item }) => <FoodCard item={item} />}
      keyExtractor={(item) => item.Id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainScreen;
