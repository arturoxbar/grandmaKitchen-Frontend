import React, { useState, useRef } from "react";
import { StyleSheet, View, TouchableOpacity, Animated } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import COLORS from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import ModalCat from "./ModalCat.jsx";

const Floatinbutton = ({
  setToggleFav,
  onCategoryCreated,
  onCategoryDeleted,
}) => {
  const navigation = useNavigation();
  const [infav, setInfav] = useState(false);
  const [pop, setPop] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const icons = useRef([
    new Animated.Value(-60),
    new Animated.Value(-60),
    new Animated.Value(-60),
    new Animated.Value(-60),
  ]).current;

  const createRecipe = () => navigation.navigate("CreateRecipe");
  const userSettings = () => navigation.navigate("User");

  const toggleMenu = () => {
    setPop((prev) => !prev);
    if (!pop) {
      animateIcons([320, 250, 180, 110]);
    } else {
      animateIcons([-60, -60, -60, -60]);
    }
  };

  const animateIcons = (values) => {
    const animations = icons.map((icon, index) =>
      Animated.timing(icon, {
        toValue: values[index],
        duration: 250,
        useNativeDriver: false,
      })
    );
    Animated.sequence(animations).start();
  };

  return (
    <View>
      {icons.map((icon, index) => {
        const actions = [
          () => {
            setToggleFav(!infav);
            setInfav(!infav);
          },
          userSettings,
          createRecipe,
          () => setIsModalVisible(true),
        ];
        const iconNames = [
          "bookmark-o",
          "user-circle",
          "sticky-note-o",
          "tags",
        ];

        return (
          <Animated.View key={index} style={[styles.circle, { bottom: icon }]}>
            <TouchableOpacity onPress={actions[index]}>
              <Icon
                name={index === 0 && infav ? "bookmark" : iconNames[index]}
                size={25}
                color={COLORS.yellow}
              />
            </TouchableOpacity>
          </Animated.View>
        );
      })}

      <TouchableOpacity style={styles.circle} onPress={toggleMenu}>
        <Icon name="plus" size={25} color={COLORS.yellow} />
      </TouchableOpacity>

      <ModalCat
        state={isModalVisible}
        onClose={() => {
          setIsModalVisible(false);
        }}
        onCategoryCreated={onCategoryCreated}
      />
    </View>
  );
};

// Floatinbutton.propTypes = {
//   setToggleFav: PropTypes.func.isRequired,
//   onCategoryCreated: PropTypes.func.isRequired,
// };

export default Floatinbutton;

const styles = StyleSheet.create({
  circle: {
    backgroundColor: COLORS.strong_blue,
    width: 60,
    height: 60,
    position: "absolute",
    borderWidth: 2,
    borderColor: COLORS.yellow,
    bottom: 40,
    right: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

