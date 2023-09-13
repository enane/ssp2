import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import { Icon } from '@rneui/themed';
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#333",
        shadowOpacity: 0.5,
        shadowRadius: 1,
        // android
        shadowOffset: {
            width: 0,
            height: 1,
        },
        marginTop: 220
    },
});


const IconSet = ({
    handleSavePress,
    handleUnSavePress,
    deleteEstate,
    showIcons,
    estate,
    auth,
    isMyEstate = false
}) => {
    const navigation = useNavigation();
    const checkName = (link) => {
        console.log(link.postedBy)
    }

    return (
        <View
            style={{
                flexDirection: "row",
                top: -210,
                alignItems: "center",
                justifyContent: "space-between",
                marginRight: 20,
                marginLeft: 20,
            }}
        >
            {showIcons && (
                <>
                isMyEstate ? (
                            <TouchableOpacity
                                style={{ alignItems: "center", paddingBottom: 15 }}
                                onPress={() => deleteLink(estate)}
                            >
                                <Image
                                    source={require('../../assets/trash.png')}
                                    style={{ width: 15, height: 15, marginTop: 220, marginLeft: 3 }}
                                    color="#3072b0"

                                />
                            </TouchableOpacity>
                        ) : (
                            {estate?.saves?.includes(auth?.user?._id) ? (
                        <TouchableOpacity
                            onPress={() => handleUnSavePress(estate)}>
                            <View style={{ alignItems: "center" }}>
                                <Image
                                    source={require('../../assets/heart.png')}
                                    style={{ width: 15, height: 15, marginTop: 220, marginLeft: 3 }}
                                    color="#3072b0"

                                />
                                <Text style={{ fontSize: 8.4 }} color="#3072b0">
                                    {estate.saves.length}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => handleSavePress(estate)}>
                            <View style={{ alignItems: "center" }}>
                                <Image
                                    source={require('../../assets/empty-heart.png')}
                                    style={{ width: 14.5, height: 14.5, marginTop: 220, marginLeft: 3 }}
                                    color="#3072b0"

                                />

                                <Text style={{ fontSize: 8.4 }} color="#3072b0">
                                    {estate.saves.length}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                        )}
                    
                    {/* <View style={{ alignItems: "center" }}>
                    <Image
                                    source={require('../../assets/eye.png')}
                                    style={{width: 17, height: 17, marginTop: 220, marginLeft:3}}
                                    color="#3072b0"
                                
                                />
                        <Text style={{ fontSize: 8.4 }} color="#3072b0">
                            {link.views}
                        </Text>
                    </View> */}

                    <View style={{ alignItems: "center" }}>
                        <Image
                            source={require('../../assets/clock.jpg')}
                            style={{ width: 15, height: 15, marginTop: 220, marginLeft: 3 }}
                            color="#3072b0"

                        />
                        <Text style={{ fontSize: 8 }} color="#3072b0">
                            {dayjs(estate.createdAt).format("DD/MM/YY")}
                        </Text>
                    </View>

                    <View style={{ alignItems: "center" }}>
                        {isMyEstate ? (
                            <TouchableOpacity
                                style={{ alignItems: "center", paddingBottom: 15 }}
                                onPress={() => deleteLink(estate)}
                            >
                                <Image
                                    source={require('../../assets/trash.png')}
                                    style={{ width: 15, height: 15, marginTop: 220, marginLeft: 3 }}
                                    color="#3072b0"

                                />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={{ alignItems: "center" }}
                                onPress={() => {
                                    navigation.navigate("Links", {
                                        user_id: estate.postedBy,
                                    })
                                }}
                            >
                                <Image
                                    source={require('../../assets/user.png')}
                                    style={{ width: 15, height: 15, marginTop: 220, marginLeft: 3 }}
                                    color="#3072b0"

                                />
                                <Text style={{ fontSize: 8.4 }} color="#3072b0">
                                    Podijeli
                                </Text>
                            </TouchableOpacity>
                        )}


                    </View>
                </>
            )
            }
        </View >
    );
};

export default IconSet;