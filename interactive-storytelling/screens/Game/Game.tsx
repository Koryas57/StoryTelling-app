import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { generateResponse } from '../../src/api/openai';

const Game: React.FC = () => {
    useEffect(() => {
        const fetchAIResponse = async () => {
            try {
                const response = await generateResponse('Dis-moi bonjour de manière amicale.');
                console.log('Réponse OpenAI :', response); // Vérifie la console pour la réponse
            } catch (error) {
                console.error('Erreur API OpenAI :', error);
            }
        };

        fetchAIResponse();
    }, []);

    return (
        <View style={styles.container}>
            <Text>Test API en cours... Vérifie la console.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Game;
