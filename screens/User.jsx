import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Btn from "../components/Btn";
import COLORS from "../constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosInstance, UserEndpoints } from "../config/axios";
import textura from "../assets/textura_libro2.png";
import styles from "../styles/User.js";

const User = ({ navigation }) => {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [changePassword, setChangePassword] = useState(false); // Estado para habilitar cambio de contraseña

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        getUserInfo(storedToken);
      }
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  const getUserInfo = async (token) => {
    try {
      const response = await AxiosInstance.get(UserEndpoints.get, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user.username);
      setEmail(response.data.user.email);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const deleteToken = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  };

  const handleSignOff = () => {
    Alert.alert("Sign off", "Are you sure you want to sign off?", [
      { text: "No", style: "cancel" },
      { text: "Yes", onPress: deleteToken },
    ]);
  };

  const deleteAccount = async () => {
    try {
      const response = await AxiosInstance.delete(UserEndpoints.delete, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      await deleteToken();
    } catch (error) {
      console.error("Error deleting account:", error);
      Alert.alert("Error", "Could not delete account. Try again later.");
    }
  };

  const handleDeleteUser = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: deleteAccount },
      ]
    );
  };

  const handleEditUser = async () => {
    if (!user || !email) {
      Alert.alert("Validation", "Please fill all the fields");
      return;
    }
    // Solo se envía la contraseña si se habilitó el cambio
    const body = { username: user, email, ...(changePassword && { password }) };
    console.log("User data:", body);

    try {
      const response = await AxiosInstance.put(UserEndpoints.get, body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      Alert.alert("Success", "User information updated");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error updating user:", error);
      Alert.alert("Error", error.response?.data?.message || "Update failed");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={textura} style={styles.background}>
        <View style={styles.center}>
          <Text style={styles.title}>Book Owner</Text>
          <View style={styles.formContainer}>
            <Image
              source={require("../assets/UserAvatar.png")}
              style={styles.avatar}
            />

            <CustomInput
              placeholder="User"
              value={user}
              onChangeText={setUser}
            />
            <CustomInput
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            {/* Checkbox para habilitar cambio de contraseña */}
            <View style={customStyles.checkboxContainer}>
              <TouchableOpacity
                onPress={() => setChangePassword(!changePassword)}
                style={customStyles.checkbox}
              >
                <Icon
                  name={changePassword ? "check-square" : "square-o"}
                  size={24}
                  color={COLORS.yellow}
                />
              </TouchableOpacity>
              <Text style={customStyles.checkboxLabel}>Change Password</Text>
            </View>
            {/* Se muestra el input de contraseña solo si changePassword es true */}
            {changePassword && (
              <CustomInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            )}

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleEditUser}
            >
              <Text style={styles.saveText}>Save Information</Text>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
              <Btn
                borderColorbtn={COLORS.strong_blue}
                Colorbtn={COLORS.strong_blue}
                textColor={COLORS.yellow}
                btnLabel="Sign off"
                Press={handleSignOff}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Btn
                borderColorbtn={COLORS.black}
                Colorbtn={COLORS.emergenci}
                textColor={COLORS.white}
                btnLabel="Delete Account"
                Press={handleDeleteUser}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
}) => (
  <TextInput
    textAlign="center"
    style={styles.input}
    placeholder={placeholder}
    placeholderTextColor={COLORS.yellow}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    keyboardType={keyboardType}
  />
);

const customStyles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: COLORS.strong_blue,
    fontWeight: "bold",
  },
});

export default User;
