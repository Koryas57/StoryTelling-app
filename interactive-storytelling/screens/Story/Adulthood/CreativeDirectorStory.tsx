import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CreativeDirectorStory: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Bienvenue dans l'histoire du Directeur Créatif !</Text>
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

export default CreativeDirectorStory;
