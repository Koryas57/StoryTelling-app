import React, { useRef } from 'react';
import { Pressable, Text, Animated, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import styles from '../screens/Home/Home.styles';


type GameButtonProps = {
    text: string;
    onPress: () => void;
    onTouchStart: () => void;
    buttonStyle?: StyleProp<ViewStyle>; // Typage plus flexible
    textStyle?: StyleProp<TextStyle>;
};



const GameButton: React.FC<GameButtonProps> = ({
    text,
    onPress,
    onTouchStart,
    buttonStyle,
    textStyle,
}) => {
    const scaleValue = useRef(new Animated.Value(1)).current;
    const opacityValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.parallel([
            Animated.spring(scaleValue, {
                toValue: 0.65, // Réduction
                useNativeDriver: true,
            }),
            Animated.timing(opacityValue, {
                toValue: 0.8, // Réduction opacité
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handlePressOut = () => {
        Animated.parallel([
            Animated.spring(scaleValue, {
                toValue: 1, // Retour à la normale
                useNativeDriver: true,
            }),
            Animated.timing(opacityValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <Animated.View
            style={[
                styles.animatedContainer,
                {
                    transform: [{ scale: scaleValue }],
                    opacity: opacityValue,
                },
            ]}
        >
            <Pressable
                onPressIn={() => {
                    handlePressIn();
                    onTouchStart && onTouchStart();
                }}
                onPressOut={handlePressOut}
                onPress={onPress}
                style={StyleSheet.flatten([styles.button, buttonStyle])} // Combine les styles
            >
                <Text style={[styles.buttonText, textStyle]}>{text}</Text>
            </Pressable>
        </Animated.View>
    );
};


export default GameButton;
