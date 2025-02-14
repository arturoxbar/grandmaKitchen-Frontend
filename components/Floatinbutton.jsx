import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import COLORS from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const Floatinbutton = ({ setToggleFav }) => {
  const navigation = useNavigation();

  const [infav, setInfav] = useState(false);
  const [icon_1] = useState(new Animated.Value(20));
  const [icon_2] = useState(new Animated.Value(20));
  const [icon_3] = useState(new Animated.Value(20));
  const [icon_4] = useState(new Animated.Value(20));

  const [pop, setPop] = useState(false);

  const popIn = () => {
    setPop(true);
    Animated.timing(icon_1, {
      toValue: 320,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: 250,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: 180,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_4, {
      toValue: 110,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const popOut = () => {
    setPop(false);
    Animated.timing(icon_1, {
      toValue: -60,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_2, {
      toValue: -60,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_3, {
      toValue: -60,
      duration: 500,
      useNativeDriver: false,
    }).start();
    Animated.timing(icon_4, {
      toValue: -60,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View>
      <Animated.View style={[styles.circle, { bottom: icon_1 }]}>
        <TouchableOpacity
          onPress={() => {
            setToggleFav(!infav);
            setInfav(!infav);
          }}
        >
          {infav === true ? (
            <Icon name="star-o" size={25} color={COLORS.yellow} />
          ) : (
            <Icon name="star" size={25} color={COLORS.yellow} />
          )}
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.circle, { bottom: icon_2 }]}>
        <TouchableOpacity onPress={async () => {}}>
          <Icon name="user-circle" size={25} color={COLORS.yellow} />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.circle, { bottom: icon_3 }]}>
        <TouchableOpacity onPress={() => {}}>
          <Icon name="sticky-note-o" size={25} color={COLORS.yellow} />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.circle, { bottom: icon_4 }]}>
        <TouchableOpacity onPress={async () => {}}>
          <Icon name="tags" size={25} color={COLORS.yellow} />
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={styles.circle}
        onPress={() => {
          pop === false ? popIn() : popOut();
        }}
      >
        <Icon name="plus" size={25} color={COLORS.yellow} />
      </TouchableOpacity>
    </View>
  );
};

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
