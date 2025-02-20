import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Btn from "../components/Btn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Seletcat from "../components/Selectcat";
import IngredientsSection from "../components/Ingridients.jsx";
import StepsSection from "../components/Steps";
import COLORS from "../constants/colors";
import textura from "../assets/paper.jpg";
import styles from "../styles/CreateEdit.js";
import { AxiosInstance, recipeEndpoints } from "../config/axios";

const CreateEdit = ({ route, navigation }) => {
  const recipeToEdit = route.params?.recipe || null;

  const [title, setTitle] = useState(recipeToEdit?.title || "");
  const [description, setDescription] = useState(
    recipeToEdit?.description || ""
  );
  const [category, setCategory] = useState(recipeToEdit?.category || []);
  const [steps, setSteps] = useState(
    recipeToEdit?.steps
      ? recipeToEdit.steps.split("/ ").map((step) => step.trim())
      : []
  );
  const [ingredients, setIngredients] = useState(
    recipeToEdit?.ingredients
      ? recipeToEdit.ingredients.split("/ ").map((ing) => ing.trim())
      : []
  );
  const [imageUrl, setImageUrl] = useState(recipeToEdit?.image || "");
  const [token, setToken] = useState("");

  useEffect(() => {
    const getSession = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      setToken(storedToken);
    };
    getSession();
  }, []);

  const handleSave = async () => {
    if (!title || !description) {
      alert("Please fill all the fields");
      return;
    }

    const concatenatedSteps = steps.join("/ ");
    const concatenatedIngredients = ingredients.join("/ ");

    const body = {
      name: title,
      description,
      steps: concatenatedSteps,
      ingridients: concatenatedIngredients,
      categories: category,
      image: imageUrl
        ? imageUrl
        : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/1200px-Icon-round-Question_mark.svg.png", // Agregar la URL de la imagen al body
    };

    try {
      let response;
      if (recipeToEdit) {
        response = await AxiosInstance.put(
          `${recipeEndpoints.baseUrl}/${recipeToEdit.id}`,
          body,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(body);
      } else {
        response = await AxiosInstance.post(recipeEndpoints.baseUrl, body, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      if (!recipeToEdit) {
        setTitle("");
        setDescription("");
        setCategory([]);
        setIngredients([]);
        setSteps([]);
        setImageUrl(""); // Limpiar la URL de la imagen después de crear la receta
      }

      navigation.navigate("Home");
    } catch (error) {
      //console.error(error);
      console.log(error);
      const errors = error.response.data.message;
      Alert.alert("error", errors);
      console.log(errors);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={textura} style={styles.background}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
              <Icon name="arrow-left" size={25} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={styles.image} />
            ) : (
              <Text style={styles.placeholderText}>No image selected</Text>
            )}

            <TextInput
              placeholder="Image URL"
              placeholderTextColor={COLORS.yellow}
              style={styles.imageInput}
              onChangeText={setImageUrl}
              value={imageUrl}
            />

            <TextInput
              placeholder="Recipe Name"
              placeholderTextColor={COLORS.yellow}
              style={styles.titleInput}
              maxLength={25}
              textAlign="center"
              onChangeText={setTitle}
              value={title}
            />

            <Seletcat setCategory={setCategory} selectedCategory={category} />

            <TextInput
              placeholder="Recipe Description"
              placeholderTextColor={COLORS.yellow}
              style={styles.descriptionInput}
              maxLength={150}
              multiline
              numberOfLines={4}
              onChangeText={setDescription}
              value={description}
            />

            <IngredientsSection
              ingredients={ingredients}
              onChangeIngredients={setIngredients}
            />
            <StepsSection steps={steps} onChangeSteps={setSteps} />

            <Btn
              borderColorbtn={COLORS.yellow}
              Colorbtn={COLORS.yellow}
              textColor={COLORS.strong_blue}
              btnLabel={recipeToEdit ? "Save Changes" : "Create Recipe"}
              Press={handleSave}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CreateEdit;
