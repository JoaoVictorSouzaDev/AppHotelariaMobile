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
    hasContentStyle?: boolean;
}

const AuthContainer = ({title, subtitle, icon, children, hasContentStyle = true}: Props) => {
    return (
        <SafeAreaView style={[global.safeArea]}>
            <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={global.keyboardAvoid}>
                <ScrollView style={global.container}>

                    <View style={global.header}>
                        {!!icon && <FontAwesome5 name={icon} style={global.hotelIcon}/>} 
                        {!!title && <Text style={global.title}>{title}</Text>}
                    </View>

                    <View style={hasContentStyle ? global.content : {}}>

                        {children}
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default AuthContainer;

/*
    import { FontAwesome6 } from "@expo/vector-icons";
    import React from "react";
    import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    View,
    } from "react-native";
    import { SafeAreaView } from "react-native-safe-area-context";
    import { global } from "./styles";
    
    type Props = {
    title?: string;   
    subtitle?: string;
    icon?: keyof typeof FontAwesome6.glyphMap;
    children: React.ReactNode;
    };
    
    const AuthContainer = ({ title, subtitle, icon, children }: Props) => {
    return (
    <SafeAreaView style={global.safeArea}>
    <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={global.keyboardAvoiding}
    >
    <ScrollView contentContainerStyle={global.container}>
    <View style={global.header}>
    
                {!!icon && <FontAwesome6 name={icon} size={30} color="purple" />}
                {!!title && <Text style={global.title}>{title}</Text>}  
                {!!subtitle && <Text style={global.subtitle}>{subtitle}</Text>}
    
            </View>
    <View>{children}</View> {/* Retirada a estilização global.content para não impactar no 
            componente AuthContainer a ser chamado em outras telas 
    </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
    );
    };
    export default AuthContainer;
*/