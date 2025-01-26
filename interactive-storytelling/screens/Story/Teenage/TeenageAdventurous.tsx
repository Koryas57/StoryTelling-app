import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
    Image,
    ImageBackground,
    Modal,
    Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import teenageAdventurousData from '../../../data/TeenageAdventurousData';
import useSound from '../../../hooks/useSound';
import sounds from '../../../utils/sounds';
import { Audio } from 'expo-av';
import styles from '../Childhood/Childhood.styles';
import stylesT from './Teenage.styles';
import MiniGame from './MiniGame'; // Mini-jeu externe
import GameButton2 from '../../../Components/GameButton2';

type TeenageAdventurousProps = NativeStackScreenProps<
    RootStackParamList,
    'TeenageAdventurous'
>;

type Choice = {
    text: string;
    type: 'aventureux';
    isError?: boolean; // Indique si le choix est une erreur
};

const TeenageAdventurous: React.FC<TeenageAdventurousProps> = ({
    route,
    navigation,
}) => {
    const { name, gender, title } = route.params;

    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const playPageFlip = useSound(sounds.pageFlip);
    const choiceSound = useSound(sounds.choiceSound);
    const levelSound = useSound(sounds.levelSound);
    const scrollViewRef = useRef<ScrollView>(null);

    const [currentDay, setCurrentDay] = useState<number>(1);
    const [currentText, setCurrentText] = useState<string>('');
    const [choices, setChoices] = useState<Choice[]>([]);
    const [userChoices, setUserChoices] = useState<Record<number, string>>({});
    const [consequence, setConsequence] = useState<string>('');
    const [showConsequence, setShowConsequence] = useState<boolean>(false);
    const [showTransition, setShowTransition] = useState<boolean>(false);
    const [showMiniGame, setShowMiniGame] = useState<boolean>(false); // Mini-jeu
    const [errorCount, setErrorCount] = useState<number>(0);
    const [skillTitle, setSkillTitle] = useState<string>('');
    const [characterTraits, setCharacterTraits] = useState<{
        aventureux: number;
    }>({
        aventureux: 0,
    });

    // Effet pour charger les données d'un jour
    useEffect(() => {
        if (currentDay <= 7) {
            const dayData = teenageAdventurousData[currentDay];
            setCurrentText(dayData.text(name));
            setChoices(dayData.choices);
        } else {
            handlePhaseEnd();
        }
    }, [currentDay]);

    // Scroll automatique vers le haut à chaque changement de jour
    useEffect(() => {
        if (showConsequence || scrollViewRef.current) {
            scrollViewRef.current?.scrollTo({ y: 0, animated: false });
        }
    }, [currentDay, showConsequence]);

    // Fonction pour jouer un son spécifique à chaque jour
    const playSoundForDay = async (day: number) => {
        if (sound) {
            await sound.unloadAsync();
            setSound(null);
        }

        const daySound = teenageAdventurousData[day]?.sound;
        if (daySound) {
            const { sound: newSound } = await Audio.Sound.createAsync(daySound);
            setSound(newSound);
            await newSound.playAsync();
        }
    };

    useEffect(() => {
        playSoundForDay(currentDay);
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [currentDay]);

    // Gestion de la sélection de choix
    const handleChoiceSelection = (
        type: keyof typeof characterTraits,
        isError?: boolean,
        choiceIndex?: number // Peut être indéfini
    ) => {
        choiceSound();

        // Vérifie si le choix est une erreur
        if (isError) {
            setErrorCount((prev) => prev + 1);
            if (errorCount + 1 >= 3) {
                Alert.alert(
                    'Échec',
                    'Trop d’erreurs ont été commises. Votre aventure se termine ici.',
                    [
                        {
                            text: 'Recommencer',
                            onPress: () => navigation.replace('Home'),
                        },
                    ]
                );
                return;
            }
        } else {
            // Si le choix n'est pas une erreur, on augmente les traits
            setCharacterTraits((prev) => ({
                ...prev,
                [type]: prev[type] + 1,
            }));
        }

        setUserChoices((prev) => ({
            ...prev,
            [currentDay]: type,
        }));

        // Vérifie si choiceIndex est défini
        if (choiceIndex === undefined) {
            setConsequence("Aucune conséquence trouvée (index non défini).");
            setSkillTitle("");
            return;
        }

        // Mappe le choix vers une conséquence
        const consequenceKey = `${type}_${choiceIndex + 1}`; // Forme : aventureux_1, aventureux_2, ...
        const selectedConsequence = teenageAdventurousData[currentDay]?.consequences?.[consequenceKey];

        // Si une conséquence est trouvée
        if (selectedConsequence) {
            setConsequence(selectedConsequence.text(name));
            setSkillTitle(selectedConsequence.skillTitle || 'Aucune compétence acquise.');

            // Empêche explicitement le mini-jeu si le choix est une erreur
            if (isError) {
                setShowConsequence(true);
                return; // Stoppe ici si le choix est une erreur
            }

            // Lance le mini-jeu si ce n'est pas une erreur et si une conséquence a un impact
            if (selectedConsequence.miniGameImpact) {
                setShowMiniGame(true); // Lance le mini-jeu
                return; // Ne montre pas directement le résultat, attend le mini-jeu
            }
        } else {
            setConsequence("Aucune conséquence trouvée.");
            setSkillTitle("");
        }

        // Affiche le résultat si aucune autre condition n'est remplie
        setShowConsequence(true);
    };


    // Passer au jour suivant
    const handleNextDay = () => {
        playPageFlip();
        setShowConsequence(false);
        setConsequence('');
        setShowTransition(true);
    };

    // Continuer manuellement depuis l'écran de transition
    const handleManualContinue = () => {
        playPageFlip();
        setShowTransition(false);
        if (currentDay < 7) {
            setCurrentDay((prev) => prev + 1);
        } else {
            handlePhaseEnd();
        }
    };

    // Gestion de la fin de phase et transition vers TransitionScreen
    const handlePhaseEnd = async () => {
        levelSound();

        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
            setSound(null);
        }

        const dominantTrait = 'aventureux';

        const acquiredSkills = Object.entries(userChoices)
            .map(([day, choice]) =>
                teenageAdventurousData[Number(day)]?.consequences?.[choice]?.skillTitle
            )
            .filter((skill): skill is string => !!skill);

        navigation.replace('TransitionScreen', {
            name,
            gender,
            title,
            dominantTrait,
            skills: acquiredSkills,
        });
    };

    const handleMiniGameFailure = () => {
        setErrorCount((prev) => prev + 1); // Incrémente le compteur d'erreurs

        if (errorCount + 1 >= 3) { // Vérifie si c'est la troisième erreur
            Alert.alert(
                'Échec',
                'Trop d’erreurs ont été commises. Votre aventure se termine ici.',
                [
                    {
                        text: 'Recommencer',
                        onPress: () => navigation.replace('Home'),
                    },
                ]
            );
            return;
        }

        setShowMiniGame(false); // Ferme le mini-jeu

        // Applique la conséquence du choix 3
        const consequenceKey = `aventureux_3`; // Correspond au choix 3
        const selectedConsequence = teenageAdventurousData[currentDay]?.consequences?.[consequenceKey];

        if (selectedConsequence) {
            setConsequence(selectedConsequence.text(name));
            setSkillTitle(selectedConsequence.skillTitle || 'Aucune compétence acquise.');
        } else {
            setConsequence("Aucune conséquence trouvée.");
            setSkillTitle("");
        }

        Alert.alert('Échec', 'Vous avez échoué au mini-jeu.');
        setShowConsequence(true); // Affiche les conséquences après l'échec
    };


    return (
        <ImageBackground
            source={require('../../../assets/TeenageBackground.webp')}
            style={styles.container}
        >
            <View style={styles.container}>
                <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.hud}>
                        <Text style={styles.hudText}>Jour {currentDay} / 7</Text>
                        <Text style={styles.hudText}>Adolescence de {name}</Text>
                    </View>
                    <Text style={styles.hudTitle}>{teenageAdventurousData[currentDay]?.title}</Text>
                    {teenageAdventurousData[currentDay]?.image && (
                        <Image
                            source={teenageAdventurousData[currentDay].image}
                            style={styles.adventureImage}
                        />
                    )}
                    {!showConsequence ? (
                        <>
                            <Text style={styles.adventureText}>{currentText}</Text>
                            <View style={styles.choicesContainer}>
                                {choices.map((choice, index) => (
                                    <GameButton2
                                        key={index}
                                        text={choice.text}
                                        onPress={() => handleChoiceSelection(choice.type, choice.isError, index)}
                                        onTouchStart={function (): void {
                                        }}
                                    />
                                ))}
                            </View>
                        </>
                    ) : (
                        <>
                            <Text style={styles.consequenceTitle}>💫 {name} obtient une compétence du niveau "Adolescence" :</Text>
                            <Text style={styles.skillTitle}>{skillTitle}</Text>
                            <Text style={styles.consequenceText}>{consequence}</Text>
                            <GameButton2
                                onPress={handleNextDay}
                                text={'Continuer'}
                                textStyle={styles.nextButtonText}
                            />
                        </>
                    )}
                </ScrollView>
                {showMiniGame && (
                    <MiniGame
                        visible={showMiniGame}
                        onClose={() => setShowMiniGame(false)}
                        onSuccess={() => {
                            setShowMiniGame(false); // Ferme la modal du mini-jeu
                            Alert.alert('Félicitations', 'Compétence débloquée 🎉');
                            setShowConsequence(true); // Affiche les conséquences après le mini-jeu
                        }}
                        onFailure={handleMiniGameFailure} // Appelle la fonction en cas d'échec
                    />
                )}
                {showTransition && (
                    currentDay <= 6 ? (
                        <Modal visible={showTransition} animationType="fade">
                            <ImageBackground
                                source={teenageAdventurousData[currentDay + 1]?.image}
                                style={styles.transitionContainer}
                            >
                                <Text style={styles.transitionText}>Jour {currentDay + 1}</Text>
                                <GameButton2
                                    onPress={handleManualContinue}
                                    buttonStyle={styles.transitionButton}
                                    text={'Commencer'}
                                />
                            </ImageBackground>
                        </Modal>
                    ) : (
                        (() => {
                            handlePhaseEnd();
                            return null;
                        })()
                    )
                )}
            </View>
        </ImageBackground>
    );
};

export default TeenageAdventurous;
