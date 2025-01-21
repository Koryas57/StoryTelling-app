import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, ActivityIndicator, Alert, Image } from 'react-native';
import styles from './Game.styles';
import colors from '../../styles/colors';
import { generateResponse } from '../../src/api/openai';

const Game: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [storyText, setStoryText] = useState<string>('');
    const [imageUri, setImageUri] = useState<string>('');
    const [step, setStep] = useState<number>(1);
    const [name, setName] = useState<string>('');
    const [theme, setTheme] = useState<string>('');
    const [time, setTime] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [positiveStreak, setPositiveStreak] = useState<number>(0);
    const [negativeStreak, setNegativeStreak] = useState<number>(0);
    const [choices, setChoices] = useState<{ text: string; type: 'positive' | 'negative' | 'neutral' }[]>([]);

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            setTime(`${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`);
            setDate(
                now.toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                })
            );
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    const generateAdventure = async () => {
        setLoading(true);
        try {
            const textPrompt = `Décris une scène immersive pour une aventure basée sur le thème "${theme}", en français. Limite le texte à 5 lignes.`;
            const textResponse = await generateResponse(textPrompt, 'text');

            const imagePrompt = `Créer une image correspondant à un thème "${theme}", en français.`;
            const imageResponse = await generateResponse(imagePrompt, 'image');

            setStoryText(textResponse);
            setImageUri(imageResponse);

            const choicesPrompt = `Propose quatre choix pour l’aventure actuelle :
            - Un choix mène à une amélioration positive, marqué [positive].
            - Un choix mène à une situation négative, marqué [negative].
            - Deux choix prolongent l’histoire, marqués [neutral].
            Limite chaque choix à une ligne.`;
            const choicesResponse = await generateResponse(choicesPrompt, 'text');

            const parseType = (line: string): 'positive' | 'negative' | 'neutral' => {
                if (line.includes('[positive]')) return 'positive';
                if (line.includes('[negative]')) return 'negative';
                if (line.includes('[neutral]')) return 'neutral';
                throw new Error(`Type inconnu trouvé dans la ligne : ${line}`);
            };

            const newChoices = choicesResponse.split('\n').filter(Boolean).map((line) => {
                const type = parseType(line);
                return { text: line.replace(`[${type}]`, '').trim(), type };
            });

            setChoices(newChoices);
            setStep(3);
        } catch (error: any) {
            Alert.alert('Erreur', 'Impossible de générer les données.');
        } finally {
            setLoading(false);
        }
    };

    const handleChoiceSelection = (choiceType: 'positive' | 'negative' | 'neutral') => {
        if (choiceType === 'positive') {
            setPositiveStreak((prev) => prev + 1);
            setNegativeStreak(0);
        } else if (choiceType === 'negative') {
            setNegativeStreak((prev) => prev + 1);
            setPositiveStreak(0);
        } else {
            setPositiveStreak(0);
            setNegativeStreak(0);
        }

        if (positiveStreak + 1 === 3 || negativeStreak + 1 === 3) {
            const outcomeType = positiveStreak + 1 === 3 ? 'positif' : 'tragique';
            Alert.alert('Dénouement atteint', `Votre aventure s'est terminée avec un dénouement ${outcomeType}.`);
            setStep(1);
        } else {
            generateAdventure();
        }
    };

    const renderStep = () => {
        if (step === 1) {
            return (
                <View style={styles.stepContainer}>
                    <Text style={styles.title}>Bienvenue dans l’aventure interactive !</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Quel est ton nom ?"
                        value={name}
                        onChangeText={setName}
                    />
                    <Pressable
                        style={styles.button}
                        onPress={() => name.trim() && setStep(2)}
                        disabled={!name.trim()}
                    >
                        <Text style={styles.buttonText}>Continuer</Text>
                    </Pressable>
                </View>
            );
        }

        if (step === 2) {
            return (
                <View style={styles.stepContainer}>
                    <Text style={styles.title}>Choisis un thème pour ton aventure :</Text>
                    {['Voyage', 'Forêt enchantée', 'Espace', 'Mystère'].map((themeOption, index) => (
                        <Pressable
                            key={index}
                            style={styles.choiceButton}
                            onPress={() => {
                                setTheme(themeOption);
                                generateAdventure();
                            }}
                        >
                            <Text style={styles.choiceButtonText}>{themeOption}</Text>
                        </Pressable>
                    ))}
                </View>
            );
        }

        if (step === 3) {
            return (
                <>
                    <View style={styles.hud}>
                        <Text style={styles.hudText}>{time}</Text>
                        <Text style={styles.hudText}>85%</Text>
                        <Text style={styles.hudText}>{date}</Text>
                    </View>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.adventureImage} />
                    ) : (
                        <Text style={styles.errorText}>Aucune image disponible.</Text>
                    )}
                    <Text style={styles.adventureText}>{storyText}</Text>
                    <View style={styles.choicesContainer}>
                        {choices.map((choice, index) => (
                            <Pressable
                                key={index}
                                style={styles.choiceButton}
                                onPress={() => handleChoiceSelection(choice.type)}
                            >
                                <Text style={styles.choiceButtonText}>{choice.text}</Text>
                            </Pressable>
                        ))}
                    </View>
                </>
            );
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color={colors.primary} />
                ) : (
                    renderStep()
                )}
            </ScrollView>
        </View>
    );
};

export default Game;
