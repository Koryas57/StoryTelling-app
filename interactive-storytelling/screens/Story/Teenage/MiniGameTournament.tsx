import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Modal,
    Pressable,
    Alert,
    Animated,
    ImageBackground,
} from 'react-native';
import styles from './MiniGameTournament.styles'; // À créer pour les styles spécifiques
import stylesT from './Teenage.styles';

type MiniGameTournamentProps = {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
    onFailure: () => void;
};

const MiniGameTournament: React.FC<MiniGameTournamentProps> = ({
    visible,
    onClose,
    onSuccess,
    onFailure,
}) => {
    const [timer, setTimer] = useState<number>(5); // Temps restant pour cliquer
    const [animationValue] = useState(new Animated.Value(0)); // Animation de l'élément à cliquer

    useEffect(() => {
        if (!visible) return;

        // Décompte du temps
        const countdown = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown);
                    onFailure(); // Si le temps est écoulé, échec
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [visible]);

    // Animation d'apparition et disparition du bouton
    useEffect(() => {
        if (!visible) return;

        Animated.loop(
            Animated.sequence([
                Animated.timing(animationValue, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                }),
                Animated.timing(animationValue, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [animationValue, visible]);

    const handlePress = () => {
        onSuccess(); // Succès si le bouton est cliqué
    };

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
            <ImageBackground
                source={require('../../../assets/miniGameTournament.webp')}
                style={stylesT.miniGameBackground}
            >
                <View style={styles.container}>
                    <Text style={styles.timerText}>
                        TU AS {timer} SEC !
                    </Text>
                    <Animated.View
                        style={[
                            styles.animatedTarget,
                            {
                                opacity: animationValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 1],
                                }),
                                transform: [
                                    {
                                        scale: animationValue.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0.6, 1.2],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <Pressable
                            style={styles.targetButton}
                            onPress={handlePress}
                        >
                            <Text style={styles.targetText}>" Par ici, VITE ! "</Text>
                        </Pressable>
                    </Animated.View>
                </View>
            </ImageBackground>
        </Modal>
    );
};

export default MiniGameTournament;
