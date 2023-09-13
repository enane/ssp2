import React, {useContext} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "../../screens/Login";
import Home from "../../screens/Home";
import Signup from "../../screens/Signup";
import {AuthContext} from "../../context/auth";
import Account from "../../screens/Account";
import Links from "../../screens/Links";
import Posts from "../../screens/Posts";
import LinkView from "../../screens/LinkView";
import SavedPosts from "../../screens/SavedPosts";
import SingleEstate from "../../screens/SingleEstate";


const Stack = createNativeStackNavigator();

export default function ScreensNav() {
    const [state, setState] = useContext(AuthContext)
    const authenticated = state && state.token !== '' && state.user !== null;
    return (
        <Stack.Navigator
            initialRouteName='Home'
            screenOptions={{headerShown: false}}
        >
            {authenticated ?
                <>
                    <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
                    <Stack.Screen name='SingleEstate' component={SingleEstate} options={{headerShown: false}}/>
                    <Stack.Screen name='SavedPosts' component={SavedPosts} options={{headerShown: false}}/>
                    <Stack.Screen name='Account' component={Account}
                                  options={{headerTitle: 'Account Settings', headerBackTitle: ''}}/>
                    <Stack.Screen name='Posts' component={Posts}
                                  options={{headerTitle: 'Add Post', headerBackTitle: ''}}/>
                    <Stack.Screen name='Links' component={Links} options={{headerShown: false}}/>
                    <Stack.Screen name="LinkView" component={LinkView} options={{title: "",}}/>
                </>
                :
                <>
                    <Stack.Screen name='Signup' component={Signup} options={{headerShown: false}}/>
                    <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
                </>
            }
        </Stack.Navigator>
    );
}


