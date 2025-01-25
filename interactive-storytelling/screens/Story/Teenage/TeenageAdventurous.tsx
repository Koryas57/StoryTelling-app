import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    ScrollView,
    Pressable,
    Image,
    ImageBackground,
    Modal,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import teenageAdventurousData from '../../../data/TeenageAdventurousData';
import useSound from '../../../hooks/useSound';
import sounds from '../../../utils/sounds';
import { Audio } from 'expo-av';
import styles from '../Childhood/Childhood.styles';

type TeenageAdventurousProps = NativeStackScreenProps<
    RootStackParamList,
    'TeenageAdventurous'
>;

type Choice = {
    text: string;
    type: 'aventureux';
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
    const [skillTitle, setSkillTitle] = useState<string>('');
    const [characterTraits, setCharacterTraits] = useState<{
        aventureux: number;
    }>({
        aventureux: 0,
    });

    // Mise à jour des données à chaque changement de jour
    useEffect(() => {
        if (currentDay <= 7) {
            const dayData = teenageAdventurousData[currentDay];
            setCurrentText(dayData.text(name));
            setChoices(dayData.choices);
        } else {
            handlePhaseEnd();
        }
    }, [currentDay]);

    // Scroll automatique en haut à chaque changement de jour ou modal
    useEffect(() => {
        if (showConsequence || scrollViewRef.current) {
            scrollViewRef.current?.scrollTo({ y: 0, animated: false });
        }
    }, [currentDay, showConsequence]);

    // Fonction pour jouer un son associé à chaque jour
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

    // Mise à jour des sons à chaque changement de jour
    useEffect(() => {
        playSoundForDay(currentDay);
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [currentDay]);

    // Gestion de la sélection d'un choix
    const handleChoiceSelection = (type: keyof typeof characterTraits) => {
        choiceSound();

        setCharacterTraits((prev) => ({
            ...prev,
            [type]: prev[type] + 1, // Correctement typé
        }));

        setUserChoices((prev) => ({
            ...prev,
            [currentDay]: type, // Typé également
        }));

        const selectedConsequence = teenageAdventurousData[currentDay]?.consequences?.[type];
        if (selectedConsequence) {
            setConsequence(selectedConsequence.text(name));
            setSkillTitle(selectedConsequence.skillTitle);
        }
        setShowConsequence(true);
    };

    // Fonction pour passer au jour suivant
    const handleNextDay = () => {
        playPageFlip();
        setShowConsequence(false);
        setConsequence('');
        setShowTransition(true);
    };

    // Fonction pour passer manuellement au jour suivant depuis la transition
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

        // Nettoyer le son en cours
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

    return (
        <View style={styles.container}>
            <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollContainer}>
                <View style={styles.hud}>
                    <Text style={styles.hudText}>Jour {currentDay} / 7</Text>
                    <Text style={styles.hudText}>Aventure de {name}</Text>
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
                                <Pressable
                                    key={index}
                                    style={styles.choiceButton}
                                    onPress={() => handleChoiceSelection(choice.type)}
                                >
                                    <Text style={styles.choiceButtonText}>{choice.text}</Text>
                                </Pressable>
                            ))}
                        </View>
                    </>
                ) : (
                    <>
                        <Text style={styles.consequenceTitle}>💫 Résultat :</Text>
                        <Text style={styles.skillTitle}>{skillTitle}</Text>
                        <Text style={styles.consequenceText}>{consequence}</Text>
                        <Pressable style={styles.nextButton} onPress={handleNextDay}>
                            <Text style={styles.nextButtonText}>Continuer</Text>
                        </Pressable>
                    </>
                )}
            </ScrollView>

            {showTransition && (
                currentDay <= 6 ? (
                    <Modal visible={showTransition} animationType="fade">
                        <ImageBackground
                            source={teenageAdventurousData[currentDay + 1]?.image}
                            style={styles.transitionContainer}
                        >
                            <Text style={styles.transitionText}>Jour {currentDay + 1}</Text>
                            <Pressable style={styles.transitionButton} onPress={handleManualContinue}>
                                <Text style={styles.transitionButtonText}>Continuer</Text>
                            </Pressable>
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
    );
};

export default TeenageAdventurous;
