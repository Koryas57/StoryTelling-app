import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ActivityIndicator, Image, Pressable } from 'react-native';
import styles from './Game.styles';
import { generateResponse } from '../../src/api/openai';
import colors from '../../styles/colors';

const Game: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [step, setStep] = useState<number>(1);
    const [adventure, setAdventure] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [imageUri, setImageUri] = useState<string>('');
    const [storyText, setStoryText] = useState<string>('');

    useEffect(() => {
        const updateTimeAndDate = () => {
            const now = new Date();
            setTime(`${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`);
            setDate(now.toLocaleDateString('fr-FR', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }));
        };

        updateTimeAndDate();
        const interval = setInterval(updateTimeAndDate, 60000);
        return () => clearInterval(interval);
    }, []);

    const handleAdventureChoice = async (type: string) => {
        setAdventure(type);
        setLoading(true);
        try {
            // // Génération de l'image via l'IA
            // const imagePrompt = `Create a travel-themed image for an airport with a vibrant sky, capturing the excitement of adventure.`;
            // const imageResponse = await generateResponse(imagePrompt, 'image');
            // setImageUri(imageResponse);

            // Génération du texte via l'IA
            const textPrompt = `Write an immersive introduction for a travel adventure starting at an airport. Include options for the player to choose a flight today or wait until tomorrow.`;
            const textResponse = await generateResponse(textPrompt, 'text');
            setStoryText(textResponse);

            setStep(3); // Passe à l'écran de l’aventure
        } catch (error) {
            const errorMessage = (error as Error).message || 'Une erreur inconnue est survenue.';
            console.error('Erreur lors de la génération IA :', errorMessage);
            setStoryText('Erreur lors de la génération de l’aventure.');
        } finally {
            setLoading(false);
        }
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
                    <Pressable style={styles.button} onPress={() => setStep(2)}>
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
                </View>
            )}

            {step === 3 && (
                <View style={styles.bookContainer}>
                    <View style={styles.hud}>
                        <Text style={styles.hudText}>{time}</Text>
                        <Text style={styles.hudText}>85%</Text>
                        <Text style={styles.hudText}>{date}</Text>
                    </View>
                    {loading ? (
                        <ActivityIndicator size="large" color={colors.primary} />
                    ) : (
                        <Image source={{ uri: imageUri }} style={styles.adventureImage} />
                    )}
                    <Text style={styles.adventureText}>{storyText}</Text>
                </View>
            )}
        </View>
    );
};

export default Game;
