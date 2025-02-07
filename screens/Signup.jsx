import * as React from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import Btn from "../components/Btn";
import COLORS from "../constants/colors";
import textura from "../assets/textura_libro2.png";

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [password2, setPassword2] = useState("");

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
                ></TextInput>

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
                ></TextInput>

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
                ></TextInput>

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
                  value={password2}
                  onChangeText={(password2) => setPassword2(password2)}
                  secureTextEntry={true}
                ></TextInput>
              </View>

              <View style={{ width: "78%" }}>
                <Btn
                  borderColorbtn={COLORS.yellow}
                  Colorbtn={COLORS.strong_blue}
                  textColor={COLORS.yellow}
                  btnLabel="Signup"
                  Press={() => {}}
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
