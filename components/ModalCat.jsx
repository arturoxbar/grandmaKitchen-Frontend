import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Btn from "./Btn";
import COLORS from "../constants/colors";
import styles from "../styles/ModalCat.js";
import { AxiosInstance, categoryEndpoints } from "../config/axios.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ModalCat = ({
  state,
  onClose,
  onCategoryCreated,
  editing = false,
  initialName = "",
  categoryId,
}) => {
  const [name, setName] = useState(initialName);
  const [token, setToken] = useState("");

  useEffect(() => {
    const getSession = async () => {
      try {
        const tokenValue = await AsyncStorage.getItem("token");
        setToken(tokenValue);
      } catch (error) {
        console.error("Error getting token:", error);
      }
    };
    getSession();
    if (state) {
      setName(initialName);
    }
  }, [state, initialName]);

  const handleCategory = async () => {
    if (!name.trim()) {
      return Alert.alert("Error", "The category name is obligatory");
    }
    if (!token) {
      return Alert.alert("Error", "No token found. Please login again.");
    }

    const body = { name };
    console.log("Handling category with data:", body);

    try {
      let response;
      if (editing && categoryId) {
        
        response = await AxiosInstance.put(
          `${categoryEndpoints.baseUrl}/${categoryId}`,
          body,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        Alert.alert("Success", "Category updated successfully");
      } else {
        // Modo creación: crea una nueva categoría
        response = await AxiosInstance.post(categoryEndpoints.baseUrl, body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Alert.alert("Success", "Category created successfully");
      }
      onCategoryCreated();
      onClose();
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error handling category:", error);
      const errorMessage = error.response?.data?.message
        ? error.response.data.message
        : "An error occurred while processing the category.";
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <Modal animationType="fade" visible={state} transparent>
      <SafeAreaView style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              textAlign="center"
              style={styles.textInput}
              placeholder="Category Name"
              placeholderTextColor={COLORS.black}
              value={name}
              onChangeText={setName}
            />
          </View>

          <Btn
            borderColorbtn={COLORS.yellow}
            Colorbtn={COLORS.yellow}
            textColor={COLORS.strong_blue}
            btnLabel={editing ? "Update Category" : "Create Category"}
            Press={handleCategory}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default ModalCat;
