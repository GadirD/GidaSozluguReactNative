import React, { useEffect, useState, useContext } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";
import FoodCard from "../components/FoodCard";
import { FoodContext, FoodItem } from "../context/FoodContext";

const MainScreen: React.FC = () => {
  const { foodData, setFoodData, refreshFlag } = useContext(FoodContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<FoodItem[]>("http://192.168.1.104:8000/api/fooditems/");
        setFoodData(res.data);
      } catch (error) {
        console.error("Veri alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshFlag]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      initialNumToRender={10}
      maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
      data={foodData}
      renderItem={({ item }) => <FoodCard item={item} />}
      keyExtractor={(item) => item.Id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainScreen;
