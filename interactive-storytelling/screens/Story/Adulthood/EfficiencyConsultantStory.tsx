import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EfficiencyConsultantStory: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text>Bienvenue dans l'histoire du Efficiency Consultant !</Text>
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

export default EfficiencyConsultantStory;
