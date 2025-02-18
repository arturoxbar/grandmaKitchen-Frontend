import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  ImageBackground,
} from "react-native";
import Btn from "../components/Btn";
import COLORS from "../constants/colors";
import { useEffect, useState } from "react";
import textura from "../assets/textura_libro2.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosInstance, UserEndpoints } from "../config/axios";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleLogin = async () => {
    if (!email || !password) {
      return alert("All fields are required.");
    }
    const body = {
      email: email,
      password: password,
    };

    console.log(body);

    try {
      const response = await AxiosInstance.post(UserEndpoints.login, body);
      console.log(response.data.token);
      await AsyncStorage.setItem("token", response.data.token);
      setEmail("");
      setPassword("");
      Alert.alert("Success", "User logged in", [{ text: "OK" }]);
      navigation.navigate("Home");
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
            <Text
              style={{
                color: COLORS.yellow,
                fontSize: 64,
                fontWeight: "bold",
                marginTop: 60,
                marginBottom: 40,
              }}
            >
              Login
            </Text>
            <View
              style={{
                backgroundColor: COLORS.paper,
                width: "100%",
                height: "100%",
                borderTopRightRadius: 120,
                paddingTop: 50,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  color: COLORS.strong_blue,
                  fontWeight: "bold",
                }}
              >
                Welcome grandson.
              </Text>
              <Text
                style={{
                  color: COLORS.strong_blue,
                  fontSize: 19,
                  fontWeight: "bold",
                  marginBottom: 20,
                }}
              >
                The magic words are...
              </Text>

              <TextInput
                textAlign={"center"}
                style={{
                  height: 48,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: COLORS.strong_blue,
                  color: COLORS.yellow,
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
              <View
                style={{
                  alignItems: "flex-end",
                  width: "78%",
                }}
              >
                <Text
                  style={{
                    color: COLORS.strong_blue,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  Forget your Password?
                </Text>
              </View>

              <View style={{ width: "78%" }}>
                <Btn
                  borderColorbtn={COLORS.yellow}
                  Colorbtn={COLORS.strong_blue}
                  textColor={COLORS.yellow}
                  btnLabel="Login"
                  Press={() => {
                    handleLogin();
                  }}
                />

                <View
                  style={{
                    marginVertical: 10,
                    marginTop: 185,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: COLORS.strong_blue }}>
                    Don´t have an account?
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={{
                        color: COLORS.strong_blue,
                        fontWeight: "bold",
                        fontSize: 16,
                      }}
                      onPress={() => navigation.navigate("Signup")}
                    >
                      Signup
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

export default Login;
