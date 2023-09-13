import React, { useContext, useState } from "react";
import { Text, Button, Image, SafeAreaView, View, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import SubmitButton from "../components/auth/SubmitButton";
import ImagePicker from 'react-native-image-picker';
import { SheetManager } from 'react-native-actions-sheet';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ogs from "@uehreka/open-graph-scraper-react-native";
import urlRegex from "url-regex";
import PreviewCard from "../components/links/PreviewCard";
import axios from "axios";
import { EstateContext } from "../context/estate";
import { API } from "../config";
import { AuthContext } from "../context/auth";
import HeaderTabs from "../components/nav/HeaderTabs";
import FooterTabs from "../components/nav/FooterTabs";

const Posts = ({ navigation }) => {
    const [estates, setEstates] = useContext(EstateContext);
    const [state, setState] = useContext(AuthContext);
    const [originalPhoto, setOriginalPhoto] = useState(null);
    const [estate, setEstate] = useState('');
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [urlPreview, setUrlPreview] = useState({});
    const [type, setType] = useState('');
    const [structure, setStructure] = useState('');
    const [images, setImages] = useState([]);
    const [image, setImage] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const handleChoosePhoto = () => {
        setModalVisible(true);
    };


    const handleImageSelect = (response) => {
        if (!response.didCancel && response.uri) {
            setImage(response.uri);
        }
    };

    // const handleChange = async (text) => {
    //     try {
    //         setLoading(true);
    //         setLink(text);

    //         if (text === '') setUrlPreview({})

    //         if (urlRegex({ strict: false }).test(text)) {
    //             ogs({ url: text }, (error, results, response) => {
    //                 if (results.success) {
    //                     setUrlPreview(results);
    //                     setOriginalPhoto(results.ogImage)
    //                     if (title == '') setTitle(results.ogTitle)
    //                 } else setUrlPreview({})
    //                 setLoading(false);
    //             });
    //         } else {
    //             setUrlPreview({})
    //             setLoading(false);
    //         }
    //     } catch (err) {
    //         setUrlPreview({})
    //         console.log(err);
    //         setLoading(false);
    //     }
    // };

    const handleGalleryPhoto = async () => {
        const options = {
            mediaType: "photo",
            quality: 1,
        };
        const result = await launchImageLibrary(options);
        if (result.assets && result.assets.length > 0) {
            const selectedImageSource = result.assets[0].uri;
            setImages((prevImages) => [...prevImages, selectedImageSource]);
            setModalVisible(false)
        }
    };

    const handleTakePhoto = async () => {
        const options = {
            mediaType: "photo",
            quality: 1,
        };
        const result = await launchCamera(options);
        console.log(result);
        if (result.assets && result.assets.length > 0) {
            const selectedImageSource = result.assets[0].uri;
            setImages((prevImages) => [...prevImages, selectedImageSource]);
            setModalVisible(false)
        }
    };

    const removePhoto = () => {
        if (urlPreview.success) {
            setUrlPreview({ ...urlPreview, ogImage: originalPhoto });
        }
        else {
            alert("Input the link first!")
        }

    }

    const handleSubmit = async () => {
        // console.log("title and link => ", title, link, urlPreview);
        if (!address || !price || !description || !structure || !type) {
            alert("Popunite sva polja!");
            return;
        }
        try {    
            
            console.log(images);

            const { data } = await axios.post(API + "post-estate", {
                address,
                price,
                description,
                type,
                structure,
                state,
                images
            });

            console.log("data => ", data);

            // update link context
            setEstate([data, ...estates]);
            setTimeout(() => {
                alert("Nekretnina uspjesno postavljena!");
                navigation.navigate("Home");
            }, 500);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View style={styles.container}>
            <HeaderTabs />
            {/*<HeaderTabs/>*/}
            <View style={styles.contentContainer}>
                <ScrollView>
                    <View style={{ backgroundColor: '#32a0fa', alignItems: 'center' }}>
                        <Text
                            style={{
                                paddingTop: 25,
                                fontSize: 15,
                                color: '#fcfafa',
                                marginBottom: 20,
                            }}
                        >Dodaj nekretninu</Text>
                    </View>
                    <View style={{
                        marginTop: 15,
                        paddingHorizontal: 16
                    }}>

                        <Text style={{ fontSize: 12 }}>Adresa <Text style={{ color: 'red' }}>*</Text></Text>
                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: "grey",
                                backgroundColor: '#fcfafa',
                                height: 35,
                                marginBottom: 10,
                                borderRadius: 10,
                                paddingHorizontal: 15,
                                fontSize: 12,
                                width: '100%',
                            }}
                            placeholder='Adresa'
                            value={address}
                            onChangeText={(text) => setAddress(text)} />

                        <Text style={{ fontSize: 12 }}>Cijena <Text style={{ color: 'red' }}>*</Text></Text>
                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: "grey",
                                backgroundColor: '#fcfafa',
                                height: 35,
                                marginBottom: 10,
                                // marginHorizontal: 10,
                                borderRadius: 10,
                                paddingHorizontal: 15,
                                fontSize: 12,
                                width: '100%',
                            }}
                            placeholder='Cijena'
                            value={price}
                            onChangeText={(text) => setPrice(text)} />

                        <Text style={{ fontSize: 12 }}>Struktura <Text style={{ color: 'red' }}>*</Text></Text>
                        <View style={{
                            borderWidth: 1,
                            borderColor: "grey",
                            backgroundColor: '#fcfafa',
                            height: 35,
                            marginBottom: 10,
                            borderRadius: 10,
                            width: '100%',
                        }}>
                            <Picker
                                selectedValue={structure}
                                onValueChange={(itemValue) => setStructure(itemValue)}>
                                <Picker.Item style={{ fontSize: 12, color: '#919191' }} label='Izaberite strukturu' value='' />
                                <Picker.Item style={{ fontSize: 12 }} label='Garsonjera' value='Garsonjera' />
                                <Picker.Item style={{ fontSize: 12 }} label='Jednosoban stan' value='Jednosoban stan' />
                                <Picker.Item style={{ fontSize: 12 }} label='Dvosoban stan' value='Dvosoban stan' />
                                <Picker.Item style={{ fontSize: 12 }} label='Trosoban stan' value='Trosoban stan' />
                                <Picker.Item style={{ fontSize: 12 }} label='Kuca' value='Kuca' />
                            </Picker>
                        </View>

                        <Text style={{ fontSize: 12 }}>Tip <Text style={{ color: 'red' }}>*</Text></Text>
                        <View style={{
                            borderWidth: 1,
                            borderColor: "grey",
                            backgroundColor: '#fcfafa',
                            height: 35,
                            marginBottom: 10,
                            borderRadius: 10,
                            fontSize: 10,
                            width: '100%',
                            paddingBottom: 20
                        }}>
                            <Picker
                                selectedValue={type}
                                onValueChange={(itemValue) => setType(itemValue)}>
                                <Picker.Item style={{ fontSize: 12, color: '#919191' }} label='Izaberite tip' value='' />
                                <Picker.Item style={{ fontSize: 12 }} label='Izdavanje' value='Izdavanje' />
                                <Picker.Item style={{ fontSize: 12 }} label='Prodaja' value='Prodaja' />
                            </Picker>
                        </View>
                        <Text style={{ fontSize: 12 }}>Opis <Text style={{ color: 'red' }}>*</Text></Text>
                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: 'gray',
                                backgroundColor: '#fcfafa',
                                paddingHorizontal: 10,
                                paddingVertical: 8,
                                fontSize: 10,
                                borderRadius: 15,
                                width: '100%',
                                textAlignVertical: 'top',
                                marginBottom: 10
                            }}
                            multiline={true}
                            numberOfLines={4} // You can adjust the number of visible lines
                            placeholder="Type your text here..."
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                        />
                        <TouchableOpacity style={styles.pictureButton} onPress={handleChoosePhoto}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.picture} />
                            ) : (
                                <Text style={styles.pictureText}>Dodaj sliku</Text>
                            )}
                        </TouchableOpacity>
                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <Button title="Choose Photo" onPress={handleChoosePhoto} />
                            </View>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <Button title="Take Photo" onPress={handleTakePhoto} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Button title="Remove Photo" color="#960b0b" onPress={removePhoto} />
                            </View>
                        </View> */}
                        {urlPreview.success && (
                            <View
                                style={{
                                    marginTop: 30,
                                    alignItems: "center",
                                }}
                            >
                                <PreviewCard {...urlPreview} title={title} addPage={true} />
                            </View>
                        )}
                        <View style={styles.imageContainer}>
                            {images.map((imageUri, index) => (
                                <Image key={index} source={{ uri: imageUri }} style={styles.image} />
                            ))}
                        </View>
                        <View style={{ marginBottom: 20, width: '100%', marginLeft: 100 }}>
                            <SubmitButton title='Dodaj' loading={loading} handleSubmit={handleSubmit} />
                        </View>
                    </View>
                </ScrollView>
            </View>
            <FooterTabs />
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.modalOption} onPress={handleTakePhoto}>
                        <Text>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalOption} onPress={handleGalleryPhoto}>
                        <Text>Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalOption} onPress={() => setModalVisible(false)}>
                        <Text style={{ color: '#ba0606' }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    contentContainer: {
        flex: 1,
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
    pictureButton: {
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: '#fcfafa',
        height: 35,
        borderRadius: 10,
        paddingHorizontal: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    picture: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    pictureText: {
        fontSize: 12,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalOption: {
        backgroundColor: 'white',
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'lightgray',
    },
    imageContainer: {
        flexDirection: 'column',
        marginTop: 10,
        width: '100%',
        alignItems: 'center', // This centers the images horizontally
    },
    image: {
        width: 300, // Match the width of the container
        height: 200, // Set a maximum height for the images
        marginVertical: 5,
        borderRadius: 5,
    },
});

export default Posts;
