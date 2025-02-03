import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Alert, ScrollView, ImageBackground, ViewStyle } from 'react-native';
import styles from './Game.styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import useSound from '../../hooks/useSound';
import sounds from '../../utils/sounds';
import GameButton from '../../Components/GameButton';

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
                navigation.replace('TeenagePrudent', { name, gender });
        } else {
            Alert.alert('Pas si vite courgette 🥒', '➡️ Renseigne ton prénom ET choisis un genre pour continuer :');
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
                        <GameButton
                            text="Féminin"
                            onPress={() => setGender('féminin')}
                            onTouchStart={choiceSound}
                            buttonStyle={[
                                styles.choiceButton,
                                gender === 'féminin' ? styles.selectedChoice : undefined,
                            ].filter(Boolean) as ViewStyle[]}
                            textStyle={styles.choiceButtonText}
                        />
                        <GameButton
                            text="Masculin"
                            onPress={() => setGender('masculin')}
                            onTouchStart={choiceSound}
                            buttonStyle={[
                                styles.choiceButton,
                                gender === 'masculin' ? styles.selectedChoice : undefined,
                            ].filter(Boolean) as ViewStyle[]}
                            textStyle={styles.choiceButtonText}
                        />
                    </View>
                    {/* Bouton pour commencer */}
                    <GameButton
                        text="START"
                        onPress={handleStartGame}
                        buttonStyle={styles.startButton}
                        textStyle={styles.buttonText}
                        onTouchStart={function (): void {
                        }} />
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

export default Game;
