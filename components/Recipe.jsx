import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import COLORS from "../constants/colors";
import Modalboolean from "./Modalboolean";
import styles from "../styles/Recipe";
import { useNavigation } from "@react-navigation/native";
import { AxiosInstance, recipeEndpoints } from "../config/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Recipe({
  id,
  title,
  description,
  image,
  steps,
  ingredients,
  category,
  general,
  refreshRecipes,
  fav,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState("");
  const [isFavorite, setIsFavorite] = useState(fav || false);
  const navigation = useNavigation();

  useEffect(() => {
    const getSession = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      setToken(storedToken);
    };
    getSession();
  }, []);

  const handleFavorite = async () => {
    try {
      const newFavState = !isFavorite;
      const response = await AxiosInstance.patch(
        `${recipeEndpoints.baseUrl}/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Faved recipe:", response.data);
      setIsFavorite(newFavState);
      refreshRecipes();
    } catch (error) {
      console.error("Error favoriting recipe:", error);
      Alert.alert("Error", "Failed to update favorite status.");
    }
  };

  const handleEdit = () => {
    navigation.navigate("CreateRecipe", {
      recipe: { id, category, title, description, image, steps, ingredients },
    });
  };

  const handleDelete = async () => {
    try {
      const response = await AxiosInstance.delete(
        `${recipeEndpoints.baseUrl}/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Deleted recipe:", response.data);
      refreshRecipes();
    } catch (error) {
      console.error("Error deleting recipe:", error);
      Alert.alert("Error", "Failed to delete the recipe.");
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleConfirmDelete = async () => {
    return Alert.alert(
      "WARNING",
      "Are you sure you want to delete this recipe? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDelete(),
        },
      ]
    );
  };

  const openRecipe = () => {
    navigation.navigate("RecipeDetails", {
      recipe: { title, description, image, steps, ingredients },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.card,
          isFavorite
            ? { backgroundColor: "lightgreen" }
            : general && { backgroundColor: COLORS.yellow },
        ]}
      >
        {/* Imagen: Solo se renderiza si existe */}
        {image ? (
          <TouchableOpacity activeOpacity={0.8} onPress={openRecipe}>
            <Image style={styles.image} source={{ uri: image }} />
          </TouchableOpacity>
        ) : null}
        {/* Título */}
        <Text
          style={[
            styles.title,
            isFavorite && { color: "darkgreen" },
            general && { color: "black" },
          ]}
        >
          {title}
        </Text>
        {/* Botones de acción */}
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={handleFavorite}>
            <Icon
              name={isFavorite ? "bookmark" : "bookmark-o"}
              size={30}
              color={isFavorite ? "darkgreen" : COLORS.white}
            />
          </TouchableOpacity>
          {!general && (
            <>
              <TouchableOpacity style={styles.iconButton} onPress={handleEdit}>
                <Icon name="edit" size={30} color={COLORS.white} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={handleConfirmDelete}
              >
                <Icon name="trash-o" size={30} color={COLORS.white} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {/* Modal de confirmación de eliminación */}
      <Modalboolean
        state={modalVisible}
        onClose={handleCloseModal}
        test={title}
        onConfirmDelete={handleConfirmDelete}
      />
    </SafeAreaView>
  );
}
