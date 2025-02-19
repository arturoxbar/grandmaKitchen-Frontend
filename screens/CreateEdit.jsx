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
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Btn from "../components/Btn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Seletcat from "../components/Selectcat";
import IngredientsSection from "../components/Ingridients.jsx"; // si ya lo tienes separado
import StepsSection from "../components/Steps"; // Importamos el nuevo componente
import COLORS from "../constants/colors";
import textura from "../assets/paper.jpg";
import styles from "../styles/CreateEdit.js";
import { AxiosInstance, recipeEndpoints } from "../config/axios";

const CreateEdit = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [steps, setSteps] = useState([]);
  const [token, setToken] = useState("");
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const getSession = async () => {
      await AsyncStorage.getItem("token").then((token) => {
        setToken(token);
      });
    };
    getSession();
  }, []);

  const CreateRecipe = async () => {
    if (!title || !description || !priority) {
      alert("Please fill all the fields");
      return;
    }
    const concatenatedSteps = steps
      .map((step, index) => `${index + 1}. ${step}`)
      .join(", ");
    const concatenatedIngredients = ingredients
      .map((ing, index) => `${index + 1}. ${ing}`)
      .join(", ");

    const body = {
      name: title,
      description,
      steps: concatenatedSteps,
      ingridients: concatenatedIngredients,
    };

    try {
      console.log("recipe data:", body);
      const response = await AxiosInstance.post(recipeEndpoints.create, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setCategory("");
      setDescription("");
      setIngredients("");
      setSteps("");
      setTitle("");
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
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
            <Image
              source={require("../assets/polloXD.jpg")}
              style={styles.image}
            />

            <TextInput
              placeholder="Recipe Name"
              placeholderTextColor={COLORS.yellow}
              style={styles.titleInput}
              maxLength={25}
              textAlign="center"
              onChangeText={setTitle}
            />

            <Seletcat setCategory={setCategory} />

            <TextInput
              placeholder="Recipe Description"
              placeholderTextColor={COLORS.yellow}
              style={styles.descriptionInput}
              maxLength={150}
              editable
              multiline
              numberOfLines={4}
              onChangeText={setDescription}
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
              btnLabel="Create Recipe"
              Press={CreateRecipe}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CreateEdit;
