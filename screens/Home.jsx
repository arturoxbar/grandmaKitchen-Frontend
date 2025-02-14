import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
//import { LinearGradient } from "expo-linear-gradient";
//import Btn from "../components/Btn";
import COLORS from "../constants/colors";
//import Card from "../components/Card";
import Floatinbutton from "../components/Floatinbutton";
import Cathorisonal from "../components/Cathorisonal";
import Recet from "../components/Recet";
import { useState } from "react";

const Home = ({ navigation }) => {
  const [toggleFav, setToggleFav] = useState(false);
  const [toggleCat, setToggleCat] = useState("");
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
          grandma's recipes
        </Text>
      </View>
      <View style={{ flexDirection: "row", marginBottom: "5%" }}>
        <Cathorisonal setToggleCat={setToggleCat} />
      </View>
      <ScrollView style={{ height: "90%" }}>
        <Recet />
      </ScrollView>
      <View>
        <Floatinbutton setToggleFav={setToggleFav} />
      </View>
    </SafeAreaView>
  );
};

export default Home;
