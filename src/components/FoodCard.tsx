import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Linking,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FoodContext } from "../context/FoodContext";
import { FoodItem } from "../context/FoodContext";

const FoodCard = ({ item }: { item: FoodItem }) => {
  const [expanded, setExpanded] = useState(false);
  const [note, setNote] = useState(item.Notu || "");
  const [favori, setFavori] = useState(item.Favori);
  const { foodData, setFoodData } = useContext(FoodContext);
  const { setRefreshFlag } = useContext(FoodContext);

  const BASE_URL = "http://192.168.1.104:8000";

  const handleNoteSave = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/update-note/${item.Id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ note }),
      });
  
      if (!response.ok) {
        throw new Error("Not güncellenemedi");
      }
  
      Alert.alert("Başarılı", "Not kaydedildi!");
      setRefreshFlag((prev) => prev + 1); // Veriyi yenile
    } catch (error) {
      console.error(error);
      Alert.alert("Hata", "Not kaydedilirken bir hata oluştu.");
    }
  };

  const handleToggleFavorite = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/toggle-favorite/${item.Id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Favori güncellenemedi");
      }
  
      setFavori(!favori);
      setRefreshFlag((prev) => prev + 1); // Veriyi yenile
    } catch (error) {
      console.error(error);
      Alert.alert("Hata", "Favori durumu güncellenemedi.");
    }
  };
  

  return (
    <TouchableOpacity
      onPress={() => setExpanded(!expanded)}
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 16,
        marginVertical: 8,
        elevation: 4,
      }}
    >
      <Image
        source={{ uri: `${BASE_URL}${item.ResimUrl}` }}
        style={{ width: "100%", height: 200, borderRadius: 10 }}
        resizeMode="cover"
      />
      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 8 }}>
        {item.Isim}
      </Text>
      <Text>Tür: {item.Tur}</Text>
      <Text>Mevsim: {item.Mevsim}</Text>
      <Text style={{ marginBottom: 6 }}>{item.Aciklama}</Text>

      {expanded && (
        <>
          <Text style={{ marginTop: 10, fontWeight: "bold" }}>Faydalar:</Text>
          <Text>{item.Fayda}</Text>

          <Text style={{ marginTop: 10, fontWeight: "bold" }}>
            Uzman Yorumları:
          </Text>
          <Text>{item.Yorum}</Text>

          <Text style={{ marginTop: 10, fontWeight: "bold" }}>Notun:</Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Not yaz..."
            style={{
              backgroundColor: "#f0f0f0",
              borderRadius: 8,
              padding: 8,
              marginTop: 4,
              marginBottom: 8,
            }}
          />
          <TouchableOpacity
            onPress={handleNoteSave}
            style={{
              backgroundColor: "#4CAF50",
              padding: 8,
              borderRadius: 6,
              marginBottom: 8,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Notu Kaydet
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => Linking.openURL(item.Tarif.replace(/^"|"$/g, ""))}
            style={{
              backgroundColor: "#2196F3",
              padding: 8,
              borderRadius: 6,
              marginBottom: 8,
            }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Tarife Git
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleToggleFavorite}
            style={{ alignItems: "center", marginTop: 6 }}
          >
            <Ionicons
              name={favori ? "heart" : "heart-outline"}
              size={28}
              color={favori ? "red" : "gray"}
            />
            <Text>{favori ? "Favorilerden çıkar" : "Favorilere ekle"}</Text>
          </TouchableOpacity>
        </>
      )}
    </TouchableOpacity>
  );
};

export default FoodCard;
