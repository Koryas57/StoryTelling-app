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
import MiniGameTournament from './MiniGameTournament';

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

    const [miniGameChoiceIndex, setMiniGameChoiceIndex] = useState<number | null>(null);
    const [miniGameChoiceType, setMiniGameChoiceType] = useState<keyof typeof characterTraits | null>(null);


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
        prudent: number;
        timide: number;
        ambitieux: number;
    }>({
        aventureux: 0,
        prudent: 0,
        timide: 0,
        ambitieux: 0,
    });

    type ChoiceType = keyof typeof characterTraits;


    // Effet pour charger les données d'un jour
    useEffect(() => {
        if (currentDay <= 7) {
            const dayData = teenageAdventurousData[currentDay];
            setCurrentText(dayData.text(name, gender));
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
        choiceIndex?: number // Peut être undefined
    ) => {
        choiceSound();

        // Vérifie si choiceIndex est undefined
        if (choiceIndex === undefined) {
            console.warn(`L'index du choix est indéfini pour le type ${type}`);
            setConsequence("Pas de conséquence trouvée (index indéfini).");
            setSkillTitle("");
            return;
        }

        // Gestion des erreurs (choix 3)
        if (isError) {
            setErrorCount((prev) => prev + 1);
            if (errorCount + 1 >= 3) {
                Alert.alert(
                    'Destin tragique ❌',
                    `En prenant des décisions erronées, ${name} s'est égaré(e).`,
                    [
                        { text: 'Recommencer', onPress: () => navigation.replace('Home') },
                    ]
                );
                return;
            }
            // Applique directement la conséquence du choix 3
            const consequenceKey = `${type}_${choiceIndex + 1}`;
            const selectedConsequence = teenageAdventurousData[currentDay]?.consequences?.[consequenceKey];
            if (selectedConsequence) {
                setConsequence(selectedConsequence.text(name, gender));
                setSkillTitle(selectedConsequence.skillTitle || 'Aucune compétence acquise.');
            }
            setShowConsequence(true);
            return;
        }

        // Vérifie s'il y a un mini-jeu pour le jour actuel
        if (currentDay === 1 || currentDay === 4) {
            setMiniGameChoiceIndex(choiceIndex);
            setMiniGameChoiceType(type);
            setShowMiniGame(true);
            return;
        }

        // Applique immédiatement les conséquences pour les jours sans mini-jeux
        const consequenceKey = `${type}_${choiceIndex + 1}`;
        const selectedConsequence = teenageAdventurousData[currentDay]?.consequences?.[consequenceKey];
        if (selectedConsequence) {
            setConsequence(selectedConsequence.text(name, gender));
            setSkillTitle(selectedConsequence.skillTitle || 'Aucune compétence acquise.');
        } else {
            console.warn(`Aucune conséquence trouvée pour la clé ${consequenceKey}`);
            setConsequence('Pas de conséquence trouvée.');
            setSkillTitle('');
        }

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

        // Arrêter et décharger les sons
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
            setSound(null);
        }

        // Déterminer le trait dominant
        const dominantTrait = Object.entries(characterTraits).sort((a, b) => b[1] - a[1])[0][0];

        // Extraire les compétences acquises
        const acquiredSkills = Object.entries(userChoices)
            .map(([day, choiceKey]) => {
                const dayNumber = Number(day);
                const dayData = teenageAdventurousData[dayNumber];

                // Récupère la conséquence correspondant à `choiceKey`
                return dayData?.consequences?.[choiceKey]?.skillTitle || null;
            })
            .filter((skill): skill is string => !!skill); // Élimine les valeurs nulles ou undefined

        console.log('Compétences acquises transmises à TransitionScreen:', acquiredSkills);

        // Navigation vers TransitionScreen avec les données
        navigation.replace('TransitionScreen', {
            name,
            gender,
            title,
            dominantTrait,
            skills: acquiredSkills,
        });
    };


    const getMiniGameForDay = (day: number) => {
        switch (day) {
            case 1:
                return (
                    <MiniGame
                        visible={showMiniGame}
                        onClose={() => setShowMiniGame(false)}
                        onSuccess={() => {
                            setShowMiniGame(false);

                            if (miniGameChoiceIndex !== null && miniGameChoiceType) {
                                const consequenceKey = `${miniGameChoiceType}_${miniGameChoiceIndex + 1}`;
                                const successConsequence =
                                    teenageAdventurousData[currentDay]?.consequences?.[consequenceKey];
                                if (successConsequence) {
                                    setConsequence(successConsequence.text(name, gender));
                                    setSkillTitle(successConsequence.skillTitle || 'Aucune compétence acquise.');
                                }
                            } else {
                                console.warn("miniGameChoiceIndex ou miniGameChoiceType non défini.");
                            }
                            Alert.alert('Félicitations', 'Vous avez trouvé la clé dans la tour 🎉');
                            setShowConsequence(true);
                        }}
                        onFailure={handleMiniGameFailure}
                    />
                );
            case 4:
                return (
                    <MiniGameTournament
                        visible={showMiniGame}
                        onClose={() => setShowMiniGame(false)}
                        onSuccess={() => {
                            setShowMiniGame(false);

                            if (miniGameChoiceIndex !== null && miniGameChoiceType) {
                                const consequenceKey = `${miniGameChoiceType}_${miniGameChoiceIndex + 1}`;
                                const successConsequence =
                                    teenageAdventurousData[currentDay]?.consequences?.[consequenceKey];
                                if (successConsequence) {
                                    setConsequence(successConsequence.text(name, gender));
                                    setSkillTitle(successConsequence.skillTitle || 'Aucune compétence acquise.');
                                }
                            } else {
                                console.warn("miniGameChoiceIndex ou miniGameChoiceType non défini.");
                            }
                            Alert.alert('Félicitations', 'Votre passe décisive permet à votre équipe de remporter le tournoi 🎉');
                            setShowConsequence(true);
                        }}
                        onFailure={handleMiniGameFailure}
                    />
                );
            default:
                return null;
        }
    };



    const handleMiniGameFailure = () => {
        setErrorCount((prev) => prev + 1);

        if (errorCount + 1 >= 3) {
            Alert.alert(
                'Destin tragique ❌',
                `En prenant des décisions erronées, ${name} s'est égaré(e).`,
                [
                    {
                        text: 'Recommencer',
                        onPress: () => navigation.replace('Home'),
                    },
                ]
            );
            return;
        }

        setShowMiniGame(false);

        // Applique la conséquence d'échec
        const consequenceKey = `aventureux_3`; // Toujours applique le choix 3 en cas d'échec
        const selectedConsequence = teenageAdventurousData[currentDay]?.consequences?.[consequenceKey];

        if (selectedConsequence) {
            setConsequence(selectedConsequence.text(name, gender));
            setSkillTitle(selectedConsequence.skillTitle || 'Aucune compétence acquise.');
        } else {
            setConsequence('Pas de conséquence trouvée.');
            setSkillTitle('');
        }

        Alert.alert('Échec', 'Vous avez échoué au mini-jeu.');
        setShowConsequence(true);
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
                {showMiniGame && getMiniGameForDay(currentDay)}
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
