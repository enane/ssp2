import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

const SubmitButton = ({ title, handleSubmit, loading }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={handleSubmit} color disabled={loading}>
            {loading ? (
                <ActivityIndicator color="#fff" size="small" />
            ) : (
                <Text style={styles.buttonText}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: '40%',
        height: 30,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#3c4a56',
    },
    buttonText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default SubmitButton;

// import React from 'react';
// import {TouchableOpacity, StyleSheet, Text} from 'react-native';
//
// const SubmitButton = ({title, handleSubmit, loading}) => {
//     return (
//         <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//             <Text style={styles.buttonText}>{loading ? 'Please wait..' : title}</Text>
//         </TouchableOpacity>
//     );
// };
//
// const styles = StyleSheet.create({
//     button: {
//         width: '40%',
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
// });
//
// export default SubmitButton;
