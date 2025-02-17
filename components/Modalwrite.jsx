import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Btn from "./Btn";
import COLORS from "../constants/colors";
import styles from "../styles/ModalWrite.js";

const Modalwrite = ({ Modalicon, title }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = useCallback(() => {
    setModalVisible((prev) => !prev);
  }, []);

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={toggleModal}>
        <Icon name={Modalicon} size={35} color={COLORS.white} />
      </TouchableOpacity>

      <Modal animationType="fade" visible={modalVisible} transparent>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
              <TouchableOpacity onPress={toggleModal}>
                <Icon name="close" size={25} color={COLORS.white} />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                editable
                multiline
                numberOfLines={10}
                style={styles.textInput}
                placeholder="Write something..."
                placeholderTextColor={COLORS.gray}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Btn
                borderColorbtn={COLORS.yellow}
                Colorbtn={COLORS.yellow}
                textColor={COLORS.strong_blue}
                btnLabel="Save"
              />
              <Btn
                borderColorbtn={COLORS.yellow}
                Colorbtn={COLORS.yellow}
                textColor={COLORS.strong_blue}
                btnLabel="Cancel"
                onPress={toggleModal}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Modalwrite;
