import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  View,
} from "react-native";
import COLORS from "../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosInstance, categoryEndpoints } from "../config/axios.js";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import ModalCat from "../components/ModalCat"; // Asegúrate de que la ruta es correcta

const Item = ({
  item,
  onPress,
  onEdit,
  onDelete,
  backgroundColor,
  textColor,
}) => (
  <View style={[styles.item, { backgroundColor }]}>
    <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
      <Text style={[styles.title, { color: textColor }]}>{item.name}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onEdit} style={{ marginRight: 5 }}>
      <Icon name="pencil" size={20} color={COLORS.white} />
    </TouchableOpacity>
    <TouchableOpacity onPress={onDelete}>
      <Icon name="close" size={25} color={COLORS.white} />
    </TouchableOpacity>
  </View>
);

const Cathorisonal = ({ setToggleCat, refresh, onCategoryDeleted }) => {
  const isFocused = useIsFocused();
  const [selectedId, setSelectedId] = useState();
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const getCategories = async (token) => {
    try {
      const response = await AxiosInstance.get(
        `${categoryEndpoints.baseUrl}/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const getSession = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      setToken(storedToken);
      getCategories(storedToken);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getSession();
    }
  }, [isFocused, refresh]);

  const deleteCategory = async (categoryId) => {
    try {
      await AxiosInstance.delete(`${categoryEndpoints.baseUrl}/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories((prev) => prev.filter((cat) => cat._id !== categoryId));
      Alert.alert("Category deleted");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not delete category");
    }
  };

  //   try {
  //     await AxiosInstance.put(
  //       `${categoryEndpoints.baseUrl}/${categoryId}`,
  //       { name: newName },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     setCategories((prev) =>
  //       prev.map((cat) =>
  //         cat._id === categoryId ? { ...cat, name: newName } : cat
  //       )
  //     );
  //     Alert.alert("Category updated");
  //   } catch (error) {
  //     console.error(error);
  //     Alert.alert("Error", "Could not update category");
  //   }
  // };

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
        onEdit={() => {
          setEditingCategory(item);
          setEditModalVisible(true);
        }}
        onDelete={() => {
          Alert.alert(
            "WARNING",
            "Are you sure you want to delete this category? This will delete all the recipes with this category",
            [
              { text: "Cancel", style: "cancel" },
              {
                text: "Delete",
                style: "destructive",
                onPress: () => deleteCategory(item._id),
              },
            ]
          );
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        horizontal
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        extraData={selectedId}
      />

      {/* Modal de edición reutilizando ModalCat */}
      {editModalVisible && editingCategory && (
        <ModalCat
          state={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          onCategoryCreated={() => {
            // Aquí se actualiza la lista después de editar
            getSession();
          }}
          editing={true}
          initialName={editingCategory.name}
          categoryId={editingCategory._id}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 12,
  },
  item: {
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

export default Cathorisonal;
