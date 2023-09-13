import React from "react";
import { Text, View, ScrollView, Image } from "react-native";
import FooterTabs from "../components/nav/FooterTabs";
import { StyleSheet } from "react-native";
import HeaderTabs from "../components/nav/HeaderTabs";
import Carousel from "react-native-snap-carousel";
import { useRoute } from '@react-navigation/native';

const SingleEstate = () => {
    let route = useRoute();

    const { estate } = route.params;

    return (
        <View style={styles.container}>
            <HeaderTabs />
            <ScrollView>
                <View style={{ paddingLeft: 20 }}>
                    <Text style={{ fontSize: 20 }}>{estate.structure}, {estate.price} €, {estate.type}</Text>
                    <Text style={{ fontSize: 20, marginTop: 10 }}>Adresa: {estate.address}</Text>
                    <Text style={{ marginVertical: 10 }}>{estate.description}</Text>
                    <Carousel
                        data={estate.images}
                        renderItem={({ item }) => (
                            <Image source={{ uri: item }} style={{ width: 300, height: 200 }} />
                        )}
                        sliderWidth={300}
                        itemWidth={280}
                    />
                </View>
            </ScrollView>
            <View>
                <FooterTabs />
            </View>
        </View >
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
});

export default SingleEstate;