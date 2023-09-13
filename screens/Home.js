import React, { useContext, useEffect, useState } from "react";
import { Text, SafeAreaView, View, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { AuthContext } from "../context/auth";
import FooterTabs from "../components/nav/FooterTabs";
import { StyleSheet } from "react-native";
import HeaderTabs from "../components/nav/HeaderTabs";
import { EstateContext } from "../context/estate";
import PreviewCard from "../components/links/PreviewCard";
import axios from "axios";
import { useRoute } from '@react-navigation/native';
import { API } from "../config";

const Home = ({ navigation }) => {
    let route = useRoute();
    const [state, setState] = useContext(AuthContext);
    const [estates, setEstate] = useContext(EstateContext);
    const [loading, setLoading] = useState(false);

    const fetchEstates = async () => {
        setLoading(true)
        const { data } = await axios.get(API + "estates");
        setEstate(data);
        setLoading(false)
    };

    useEffect(() => {
        console.log('ponovooo');
        fetchEstates();
    }, [route]);

    const handlePress = async (estate) => {
        navigation.navigate("SingleEstate", {estate});
        // update link in the context
        // setEstate(() => {
        //     const index = links.findIndex((l) => l._id === link._id);
        //     links[index] = { ...link, views: link.views + 1 };
        //     return [...links];
        // });
    };


    return (
        <View style={styles.container}>
            <HeaderTabs />
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ backgroundColor: '#32a0fa', alignItems: 'center', paddingHorizontal: 45, alignItems: 'center' }}>
                        <Text
                            style={{
                                paddingTop: 25,
                                fontSize: 23,
                                color: '#fcfafa',
                                textAlign: 'center'
                            }}
                        >Dobrodošli • Welcome • Добро пожаловать</Text>
                        <Text style={{
                            marginTop: 10,
                            fontSize: 10,
                            paddingHorizontal: 20,
                            color: '#fcfafa',
                            marginBottom: 20,
                            textAlign: 'center'
                        }}>Naš glavni cilj je pronalaženje nekretnina sa najispravnijim balansom između cene i kvaliteta.</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text
                            style={{
                                paddingTop: 20,
                                marginTop: 10,
                                marginBottom: 10,
                                fontSize: 20,
                                color: '#666'
                            }}
                        >Najnovije u ponudi</Text>
                    </View>
                    {loading ? (
                        <ActivityIndicator color="#0000ff" size="large" style={{ marginTop: 100 }} />
                    ) : (

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20, paddingLeft:22 }}>
                            {estates && estates.map((estate) => (
                                <TouchableOpacity
                                    key={estate._id}
                                    style={{
                                        width: "100%",
                                    }}
                                    onPress={() => handlePress(estate)}
                                >
                                    <PreviewCard
                                        estate={estate}
                                        key={estate._id}
                                        showIcons={true}
                                        handlePress={handlePress}/>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                    {/*<Text>*/}
                    {/*    {JSON.stringify(state, null, 4)}*/}
                    {/*</Text>*/}
                </ScrollView>
            </SafeAreaView>
            <View>
                <FooterTabs />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
});

export default Home;