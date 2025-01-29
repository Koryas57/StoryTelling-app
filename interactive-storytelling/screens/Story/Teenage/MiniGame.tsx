import React, { useState, useEffect } from 'react';
import { View, Text, Modal, Pressable, Alert, ImageBackground } from 'react-native';
import * as NavigationBar from "expo-navigation-bar";
import stylesT from './Teenage.styles';

type MiniGameProps = {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
    onFailure: () => void;
};

const MiniGame: React.FC<MiniGameProps> = ({ visible, onClose, onSuccess, onFailure }) => {
    const [timeRemaining, setTimeRemaining] = useState<number>(60);
    const [remainingCells, setRemainingCells] = useState<number[]>(Array.from({ length: 16 }, (_, i) => i));
    const [miniGameProgress, setMiniGameProgress] = useState<number[]>([]);
    const [hasKey, setHasKey] = useState<boolean>(false);
    const [keyIndex, setKeyIndex] = useState<number>(Math.floor(Math.random() * 16)); // Position initiale de la clé

    // Timer
    useEffect(() => {
        if (!visible) return;

        if (timeRemaining <= 0) {
            onFailure(); // Échec si le temps est écoulé
            return;
        }

        const timer = setInterval(() => {
            setTimeRemaining((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining, visible]);

    const handleCellClick = (index: number) => {
        if (miniGameProgress.includes(index)) return;

        setMiniGameProgress((prev) => [...prev, index]);

        const randomOutcome = Math.random();

        if (index === keyIndex) {
            // Si c'est la clé
            Alert.alert('Clé trouvée 🔑', 'Vous vous empressez d\'ouvrir le coffre !');
            setHasKey(true);
        } else if (randomOutcome < 0.2) {
            // 20% de chances de trouver un indice
            Alert.alert('Vous trouvez un gros indice !', 'Il ne reste plus que deux pièces à fouiller.');

            // Réduire les cases visibles à la clé et une autre case aléatoire
            const randomOtherIndex = remainingCells.filter((i) => i !== keyIndex)[
                Math.floor(Math.random() * (remainingCells.length - 1))
            ];

            setRemainingCells([keyIndex, randomOtherIndex]);
        } else {
            // Autres résultats (pièges)
            Alert.alert('Pièce vide !', 'Mierda, la pièce est vide, vous perdez genre 5 secondes.');
            setTimeRemaining((prev) => Math.max(prev - 5, 0));
        }
    };

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
                source={require('../../../assets/miniGameBackground.webp')} // Image d'arrière-plan
                style={stylesT.miniGameBackground}
            >
                <View style={stylesT.miniGameContainer}>
                    <Text style={stylesT.miniGameText}>
                        Trouvez la clé cachée dans la tour ! Temps restant : {timeRemaining}s
                    </Text>
                    <View style={stylesT.grid}>
                        {remainingCells.map((cellIndex) => (
                            <Pressable
                                key={cellIndex}
                                style={[
                                    stylesT.gridCell,
                                    miniGameProgress.includes(cellIndex) && stylesT.cellRevealed,
                                ]}
                                onPress={() => handleCellClick(cellIndex)}
                                disabled={miniGameProgress.includes(cellIndex)}
                            >
                                <Text style={stylesT.cellText}>
                                    {miniGameProgress.includes(cellIndex) ? (cellIndex === keyIndex ? '🔑' : '✔️') : '❓'}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                    <Pressable
                        style={stylesT.successButton}
                        onPress={hasKey ? onSuccess : onFailure}
                    >
                        <Text style={stylesT.successButtonText}>
                            {hasKey ? 'Ouvrir le coffre poussièreux' : 'Abandonner'}
                        </Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </Modal>
    );
};

export default MiniGame;
