// PasswordField.tsx

import React, {useState} from "react";
import TextField from "./TextField";
import { TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { global } from "../ui/styles";

type Props = React.ComponentProps<typeof TextField>;

const PasswordField = (props: Props) => {

    const [show, setShow] = useState(false);

    // O elemento TouchableOpacity que será passado como acessório
    const EyeButton = (
        // *Recomendação: você provavelmente precisará de um estilo customizado
        // para posicionar este botão na lateral direita e centralizado verticalmente
        // dentro do campo de texto, ou ajustar o 'global.icon' para esse contexto.*
        <TouchableOpacity 
            onPress={() => setShow((sv) => !sv)} 
            // Adicione um estilo aqui se precisar de margem ou ajuste de alinhamento
            style={{ paddingHorizontal: 10 }} // Exemplo de estilo para dar um espaço
        > 
            <MaterialCommunityIcons 
                name={show ? "eye-off" : "eye"} 
                size={20} 
                style={global.icon} // Certifique-se de que global.icon não anule seu posicionamento
            />
        </TouchableOpacity> 
    );

    return (
        // Remova o <View> externo se ele não tiver outra finalidade
        // e se o TextField já for um bloco único na sua UI.
        <View> 
            <TextField
                {...props}
                icon={props.icon ?? "account-lock"}
                secureTextEntry={!show}
                autoCapitalize="none"
                autoCorrect={false}
                // Passa o botão de olho como acessório à direita
                rightIcon={EyeButton} 
            />
        </View>
    )
}

export default PasswordField;