import { useRouter } from "expo-router";
import React, { useMemo, useState } from 'react';
import { Alert, Dimensions, Text, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";

function isValidEmail(email: string) {
    return /^[^\s@&='"!]@[^\s@&='"!].[^\s@&='"!]$/.test(email);
}

const RenderLogin = () => {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState<{email?: boolean; password?: boolean}>({});

    const errors = useMemo(() => {
      const error: Record<string, string> = {};
      if (touched.email && !email) error.email = "E-mail obrigatório";
      if (touched.password && !password) error.password = "Senha obrigatória";
      if (touched.password && password && password.length < 6) error.password = "No mínimo 6 caracteres para a senha";
      if (touched.email && email && !isValidEmail(email)) error.email = "Digite um e-mail válido";
      return error;
    }, [email, password, touched]);

    const canSubmit = email && password && Object.keys(errors).length === 0 && !loading;

    const handleSubmit = async () => {
        try {
        setLoading(true);
        console.log("[LOGIN] Tentando login com: ", {
            email: email,
            password: password
        });
        await new Promise((req) => setTimeout(req, 2000));
        if (email === "joaosouza@gmail.com" && password === "12345678") {
            Alert.alert("Login bem-sucedido!");
            router.replace("/(tabs)/explorer");
        }
        else {
            Alert.alert("Login inválido!");
            return;
        }      
        }
        catch (erro) {
        Alert.alert("Erro", "Falha ao tentar logar!");
        }
        finally {
            setLoading(false);
        }
    };
    
    const { width, height } = Dimensions.get("window");

    return (

        <AuthContainer
            title="Grand Hotel Royal"
            icon="hotel">
            
            <TextField
                label="E-mail"
                icon={{ lib: "MaterialCommunityIcons", name: "email" }}
                placeholder="email@email.com"
                value={email}
                onChangeText={(input) => setEmail(input)}
                errorText={errors.email}
                keyboardType="email-address"
            />

            <PasswordField
                label="Senha"
                icon={{ lib: "MaterialCommunityIcons", name: "lock" }}
                placeholder="********"
                value={password}
                onChangeText={(input) => setPassword(input)}
                errorText={errors.password}
            />

            <View>
                <Text style={global.defaultText}>
                    Não possui uma conta? {''}
                    <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                    <Text style={global.registerLinkText}>
                        Cadastre-se.
                    </Text>
                    </TouchableOpacity>
                </Text>
            </View>

            <TouchableOpacity style={[global.primaryButton]}
                onPress={handleSubmit}
                disabled={canSubmit ? false : true}
            >
                <Text style={global.primaryButtonText}>Entrar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={global.passwordResetDeiv} onPress={() => router.push("/(auth)/resetPassword")}>
                <Text style={global.passwordReset}>Esqueci minha senha</Text>
            </TouchableOpacity>

        </AuthContainer>

    )
}

export default RenderLogin;