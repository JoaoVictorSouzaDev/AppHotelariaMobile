import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';
import { global } from "./styles";

type NameIcon = {
    lib: "MaterialCommunityIcons"; 
    name: keyof typeof MaterialCommunityIcons.glyphMap
}

type Props = TextInputProps & {
    label: string;
    errorText?: string;
    icon?: NameIcon; 
    rightIcon?: ReactNode;
    isMasked?: boolean;
    type?: any;
    options?: any;
}

const TextField = ({label, errorText, icon, rightIcon, style, isMasked, type, options, ...props} : Props) => {
    return (
        <View style={global.inputGroup}>
            <Text style={global.label}>{label}</Text>
            <View style={[global.inputIcon, errorText ? global.inputError : null]}>
                {!! icon && (
                    <View>
                        <MaterialCommunityIcons name={icon.name} size={18} style={global.icon}/>
                    </View>
                )}
                
                {isMasked ? (
                    <TextInputMask
                        type={type}
                        options={options}
                        style={[global.input, style]}
                        placeholderTextColor="#a7a7a7ff"
                        {...props as any}
                    />
                ) : (
                    <TextInput
                        keyboardAppearance="dark"
                        placeholderTextColor="#a7a7a7ff"
                        style={[global.input, style]}
                        {...props}
                    />
                )}

                {rightIcon}
            </View>
            {!! errorText && <Text style={global.errorText}>{errorText}</Text>}
        </View>
    )
}

export default TextField;