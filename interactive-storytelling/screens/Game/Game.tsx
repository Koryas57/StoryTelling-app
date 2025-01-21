import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from './Game.styles';

const Game: React.FC = () => {
    const [name, setName] = useState<string>(''); // Stocke le nom du joueur
    const [step, setStep] = useState<number>(1); // Étape du jeu
    const [adventure, setAdventure] = useState<string>(''); // Type d’aventure choisi

    const handleNameSubmit = (enteredName: string) => {
        if (enteredName.trim() !== '') {
            setName(enteredName);
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
                    <Pressable style={styles.inputButton} onPress={() => handleNameSubmit('Taylor')}>
                        <Text style={styles.buttonText}>Entrer le nom : Taylor</Text>
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
                    {/* Ici, transition vers l'interface type "livre" */}
                </View>
            )}
        </View>
    );
};

export default Game;
