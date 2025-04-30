import React, { useEffect, useState, useContext } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from "react-native";
import axios from "axios";
import FoodCard from "../components/FoodCard";
import { FoodContext, FoodItem } from "../context/FoodContext";
import BASE_URL from "../config/apiConfig";

const MeyveScreen: React.FC = () => {
  const { foodData, setFoodData, refreshFlag } = useContext(FoodContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Add state for error handling

  useEffect(() => {
    setFoodData([]); // Yeni verileri yüklemeden önce mevcut veriyi sıfırla
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get<FoodItem[]>(`${BASE_URL}/api/fruititems/`);
        setFoodData(res.data);
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          setError(error.message || "An unexpected error occurred");
        } else {
          setError("Failed to fetch data.");
        }
        console.error("Veri alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [refreshFlag, setFoodData]); // refreshFlag değiştiğinde veri yeniden yüklenecek
  

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center'
  }
});

export default MeyveScreen;
