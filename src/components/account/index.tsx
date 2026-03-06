import { View, Text, TouchableOpacity, Pressable, Alert, ActivityIndicator } from 'react-native';
import { global } from '@/components/ui/styles';
import AuthContainer from '../ui/AuthContainer';
import TextField from "../ui/TextField";
import PasswordField from "../ui/PasswordField";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

const RenderAccount = () => {

    const { signOut, updateClient, user } = useAuth(); 
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [nome, setNome] = useState(user?.nome || "");
    const [email, setEmail] = useState(user?.email || "");
    const [telefone, setTelefone] = useState(user?.telefone || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    console.log("DADOS DO USUÁRIO NO CONTEXTO:", user);

    useEffect(() => {
        if (user) {
            setNome(user.nome);
            setEmail(user.email);
            setTelefone(user.telefone || "");
        }
    }, [user]);

    const handleLogout = async () => {
      signOut();
      router.replace("/(auth)");
    }

    const handleUpdateData = async () => {
        if (!nome || !email) {
            Alert.alert("Erro", "Nome e E-mail são obrigatórios.");
            return;
        }

        if (!user?.id) {
            Alert.alert("Erro", "Usuário não identificado.");
            return;
        }

        try {
            setLoading(true);
        
            await updateClient(user.id, {
                nome: nome,
                email: email,
                telefone: telefone
            });

            Alert.alert("Sucesso", "Seus dados foram atualizados com sucesso!");
        } catch (error: any) {
            Alert.alert("Erro ao atualizar", error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleUpdatePassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert("Erro", "A nova senha e a confirmação não coincidem.");
            return;
        }

        if (!user?.id) return;

        try {
            setLoading(true);


            await updateClient(user.id, {
                senha: newPassword
            });

            Alert.alert("Sucesso", "Senha alterada com sucesso!");
            setModalVisible(false);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            Alert.alert("Erro", "Não foi possível alterar a senha.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={{ flex: 1 }}> 
            <View style={global.screenContainer}> 
                <AuthContainer
                    title="Seu perfil"
                    subtitle="Atualize seus dados abaixo"
                >
                    <TextField 
                        label="Nome" 
                        icon={{lib: "MaterialCommunityIcons", name: "account"}} 
                        placeholder="Nome completo" 
                        onChangeText={setNome}
                    />

                    <TextField 
                        label="E-mail" 
                        icon={{lib: "MaterialCommunityIcons", name: "email"}} 
                        placeholder="email@email.com" 
                        keyboardType="email-address"
                        onChangeText={setEmail}
                    />

                    <TextField 
                        label="Telefone" 
                        icon={{lib: "MaterialCommunityIcons", name: "phone"}} 
                        placeholder="(99) 99999-9999" 
                        keyboardType="numeric"
                        isMasked={true}
                        type={'cel-phone'}
                        value={telefone}
                        onChangeText={setTelefone}
                    />

                    <TouchableOpacity 
                        style={[global.secondaryButton, loading && { opacity: 0.7 }]}
                        onPress={handleUpdateData}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={global.primaryButtonText}>Alterar Dados</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={global.passwordResetDeiv} 
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={global.passwordResetAccount}>Alterar minha senha</Text>
                    </TouchableOpacity>
                    
                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity onPress={handleLogout} style={{ alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={global.secondaryButtonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>

                </AuthContainer>
            </View>

            {modalVisible && (
                <View style={global.absoluteOverlay}>
                    <Pressable 
                        style={global.backgroundTap} 
                        onPress={() => setModalVisible(false)} 
                    />
                    
                    <View style={global.modalCard}>
                        <Text style={[global.title, { marginBottom: 20, textAlign: 'center' }]}>
                            Alterar Senha
                        </Text>

                        <PasswordField 
                            label="Senha Atual" 
                            placeholder="Digite a senha atual" 
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                        />
                        <PasswordField 
                            label="Nova Senha" 
                            placeholder="Digite a nova senha" 
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <PasswordField 
                            label="Confirme a Nova Senha" 
                            placeholder="Confirme a nova senha" 
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />

                        <TouchableOpacity 
                            style={[global.secondaryButton, { marginTop: 25 }]}
                            onPress={handleUpdatePassword}
                            disabled={loading}
                        >
                             {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={global.primaryButtonText}>Confirmar Senha</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

export default RenderAccount;