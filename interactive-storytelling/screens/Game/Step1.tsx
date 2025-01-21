import React from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import styles from './Game.styles';

type Step1Props = {
    onNext: () => void; // Fonction pour passer à l'étape suivante
    imageUri: string; // URI de l'image à afficher
    hud: {
        time: string;
        date: string;
    }; // Informations du HUD
};

const Step1: React.FC<Step1Props> = ({ onNext, imageUri, hud }) => {
    const choices = [
        { text: 'Explorer la forêt', type: 'continue' },
        { text: 'Revenir au village', type: 'negative' },
        { text: 'Chercher un trésor', type: 'positive' },
    ];

    return (
        <View style={styles.container}>
            {/* HUD */}
            <View style={styles.hud}>
                <Text style={styles.hudText}>{hud.time}</Text>
                <Text style={styles.hudText}>85%</Text>
                <Text style={styles.hudText}>{hud.date}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Image de l'aventure */}
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.adventureImage} />
                ) : (
                    <Text style={styles.errorText}>Aucune image disponible pour cette étape.</Text>
                )}

                {/* Texte principal */}
                <Text style={styles.adventureText}>
                    Vous vous tenez à l'entrée d'une forêt mystérieuse. Le vent souffle légèrement, et une aura magique semble émaner des arbres.
                </Text>

                {/* Choix dynamiques */}
                <View style={styles.choicesContainer}>
                    {choices.map((choice, index) => (
                        <Pressable
                            key={index}
                            style={styles.choiceButton}
                            onPress={onNext} // Appelle onNext lorsqu'un choix est sélectionné
                        >
                            <Text style={styles.choiceButtonText}>{choice.text}</Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default Step1;
