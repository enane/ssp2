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

const SavedEstates = ({ navigation }) => {
    let route = useRoute();
    const [state, setState] = useContext(AuthContext);
    const [estates, setEstates] = useContext(EstateContext);
    const [loading, setLoading] = useState(false);

    const fetchSavedEstates = async () => {
        setLoading(true)
        user = state.user
        const { data } = await axios.get(API + "saved-estates", {
            params: {
                'user': user
            }
        });
        setEstates(data);
        setLoading(false)
    };

    useEffect(() => {
        console.log('ponovooo');
        fetchSavedEstates();
    }, [route]);

    const handlePress = async (estate) => {
        navigation.navigate("SingleEstate", { estate });
    };


    return (
        <View style={styles.container}>
            <HeaderTabs />
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ backgroundColor: '#32a0fa', alignItems: 'center' }}>
                        <Text
                            style={{
                                paddingTop: 25,
                                fontSize: 15,
                                color: '#fcfafa',
                                marginBottom: 20,
                            }}
                        >Sacuvane nekretnine</Text>
                    </View>
                    {loading ? (
                        <ActivityIndicator color="#0000ff" size="large" style={{ marginTop: 100 }} />
                    ) : (

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20, paddingLeft:22  }}>
                            {estates && estates.map((estate) => (
                                <TouchableOpacity
                                    key={estate._id}
                                    style={{
                                        width: "100%"
                                    }}
                                    onPress={() => handlePress(estate)}
                                >
                                    <PreviewCard
                                        estate={estate}
                                        key={estate._id}
                                        showIcons={true}
                                        handlePress={handlePress} />
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
        // <View style={styles.container}>
        //     <HeaderTabs/>
        //     <SafeAreaView>
        //         <ScrollView showsVerticalScrollIndicator={false}>
        //             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        //                 <Text
        //                     style={{
        //                         paddingTop: 20,
        //                         marginBottom: 20,
        //                         fontSize: 25,
        //                         color: '#666'
        //                     }}
        //                 >RECENT POSTS</Text>
        //             </View>
        //             <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
        //                 {links &&
        //                     links.map((link) => (
        //                         <View
        //                             key={link._id}
        //                             style={{
        //                                 alignItems: "center",
        //                             }}
        //                         >
        //                             <PreviewCard {...link.urlPreview} />
        //                         </View>
        //                     ))}
        //             </View>
        //             <Text>
        //                 {JSON.stringify(state, null, 4)}
        //             </Text>
        //         </ScrollView>
        //     </SafeAreaView>
        //     <FooterTabs style={{
        //         position: 'absolute',
        //         bottom: 0,
        //         left: 0,
        //         right: 0
        //     }}/>
        // </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
});

export default SavedEstates;