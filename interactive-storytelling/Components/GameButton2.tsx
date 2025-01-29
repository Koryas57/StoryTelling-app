import React, { useRef } from 'react';
import { Pressable, Text, Animated, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import styles from '../screens/Story/Childhood/Childhood.styles'; // Styles adaptés à vos choix dans Childhood

type GameButton2Props = {
    text: string; // Texte affiché
    onPress: () => void; // Action au clic
    onTouchStart?: () => void; // Son ou effet au début de l'appui
    buttonStyle?: StyleProp<ViewStyle>; // Style supplémentaire pour le bouton
    textStyle?: StyleProp<TextStyle>; // Style supplémentaire pour le texte
    disabled?: boolean;
};

const GameButton2: React.FC<GameButton2Props> = ({
    text,
    onPress,
    onTouchStart,
    buttonStyle,
    textStyle,
    disabled,
}) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.8, // Léger rétrécissement
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1, // Retour à la normale
            useNativeDriver: true,
        }).start();
    };

    return (
        <Animated.View
            style={[
                {
                    transform: [{ scale: scaleValue }],
                },
                buttonStyle, // Applique les styles spécifiques si passés en props
            ]}
        >
            <Pressable
                onPressIn={() => {
                    handlePressIn();
                    onTouchStart && onTouchStart();
                }}
                onPressOut={handlePressOut}
                onPress={onPress}
                style={StyleSheet.flatten([styles.choiceButton, buttonStyle])}
            >
                <Text style={[styles.choiceButtonText, textStyle]}>{text}</Text>
            </Pressable>
        </Animated.View>
    );
};

export default GameButton2;
