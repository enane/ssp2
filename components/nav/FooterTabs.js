import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Icon } from '@rneui/themed';
import {useNavigation, useRoute} from "@react-navigation/native";

export const Tab = ({src, handlePress, active}) => (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Image
                                    source={src}
                                    style={{width: 20, height: 20}}
                                />
    </TouchableOpacity>
);
const FooterTabs = () => {
    const navigation = useNavigation();
    const route = useRoute();
    return (
        <View style={styles.container}>
            <Tab src={require(`../../assets/home.png`)} handlePress={()=> navigation.replace('Home')} active={route.name==='Home'}/>
            <Tab src={require(`../../assets/pencil.png`)} handlePress={()=> navigation.navigate('Posts')} screenNmae='Posts' active={route.name==='Posts'}/>
            <Tab src={require(`../../assets/saved-posts.png`)} handlePress={()=> navigation.navigate('SavedPosts')} screenNmae='SavedPosts' active={route.name==='SavedPosts'}/>
            <Tab src={require(`../../assets/link.png`)} handlePress={()=> navigation.replace('Links')} screenNmae='Links' active={route.name==='Links'}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3e484f',
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        // height:100
        // paddingBottom: 35
    },
    button: {
        alignItems: 'center',
    },
});

export default FooterTabs;
