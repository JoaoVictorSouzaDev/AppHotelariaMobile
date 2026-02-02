import { View, Text, TouchableOpacity, Pressable, StyleSheet, Dimensions } from 'react-native';
import { global } from '@/components/ui/styles';
import AuthContainer from '../ui/AuthContainer';
import TextField from "../ui/TextField";
import PasswordField from "../ui/PasswordField";
import React, { useState } from 'react';

const { width, height } = Dimensions.get('window');

const RenderAccount = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [nome, setNome] = useState("João Victor Souza");
    const [email, setEmail] = useState("email@email.com");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");

    return (
        <View style={{ flex: 1 }}> 
            <View style={global.screenContainer}> 
                <AuthContainer
                    title={nome}
                    subtitle="Atualize seus dados abaixo"
                >
                    <TextField 
                        label="Nome" 
                        icon={{lib: "MaterialCommunityIcons", name: "account"}} 
                        placeholder="Nome completo" 
                        value={nome}
                        onChangeText={setNome}
                    />

                    <TextField 
                        label="E-mail" 
                        icon={{lib: "MaterialCommunityIcons", name: "email"}} 
                        placeholder="email@email.com" 
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TextField 
                        label="CPF" 
                        icon={{lib: "MaterialCommunityIcons", name: "file-document"}} 
                        placeholder="000.000.000-00" 
                        keyboardType="numeric"
                        isMasked={true}
                        type={'cpf'}
                        value={cpf}
                        onChangeText={setCpf}
                    />

                    <TextField 
                        label="Telefone" 
                        icon={{lib: "MaterialCommunityIcons", name: "phone"}} 
                        placeholder="(99) 99999-9999" 
                        keyboardType="numeric"
                        isMasked={true}
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) '
                        }}
                        value={telefone}
                        onChangeText={setTelefone}
                    />

                    <TouchableOpacity style={[global.secondaryButton]}>
                        <Text style={global.primaryButtonText}>Alterar Dados</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={global.passwordResetDeiv} 
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={global.passwordResetAccount}>Alterar minha senha</Text>
                    </TouchableOpacity>
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
                        />
                        <PasswordField 
                            label="Nova Senha" 
                            placeholder="Digite a nova senha" 
                        />
                        <PasswordField 
                            label="Confirme a Nova Senha" 
                            placeholder="Confirme a nova senha" 
                        />

                        <TouchableOpacity 
                            style={[global.secondaryButton, { marginTop: 25 }]}
                            onPress={() => {
                                setModalVisible(false);
                            }}
                        >
                            <Text style={global.primaryButtonText}>Confirmar Senha</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

export default RenderAccount;