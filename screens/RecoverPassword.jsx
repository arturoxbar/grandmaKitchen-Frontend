import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import COLORS from "../constants/colors";
import Btn from "../components/Btn";
import textura from "../assets/textura_libro2.png";
import { AxiosInstance, UserEndpoints } from "../config/axios";

const RecoverPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secret, setSecret] = useState("");

  const handlePasswordReset = async () => {
    if (!email || !newPassword || !secret) {
      return Alert.alert("Error", "Please fill in all the fields");
    }

    try {
      const body = { email, newPassword, secret };
      const response = await AxiosInstance.patch(UserEndpoints.get, body);
      Alert.alert("Success", "Password reset successfully!");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
      const errors = error.response.data.message;
      Alert.alert("error", errors);
      console.log(errors);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={textura} style={styles.background}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>Password Recovery</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={COLORS.yellow}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter new password"
              placeholderTextColor={COLORS.yellow}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Verification Answer"
              placeholderTextColor={COLORS.yellow}
              value={secret}
              onChangeText={setSecret}
            />
            <Btn
              btnLabel="Reset Password"
              Press={handlePasswordReset}
              borderColorbtn={COLORS.yellow}
              Colorbtn={COLORS.strong_blue}
              textColor={COLORS.yellow}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.strong_blue },
  background: { flex: 1, justifyContent: "center", resizeMode: "cover" },
  content: { alignItems: "center", padding: 20 },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.yellow,
    marginBottom: 20,
  },
  input: {
    height: 48,
    width: "80%",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.strong_blue,
    backgroundColor: COLORS.grayish_white,
    color: COLORS.yellow,
    paddingHorizontal: 10,
    marginVertical: 10,
    textAlign: "center",
  },
});

export default RecoverPassword;
