import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TextInput, TextInputProps, View } from "react-native";
import React from "react";
import { global } from "./styles";

type Props = TextInputProps & {
    label: string;
    errorText?: string;
    icon?: keyof typeof MaterialCommunityIcons.glyphMap; 
}

const TextField = ({label, errorText, icon, ...props} : Props) => {
    return (
        <View style={global.inputGroup}>
            <Text style={global.label}>{label}</Text>
            <View style={[global.inputIcon, errorText ? global.inputError : null]}>
                {!! icon && (
                    <View>
                        <MaterialCommunityIcons name={icon} size={18} color="#4b0505" />
                    </View>
                )}
                <TextInput
                    keyboardAppearance="dark"
                    placeholderTextColor="#a7a7a7ff"
                    style={[global.input]}
                    {...props}
                />
            </View>
            {!! errorText && 
                <Text style={global.errorText}>{errorText}</Text>
            }
        </View>
    )
}

export default TextField