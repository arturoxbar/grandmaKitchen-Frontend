import * as React from "react";
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
import { useState } from "react";

const Home = ({ navigation }) => {
  const [toggleFav, setToggleFav] = useState(false);
  const [toggleCat, setToggleCat] = useState("");

  const notes = [
    {
      id: 1,
      title: "Do you want chicken?",
      image:
        "https://hips.hearstapps.com/hmg-prod/images/roast-chicken-recipe-2-66b231ac9a8fb.jpg?crop=0.503xw:1.00xh;0.309xw,0&resize=1200:*",

    },
    {
      id: 2,
      title: "Spaghetti Bolognese",
      image:
        "https://www.recipetineats.com/tachyon/2018/07/Spaghetti-Bolognese.jpg",

    },
    {
      id: 3,
      title: "Chocolate Cake",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbKYwL3WVVNJ6mhZTD9vNqjZGnnKVXA14mCg&s",

    },
    {
      id: 4,
      title: "Vegetable Stir Fry",
      image:
        "https://natashaskitchen.com/wp-content/uploads/2020/08/Vegetable-Stir-Fry-2-728x1092.jpg",

    },
  ];

  const openRecipe = () => {
    alert("test");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.paper }}>
      <View
        style={{
          height: 80,
          width: "100%",
          backgroundColor: COLORS.strong_blue,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: COLORS.yellow,
            fontSize: 20,
            fontWeight: "bold",
            marginTop: 30,
            marginBottom: 20,
          }}
        >
          Grandma's Recipes
        </Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: "5%" }}>
        <Cathorisonal setToggleCat={setToggleCat} />
      </View>

      <ScrollView style={{ height: "85%" }}>
        {notes.map((note) => (
          <TouchableOpacity
            key={note.id}
            onPress={() => openRecipe()} // Evento de toque que navega a la receta
          >
            <Recipe
              title={note.title}
              image={note.image}
              general={note.general}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View>
        <Floatinbutton setToggleFav={setToggleFav} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
