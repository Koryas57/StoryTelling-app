import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Pressable, Alert, ImageBackground } from 'react-native';
import * as Progress from 'react-native-progress';
import * as NavigationBar from "expo-navigation-bar";
import stylesT from './Teenage.styles';

interface MiniGameSocialProps {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
    onFailure: () => void;
}

const MiniGameSocial: React.FC<MiniGameSocialProps> = ({ visible, onClose, onSuccess, onFailure }) => {
    const [comfortLevel, setComfortLevel] = useState<number>(50); // Jauge de confort (0-100)
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [timeRemaining, setTimeRemaining] = useState<number>(30); // Timer global

    const dialogueSteps = [
        {
            question: "Camille: \"Salut… tu veux faire équipe avec moi ?\"",
            options: [
                { text: "Proposer un partage des tâches.", effect: +10 },
                { text: "Accepter en souriant timidement.", effect: +5 },
                { text: "Ignorer et continuer de lire.", effect: -20 },
            ],
        },
        {
            question: "Camille: \"Tu lis quoi en ce moment ?\"",
            options: [
                { text: "Parler brièvement du livre.", effect: +10 },
                { text: "Répondre juste le titre.", effect: 0 },
                { text: "Changer de sujet maladroitement.", effect: -15 },
            ],
        },
        {
            question: "Camille: \"Tu préfères qu’on travaille séparément ?\"",
            options: [
                { text: "Proposer un compromis.", effect: +10 },
                { text: "Dire oui franchement.", effect: -10 },
                { text: "Hésiter sans répondre.", effect: -5 },
            ],
        },
    ];

    // Timer global pour finir le jeu
    useEffect(() => {
        if (!visible) return;

        if (timeRemaining <= 0) {
            handleGameEnd();
            return;
        }

        const timer = setInterval(() => {
            setTimeRemaining((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining, visible]);

    // Fonction pour gérer le choix
    const handleChoice = (effect: number) => {
        setComfortLevel((prev) => Math.max(0, Math.min(100, prev + effect)));

        if (currentStep + 1 < dialogueSteps.length) {
            setCurrentStep((prev) => prev + 1);
        } else {
            handleGameEnd();
        }
    };

    // Fin du mini-jeu selon la jauge de confort
    const handleGameEnd = () => {
        if (comfortLevel >= 50) {
            Alert.alert('Succès 🎉', "Vous avez réussi à gérer la situation avec Camille.");
            onSuccess();
        } else {
            Alert.alert('Échec 🥀', "L’interaction s’est mal passée et vous vous sentez encore plus isolé(e). ");
            onFailure();
        }
    };

    // Cacher la barre de navigation pendant le jeu
    useEffect(() => {
        if (visible) {
            const hideNavBar = async () => {
                await NavigationBar.setBackgroundColorAsync("rgba(0,0,0,0)");
                await NavigationBar.setBehaviorAsync("overlay-swipe");
                await NavigationBar.setVisibilityAsync("hidden");
            };

            hideNavBar();
        }
    }, [visible]);

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose} statusBarTranslucent={true}>
            <ImageBackground
                source={require('../../../assets/miniGameSocialBackground.webp')} // Arrière-plan à ajouter
                style={stylesT.miniGameBackground}
            >
                <View style={stylesT.miniGameContainer}>
                    <Text style={stylesT.miniGameText}>{dialogueSteps[currentStep].question}</Text>

                    {dialogueSteps[currentStep].options.map((option, index) => (
                        <Pressable
                            key={index}
                            style={stylesT.choiceButton}
                            onPress={() => handleChoice(option.effect)}
                        >
                            <Text style={stylesT.choiceButtonText}>{option.text}</Text>
                        </Pressable>
                    ))}

                    <Text style={stylesT.miniGameText}>Confort: {comfortLevel}%</Text>
                    <Progress.Bar
                        progress={Math.max(0, Math.min(1, comfortLevel / 100))}
                        width={null}
                        color={comfortLevel >= 50 ? "#4CAF50" : "#F44336"}
                        height={10}
                        borderRadius={5}
                    />

                    <Text style={stylesT.miniGameText}>Temps restant: {timeRemaining}s</Text>

                    <Pressable style={stylesT.choiceButton} onPress={onClose}>
                        <Text style={stylesT.choiceButtonText}>Quitter</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </Modal>
    );
};

export default MiniGameSocial;
