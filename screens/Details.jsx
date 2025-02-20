import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import COLORS from "../constants/colors";

const RecipeDetails = ({ route, navigation }) => {
  // Se espera que la pantalla reciba en route.params un objeto "recipe"
  const { recipe } = route.params || {};
  const recipeData = recipe || {
    title: "Do you want chicken?",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/roast-chicken-recipe-2-66b231ac9a8fb.jpg?crop=0.503xw:1.00xh;0.309xw,0&resize=1200:*",
    description:
      "This is a delicious roasted chicken recipe passed down from grandma. Enjoy the tender meat and crispy skin with your favorite sides.",
    ingredients: ["Chicken", "Salt", "Pepper", "Herbs"],
    steps: [
      "Preheat the oven to 200°C (400°F).",
      "Season the chicken with salt, pepper, and herbs.",
      "Roast the chicken for 1 hour until golden and crispy.",
    ],
  };

  // Convertir ingredientes y pasos a array si es necesario (si ya vienen como string)
  const ingredientsArray = Array.isArray(recipeData.ingredients)
    ? recipeData.ingredients
    : recipeData.ingredients
    ? recipeData.ingredients.split("/ ").map((item) => item.trim())
    : [];

  const stepsArray = Array.isArray(recipeData.steps)
    ? recipeData.steps
    : recipeData.steps
    ? recipeData.steps.split("/ ").map((step) => step.trim())
    : [];

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/paper.jpg")}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.content}>
          {recipeData.image ? (
            <Image source={{ uri: recipeData.image }} style={styles.image} />
          ) : null}

          <Text style={styles.title}>{recipeData.title}</Text>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{recipeData.description}</Text>

          <Text style={styles.sectionTitle}>Ingredients</Text>
          {ingredientsArray.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Icon
                name="circle"
                size={8}
                color="#5B3A29"
                style={styles.bullet}
              />
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}

          {/* Pasos */}
          <Text style={styles.sectionTitle}>Steps</Text>
          {stepsArray.map((step, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.stepNumber}>{index + 1}.</Text>
              <Text style={styles.listText}>{step}</Text>
            </View>
          ))}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default RecipeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  content: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 32,
    fontFamily: "serif",
    fontWeight: "bold",
    color: "#5B3A29", // tono marrón oscuro
    textAlign: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: "serif",
    fontWeight: "bold",
    color: "#5B3A29",
    marginTop: 20,
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    fontFamily: "serif",
    color: "#5B3A29",
    lineHeight: 24,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  bullet: {
    marginRight: 8,
  },
  listText: {
    fontSize: 18,
    fontFamily: "serif",
    color: "#5B3A29",
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
    color: "#5B3A29",
  },
});
