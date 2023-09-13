import React, {useContext, useState} from 'react';
import {ScrollView, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, View} from 'react-native';
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import MyLogo from "../components/auth/MyLogo";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from "../context/auth";
import { API } from '../config';

const Signup = ({navigation}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [state, setState] = useContext(AuthContext);

    const handleSubmit = async () => {
        setLoading(true)
        try {
            console.log(name)
            const {data} = await axios.post(API+"signup", {
                name,
                email,
                password,
                confirmPassword
            });
            setState(data);
            setLoading(false)
            //save response in asyncstorage
            await AsyncStorage.setItem('@auth', JSON.stringify(data))
            navigation.navigate('Home')
        } catch (err) {
            alert(err.response.data.error)
            console.log(err)
            setLoading(false)
        }
    };

    return (
            <ScrollView>
                <View style={{ backgroundColor: '#32a0fa', alignItems: 'center' }}>
                        <Text
                            style={{
                                paddingTop: 40,
                                fontSize: 15,
                                color: '#fcfafa',
                                marginBottom: 30,
                            }}
                        >NAPRAVI NALOG</Text>
                    </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24}}>
                <UserInput name='Name' placeholder='Enter your name' value={name} setValue={setName}
                           autoCapitalize="words"
                           autoCorrect={false}/>
                <UserInput name='Email' placeholder='Enter your email' value={email} setValue={setEmail}
                           keyboardType='email-address' autoCompleteType='email'/>
                <UserInput name='Password' placeholder='Enter your password' value={password} setValue={setPassword}
                           secureText={true}/>
                <UserInput name='Confirm Password' placeholder='Confirm your password' value={confirmPassword}
                           setValue={setConfirmPassword} secureText={true} autoCompleteType='password'/>
                <SubmitButton loading={loading} title='Registracija' handleSubmit={handleSubmit}/>
                <View style={styles.loginContainer}>
                    <Text style={styles.loginButtonText}>Imate nalog? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginNowText}> Prijavite se!</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: '#f9f9f9',
    },
    loginContainer: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 30,
        color: '#333',
        textAlign: 'center',
        width: '100%',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        marginBottom: 8,
        color: '#888',
        fontSize: 14,
    },
    input: {
        width: '100%',
        height: 36,
        borderBottomWidth: 1,
        borderBottomColor: '#999',
        paddingLeft: 0,
        paddingRight: 8,
        paddingBottom: 4,
        fontSize: 16,
        color: '#333',
    },
    button: {
        width: '40%',
        height: 48,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: '#3c4a56',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    loginButton: {
        marginTop: 16,
    },
    loginButtonText: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
    },
    loginNowText: {
        color: '#888',
        fontSize: 12,
        textDecorationLine: 'underline',
    },
});

export default Signup;
