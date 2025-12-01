import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, Dimensions} from "react-native";
import { global } from "./styles";

const { width, height } = Dimensions.get("window");

type Infos = 
| { title?: string; text: string; price: number};

type NameIcon = 
| {lib: "MaterialCommunityIcons"; name: keyof typeof MaterialCommunityIcons.glyphMap};

type Props = {
    label?: string;
    icon?: NameIcon;
    description?: Infos;
}

const RoomCard = ({label, icon, description}: Props) => {
  return (
    <View style={global.content}>
        <View></View>
        <View>
            {!!label && <Text style={global.title}>{label}</Text>}
            <View>
                <View>
                    {!!icon && (
                        <View>
                            {icon.lib === "MaterialCommunityIcons" && (
                                <MaterialCommunityIcons  name={icon.name} size={23} color="#4b0505" />
                            )}
                        </View>
                    )}
                    {!!description && (
                        <View style={{display: "flex", flexDirection: "row"}}>
                            <View style={style.description}>
                                {!!description.title && <Text style={{color: "#000000ff"}}>{description.title}</Text>}
                                <Text style={{color: "#000000ff"}}>{description.text}</Text>
                                <Text style={{color: "green"}}>R$ {description.price}</Text>
                            </View>
                        </View>
                    )}
                </View>
                <View></View>
            </View>
        </View>
    </View>
  )};

const style = StyleSheet.create({
    description: {
        backgroundColor: "#e6e6e6ff",
        borderRadius: 10,

    }
})

export default RoomCard

