import React, { useEffect, useState, useContext } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import axios from "axios";
import FoodCard from "../components/FoodCard";
import { FoodContext, FoodItem } from "../context/FoodContext";
import BASE_URL from "../config/apiConfig";
import CustomBottomBar from "../components/CustomBottomBar";
import globalStyles from "../styles/globalStyles";

const FavoriScreen: React.FC = () => {
  const { foodData, setFoodData, refreshFlag } = useContext(FoodContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchText, setSearchText] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("Hepsini Göster");
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const seasonColors: { [key: string]: string } = {
    "Ilkbahar": "#81C784",
    "Yaz": "#FFB74D",
    "Sonbahar": "#A1887F",
    "Kis": "#64B5F6",
  };
  

  useEffect(() => {
    setFoodData([]);
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get<FoodItem[]>(`${BASE_URL}/api/favitems/`);
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
  }, [refreshFlag, setFoodData]);

  const filteredData = (foodData || []).filter((item) => {
    const matchesSearch =
      item.Isim.toLowerCase().includes(searchText.toLowerCase()) ||
      (item.Yorum || "").toLowerCase().includes(searchText.toLowerCase());
    const matchesSeason =
      selectedSeason === "Hepsini Göster" || item.Mevsim === selectedSeason;
    return matchesSearch && matchesSeason;
  });

  if (loading) {
    return (
      <View style={globalStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={globalStyles.errorContainer}>
        <Text style={globalStyles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={globalStyles.searchContainer}>
        <TextInput
          style={globalStyles.searchInput}
          placeholder="Ara..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity
          style={globalStyles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <Text style={globalStyles.filterButtonText}>Filtrele</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={filterModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={globalStyles.modalOverlay}>
          <View style={globalStyles.modalContent}>
            <Text style={globalStyles.modalTitle}>Mevsim Seç</Text>
            {["Hepsini Göster", "Ilkbahar", "Yaz", "Sonbahar", "Kis"].map(
              (season) => (
                <TouchableOpacity
                  key={season}
                  style={[
                    globalStyles.seasonButton,
                    {
                      backgroundColor:
                        selectedSeason === season
                          ? seasonColors[season] || "#4CAF50"
                          : "#E0E0E0",
                    },
                  ]}
                  onPress={() => {
                    setSelectedSeason(season);
                    setFilterModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      globalStyles.seasonButtonText,
                      { color: selectedSeason === season ? "#fff" : "#000" },
                    ]}
                  >
                    {season}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </View>
      </Modal>

      <FlatList
        initialNumToRender={10}
        maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
        data={filteredData}
        renderItem={({ item }) => <FoodCard item={item} />}
        keyExtractor={(item) => item.Id.toString()}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>Liste boş</Text>
        }
      />
      <CustomBottomBar />
    </View>
  );
};

export default FavoriScreen;
