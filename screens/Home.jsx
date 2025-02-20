import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import COLORS from "../constants/colors";
import Floatinbutton from "../components/Floatinbutton";
import Cathorisonal from "../components/Cathorisonal";
import Recipe from "../components/Recipe";
import { AxiosInstance, recipeEndpoints } from "../config/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const [toggleFav, setToggleFav] = useState(false);
  const [toggleCat, setToggleCat] = useState("");
  const [refreshCategories, setRefreshCategories] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const isFocused = useIsFocused();

  const triggerRefresh = () => {
    setRefreshCategories((prev) => !prev);
  };

  // Obtener las recetas y ordenarlas alfabéticamente
  const getRecipes = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await AxiosInstance.get(
          recipeEndpoints.getUserRecipes,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Fetched recipes:", response.data);
        const sortedRecipes = response.data.recipes.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setRecipes(sortedRecipes);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getRecipes();
    }
  }, [isFocused]);

  // También refrescar si cambia la categoría o el filtro de favoritos
  useEffect(() => {
    getRecipes();
  }, [toggleCat, toggleFav]);

  // Filtrar recetas según categoría y/o favoritos:
  // - Si se selecciona una categoría (toggleCat), filtra por ella.
  // - Si el filtro de favoritos está activo (toggleFav true), filtra solo las recetas que sean favoritas.
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory = toggleCat
      ? recipe.categories && recipe.categories.includes(toggleCat)
      : true;
    const matchesFavorite = toggleFav ? recipe.fav === true : true;
    return matchesCategory && matchesFavorite;
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.paper }}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Grandma's Recipes</Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: "5%" }}>
        <Cathorisonal setToggleCat={setToggleCat} refresh={refreshCategories} />
      </View>
      <ScrollView style={{ flex: 1 }}>
        {filteredRecipes.map((recipe) => (
          <TouchableOpacity
            key={recipe._id}
            onPress={() =>
              navigation.navigate("RecipeDetails", { recipe: recipe })
            }
          >
            <Recipe
              id={recipe._id}
              title={recipe.name}
              description={recipe.description}
              image={recipe.image}
              steps={recipe.steps}
              ingredients={recipe.ingridients}
              general={recipe.general}
              category={recipe.categories}
              fav={recipe.fav}
              refreshRecipes={getRecipes}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View>
        <Floatinbutton
          setToggleFav={setToggleFav}
          onCategoryCreated={triggerRefresh}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    width: "100%",
    backgroundColor: COLORS.strong_blue,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: COLORS.yellow,
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Home;
