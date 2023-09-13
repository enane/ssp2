import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';

const UserInput = ({
                       name,
                       placeholder,
                       value,
                       setValue,
                       autoCapitalize = "none",
                       secureText = false,
                       keyboardType = "default",
                   }) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{name}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#999"
                onChangeText={text => setValue(text)}
                value={value}
                autoCorrect={false}
                autoCapitalize={autoCapitalize}
                secureTextEntry={secureText}
                keyboardType={keyboardType}
            />
        </View>

    );
};

const styles = StyleSheet.create({

    inputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    label: {
        color: '#888',
        fontSize: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "grey",
        backgroundColor: '#fcfafa',
        height: 35,
        marginBottom: 10,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 12,
        width: '100%',
        marginTop: 3
    }
});

export default UserInput;
