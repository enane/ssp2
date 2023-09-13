import React from 'react';
import {View, Image, Text} from "react-native";

const MyLogo = () => (
    <View>
        <Image source={require('../../assets/splash.png')} style={{width: 70, height: 70}}/>
    </View>
)

export default MyLogo;