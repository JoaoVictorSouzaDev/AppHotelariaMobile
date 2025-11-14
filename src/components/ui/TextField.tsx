import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { global } from "./styles";

type Props = TextInputProps & {
    label: string;
    errorText?: string;
    icon?: keyof typeof MaterialCommunityIcons.glyphMap; 
    rightIcon?: ReactNode;
}

const TextField = ({label, errorText, icon, rightIcon, style, ...props} : Props) => {
    return (
        <View style={global.inputGroup}>
            <Text style={global.label}>{label}</Text>
            <View style={[global.inputIcon, errorText ? global.inputError : null]}>
                {!! icon && (
                    <View>
                        <MaterialCommunityIcons name={icon} size={18} style={global.icon}/>
                    </View>
                )}
                <TextInput
                    keyboardAppearance="dark"
                    placeholderTextColor="#a7a7a7ff"
                    style={[global.input, style]}
                    {...props}
                />

                {rightIcon}

            </View>
            {!! errorText && 
                <Text style={global.errorText}>{errorText}</Text>
            }
        </View>
    )
}

export default TextField