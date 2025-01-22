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
    const [startingPoint, setStartingPoint] = useState<string>('');
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
        const interval = setInterval(updateDateTime, 59000);
        return () => clearInterval(interval);
    }, []);

    const generateStoryText = async (previousText: string, userName: string, choice: string): Promise<string> => {
        const prompt = `
            Tu es dans une aventure interactive en tant que ${userName}, qui commence par "${startingPoint}". 
            Texte précédent : "${previousText}" 
            Dernier choix du joueur : "${choice}".
            
            Écris une suite immersive et addictive où ${userName} est le héros, mais parle de lui à la troisième personne. 
            Utilise un style captivant avec des détails modernes et précis. Base l'histoire sur des faits réels ou des lieux spécifiques 
            (fais des recherches comme si tu utilisais Google Maps pour ajouter des détails authentiques). 
            Le héros possède un smartphone, mais chaque action consomme une partie de sa batterie. Si la batterie est basse, cela doit augmenter la tension. 
            
            Ajoute des éléments sensoriels (visuels, auditifs, olfactifs) pour rendre chaque scène vivante. 
            L'histoire doit être logique mais surprendre l'utilisateur par ses rebondissements. 
            Limite le texte à 5 lignes et fais en sorte que chaque ligne contienne un détail qui pousse à continuer l'aventure.
        `;
        return await generateResponse(prompt, 'text');
    };

    const generateChoices = async (currentText: string, userName: string): Promise<string> => {
        const prompt = `
            Basé sur ce texte de l'histoire : "${currentText}", propose 4 choix cohérents pour la suite :
            - 1 choix qui améliore la situation de manière heureuse et logique (marqué [positive]).
            - 1 choix qui complique la situation et ajoute du danger ou une forte tension dramatique (marqué [negative]).
            - 2 choix qui prolongent l’histoire et approfondissent un aspect (marqués [neutral]).
    
            Chaque choix doit être une action ou une décision que le héros ${userName} pourrait prendre.
            Limite chaque choix à une ligne et un maximum de 8 mots. Adresse-toi directement à l'utilisateur avec "Tu".
            Le choix doit refléter la situation actuelle et les conséquences potentielles sans révéler l'issue. 
            Pas de ponctuations (ni crochets, ni points, ni virgules).
        `;
        return await generateResponse(prompt, 'text');
    };


    const generateAdventure = async (choice: string = '') => {
        setLoading(true);
        try {
            const previousText = storyText;
            const newStoryText = await generateStoryText(previousText, name, choice);

            const imagePrompt = `Créer une image magnifique et ultra-réaliste illustrant le point de départ suivant : "${startingPoint}" dans le contexte de l'histoire "${newStoryText}".`;
            const imageResponse = await generateResponse(imagePrompt, 'image');

            const newChoicesResponse = await generateChoices(newStoryText, name);

            const parseType = (line: string): 'positive' | 'negative' | 'neutral' => {
                if (line.includes('[positive]')) return 'positive';
                if (line.includes('[negative]')) return 'negative';
                if (line.includes('[neutral]')) return 'neutral';
                throw new Error(`Type inconnu trouvé dans la ligne : ${line}`);
            };

            const newChoices = newChoicesResponse.split('\n').filter(Boolean).map((line) => {
                const type = parseType(line);
                return { text: line.replace(`[${type}]`, '').trim(), type };
            });

            setStoryText(newStoryText);
            setImageUri(imageResponse);
            setChoices(newChoices);
            setStep(3);
        } catch (error: any) {
            Alert.alert('Erreur', 'Impossible de générer l’histoire.');
        } finally {
            setLoading(false);
        }
    };

    const handleChoiceSelection = (choice: { text: string; type: 'positive' | 'negative' | 'neutral' }) => {
        if (choice.type === 'positive') {
            setPositiveStreak((prev) => prev + 1);
            setNegativeStreak(0);
        } else if (choice.type === 'negative') {
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
            generateAdventure(choice.text);
        }
    };

    const renderStep = () => {
        if (step === 1) {
            return (
                <View style={styles.stepContainer}>
                    <Text style={styles.title}>Bienvenue dans ton aventure !</Text>
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
                    <Text style={styles.title}>Choisis un point de départ :</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Entre un point de départ"
                        value={startingPoint}
                        onChangeText={setStartingPoint}
                    />
                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            if (startingPoint.trim()) {
                                generateAdventure();
                            }
                        }}
                        disabled={!startingPoint.trim()}
                    >
                        <Text style={styles.buttonText}>Valider le point de départ personnalisé</Text>
                    </Pressable>
                    <Text style={styles.title}>Ou bien choisis de : </Text>
                    {['Partir d’un aéroport', 'Partir d’un port', 'Partir en train'].map((point, index) => (
                        <Pressable
                            key={index}
                            style={styles.choiceButton}
                            onPress={() => {
                                setStartingPoint(point);
                                generateAdventure();
                            }}
                        >
                            <Text style={styles.choiceButtonText}>{point}</Text>
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
                                onPress={() => handleChoiceSelection(choice)}
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
