import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UniversityProfessorStory: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Bienvenue dans l'histoire du University Professor!</Text>
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

export default UniversityProfessorStory;
