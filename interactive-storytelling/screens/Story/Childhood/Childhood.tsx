import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Image, ImageSourcePropType, Alert } from 'react-native';
import styles from './Childhood.styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import Childhood1 from '../../../assets/Childhood1.webp'
import Childhood2 from '../../../assets/Childhood2.webp'
import Childhood3 from '../../../assets/Childhood3.webp'
import Childhood4 from '../../../assets/Childhood4.webp'
import Childhood5 from '../../../assets/Childhood5.webp'
import Childhood6 from '../../../assets/Childhood6.webp'
import Childhood7 from '../../../assets/Childhood7.webp'

type ChildhoodProps = NativeStackScreenProps<RootStackParamList, 'Childhood'>;

type Choice = {
    text: string;
    type: 'ambitieux' | 'prudent' | 'timide' | 'aventureux';
};

type StoryDay = {
    title: string;
    text: (name: string, gender: string) => string;
    image: ImageSourcePropType;
    choices: Choice[];
    consequences?: Record<string, string>;
};

const storyData: Record<
    number,
    Omit<StoryDay, 'text'> & { title: string; text: (name: string, gender: string) => string }
> = {
    1: {
        title: 'Une première découverte',
        text: (name, gender) =>
            `Dans la lumière douce du matin, ${name} ouvre les yeux. Les rayons du soleil traversent les rideaux colorés de la chambre, créant des formes amusantes sur le mur. Un doux bruit de vaisselle vient de la cuisine, et ${gender === 'masculin' ? 'il' : 'elle'
            } sent l’odeur des tartines grillées. Ce matin, tout semble plus grand, plus intéressant. Peut-être est-ce une journée spéciale.`,
        image: Childhood1,
        choices: [
            { text: 'Sauter du lit et aller explorer dehors', type: 'aventureux' },
            { text: 'Appeler maman ou papa pour demander quoi faire', type: 'prudent' },
            { text: 'Rester dans la chambre et observer les ombres', type: 'timide' },
            { text: 'Courir à la cuisine pour aider', type: 'ambitieux' },
        ],
        consequences: {
            aventureux: 'Vous explorez le jardin et découvrez un monde de mystères.',
            prudent: 'Vous appelez vos parents et ils vous aident à bien commencer la journée.',
            timide: 'Vous restez observateur, fasciné par les formes des ombres.',
            ambitieux: 'Vous aidez à la cuisine et recevez des félicitations.',
        },
    },
    2: {
        title: 'Une curiosité étrange',
        text: (name, gender) =>
            `Dans le jardin, une fleur différente attire l’attention de ${name}. Elle brille presque sous le soleil. Mais à côté, un vieil arrosoir semble avoir été abandonné, rempli d’eau verte. Chaque détail du jardin semble cacher un secret. ${name} hésite, mais ${gender === 'masculin' ? 'son' : 'sa'
            } envie d’en savoir plus grandit.`,
        image: Childhood2,
        choices: [
            { text: 'Tenter de toucher la fleur brillante', type: 'aventureux' },
            { text: 'Aller chercher un adulte pour tout lui montrer', type: 'prudent' },
            { text: 'Observer la fleur à distance', type: 'timide' },
            { text: 'Chercher une autre fleur encore plus spéciale', type: 'ambitieux' },
        ],
    },
    3: {
        title: 'Un nouvel ami inattendu',
        text: (name, gender) =>
            `Au parc, ${name} aperçoit un enfant assis seul sur un banc, tenant un cerf-volant cassé. ${gender === 'masculin' ? 'Il' : 'Elle'
            } regarde tristement le ciel. Quelque chose pousse ${name} à s’approcher, mais une pointe d’hésitation reste. Une opportunité pour une nouvelle amitié ou peut-être plus ?`,
        image: Childhood3,
        choices: [
            { text: 'Propose de réparer le cerf-volant', type: 'ambitieux' },
            { text: 'Observe en silence à distance', type: 'timide' },
            { text: 'Invite l’enfant à jouer ensemble', type: 'aventureux' },
            { text: 'Cherche un adulte pour l’aider', type: 'prudent' },
        ],
    },
    4: {
        title: 'Une première dispute',
        text: (name, gender) =>
            `À table, les adultes parlent fort. ${name} entend des mots compliqués et se sent un peu perdu(e). Ce n’est pas habituel. L’assiette de ${name} reste intacte, car ${gender === 'masculin' ? 'il' : 'elle'
            } n’est pas sûr(e) de ce qu’${gender === 'masculin' ? 'il' : 'elle'} doit faire. Une étrange tension remplit la pièce, mais il y a peut-être un moyen d’aider.`,
        image: Childhood4,
        choices: [
            { text: 'Proposer de raconter une histoire pour changer l’ambiance', type: 'ambitieux' },
            { text: 'Rester silencieux et regarder son assiette', type: 'timide' },
            { text: 'Demander aux adultes pourquoi ils se disputent.', type: 'aventureux' },
            { text: 'Aller dans une autre pièce jusqu’à ce que ça s’arrête', type: 'prudent' },
        ],
    },
    5: {
        title: 'L’orage de la nuit',
        text: (name, gender) =>
            `Un orage violent éclate, secouant la maison avec fracas. ${name} se réveille en sursaut, le cœur battant à toute vitesse. Les éclairs illuminent la pièce, et un bruit étrange vient de la porte du jardin. ${gender === 'masculin' ? 'Un mélange de peur et de courage surgit en lui.' : 'Un mélange de peur et de courage surgit en elle.'
            }`,
        image: Childhood5,
        choices: [
            { text: 'Explore le jardin malgré l’orage', type: 'aventureux' },
            { text: 'Reste caché(e) sous tes couvertures', type: 'timide' },
            { text: 'Prends une lampe pour enquêter', type: 'ambitieux' },
            { text: 'Réveille un adulte pour vérifier', type: 'prudent' },
        ],
    },
    6: {
        title: 'La rentrée des découvertes',
        text: (name, gender) =>
            `C’est le grand jour : la rentrée scolaire. ${name} tient son sac avec nervosité en observant les enfants qui rient et jouent déjà dans la cour. Quel sera sa première action dans ce nouvel univers ?`,
        image: Childhood6,
        choices: [
            { text: 'Va saluer un groupe d’enfants', type: 'aventureux' },
            { text: 'Observe les autres de loin', type: 'timide' },
            { text: 'Propose ton aide au professeur', type: 'ambitieux' },
            { text: 'Trouve une place discrète', type: 'prudent' },
        ],
    },
    7: {
        title: 'Une première victoire',
        text: (name, gender) =>
            `C’est le jour du tournoi de ballon. ${name} est au centre de l’attention, avec une opportunité de briller. ${gender === 'masculin' ? 'Il' : 'Elle'
            } ressent la pression et l’excitation du moment. Le choix de l’action marquera les esprits.`,
        image: Childhood7,
        choices: [
            { text: 'Tente un coup risqué', type: 'aventureux' },
            { text: 'Passe la balle à un coéquipier', type: 'timide' },
            { text: 'Propose une stratégie pour gagner', type: 'ambitieux' },
            { text: 'Joue prudemment pour minimiser les risques', type: 'prudent' },
        ],
    },
};

const Childhood: React.FC<ChildhoodProps> = ({ route, navigation }) => {
    const { name, gender } = route.params;

    const [currentDay, setCurrentDay] = useState<number>(1);
    const [currentText, setCurrentText] = useState<string>('');
    const [choices, setChoices] = useState<Choice[]>([]);
    const [consequence, setConsequence] = useState<string>('');
    const [showConsequence, setShowConsequence] = useState<boolean>(false);
    const [characterTraits, setCharacterTraits] = useState<{
        ambitieux: number;
        prudent: number;
        timide: number;
        aventureux: number;
    }>({
        ambitieux: 0,
        prudent: 0,
        timide: 0,
        aventureux: 0,
    });

    useEffect(() => {
        if (currentDay <= 7) {
            const dayData = storyData[currentDay];
            setCurrentText(dayData.text(name, gender));
            setChoices(dayData.choices);
        } else {
            handlePhaseEnd();
        }
    }, [currentDay]);

    const handleChoiceSelection = (type: keyof typeof characterTraits) => {
        setCharacterTraits((prev) => ({
            ...prev,
            [type]: prev[type] + 1,
        }));
        const selectedConsequence = storyData[currentDay]?.consequences?.[type] || '';
        setConsequence(selectedConsequence);
        setShowConsequence(true);
    };

    const handleNextDay = () => {
        setShowConsequence(false);
        setConsequence('');
        setCurrentDay((prev) => prev + 1);
    };

    const handlePhaseEnd = () => {
        const dominantTrait = Object.entries(characterTraits).sort((a, b) => b[1] - a[1])[0][0];
        let nextScreen: keyof RootStackParamList | undefined;

        switch (dominantTrait) {
            case 'ambitieux':
                nextScreen = 'TeenageAmbitious';
                break;
            case 'prudent':
                nextScreen = 'TeenagePrudent';
                break;
            case 'timide':
                nextScreen = 'TeenageTimid';
                break;
            case 'aventureux':
                nextScreen = 'TeenageAdventurous';
                break;
            default:
                Alert.alert('Erreur', 'Impossible de déterminer le trait dominant.');
                return;
        }

        navigation.replace(nextScreen, { name, gender });
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.hud}>
                    <Text style={styles.hudText}>Jour {currentDay} / 7</Text>
                    <Text style={styles.hudText}>Enfance de {name}</Text>
                </View>
                {storyData[currentDay]?.image && (
                    <Image source={storyData[currentDay].image} style={styles.adventureImage} />
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
                        <Text style={styles.consequenceTitle}>Conséquence :</Text>
                        <Text style={styles.consequenceText}>{consequence}</Text>
                        <Pressable style={styles.nextButton} onPress={handleNextDay}>
                            <Text style={styles.nextButtonText}>Continuer</Text>
                        </Pressable>
                    </>
                )}
            </ScrollView>
        </View>
    );
};

export default Childhood;
