import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ConflictResolutionSpecialistStory: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Bienvenue dans l'histoire du Community Mentor2 !</Text>
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

export default ConflictResolutionSpecialistStory;
