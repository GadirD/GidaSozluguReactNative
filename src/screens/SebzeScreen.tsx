// src/screens/MainScreen.tsx
import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import FoodCard from "../components/FoodCard";
import { FoodItem } from "../components/FoodCard";

const MainScreen: React.FC = () => {
  const [data, setData] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://10.116.34.150:8000/api/vegitems/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Veri çekme hatası:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <FoodCard key={item.Id} item={item} />} // ✅ bu şekilde
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
