
import React, {useState} from "react";
import TextField from "./TextField";
import { TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { global } from "../ui/styles";

type Props = React.ComponentProps<typeof TextField>;

const PasswordField = (props: Props) => {

    const [show, setShow] = useState(false);

    const EyeButton = (
        <TouchableOpacity 
            onPress={() => setShow((sv) => !sv)} 
            style={{ paddingHorizontal: 10 }}
        > 
            <MaterialCommunityIcons 
                name={show ? "eye-off" : "eye"} 
                size={20} 
                style={global.icon}
            />
        </TouchableOpacity> 
    );

    return (
        <View> 
            <TextField
                {...props}
                icon={props.icon ?? "account-lock"}
                secureTextEntry={!show}
                autoCapitalize="none"
                autoCorrect={false}

                rightIcon={EyeButton} 
            />
        </View>
    )
}

export default PasswordField;