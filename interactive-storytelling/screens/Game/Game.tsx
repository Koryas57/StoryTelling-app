import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { generateResponse } from '../../src/api/openai';

const Game: React.FC = () => {
    const [response, setResponse] = useState<string | null>(null); // State pour stocker la réponse de l'API
    const [loading, setLoading] = useState<boolean>(true); // State pour afficher un message de chargement

    useEffect(() => {
        const fetchAIResponse = async () => {
            try {
                console.log('Appel à l’API en cours...');
                const apiResponse = await generateResponse('Test');
                console.log('Réponse API OpenAI :', apiResponse);
                setResponse(apiResponse); // Met à jour le state avec la réponse
            } catch (error) {
                console.error('Erreur API OpenAI :', error.message || error);
                setResponse('Erreur lors de la communication avec l’API OpenAI.');
            } finally {
                setLoading(false); // Fin du chargement
            }
        };

        fetchAIResponse();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <Text>Test API en cours... Vérifie la console.</Text> // Message de chargement
            ) : (
                <Text>{response}</Text> // Affiche la réponse de l'API ou un message d'erreur
            )}
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
