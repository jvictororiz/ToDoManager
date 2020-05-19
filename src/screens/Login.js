import React, { useState } from 'react';
import {
    KeyboardAvoidingView, View, Image, TextInput, Button, Text,
    StyleSheet, Alert
} from 'react-native';
import { signInOnFirebaseAsync } from '../services/FirebaseApi';
import { CommonActions } from '@react-navigation/native';
const img = require('../assets/task.png');

const Login = props => {

    const [email, setEmail] = useState(props.email);
    const [password, setPassword] = useState('');

    const signInAsync = async () => {
        try {
            const user = await signInOnFirebaseAsync(email, password);
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Tarefas' }],
                }),
            );
        } catch (error) {
            Alert.alert('Não foi possível realizar o login', error.message);
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.topView}>
                <Image style={styles.img} source={img} />
            </View>
            <View style={styles.bottomView}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    keyboardType={'email-address'}
                    autoCapitalize="none"
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={password => setPassword(password)}
                />
                <Button title="Logar" onPress={() => signInAsync()} />
                <View style={styles.textConteiner}>
                    <Text>Não está cadastrado? </Text>
                    <Text style={styles.textRegister} onPress={() => {
                        props.navigation.navigate("Cadastro")
                    }}>
                        Cadastrar
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, flexDirection: 'column'
    },
    topView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50
    },
    img: {
        width: 150,
        height: 150
    },
    bottomView: {
        flexDirection: 'column',
        paddingRight: 20,
        paddingLeft: 20
    },
    input: {
        marginBottom: 20
    },
    textConteiner: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    textRegister: {
        fontWeight: 'bold'
    }
});

export default Login;