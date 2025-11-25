import { FontAwesome5 } from "@expo/vector-icons"
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { global } from "./styles";

type Props = {
    title?: string;
    subtitle?: string;
    icon?: keyof typeof FontAwesome5.glyphMap;
    children: React.ReactNode;
}

const AuthContainer = ({title, subtitle, icon, children}: Props) => {
    return (
        <SafeAreaView style={global.safeArea}>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={global.keyboardAvoid}>
                <ScrollView style={global.container}>

                    <View style={global.header}>
                        {!!icon && <FontAwesome5 name={icon} style={global.hotelIcon}/>} 
                        {!!title && <Text style={global.title}>{title}</Text>}
                    </View>

                    <View style={global.content}>
                        {!!subtitle && <Text style={global.subTitle}>{subtitle}</Text>}
                        {children}
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default AuthContainer;