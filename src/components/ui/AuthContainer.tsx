import { FontAwesome5 } from "@expo/vector-icons"
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { global } from "./styles";

type Props = {
    title: string;
    subtitle?: string;
    icon?: keyof typeof FontAwesome5.glyphMap;
    // children: React.ReactNode;
}

export default function AuthContainer({title, subtitle, icon, /*children*/}: Props) {
    return (
        <SafeAreaView style={global.safeArea}>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={global.keyboardAvoid}>
                <ScrollView style={global.container}>
                    <View style={global.header}>
                        {!!icon && <FontAwesome5 name={icon} size={25} color="#4b0505" style={global.hotelIcon}/>} 
                        <Text style={global.title}>{title}</Text>
                        {!!subtitle && <Text style={global.subTitle}>{subtitle}</Text>}
                    </View>
                    <View style={global.content}>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}