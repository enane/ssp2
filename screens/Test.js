import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, StyleSheet, Text} from 'react-native';
import SingleEstate from './SingleEstate';

const Test = ({estate}) => {

    const handleSignup = () => {
        // Implement signup logic here
        console.log('Signing up...');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Password:', password);
        console.log('Confirm Password:', confirmPassword);
    };

    const navigateToLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create an Account</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    placeholderTextColor="#999"
                    onChangeText={text => setName(text)}
                    value={name}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    onChangeText={text => setEmail(text)}
                    value={email}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    value={password}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Confirm your password"
                    placeholderTextColor="#999"
                    secureTextEntry={true}
                    onChangeText={text => setConfirmPassword(text)}
                    value={confirmPassword}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton} onPress={navigateToLogin}>
                <Text style={styles.loginButtonText}>Already have an account? Log in</Text>
            </TouchableOpacity>
        </View>
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
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 70,
        color: '#333',
        textAlign: 'center',
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
        fontSize: 16,
        color: '#888',
        textDecorationLine: 'underline',
    },
});

export default Test;
