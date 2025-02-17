import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import PropTypes from "prop-types";
import COLORS from "../constants/colors";
import styles from "../styles/InputData";

const Inputdata = ({ maxCharacters, placeholder, setText }) => {
  return (
    <View style={styles.container}>
      <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={maxCharacters}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray} // Color del placeholder
        onChangeText={setText} // Se pasa directamente sin función inline
        style={styles.input}
        autoCapitalize="none"
      />
    </View>
  );
};

export default Inputdata;
