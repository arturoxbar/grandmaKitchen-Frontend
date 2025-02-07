import React from "react";
import { View, Text, TouchableOpacity} from "react-native";
import COLORS from "../constants/colors";

export default function Btn({Colorbtn, btnLabel, textColor, borderColorbtn,Press}){
    return(
    <TouchableOpacity onPress={Press} style={{marginHorizontal: 10,backgroundColor: Colorbtn , borderRadius:100, alignItems: 'center', paddingVertical:5, marginVertical:10, borderWidth:2, borderColor: borderColorbtn }}>
       
        <Text style={{color: textColor, fontSize: 22, fontWeight:'bold'}}>
            {btnLabel}
        </Text>
    </TouchableOpacity>
    );
}