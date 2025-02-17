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
import Card from "../components/Card";
import Modalwrite from "../components/Modalwrite";
import Seletcat from "../components/Selectcat";
import COLORS from "../constants/colors";
import textura from "../assets/textura_libro2.png";
import styles from "../styles/CreateEdit.js";

const CreateEdit = ({ navigation }) => {

  const Section = ({ title }) => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionTextContainer}>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.sectionIcon}>
        <Modalwrite Modalicon="plus" title={title} />
      </TouchableOpacity>
      <Card titlecart={title} />
    </View>
  );

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

            <Section title="Description" />
            <Section title="Ingredients" />
            <Section title="Intrutions" />

            <Btn
              borderColorbtn={COLORS.yellow}
              Colorbtn={COLORS.yellow}
              textColor={COLORS.strong_blue}
              btnLabel="Create Recipe"
              Press={CreateNote}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CreateEdit;
