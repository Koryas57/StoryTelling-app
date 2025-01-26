import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Alert, ScrollView, ImageBackground } from 'react-native';
import styles from './Game.styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import useSound from '../../hooks/useSound';
import sounds from '../../utils/sounds';

type GameProps = NativeStackScreenProps<RootStackParamList, 'Game'>;

const Game: React.FC<GameProps> = ({ navigation }) => {
    const playPageFlip = useSound(sounds.pageFlip);
    const choiceSound = useSound(sounds.choiceSound);
    const choiceStart = useSound(sounds.startSound);
    const [name, setName] = useState<string>(''); // Nom du joueur
    const [gender, setGender] = useState<string>(''); // Genre sélectionné

    // Fonction de démarrage du jeu
    const handleStartGame = () => {
        if (name.trim() && gender) {
            choiceStart(),
                navigation.replace('Childhood', { name, gender });
        } else {
            Alert.alert('Erreur', 'Veuillez entrer un nom et choisir un sexe pour continuer.');
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/mainBackground.webp')}
            style={styles.container}
        >
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.title}> Bienvenue dans ton aventure interactive           🧟‍♀️📱</Text>

                    {/* Input pour le nom */}
                    <TextInput
                        style={styles.input}
                        placeholder="Quel est ton nom ?   ⌨️"
                        value={name}
                        onChangeText={setName}
                    />

                    {/* Choix du sexe */}
                    <View style={styles.choiceContainer}>
                        <Pressable
                            onTouchStart={choiceSound}
                            style={[
                                styles.choiceButton,
                                gender === 'féminin' && styles.selectedChoice,
                            ]}
                            onPress={() => setGender('féminin')}
                        >
                            <Text style={styles.choiceButtonText}>Féminin</Text>
                        </Pressable>
                        <Pressable
                            onTouchStart={choiceSound}
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
                        <Text style={styles.buttonText}>➡️ Commencer l’aventure ⬅️</Text>
                    </Pressable>
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

export default Game;
