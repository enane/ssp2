import React, { useContext, useEffect, useState } from "react";
import { Text, SafeAreaView, View, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/auth";
import FooterTabs from "../components/nav/FooterTabs";
import HeaderTabs from "../components/nav/HeaderTabs";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import UserInput from "../components/auth/UserInput";
import SubmitButton from "../components/auth/SubmitButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API } from "../config";

const Account = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [state, setState] = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(require('../assets/default.jpg'));

    useEffect(() => {
        if (state) {
            console.log(state)
            const { name, email, role, image } = state.user;
            setName(name)
            setEmail(email)
            setRole(role)
            if (image) setProfileImage(image)
        }
    }, [state])

    const handleChoosePhoto = async () => {
        // console.log(urlPreview)
        const options = {
            mediaType: "photo",
            quality: 1,
        };
        const result = await launchImageLibrary(options);
        if (result.assets && result.assets.length > 0) {
            const selectedImageSource = result.assets[0].uri;
            console.log(selectedImageSource)
            setProfileImage(selectedImageSource);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post(API + "update-info", {
                name,
                email,
                password,
                profileImage,
                'user': state
            });
            if (data.error) {
                alert(data.error);
                setLoading(false);
            } else {
                console.log(data)
                setState(state => ({
                    ...state,
                    user: {
                        ...state.user,
                        name: name,
                        email: email,
                        image: profileImage
                    },
                }));
                setName(data.name);
                setEmail(data.email);
                alert("👍 Info updated");
                setPassword("");
                setLoading(false);
            }
        } catch (err) {
            alert("Password update failed. Try again.");
            console.log(err);
            setLoading(false);
        }
    };


    const signOut = async () => {
        setState({ token: '', user: null });
        await AsyncStorage.removeItem('@auth');
    }

    return (
        <View style={styles.container}>
            {/*<HeaderTabs />*/}
            <SafeAreaView style={styles.contentContainer}>
                <ScrollView contentContainerStyle={styles.accountSettings}>
                    <View style={styles.profileImageContainer}>
                        <Image source={typeof profileImage === 'number' ? profileImage : { uri: profileImage }} style={styles.profileImage} />
                        <TouchableOpacity onPress={handleChoosePhoto}><Text style={styles.changeImageText}>Change Image</Text></TouchableOpacity>
                        <Text style={{ marginTop: 10 }}>{email}</Text>
                        <Text style={{ fontSize: 12, marginTop: 2, color: '#888' }}>{role}</Text>
                    </View>
                    <UserInput name='Name' placeholder='Update your name' value={name}
                        autoCapitalize="words"
                        autoCorrect={false} setValue={setName} />
                    <UserInput name='Email' placeholder='Update your email' value={email}
                        autoCapitalize="words"
                        autoCorrect={false} setValue={setEmail} />
                    <UserInput name='Password' placeholder='Update your password'
                        secureText={true} setValue={setPassword} />
                    <SubmitButton title="Update" loading={loading} handleSubmit={handleSubmit} />
                    <SubmitButton title="Logout" loading={loading} handleSubmit={signOut} />
                </ScrollView>
            </SafeAreaView>
            {/*<FooterTabs />*/}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 15
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    accountSettings: {
        alignItems: 'center',
        marginTop: 20,
    },
    profileImageContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    changeImageText: {
        color: 'blue',
        marginTop: 5,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    email: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default Account;
