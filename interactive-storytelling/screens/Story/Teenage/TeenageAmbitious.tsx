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
import * as NavigationBar from "expo-navigation-bar";
import teenageAmbitiousData from '../../../data/TeenageAmbitiousData';
import useSound from '../../../hooks/useSound';
import sounds from '../../../utils/sounds';
import { Audio } from 'expo-av';
import styles from '../Childhood/Childhood.styles';
import MiniGame from './MiniGame'; // Mini-jeu externe
import GameButton2 from '../../../Components/GameButton2';
import MiniGameTournament from './MiniGameTournament';

type TeenageAmbitiousProps = NativeStackScreenProps<
    RootStackParamList,
    'TeenageAmbitious'
>;

type Choice = {
    text: string;
    type: 'ambitieux';
    isError?: boolean; // Indique si le choix est une erreur
};

const TeenageAmbitious: React.FC<TeenageAmbitiousProps> = ({
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
            const dayData = teenageAmbitiousData[currentDay];
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

        const daySound = teenageAmbitiousData[day]?.sound;
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
                    `En suivant un chemin semé d'incertitudes et de décisions contraires à sa véritable nature, ${name} s'est lentement perdu(e). 
Ces choix, bien qu'humains, ont mené à une fin sombre : isolé(e), sans opportunités, et emprisonné(e) dans la peur de l'échec.

Mais tout n'est pas fini ! Chaque aventure est une leçon, et aujourd'hui peut marquer un nouveau départ. 

Recommencez, explorez vos vérités, et écrivez une histoire plus lumineuse, une histoire qui VOUS ressemble. 🔮`,
                    [
                        { text: 'Recommencer', onPress: () => navigation.replace('Home') },
                    ]
                );
                return;
            }

            // Applique directement la conséquence du choix 3
            const consequenceKey = `${type}_${choiceIndex + 1}`;
            const selectedConsequence = teenageAmbitiousData[currentDay]?.consequences?.[consequenceKey];
            if (selectedConsequence) {
                setConsequence(selectedConsequence.text(name, gender));
                setSkillTitle(selectedConsequence.skillTitle || 'Aucune compétence acquise.');

                // Enregistre le skillTitle pour ce choix
                setUserChoices((prev) => ({
                    ...prev,
                    [currentDay]: selectedConsequence.skillTitle || '',
                }));
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
        const selectedConsequence = teenageAmbitiousData[currentDay]?.consequences?.[consequenceKey];

        if (selectedConsequence) {
            setConsequence(selectedConsequence.text(name, gender));
            setSkillTitle(selectedConsequence.skillTitle || 'Aucune compétence acquise.');

            // Enregistre le skillTitle pour ce choix
            setUserChoices((prev) => ({
                ...prev,
                [currentDay]: selectedConsequence?.skillTitle || '',
            }));
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

    // Gestion de la fin de phase et transition vers TransitionScreen2
    const handlePhaseEnd = async () => {
        levelSound();

        // Arrête et décharge les sons
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
            setSound(null);
        }

        // Déterminer le trait dominant
        const dominantTrait = Object.entries(characterTraits).sort((a, b) => b[1] - a[1])[0][0];

        // Extraire les compétences acquises
        const acquiredSkills = Object.values(userChoices)
            .filter((skill) => skill && skill !== 'Aucune compétence acquise.');


        console.log('Compétences acquises transmises à TransitionScreen2:', acquiredSkills);

        // Navigation vers TransitionScreen2 avec les données
        navigation.replace('TransitionScreen2', {
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
                        onSuccess={handleMiniGameSuccess} // Appel direct
                        onFailure={handleMiniGameFailure}
                    />
                );
            case 4:
                return (
                    <MiniGameTournament
                        visible={showMiniGame}
                        onClose={() => setShowMiniGame(false)}
                        onSuccess={handleMiniGameSuccess} // Appel direct
                        onFailure={handleMiniGameFailure}
                    />
                );
            default:
                return null;
        }
    };


    const handleMiniGameSuccess = () => {
        setShowMiniGame(false);

        if (miniGameChoiceIndex !== null && miniGameChoiceType) {
            const consequenceKey = `${miniGameChoiceType}_${miniGameChoiceIndex + 1}`;
            const selectedConsequence = teenageAmbitiousData[currentDay]?.consequences?.[consequenceKey];

            if (selectedConsequence) {
                setConsequence(selectedConsequence.text(name, gender));
                setSkillTitle(selectedConsequence.skillTitle || 'Aucune compétence acquise.');

                // Enregistre le skillTitle pour ce choix
                setUserChoices((prev) => ({
                    ...prev,
                    [currentDay]: selectedConsequence.skillTitle || '',
                }));
            } else {
                console.warn(`Aucune conséquence trouvée pour la clé ${consequenceKey}`);
            }
        } else {
            console.warn("miniGameChoiceIndex ou miniGameChoiceType non défini.");
        }

        Alert.alert('Félicitations ! 🎉', 'Vous avez réussi le mini-jeu, ce moment restera dans votre mémoire toute votre vie et influencera peut-être certains de vos choix... 🍃');
        setShowConsequence(true);
    };


    const handleMiniGameFailure = () => {
        setErrorCount((prev) => prev + 1);

        if (errorCount + 1 >= 3) {
            Alert.alert(
                'Destin tragique ❌',
                `En suivant un chemin semé d'incertitudes et de décisions contraires à sa véritable nature, ${name} s'est lentement perdu(e). 
Ces choix, bien qu'humains, ont mené à une fin sombre : isolé(e), sans opportunités, et emprisonné(e) dans la peur de l'échec.

Mais tout n'est pas fini ! Chaque aventure est une leçon, et aujourd'hui peut marquer un nouveau départ. 

Recommencez, explorez vos vérités, et écrivez une histoire plus lumineuse, une histoire qui VOUS ressemble. 🔮`,
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

        // Applique une conséquence spécifique en cas d'échec
        const consequenceKey = `ambitieux_3`; // Toujours applique la conséquence du choix 3
        const selectedConsequence = teenageAmbitiousData[currentDay]?.consequences?.[consequenceKey];

        if (selectedConsequence) {
            setConsequence(selectedConsequence.text(name, gender));
            setSkillTitle(selectedConsequence.skillTitle || 'Aucune compétence acquise.');

            // Enregistre le skillTitle pour l'échec
            setUserChoices((prev) => ({
                ...prev,
                [currentDay]: selectedConsequence.skillTitle || '',
            }));
        } else {
            setConsequence("Aucune conséquence trouvée.");
            setSkillTitle("");
        }

        Alert.alert('Échec 🥀', 'Chercher la clé à fini par vous saouler, vous rentrez seul chez vous 🦃');
        setShowConsequence(true);
    };

    useEffect(() => {
        if (showTransition) {
            const hideNavBar = async () => {
                await NavigationBar.setBackgroundColorAsync("rgba(0,0,0)");
                await NavigationBar.setBehaviorAsync("overlay-swipe");
                await NavigationBar.setVisibilityAsync("hidden");
            };

            hideNavBar();
        }
    }, [showTransition]);

    useEffect(() => {
        if (showMiniGame) {
            const hideNavBar = async () => {
                await NavigationBar.setBackgroundColorAsync("rgba(0,0,0)");
                await NavigationBar.setBehaviorAsync("overlay-swipe");
                await NavigationBar.setVisibilityAsync("hidden");
            };

            hideNavBar();
        }
    }, [showMiniGame]);



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
                    <Text style={styles.hudTitle}>{teenageAmbitiousData[currentDay]?.title}</Text>
                    {teenageAmbitiousData[currentDay]?.image && (
                        <Image
                            source={teenageAmbitiousData[currentDay].image}
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
                            <Text style={styles.consequenceTitle}>{name} obtient une compétence du niveau Adolescence :</Text>
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
                        <Modal visible={showTransition} animationType="fade" statusBarTranslucent={true}>
                            <ImageBackground
                                source={teenageAmbitiousData[currentDay + 1]?.image}
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

export default TeenageAmbitious;
