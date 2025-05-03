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
import BASE_URL from "../config/apiConfig";
import globalStyles from "../styles/globalStyles";

const FoodCard = ({ item }: { item: FoodItem }) => {
  const [expanded, setExpanded] = useState(false);
  const [note, setNote] = useState(item.Notu || "");
  const [favori, setFavori] = useState(item.Favori);
  const { setRefreshFlag } = useContext(FoodContext);

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
      setRefreshFlag((prev) => prev + 1);
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
      setRefreshFlag((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      Alert.alert("Hata", "Favori durumu güncellenemedi.");
    }
  };

  return (
    <TouchableOpacity
      onPress={() => setExpanded(!expanded)}
      style={globalStyles.card}
    >
      <Image
        source={{ uri: `${BASE_URL}${item.ResimUrl}` }}
        style={globalStyles.cardImage}
        resizeMode="cover"
      />
      <Text style={globalStyles.cardTitle}>{item.Isim}</Text>
      <Text>Tür: {String(item.Tur ?? "")}</Text>
      <Text>Mevsim: {String(item.Mevsim ?? "")}</Text>
      <Text style={{ marginBottom: 6 }}>
        {item.Aciklama ? item.Aciklama : "Aciklama bilgisi yok"}
      </Text>

      {expanded && (
        <>
          <Text style={globalStyles.sectionTitle}>Faydalar:</Text>
          <Text>{item.Fayda ? item.Fayda : "Faydalar bilgisi yok"}</Text>

          <Text style={globalStyles.sectionTitle}>Uzman Yorumları:</Text>
          <Text>{item.Yorum ? item.Yorum : "Uzman yorumu yok"}</Text>

          <Text style={globalStyles.sectionTitle}>Notun:</Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Not yaz..."
            style={globalStyles.noteInput}
          />
          <TouchableOpacity
            onPress={handleNoteSave}
            style={globalStyles.saveButton}
          >
            <Text style={globalStyles.buttonText}>Notu Kaydet</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              if (item.Tarif) {
                Linking.openURL(item.Tarif.replace(/^"|"$/g, ""));
              } else {
                Alert.alert("Hata", "Tarif linki bulunamadı.");
              }
            }}
            style={globalStyles.recipeButton}
          >
            <Text style={globalStyles.buttonText}>Tarife Git</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleToggleFavorite}
            style={globalStyles.favoriteButton}
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
