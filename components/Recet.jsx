import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import COLORS from "../constants/colors";
import styles from "../styles/Recipe";

export default function Recipe({ title, image, general }) {
  const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar/ocultar el modal

  const handleFavorite = () => {
    alert("Added to favorites!");
  };

  const handleEdit = () => {
    alert("Edit this recipe!");
  };

  const handleDelete = () => {
    alert("to do");
    setModalVisible(true); // Mostrar el modal cuando se haga clic en el botón de eliminar
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Cerrar el modal
  };

  const handleConfirmDelete = async () => {
    alert("Recipe deleted!");
    setModalVisible(false); // Cerrar el modal después de la confirmación
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        {/* Imagen */}
        <TouchableOpacity activeOpacity={0.8}>
          <Image style={styles.image} source={{ uri: image }} />
        </TouchableOpacity>

        {/* Título */}
        <Text style={styles.title}>{title}</Text>

        {/* Botones de acción */}

        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={handleFavorite}>
            <Icon name="bookmark-o" size={30} color={COLORS.white} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={handleEdit}>
            <Icon name="edit" size={30} color={COLORS.white} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={handleDelete}>
            <Icon name="trash-o" size={30} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de confirmación de eliminación */}
      <Modalboolean
        state={modalVisible}
        onClose={handleCloseModal}
        test={title}
        onConfirmDelete={handleConfirmDelete}
      />
    </SafeAreaView>
  );
}
