import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TextInput, TextInputProps, View } from "react-native";
import React from "react";

type Props = TextInputProps & {
    label: string;
    errorText?: string;
    icon?: keyof typeof MaterialCommunityIcons.glyphMap; 
}

export function TextField({label, errorText, icon} : Props) {
    return (
        <View>
            <Text>{label}</Text>
            <View>
                {!! icon && (
                    <View>
                        <MaterialCommunityIcons name={icon} size={18} color="purple" />
                    </View>
                )}
                <TextInput
                    value="Foi só um teste boy"
                />
            </View>
        </View>
    )
}