import * as React from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import Btn from "../components/Btn";
import COLORS from "../constants/colors";
import textura from "../assets/textura_libro2.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosInstance, UserEndpoints } from "../config/axios";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const checkSession = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      Alert.alert("Success", "Welcome back", [{ text: "OK" }]);
      navigation.navigate("Home");
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const handleSignup = async () => {
    if (!username || !email || !password || !confirmPassword) {
      return alert("All fields are required.");
    }
    if (!emailRegex.test(email)) {
      return alert("Invalid email format.");
    }
    if (password !== confirmPassword) {
      return alert("Passwords do not match.");
    }

    const body = {
      email: email,
      password: password,
      username: username,
    };

    console.log(body);

    try {
      const response = await AxiosInstance.post(UserEndpoints.create, body);
      setConfirmPassword("");
      setEmail("");
      setUsername("");
      setPassword("");
      alert("user created");
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
      const errors = error.response.data.message;
      Alert.alert("error", errors);
      console.log(errors);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.strong_blue }}>
      <ImageBackground source={textura}>
        <ScrollView>
          <View style={{ alignItems: "center" }}>
            <View style={{ marginTop: 50, marginBottom: 40 }}>
              <Text
                style={{
                  color: COLORS.yellow,
                  fontSize: 64,
                  fontWeight: "bold",
                }}
              >
                Register
              </Text>
            </View>

            <View
              style={{
                alignItems: "center",
                backgroundColor: COLORS.paper,
                width: "100%",
                height: "100%",
                borderTopLeftRadius: 120,
                paddingTop: 50,
              }}
            >
              <View style={{ width: "100%", alignItems: "center" }}>
                <Text
                  style={{
                    marginVertical: 20,
                    fontSize: 30,
                    color: COLORS.strong_blue,
                    fontWeight: "bold",
                  }}
                >
                  Create a new account
                </Text>
                <TextInput
                  textAlign={"center"}
                  style={{
                    height: 48,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: COLORS.strong_blue,
                    color: COLORS.yellow,
                    paddingHorizontal: 10,
                    width: "80%",
                    backgroundColor: COLORS.grayish_white,
                    marginVertical: 10,
                  }}
                  placeholderTextColor={COLORS.yellow}
                  placeholder="User Name"
                  value={username}
                  onChangeText={(username) => setUsername(username)}
                  keyboardType={"email-address"}
                />

                <TextInput
                  textAlign={"center"}
                  style={{
                    height: 48,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: COLORS.strong_blue,
                    color: COLORS.yellow,
                    paddingHorizontal: 10,
                    width: "80%",
                    backgroundColor: COLORS.grayish_white,
                    marginVertical: 10,
                  }}
                  placeholderTextColor={COLORS.yellow}
                  placeholder="E-mail"
                  value={email}
                  onChangeText={(email) => setEmail(email)}
                  keyboardType={"email-address"}
                />

                <TextInput
                  textAlign={"center"}
                  style={{
                    height: 48,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: COLORS.strong_blue,
                    color: COLORS.yellow,
                    paddingHorizontal: 10,
                    width: "80%",
                    backgroundColor: COLORS.grayish_white,
                    marginVertical: 10,
                  }}
                  placeholderTextColor={COLORS.yellow}
                  placeholder="Password"
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                  secureTextEntry={true}
                />

                <TextInput
                  textAlign={"center"}
                  style={{
                    height: 48,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: COLORS.strong_blue,
                    color: COLORS.yellow,
                    paddingHorizontal: 10,
                    width: "80%",
                    backgroundColor: COLORS.grayish_white,
                    marginVertical: 10,
                  }}
                  placeholderTextColor={COLORS.yellow}
                  placeholder=" Confirm Password"
                  value={confirmPassword}
                  onChangeText={(confirmPassword) =>
                    setConfirmPassword(confirmPassword)
                  }
                  secureTextEntry={true}
                />
              </View>

              <View style={{ width: "78%" }}>
                <Btn
                  borderColorbtn={COLORS.yellow}
                  Colorbtn={COLORS.strong_blue}
                  textColor={COLORS.yellow}
                  btnLabel="Signup"
                  Press={() => {
                    handleSignup();
                  }}
                />
                <View
                  style={{
                    marginVertical: 10,
                    marginTop: 100,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: COLORS.strong_blue }}>
                    Already have an account?
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={{
                        color: COLORS.strong_blue,
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                      onPress={() => navigation.navigate("Login")}
                    >
                      Login
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Signup;
