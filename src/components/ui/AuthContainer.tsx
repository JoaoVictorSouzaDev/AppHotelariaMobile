import {FontAwesome5} from "@expo/vector-icons"
import {Text} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    title: string;
    subtitle?: string;
    icon?: keyof typeof FontAwesome5.glyphMap;
    // children: React.ReactNode;
}

export default function AuthContainer({title, subtitle, icon, /*children*/}: Props) {
    return (
        <SafeAreaView>
            <FontAwesome5 name={icon} size={25} color="red" />
            <Text>{title}</Text>
            <Text>{subtitle}</Text>
        </SafeAreaView>
    );
}