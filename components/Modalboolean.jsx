import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Btn from "./Btn";
import COLORS from "../constants/colors";
import styles from "../styles/ModalBool.js";

const Modalboolean = ({ state, onClose, test, onConfirmDelete }) => {
  const handleDelete = () => {
    alert(`se borror ${test}`);
    onConfirmDelete();
  };

  const closeModal = () => {
    onClose();
  };

  return (
    <SafeAreaView>
      {/* Modal */}
      <Modal animationType="fade" visible={state} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Botón de cierre */}
            <View style={styles.closeButtonContainer}>
              <TouchableOpacity onPress={onClose}>
                <Icon name="close" size={20} color={COLORS.white} />
              </TouchableOpacity>
            </View>

            {/* Texto de confirmación */}
            <Text style={styles.confirmationText}>
              Are you sure you want to delete {test}?
            </Text>

            {/* Botones de confirmación */}
            <View style={styles.buttonContainer}>
              <Btn
                borderColorbtn={COLORS.yellow}
                Colorbtn={COLORS.yellow}
                textColor={COLORS.strong_blue}
                btnLabel="Yes"
                Press={() => {
                  handleDelete();
                }}
              />
              <Btn
                borderColorbtn={COLORS.yellow}
                Colorbtn={COLORS.yellow}
                textColor={COLORS.strong_blue}
                btnLabel="No"
                Press={() => {
                  closeModal();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Modalboolean;
