import React, {useContext} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Icon } from '@rneui/themed';
import {AuthContext} from "../../context/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation, useRoute} from "@react-navigation/native";

const HeaderTabs = ({ onLogout }) => {
    const navigation = useNavigation();
    const route = useRoute();
    
    const [state, setState] = useContext(AuthContext)
    const signOut = async () => {
        setState({token: '', user: null});
        await AsyncStorage.removeItem('@auth');
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nekretnine</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={()=> navigation.navigate('Account')} screenNmae='Account' active={route.name==='Account'}>
            <Image
                                    source={require(`../../assets/logout.png`)}
                                    style={{width: 24, height: 20}}
                                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3e484f',
        paddingVertical: 8,
        // paddingTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f2f8fc',
//        fontFamily: 'Bradley Hand', // Replace with the name of your custom font
        textShadowColor: '#000',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    logoutButton: {
        alignItems: 'center',
    },
});

export default HeaderTabs;
