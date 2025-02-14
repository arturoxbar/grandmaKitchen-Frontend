import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import COLORS from "../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { Axios, note_endpoints } from "../constants/axios";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const DATA = [
  {
    _id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Vegano",
  },
  {
    _id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Carnivoro",
  },
  {
    _id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Mariscos",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.item, { backgroundColor }]}
  >
    <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
    <Icon name="close" size={25} color={COLORS.white} />
  </TouchableOpacity>
);

const App = ({ setToggleCat }) => {
  const isFocused = useIsFocused();
  const [selectedId, setSelectedId] = useState();
  const [categories, setCategories] = useState(DATA);
  const [token, setToken] = useState("");

  // const getCategories = async (token) => {
  //   try {
  //     await Axios.get(note_endpoints.getCategories, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }).then((response) => {
  //       setCategories(response.data.categories);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const getToken = async () => {
  //   await AsyncStorage.getItem("token").then((token) => {
  //     setToken(token);
  //     getCategories(token);
  //   });
  // };

  // useEffect(() => {
  //   if (isFocused) {
  //     getToken();
  //   }
  // }, [isFocused]);

  const renderItem = ({ item }) => {
    const backgroundColor =
      item._id === selectedId ? COLORS.strong_blue : COLORS.yellow;
    const color = item._id === selectedId ? COLORS.yellow : "#163752";

    return (
      <Item
        item={item}
        onPress={() => {
          if (item._id === selectedId) {
            setSelectedId(null);
            setToggleCat(null);
          } else {
            setSelectedId(item._id);
            setToggleCat(item.name);
          }
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal={true}
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: StatusBar.currentHeight || 0,
    marginTop: 12,
  },
  item: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 17,
    marginHorizontal: 10,
    fontWeight: "bold",
  },
});

export default App;
