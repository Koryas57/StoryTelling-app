import React from 'react';
import { View, Text } from 'react-native';
import styles from './Game.styles';

const Game: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue dans le jeu !</Text>
        </View>
    );
};

export default Game;
