import { FontAwesome5 } from "@expo/vector-icons";
import { Text, TextInput, TextInputProps, View } from "react-native";
import React from "react";

type Props = TextInputProps & {
    label: string;
    errorText?: string;
    icon?: keyof typeof FontAwesome5.glyphMap; 
}

export default function TextField({label, errorText, icon} : Props) {
    return (
        <View>
            <Text>Teste Label</Text>
            <View>
                {!! icon && (
                    <View>
                        <FontAwesome5 name={icon} size={18} color="purple" />
                    </View>
                )}
                <TextInput
                    value="Foi só um teste boy"
                />
            </View>
        </View>
    )
}