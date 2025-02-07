import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ImageBackground
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Btn from "../components/Btn";
import COLORS from "../constants/colors";
import textura from '../assets/textura_libro2.png';

const Welcome = ({ navigation }) => {

  const texture = "./"
  return (
    
      <SafeAreaView style={{ flex: 1, justifyContent: "center", backgroundColor: COLORS.strong_blue }}>
        <ImageBackground source={textura} style={{flex: 1, justifyContent:'center'}}>
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../assets/grandmas.png")}
              style={{ top: 160, height: 120, width: 390 }}
            />
          </View>
          <View
            style={{
              marginHorizontal: 20,
              borderTopRadius: 50,
              borderRadius:20,

              top: "40%",
              backgroundColor: COLORS.paper
            }}
          >
            <View style={{alignItems: "center",marginVertical:30}}>
              <View style={{width:"90%"}} >
                <Btn
                Colorbtn={COLORS.yellow}
                borderColorbtn={COLORS.strong_blue}
                textColor={COLORS.strong_blue}
                btnLabel="Login"
                Press={() => navigation.navigate("Login")}
              />        
              </View>
                
              <View style={{width:"90%"}}>
                <Btn
                Colorbtn={COLORS.strong_blue}
                borderColorbtn={COLORS.yellow}
                textColor={COLORS.yellow}
                btnLabel="Signup"
                Press={() => navigation.navigate("Signup")}
              />
              </View>
            </View>


            </View>

            
          
        </View>
        </ImageBackground>
      </SafeAreaView>

  );
};

export default Welcome;
