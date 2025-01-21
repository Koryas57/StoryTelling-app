import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import styles from './Game.styles';

const Game: React.FC = () => {
    const [name, setName] = useState<string>(''); // Stocke le nom du joueur
    const [loading, setLoading] = useState<boolean>(false); // Gère le chargement
    const [step, setStep] = useState<number>(1); // Étape du jeu

    const handleNameSubmit = () => {
        if (name.trim() !== '') {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setStep(2); // Passe à l'étape suivante après le chargement
            }, 2000); // Simulation d'un temps de chargement de 2 secondes
        }
    };

    return (
        <View style={styles.container}>
            {step === 1 && (
                <View style={styles.stepContainer}>
                    {loading ? (
                        <Text style={styles.loadingText}>Chargement de ton aventure, {name || 'joueur'}...</Text>
                    ) : (
                        <>
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
                        </>
                    )}
                </View>
            )}

            {step === 2 && (
                <View style={styles.stepContainer}>
                    <Text style={styles.title}>Bienvenue dans l'aventure, {name} !</Text>
                    {/* Transition vers l'étape suivante */}
                </View>
            )}
        </View>
    );
};

export default Game;
