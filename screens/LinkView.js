import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { WebView } from "react-native-webview";

export default function PostLink({ route }) {
    const [weblink, setWeblink] = useState("");

    useEffect(() => {
        if (route.params?.link) {
            if (route.params.link.link.includes("http" || "https")) {
                setWeblink(route.params.link.link);
            } else {
                setWeblink(`http://${route.params.link.link}`);
            }
        }
    }, [route.params?.link]);

    return <WebView startInLoadingState source={{ uri: weblink }} />;
}