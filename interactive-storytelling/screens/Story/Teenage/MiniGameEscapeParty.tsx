import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Pressable, Alert, ImageBackground } from 'react-native';
import * as Progress from 'react-native-progress';
import * as NavigationBar from "expo-navigation-bar";
import stylesT from './Teenage.styles';

interface MiniGameEscapePartyProps {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
    onFailure: () => void;
}

type ZoneType = 'calm' | 'noisy' | 'exit';

const MiniGameEscapeParty: React.FC<MiniGameEscapePartyProps> = ({ visible, onClose, onSuccess, onFailure }) => {
    const [stressLevel, setStressLevel] = useState<number>(30); // Jauge de stress (0-100)
    const [timeRemaining, setTimeRemaining] = useState<number>(40);
    const [currentZone, setCurrentZone] = useState<ZoneType>('noisy');

    // Zones de la fête et leurs effets sur le stress
    const zones: Record<ZoneType, { name: string; stressChange: number }> = {
        calm: { name: "Coin tranquille", stressChange: -5 },
        noisy: { name: "Près des enceintes", stressChange: +10 },
        exit: { name: "Près de la sortie", stressChange: 0 },
    };

    // Gestion du stress en fonction de la zone
    useEffect(() => {
        if (!visible) return;

        const zoneInterval = setInterval(() => {
            setStressLevel((prev) => Math.max(0, Math.min(100, prev + zones[currentZone].stressChange)));
        }, 1000); // Mise à jour toutes les secondes

        return () => clearInterval(zoneInterval);
    }, [currentZone, visible]);

    // Timer global pour quitter la fête
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

    // Fin du mini-jeu selon le niveau de stress
    const handleGameEnd = () => {
        if (stressLevel < 70) {
            Alert.alert('Succès 🎉', "Vous avez réussi à quitter la fête discrètement sans être submergé(e) par le stress.");
            onSuccess();
        } else {
            Alert.alert('Échec 🥀', "Vous vous êtes senti(e) oppressé(e) toute la soirée sans réussir à partir.");
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
                source={require('../../../assets/miniGamePartyBackground.webp')} // Arrière-plan à ajouter
                style={stylesT.miniGameBackground}
            >
                <View style={stylesT.miniGameContainer}>
                    <Text style={stylesT.miniGameText}>Zone actuelle : {zones[currentZone].name}</Text>

                    <Progress.Bar
                        progress={Math.max(0, Math.min(1, stressLevel / 100))}
                        width={null}
                        color={stressLevel < 50 ? "#4CAF50" : stressLevel < 70 ? "#FFC107" : "#F44336"}
                        height={10}
                        borderRadius={5}
                    />
                    <Text style={stylesT.miniGameText}>Stress : {stressLevel}%</Text>
                    <Text style={stylesT.miniGameText}>Temps restant : {timeRemaining}s</Text>

                    <View style={stylesT.choicesContainer}>
                        <Pressable style={stylesT.choiceButton} onPress={() => setCurrentZone('calm')}>
                            <Text style={stylesT.choiceButtonText}>Aller dans un coin tranquille 🛋️</Text>
                        </Pressable>
                        <Pressable style={stylesT.choiceButton} onPress={() => setCurrentZone('noisy')}>
                            <Text style={stylesT.choiceButtonText}>S'approcher des enceintes 🔊</Text>
                        </Pressable>
                        <Pressable style={stylesT.choiceButton} onPress={() => setCurrentZone('exit')}>
                            <Text style={stylesT.choiceButtonText}>Se diriger vers la sortie 🚪</Text>
                        </Pressable>
                    </View>

                    <Pressable style={stylesT.choiceButton} onPress={onClose}>
                        <Text style={stylesT.choiceButtonText}>Quitter le mini-jeu</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </Modal>
    );
};

export default MiniGameEscapeParty;
