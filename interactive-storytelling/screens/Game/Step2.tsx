import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import styles from './Game.styles';

type Step2Props = {
    onNext: () => void; // Fonction pour passer à l'étape suivante
};

const Step2: React.FC<Step2Props> = ({ onNext }) => {
    const choices = [
        { text: 'Continuer à explorer', type: 'continue' },
        { text: 'Retourner sur vos pas', type: 'negative' },
        { text: 'S’enfoncer davantage', type: 'positive' },
    ];

    return (
        <View style={styles.container}>
            {/* Texte principal */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.adventureText}>
                    Après avoir parcouru quelques mètres dans la forêt, vous apercevez une lumière étrange
                    au loin. Le chemin devient plus sinueux, et des bruits inhabituels se font entendre.
                </Text>

                {/* Choix dynamiques */}
                <View style={styles.choicesContainer}>
                    {choices.map((choice, index) => (
                        <Pressable
                            key={index}
                            style={styles.choiceButton}
                            onPress={onNext} // Passe à l'étape suivante
                        >
                            <Text style={styles.choiceButtonText}>{choice.text}</Text>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default Step2;
