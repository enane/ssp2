import React, { useContext, useEffect } from "react";
import { View, Image, TouchableOpacity, Text, Alert } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { EstateContext } from "../../context/estate";
import { AuthContext } from "../../context/auth";
import { API } from "../../config";
import IconSet from "./IconSet";
import { useNavigation } from "@react-navigation/native";


const PreviewCard = ({
    estate = {},
    showIcons = false,
    isMyEstate = false,
    deleteLink=null
}) => {
    const [estates, setEstates] = useContext(EstateContext);
    const [auth, setAuth] = useContext(AuthContext);
    const navigation = useNavigation();

    const handlePress = async (estate) => {
        console.log(estate)
        // await axios.put(API + `view-count/${link._id}`);
        // navigation.navigate("LinkView", { link });
        // // update link in the context
        // setLinks(() => {
        //     const index = links.findIndex((l) => l._id === link._id);
        //     links[index] = { ...link, views: link.views + 1 };
        //     return [...links];
        // });
    };

    const handleSavePress = async (estate) => {
        const { data } = await axios.put(API + "save", { estateId: estate._id, user: auth.user });
        setEstates((estates) => {
            const index = estates.findIndex((l) => l._id === estate._id);
            estates[index] = data;
            return [...estates];
        });
    };

    const handleUnSavePress = async (estate) => {
        const { data } = await axios.put(API + "unsave", { estateId: estate._id, user: auth.user });
        setEstates((estates) => {
            const updatedEstates = estates.filter((e) => e._id !== estate._id);
            return updatedEstates;
        });
    };

    const handleDeleteEstate = async (estate) => {
        await deleteLink(estate);
      };

    // const ogImageUrl = (ogImage) => {
    //     if (ogImage?.url) {
    //         return ogImage.url;
    //     } else if (ogImage?.length > 0) {
    //         return ogImage[0].url;
    //     } else {
    //         return "https://via.placeholder.com/500x500.png?text=Image";
    //     }
    // };

    return (
        <View
            style={{
                backgroundColor: "#fff",
                width: showIcons ? "92%" : "98%",
                height: showIcons ? 267 : 260,
                shadowColor: "#171717",
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
                marginBottom: 20,
                borderTopRightRadius: 14,
                borderTopLeftRadius: 14,
            }}
        >
            <Image
                style={{
                    height: 180,
                    borderTopRightRadius: 14,
                    borderTopLeftRadius: 14,
                }}
                source={{uri : estate.images.length ? estate.images[0] : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAh8YVQhMCGhp1xDo9Pew7q0W4H1zLD-9wbA&usqp=CAU'}}
            />
            <TouchableOpacity onPress={() => handlePress(estate)}>
                <View style={{ height: 30,  marginBottom: 16 }}>
                    <Text style={{ paddingTop: 3, paddingLeft: 3, paddingBottom: 1 }}>
                    {estate.structure}, {estate.price} €, {estate.type}
                    </Text>
                    <Text style={{ paddingTop: 3, paddingLeft: 3, paddingBottom: 1, fontSize:10}}>{estate.address}</Text>
                </View>
                {/* <View style={{ height: 40 }}>
                    <Text style={{ fontSize: 8, paddingLeft: 3 }}>{estate.description}</Text>
                </View> */}
            </TouchableOpacity>
            <View style={showIcons ? { marginBottom: -35 } : {}}>
                <IconSet
                    handleSavePress={handleSavePress}
                    handleUnSavePress={handleUnSavePress}
                    handleDeleteEstate={handleDeleteEstate}
                    estate={estate}
                    showIcons={showIcons}
                    auth={auth}
                    isMyEstate={isMyEstate}
                />
            </View>
        </View>
    );
};

export default PreviewCard;