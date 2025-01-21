import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import styles from './Game.styles';

const Game: React.FC = () => {
    const [name, setName] = useState<string>(''); // Stocke le nom du joueur
    const [step, setStep] = useState<number>(1); // Étape du jeu
    const [adventure, setAdventure] = useState<string>(''); // Type d’aventure choisi

    const handleNameSubmit = () => {
        if (name.trim() !== '') {
            setStep(2); // Passe à l’étape de choix d’aventure
        }
    };

    const handleAdventureChoice = (type: string) => {
        setAdventure(type);
        setStep(3); // Passe à l’écran de l’aventure
    };

    return (
        <View style={styles.container}>
            {step === 1 && (
                <View style={styles.stepContainer}>
                    <Text style={styles.title}>Quel est ton nom, aventurier ?</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Entre ton nom"
                        value={name}
                        onChangeText={setName}
                    />
                    <Pressable style={styles.button} onPress={handleNameSubmit}>
                        <Text style={styles.buttonText}>Commencer</Text>
                    </Pressable>
                </View>
            )}

            {step === 2 && (
                <View style={styles.stepContainer}>
                    <Text style={styles.title}>Bonjour {name} ! Choisis ton aventure :</Text>
                    <Pressable style={styles.choiceButton} onPress={() => handleAdventureChoice('Voyage')}>
                        <Text style={styles.choiceButtonText}>Voyage</Text>
                    </Pressable>
                    <Pressable style={styles.choiceButton} onPress={() => handleAdventureChoice('Science-fiction')}>
                        <Text style={styles.choiceButtonText}>Science-fiction</Text>
                    </Pressable>
                    <Pressable style={styles.choiceButton} onPress={() => handleAdventureChoice('Fantasy')}>
                        <Text style={styles.choiceButtonText}>Fantasy</Text>
                    </Pressable>
                </View>
            )}

            {step === 3 && (
                <View style={styles.stepContainer}>
                    <Text style={styles.title}>
                        Prépare-toi pour une aventure {adventure.toLowerCase()}, {name}...
                    </Text>
                    {/* Transition vers l'interface type "livre" */}
                </View>
            )}
        </View>
    );
};

export default Game;
