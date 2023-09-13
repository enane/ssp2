// import React, {useState, useContext} from 'react';
// import {
//     View,
//     TouchableOpacity,
//     StyleSheet,
//     Text,
//     KeyboardAvoidingView,
//     ScrollView
// } from 'react-native';
// import SubmitButton from "../components/auth/SubmitButton";
// import UserInput from "../components/auth/UserInput";
// import MyLogo from "../components/auth/MyLogo";
// import axios from 'axios';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {AuthContext} from "../context/auth";
// import {API} from "../config";

// const Login = ({navigation}) => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [state, setState] = useContext(AuthContext);

//     const handleLogin = async () => {
//         console.log(API+"signin");
//         try {
//             setLoading(true)
//             const {data} = await axios.post(API+"signin", {
//                 email,
//                 password,
//             });
//             console.log(data)
//             setState(data);
//             await AsyncStorage.setItem('@auth', JSON.stringify(data))
//             setLoading(false)
//             navigation.navigate('Home');
//         } catch (err) {
//             alert(err.response.data.error)
//             console.log(err)
//             setLoading(false)
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//                 <MyLogo/>
//                 <Text style={styles.title}> Welcome Back!  </Text>
//                 <UserInput name='Email' placeholder='Enter your email' value={email} setValue={setEmail}
//                            keyboardType='email-address' autoCompleteType='email'/>
//                 <UserInput name='Password' placeholder='Enter your password' value={password} setValue={setPassword}
//                            secureText={true}/>
//                 <SubmitButton title="Log in" loading={loading} handleSubmit={handleLogin}/>
//                 <View style={styles.registerContainer}>
//                     <Text style={styles.registerButtonText}>Don't have an account? </Text>
//                     <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
//                         <Text style={styles.forgotPasswordText}> Register
//                             now!</Text>
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         width:'100%',
//         // padding: 24,
//         backgroundColor: '#f9f9f9',
//     },
//     registerContainer: {
//         flexDirection: 'row',
//         marginTop: 10,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 30,
//         color: '#333',
//         textAlign: 'center',
//         width: '100%'
//     },
//     inputContainer: {
//         width: '100%',
//         marginBottom: 16,
//     },
//     label: {
//         marginBottom: 8,
//         color: '#888',
//         fontSize: 14,
//     },
//     input: {
//         width: '100%',
//         height: 36,
//         borderBottomWidth: 1,
//         borderBottomColor: '#999',
//         paddingLeft: 0,
//         paddingRight: 8,
//         paddingBottom: 4,
//         fontSize: 16,
//         color: '#333',
//     },
//     button: {
//         width: '30%',
//         height: 48,
//         marginTop: 30,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 8,
//         backgroundColor: '#3c4a56',
//     },
//     buttonText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#fff',
//     },
//     forgotPasswordText: {
//         fontSize: 12,
//         color: '#888',
//         // marginTop: 16,
//         textDecorationLine: 'underline',
//     },
//     registerNowText: {
//         color: '#888',
//         fontSize: 12,
//         textDecorationLine: 'underline',
//     },
//     registerButton: {
//         marginTop: 25,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     registerButtonText: {
//         fontSize: 12,
//         color: '#333',
//         textAlign: 'center',
//     },
// });

// export default Login;

// // import React, { useState } from 'react';
// // import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
// //
// // const Login = () => {
// //     const [email, setEmail] = useState('');
// //     const [password, setPassword] = useState('');
// //
// //     const handleLogin = () => {
// //         // Implement login logic here
// //         console.log('Logging in...');
// //         console.log('Email:', email);
// //         console.log('Password:', password);
// //     };
// //
// //     return (
// //         <View style={styles.container}>
// //             <Text style={styles.title}>Welcome Back!</Text>
// //             <View style={styles.inputContainer}>
// //                 <Text style={styles.label}>Email</Text>
// //                 <TextInput
// //                     style={styles.input}
// //                     placeholder="Enter your email"
// //                     placeholderTextColor="#999"
// //                     onChangeText={text => setEmail(text)}
// //                     value={email}
// //                 />
// //             </View>
// //             <View style={styles.inputContainer}>
// //                 <Text style={styles.label}>Password</Text>
// //                 <TextInput
// //                     style={styles.input}
// //                     placeholder="Enter your password"
// //                     placeholderTextColor="#999"
// //                     secureTextEntry={true}
// //                     onChangeText={text => setPassword(text)}
// //                     value={password}
// //                 />
// //             </View>
// //             <TouchableOpacity style={styles.button} onPress={handleLogin}>
// //                 <Text style={styles.buttonText}>Log in</Text>
// //             </TouchableOpacity>
// //             <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
// //         </View>
// //     );
// // };
// //
// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         padding: 24,
// //         backgroundColor: '#f9f9f9',
// //     },
// //     title: {
// //         fontSize: 36,
// //         fontWeight: 'bold',
// //         marginBottom: 70,
// //         color: '#333',
// //         textAlign: 'center',
// //     },
// //     inputContainer: {
// //         width: '100%',
// //         marginBottom: 16,
// //     },
// //     label: {
// //         marginBottom: 8,
// //         color: '#888',
// //         fontSize: 14,
// //     },
// //     input: {
// //         width: '100%',
// //         height: 36,
// //         borderBottomWidth: 1,
// //         borderBottomColor: '#999',
// //         paddingLeft: 0,
// //         paddingRight: 8,
// //         paddingBottom: 4,
// //         fontSize: 16,
// //         color: '#333',
// //     },
// //     button: {
// //         width: '40%',
// //         height: 48,
// //         marginTop: 30,
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         borderRadius: 8,
// //         backgroundColor: '#3c4a56',
// //     },
// //     buttonText: {
// //         fontSize: 18,
// //         fontWeight: 'bold',
// //         color: '#fff',
// //     },
// //     forgotPasswordText: {
// //         fontSize: 16,
// //         color: '#888',
// //         marginTop: 16,
// //         textDecorationLine: 'underline',
// //     },
// // });
// //
// // export default Login;

import React, { useContext, useState } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet, Text, KeyboardAvoidingView, View } from 'react-native';
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import MyLogo from "../components/auth/MyLogo";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../context/auth";
import { API } from '../config';

const Signup = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [state, setState] = useContext(AuthContext);

    const handleLogin = async () => {
        console.log(API + "signin");
        try {
            setLoading(true)
            const { data } = await axios.post(API + "signin", {
                email,
                password,
            });
            console.log(data)
            setState(data);
            await AsyncStorage.setItem('@auth', JSON.stringify(data))
            setLoading(false)
            navigation.navigate('Home');
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
                >PRIJAVI SE</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 }}>
                <UserInput name='Email' placeholder='Enter your email' value={email} setValue={setEmail}
                    keyboardType='email-address' autoCompleteType='email' />
                <UserInput name='Password' placeholder='Enter your password' value={password} setValue={setPassword}
                    secureText={true} />
                <SubmitButton loading={loading} title='Prijava' handleSubmit={handleLogin} />
                <View style={styles.loginContainer}>
                    <Text style={styles.loginButtonText}>Nemate nalog? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.loginNowText}> Registrujte se!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
        // </View>
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

