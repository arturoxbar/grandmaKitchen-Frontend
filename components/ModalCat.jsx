import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Btn from "./Btn";
import COLORS from "../constants/colors";
import styles from "../styles/ModalCat.js";

const ModalCat = ({ state, onClose }) => {
  return (
    <Modal animationType="fade" visible={state} transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Botón de cierre */}
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* Campo de entrada */}
          <View style={styles.inputContainer}>
            <TextInput
              textAlign="center"
              style={styles.textInput}
              placeholder="Category Name"
              placeholderTextColor={COLORS.black}
            />
          </View>

          {/* Botón de creación */}
          <Btn
            borderColorbtn={COLORS.yellow}
            Colorbtn={COLORS.yellow}
            textColor={COLORS.strong_blue}
            btnLabel="Create Category"
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalCat;
