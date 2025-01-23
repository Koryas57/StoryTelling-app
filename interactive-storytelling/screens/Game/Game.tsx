import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Alert, ScrollView } from 'react-native';
import styles from './Game.styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type GameProps = NativeStackScreenProps<RootStackParamList, 'Game'>;

const Game: React.FC<GameProps> = ({ navigation }) => {
    const [name, setName] = useState<string>(''); // Nom du joueur
    const [gender, setGender] = useState<string>(''); // Genre sélectionné

    // Fonction de démarrage du jeu
    const handleStartGame = () => {
        if (name.trim() && gender) {
            navigation.replace('Childhood', { name, gender });
        } else {
            Alert.alert('Erreur', 'Veuillez entrer un nom et choisir un sexe pour continuer.');
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Bienvenue dans ton aventure interactive !</Text>

                {/* Input pour le nom */}
                <TextInput
                    style={styles.input}
                    placeholder="Quel est ton nom ?"
                    value={name}
                    onChangeText={setName}
                />

                {/* Choix du sexe */}
                <View style={styles.choiceContainer}>
                    <Pressable
                        style={[
                            styles.choiceButton,
                            gender === 'féminin' && styles.selectedChoice,
                        ]}
                        onPress={() => setGender('féminin')}
                    >
                        <Text style={styles.choiceButtonText}>Féminin</Text>
                    </Pressable>
                    <Pressable
                        style={[
                            styles.choiceButton,
                            gender === 'masculin' && styles.selectedChoice,
                        ]}
                        onPress={() => setGender('masculin')}
                    >
                        <Text style={styles.choiceButtonText}>Masculin</Text>
                    </Pressable>
                </View>

                {/* Bouton pour commencer */}
                <Pressable
                    style={styles.startButton}
                    onPress={handleStartGame}
                    disabled={!name.trim() || !gender}
                >
                    <Text style={styles.buttonText}>Commencer l’aventure</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
};

export default Game;
