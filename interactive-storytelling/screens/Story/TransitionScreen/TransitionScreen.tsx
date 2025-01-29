import React, { useEffect } from 'react';
import { View, Text, ImageBackground, Pressable, Alert } from 'react-native';
import styles from './TransitionScreen.styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import useSound from '../../../hooks/useSound';
import sounds from '../../../utils/sounds';
import GameButton2 from '../../../Components/GameButton2';
import { ScrollView } from 'react-native-gesture-handler';


type TransitionScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'TransitionScreen'
>;

const TransitionScreen: React.FC<TransitionScreenProps> = ({ route, navigation }) => {
    const { name, gender, title = 'Résumé de l\'enfance', dominantTrait, skills } = route.params;

    const introMusic = useSound(sounds.Intro);
    const levelSound = useSound(sounds.levelSound)
    const choiceSound = useSound(sounds.choiceSound2)

    useEffect(() => {
        const playMusic = async () => {
            await levelSound(), introMusic() // Lance la musique
        };

        playMusic();

        return () => {
            levelSound.stop(),
                introMusic.stop(); // Appelle la fonction `stop` pour arrêter la musique
        };
    }, [levelSound, introMusic]);


    // Traduction des noms des traits pour affichage
    const traitNames: Record<string, string> = {
        ambitieux: 'Ambitieux',
        prudent: 'Prudent',
        timide: 'Timide',
        aventureux: 'Aventureux',
    };

    // Association des traits aux écrans correspondants
    const screenMapping: Record<
        'ambitieux' | 'prudent' | 'timide' | 'aventureux',
        { screen: 'TeenageAmbitious' | 'TeenagePrudent' | 'TeenageTimid' | 'TeenageAdventurous'; params: { name: string; gender: string } }
    > = {
        ambitieux: { screen: 'TeenageAmbitious', params: { name: '', gender: '' } },
        prudent: { screen: 'TeenagePrudent', params: { name: '', gender: '' } },
        timide: { screen: 'TeenageTimid', params: { name: '', gender: '' } },
        aventureux: { screen: 'TeenageAdventurous', params: { name: '', gender: '' } },
    };



    const unlockedMessage = `Chemin débloqué : ${traitNames[dominantTrait] || dominantTrait}`;

    return (
        <ImageBackground
            source={require('../../../assets/TransitionBackground.webp')}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Félicitations {name}, vous avez terminé le chapitre de l'enfance</Text>
                <Text style={styles.subtitle}>Résumé des compétences acquises</Text>
                <View style={styles.skillsContainer}>
                    {skills.length > 0 ? (
                        skills.map((skill, index) => (
                            <Text key={index} style={styles.skillText}>
                                {skill} {/* Affiche directement le texte avec l’émoticône */}
                            </Text>
                        ))
                    ) : (
                        <Text style={styles.skillText}>Aucune compétence acquise</Text>
                    )}
                </View>
                <Text style={styles.unlockedMessage}>{unlockedMessage}</Text>
                <GameButton2
                    text='Continuer'
                    textStyle={styles.continueButtonText}
                    buttonStyle={styles.continueButton}
                    onPress={() => {
                        if (dominantTrait in screenMapping) {
                            const mappedScreen = screenMapping[dominantTrait as keyof typeof screenMapping];
                            navigation.replace(mappedScreen.screen, { name, gender });
                        } else {
                            Alert.alert('Erreur', 'Aucun écran défini pour ce trait dominant.');
                        }
                    }}
                    onTouchStart={choiceSound}
                />
            </View>
        </ImageBackground>
    );
};

export default TransitionScreen;
