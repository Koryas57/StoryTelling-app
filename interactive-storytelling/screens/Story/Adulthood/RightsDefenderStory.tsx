import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RightsDefenderStory: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Bienvenue dans l'histoire du RightsDefenderStory!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default RightsDefenderStory;
