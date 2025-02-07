import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Image
} from "react-native";
import { Axios, note_endpoints } from "../constants/axios";
import Notes from "./Notes";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import COLORS from "../constants/colors";
import Icon from "react-native-vector-icons/FontAwesome";



export default function Recet() {


  return (
    <SafeAreaView >
      
        
    <View style={{marginHorizontal:10,backgroundColor:COLORS.strong_blue, borderRadius:25}} >
    <TouchableOpacity >
      <View >
      <Image
        style={{width:"100%",objectFit:"cover",borderTopLeftRadius:25,borderTopRightRadius:25}}
        source={require("../assets/polloXD.jpg")}
      />
      </View>
      <View>
      <Text style={{  color: COLORS.yellow,fontSize: 30,fontWeight: "bold",marginVertical: 10,paddingLeft:10}}>
            do you want chicken?
          </Text>
      </View>
          </TouchableOpacity>
        <View style={{marginVertical:10,flex: 1, }}>
          <View style={{ display: "flex", flexDirection: "row",justifyContent:"flex-end",marginHorizontal:10 }}>
              <TouchableOpacity style={{marginHorizontal:10 }}>
        
                  <Icon name="star-o" size={35} color={COLORS.white} />
        
              </TouchableOpacity>
              <TouchableOpacity style={{marginHorizontal:10 }}>

                <Icon name="edit" size={35} color={COLORS.white} />

              </TouchableOpacity>

              <TouchableOpacity style={{marginHorizontal:10 }}>

                <Icon name="trash-o" size={35} color={COLORS.white} />

              </TouchableOpacity>
            </View>
        </View>
    </View>

    </SafeAreaView>

  );
}
