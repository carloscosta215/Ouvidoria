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
import { Snackbar, SegmentedButtons } from 'react-native-paper'

export default function SignUpScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [level, setLevel] = useState('Aluno');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [focusedField, setFocusedField] = useState(null);

    const [errors, setErrors] = useState({
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
    });

    const [showSnack, setShowSnack] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');

    const triggerSnackbar = (message) => {
        setSnackMessage(message);
        setShowSnack(true);
    };

    const toggleSnack = () => setShowSnack(false);

    function handleSignup() {
        const newErrors = {
            name: !name.trim(),
            email: !email.trim(),
            password: !password,
            confirmPassword: !confirmPassword,
        };

        if (!name.trim() || !email.trim() || !password || !confirmPassword) {
            setErrors(newErrors);
            triggerSnackbar('Preencha todos os campos obrigatórios!');
            return;
        }

        if (password !== confirmPassword) {
            setErrors({ ...newErrors, password: true, confirmPassword: true });
            triggerSnackbar('As senhas não coincidem.');
            return;
        }

        if (password.length < 8) {
            setErrors({ ...newErrors, password: true });
            triggerSnackbar('A senha deve ter pelo menos 8 caracteres.');
            return;
        }

        setErrors({ name: false, email: false, password: false, confirmPassword: false });
        setShowSnack(false);

        console.log({ name, email, level, password });
        navigation.replace('Login');
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <ScrollView
                contentContainerStyle={styles.scrollContainerCadastro}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <StatusBar style="dark" />

                    <View style={styles.container_inputs}>
                        {/* Nome Completo */}
                        <Text style={styles.label}>Nome Completo</Text>
                        <View
                            style={[
                                styles.inputContainer,
                                focusedField === 'name' && styles.inputFocused,
                                errors.name && styles.inputError,
                            ]}
                        >
                            <Ionicons
                                name="person-outline"
                                size={20}
                                color={errors.name ? '#ff3333' : focusedField === 'name' ? '#000' : '#666'}
                                style={styles.iconLeft}
                            />
                            <TextInput
                                style={styles.input}
                                value={name}
                                onChangeText={(text) => {
                                    setName(text);
                                    if (errors.name) setErrors({ ...errors, name: false });
                                }}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                placeholder="Seu Nome"
                                placeholderTextColor="#999"
                            />
                        </View>
                        {errors.name && <Text style={styles.errorText}>Nome é obrigatório.</Text>}

                        {/* E-mail */}
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
                                autoCapitalize="email"
                                keyboardType="email-address"
                                placeholder="seu@email.com"
                                placeholderTextColor="#999"
                            />
                        </View>
                        {errors.email && <Text style={styles.errorText}>Insira um e-mail válido.</Text>}

                        <SegmentedButtons
                            value={level}
                            onValueChange={setLevel}
                            style={{ marginTop: 12 }}
                            buttons={[
                                {
                                    value: 'aluno',
                                    label: 'Aluno',
                                },
                                {
                                    value: 'colaborador',
                                    label: 'Colaborador',
                                },
                            ]}
                        />

                        {/* Senha */}
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
                                placeholder="Mínimo 8 caracteres"
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

                        {/* Confirmar Senha */}
                        <Text style={styles.label}>Confirmar Senha</Text>
                        <View
                            style={[
                                styles.inputContainer,
                                focusedField === 'confirmPassword' && styles.inputFocused,
                                errors.confirmPassword && styles.inputError,
                            ]}
                        >
                            <Ionicons
                                name="lock-closed-outline"
                                size={20}
                                color={errors.confirmPassword ? '#ff3333' : focusedField === 'confirmPassword' ? '#000' : '#666'}
                                style={styles.iconLeft}
                            />
                            <TextInput
                                style={styles.input}
                                value={confirmPassword}
                                onChangeText={(text) => {
                                    setConfirmPassword(text);
                                    if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: false });
                                }}
                                onFocus={() => setFocusedField('confirmPassword')}
                                onBlur={() => setFocusedField(null)}
                                secureTextEntry={!showConfirmPassword}
                                placeholder="Digite a senha novamente"
                                placeholderTextColor="#999"
                            />
                            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                <Ionicons
                                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                                    size={20}
                                    color="#666"
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.confirmPassword && <Text style={styles.errorText}>As senhas precisam ser iguais.</Text>}

                        <TouchableOpacity style={styles.botao} onPress={handleSignup}>
                            <Text style={styles.texto}>Finalizar Cadastro</Text>
                        </TouchableOpacity>
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
                    }}>
                    {snackMessage}
                </Snackbar>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    scrollContainerCadastro: {
        flexGrow: 1,
        paddingVertical: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    container_inputs: {
        width: '100%',
        maxWidth: '95%',
        marginTop: 15,
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
        marginTop: 12,
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
    input: {
        flex: 1,
        color: '#222',
        fontSize: 16,
        height: '100%',
        outlineStyle: 'none',
        outlineWidth: 0,
    },
    inputFocused: {
        borderColor: '#000000',
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
    botao: {
        backgroundColor: '#20B77A',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    texto: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});