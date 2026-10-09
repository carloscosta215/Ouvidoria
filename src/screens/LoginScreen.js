import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Snackbar } from 'react-native-paper';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    const [showSnack, setShowSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');

    const triggerSnackbar = (message) => {
        setSnackMessage(message);
        setShowSnack(true);
    };

    const toggleSnack = () => setShowSnack(false);

    function handleLogin() {
        const newErrors = {
            email: !email.trim(),
            password: !password,
        };

        if (!email.trim() || !password) {
            setErrors(newErrors);
            triggerSnackbar('Preencha todos os campos obrigatórios!');
            return;
        }

        if (password.length < 8) {
            setErrors({ ...newErrors, password: true });
            triggerSnackbar('A senha deve ter pelo menos 8 caracteres.');
            return;
        }

        setErrors({ email: false, password: false });
        setShowSnack(false);

        console.log({ email, password });
        navigation.replace('Home');
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView
                contentContainerStyle={styles.loginScroll}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.loginContainer}>
                    <StatusBar style="dark" />

                    <View style={styles.loginIconContainer}>
                        <Text style={styles.loginIcon}>💭</Text>
                    </View>

                    <Text style={styles.loginTitulo}>
                        Ouvidoria <Text style={{ color: '#20B77A' }}>IFPE</Text>
                    </Text>
                    <Text style={styles.loginSubtitulo}>Sua voz importa para nós</Text>

                    <View style={styles.loginInputs}>
                        {/* Campo E-mail */}
                        <Text style={styles.label}>E-mail</Text>
                        <View
                            style={[
                                styles.inputContainer,
                                focusedField === 'email' && styles.inputFocused,
                                errors.email && styles.inputError,
                            ]}
                        >
                            <Ionicons
                                name="mail-outline"
                                size={20}
                                color={errors.email ? '#ff3333' : focusedField === 'email' ? '#000' : '#666'}
                                style={styles.iconLeft}
                            />
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={(text) => {
                                    setEmail(text);
                                    if (errors.email) setErrors({ ...errors, email: false });
                                }}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                placeholder="seu@email.com"
                                placeholderTextColor="#999"
                            />
                        </View>
                        {errors.email && <Text style={styles.errorText}>E-mail é obrigatório.</Text>}

                        {/* Campo Senha */}
                        <Text style={styles.label}>Senha</Text>
                        <View
                            style={[
                                styles.inputContainer,
                                focusedField === 'password' && styles.inputFocused,
                                errors.password && styles.inputError,
                            ]}
                        >
                            <Ionicons
                                name="lock-closed-outline"
                                size={20}
                                color={errors.password ? '#ff3333' : focusedField === 'password' ? '#000' : '#666'}
                                style={styles.iconLeft}
                            />
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    if (errors.password) setErrors({ ...errors, password: false });
                                }}
                                onFocus={() => setFocusedField('password')}
                                onBlur={() => setFocusedField(null)}
                                secureTextEntry={!showPassword}
                                placeholder="••••••••"
                                placeholderTextColor="#999"
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons
                                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                                    size={20}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.password && <Text style={styles.errorText}>A senha deve ter no mínimo 8 caracteres.</Text>}

                        <TouchableOpacity>
                            <Text style={styles.esqueciSenha}>Esqueci minha senha</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.loginBotao} onPress={handleLogin}>
                            <Text style={styles.loginBotaoTexto}>Entrar</Text>
                        </TouchableOpacity>

                        <View style={styles.criarContaContainer}>
                            <Text style={styles.naoTemConta}>Não tem uma conta? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <Text style={styles.criarConta}>Criar conta</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Snackbar
                    visible={showSnack}
                    onDismiss={toggleSnack}
                    duration={Snackbar.DURATION_LONG}
                    action={{
                        label: 'OK',
                        textColor: '#20B77A',
                        onPress: toggleSnack,
                    }}
                >
                    {snackMessage}
                </Snackbar>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    loginScroll: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    loginContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingTop: 40,
        paddingBottom: 20,
    },
    loginIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 16,
        backgroundColor: '#20B77A',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 16,
    },
    loginIcon: {
        fontSize: 32,
    },
    loginTitulo: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#111',
        marginBottom: 4,
    },
    loginSubtitulo: {
        fontSize: 15,
        color: '#718096',
        marginBottom: 24,
    },
    loginInputs: {
        width: '100%',
    },
    label: {
        fontSize: 15,
        color: '#333',
        fontWeight: '500',
        marginTop: 10,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFC',
        width: '100%',
        height: 50,
        marginVertical: 6,
        paddingHorizontal: 15,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: '#E2E8F0',
    },
    inputFocused: {
        borderColor: '#000000',
    },
    input: {
        flex: 1,
        color: '#222',
        fontSize: 16,
        height: '100%',
        outlineStyle: 'none', 
    },
    iconLeft: {
        marginRight: 10,
    },
    inputError: {
        borderColor: '#ff3333',
        borderWidth: 1.5,
        backgroundColor: '#FFF5F5',
    },
    errorText: {
        color: '#ff3333',
        fontSize: 12,
        marginTop: 2,
        marginLeft: 4,
    },
    esqueciSenha: {
        color: '#20B77A',
        fontSize: 14,
        alignSelf: 'flex-end',
        marginTop: 6,
        marginBottom: 20,
        fontWeight: '500',
    },
    loginBotao: {
        width: '100%',
        height: 50,
        backgroundColor: '#20B77A',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginBotaoTexto: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    criarContaContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 28,
    },
    naoTemConta: {
        color: '#718096',
        fontSize: 15,
    },
    criarConta: {
        color: '#20B77A',
        fontSize: 15,
        fontWeight: '600',
    },
});