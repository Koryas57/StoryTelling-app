import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, ActivityIndicator } from 'react-native';
import Step1 from './Step1';
import Step2 from './Step2';
import styles from './Game.styles';
import colors from '../../styles/colors';
import { OPENAI_API_KEY } from '@env';
import { generateResponse } from '../../src/api/openai'; // Import de votre fonction d'appel API

const Game: React.FC = () => {
    const [step, setStep] = useState<number>(1); // Étape actuelle
    const [name, setName] = useState<string>(''); // Nom de l'utilisateur
    const [theme, setTheme] = useState<string>(''); // Thème choisi
    const [imageUri, setImageUri] = useState<string>(''); // Image générée
    const [loading, setLoading] = useState<boolean>(false); // État de chargement
    const [time, setTime] = useState<string>(''); // Heure
    const [date, setDate] = useState<string>(''); // Date

    // Mise à jour de l'heure et de la date
    useEffect(() => {
        const updateTimeAndDate = () => {
            const now = new Date();
            setTime(`${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`);
            setDate(
                now.toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                })
            );
        };

        updateTimeAndDate();
        const interval = setInterval(updateTimeAndDate, 60000);
        return () => clearInterval(interval);
    }, []);

    // Gestion du chargement et de la génération de l'image
    const handleThemeSelection = async (selectedTheme: string) => {
        setLoading(true);
        setTheme(selectedTheme);

        try {
            // Demande à OpenAI de générer une image pour le thème sélectionné
            const imagePrompt = `Créer une image immersive sur le thème : ${selectedTheme}, avec des détails réalistes et une ambiance captivante.`;
            const imageResponse = await generateResponse(imagePrompt, 'image');
            setImageUri(imageResponse); // Définit l'URL de l'image générée
            setStep(3); // Passe à l'étape suivante une fois l'image générée
        } catch (error) {
            console.error('Erreur lors de la génération de l’image', error);
        } finally {
            setLoading(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.title}>Quel est ton nom, aventurier ?</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Entre ton nom"
                            value={name}
                            onChangeText={setName}
                        />
                        <Pressable
                            style={styles.button}
                            onPress={() => setStep(2)}
                            disabled={!name.trim()}
                        >
                            <Text style={styles.buttonText}>Continuer</Text>
                        </Pressable>
                    </View>
                );
            case 2:
                return (
                    <View style={styles.stepContainer}>
                        <Text style={styles.title}>Choisis un thème pour ton aventure :</Text>
                        {['Voyage', 'Forêt enchantée', 'Espace'].map((themeOption, index) => (
                            <Pressable
                                key={index}
                                style={styles.choiceButton}
                                onPress={() => handleThemeSelection(themeOption)}
                            >
                                <Text style={styles.choiceButtonText}>{themeOption}</Text>
                            </Pressable>
                        ))}
                    </View>
                );
            case 3:
                if (loading) {
                    return <ActivityIndicator size="large" color={colors.primary} />;
                }
                return (
                    <Step1
                        onNext={() => setStep(4)}
                        imageUri={imageUri}
                        hud={{ time, date }}
                    />
                );
            case 4:
                return <Step2 onNext={() => console.log('Étape suivante')} />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {renderStep()}
            </ScrollView>
        </View>
    );
};

export default Game;
