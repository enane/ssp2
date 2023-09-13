import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import { AuthContext, AuthProvider } from "./context/auth";
import { EstateContext, EstateProvider } from "./context/estate";
import ScreensNav from "./components/nav/ScreensNav";

export default function RootNavigation() {
    return (
        <NavigationContainer>
            <AuthProvider>
                <EstateProvider>
                    <ScreensNav/>
                </EstateProvider>
            </AuthProvider>
        </NavigationContainer>
    );
}


