import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Pressable, Image, ImageSourcePropType, Alert, Modal, ImageBackground } from 'react-native';
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

type Consequence = {
    text: (name: string, gender: string) => string;
    skillTitle: string; // Titre de la compétence
};


type StoryDay = {
    title: string;
    text: (name: string, gender: string) => string;
    image: ImageSourcePropType;
    choices: Choice[];
    consequences?: Record<string, Consequence>;
};

const storyData: Record<
    number,
    Omit<StoryDay, 'text'> & { title: string; text: (name: string, gender: string) => string }
> = {
    1: {
        title: 'Une première découverte',
        text: (name, gender) =>
            `Dans la douce lumière du matin, ${name} ouvre les yeux. Les rayons du soleil traversent les rideaux colorés de la chambre, créant des formes amusantes sur le mur. Un doux bruit de vaisselle vient de la cuisine, et ${gender === 'masculin' ? 'il' : 'elle'
            } sent l’odeur des tartines grillées. Ce matin, tout semble plus grand, plus intéressant. Peut-être est-ce une journée spéciale.`,
        image: Childhood1,
        choices: [
            { text: 'Sauter du lit et aller explorer dehors', type: 'aventureux' },
            { text: 'Appeler maman ou papa pour demander quoi faire', type: 'prudent' },
            { text: 'Rester dans la chambre et observer les ombres', type: 'timide' },
            { text: 'Courir à la cuisine pour aider', type: 'ambitieux' },
        ],
        consequences: {
            aventureux: {
                text: (name) =>
                    `${name} saute du lit et explore le jardin, découvrant un monde de mystères sous les rayons matinaux. Les couleurs et les odeurs éveillent ses sens et lui donnent envie d’en voir davantage.`,
                skillTitle: ' Exploration basique 👀',
            },
            prudent: {
                text: (name, gender) =>
                    `${name} appelle ses parents, et ils ${gender === 'masculin' ? 'le' : 'la'
                    } guident calmement pour bien commencer sa journée. Leur présence ${gender === 'masculin' ? 'le' : 'la'
                    } rassure, mais leur suggestion de jouer dans le jardin attire son attention.`,
                skillTitle: ' Prise de décision encadrée basique 👫',
            },
            timide: {
                text: (name, gender) =>
                    `${name} reste dans la chambre, observant les ombres qui dansent sur les murs. Son imagination s’emballe, et ${gender === 'masculin' ? 'il' : 'elle'
                    } commence à voir des histoires dans les formes. ${name} remarque un éclat de lumière venant du jardin.`,
                skillTitle: ' Réflexion créative basique 🧠',
            },
            ambitieux: {
                text: (name, gender) =>
                    `${name} court à la cuisine pour aider. Ses efforts sont rapidement récompensés par des compliments, et ${gender === 'masculin' ? 'il' : 'elle'
                    } gagne en confiance. Pendant qu’${gender === 'masculin' ? 'il' : 'elle'
                    } aide, un parent mentionne quelque chose d’intéressant vu dans le jardin.`,
                skillTitle: ' Esprit d’initiative basique 👂',
            },
        }


    },
    2: {
        title: 'Une curiosité étrange',
        text: (name, gender) =>
            `Dans le jardin, une fleur différente attire l’attention de ${name}. Elle brille presque sous le soleil. Mais à côté, un vieil arrosoir semble avoir été abandonné, rempli d’eau verte. Chaque détail du jardin semble cacher un secret. ${name} hésite, mais son envie d’en savoir plus grandit.`,
        image: Childhood2,
        choices: [
            { text: 'Tenter de toucher la fleur brillante', type: 'aventureux' },
            { text: 'Aller chercher un adulte pour tout lui montrer', type: 'prudent' },
            { text: 'Observer la fleur à distance', type: 'timide' },
            { text: 'Chercher une autre fleur encore plus spéciale', type: 'ambitieux' },
        ],
        consequences: {
            aventureux: {
                text: (name) =>
                    `${name} s'approche de la fleur brillante avec une curiosité irrésistible. En effleurant ses pétales scintillantes, une sensation étrange et électrique traverse son être. ${name} ressent un profond respect pour les mystères de la nature, une porte ouverte vers de nouvelles explorations.`,
                skillTitle: ' Perception sensible basique 🌱',
            },
            prudent: {
                text: (name) =>
                    `${name} décide de chercher un adulte pour lui montrer la fleur. L’adulte lui explique l’importance d’observer avec patience et de ne pas prendre de risques inutiles. ${name} apprend à s’appuyer sur les autres pour prendre des décisions réfléchies.`,
                skillTitle: ' Collaboration prudente basique 🛠️',
            },
            timide: {
                text: (name) =>
                    `${name} reste à distance, observant la fleur avec fascination mais aussi prudence. ${name} commence à imaginer toutes sortes de scénarios autour de cet objet étrange et se perd dans ses pensées créatives. Ses observations minutieuses nourrissent son imagination.`,
                skillTitle: ' Observation imaginative basique 🔍',
            },
            ambitieux: {
                text: (name) =>
                    `${name} se détourne rapidement de la fleur brillante et décide de partir à la recherche d’une autre encore plus spéciale. Cette quête d’exception nourrit sa détermination à toujours chercher plus loin et à se dépasser.`,
                skillTitle: ' Recherche persistante basique 🎯',
            },
        }
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
        consequences: {
            aventureux: {
                text: (name) =>
                    `${name} s’approche courageusement de l’enfant et propose alors de réparer le cerf-volant cassé. Ensemble, ils s'assoient et partagent des idées, transformant un moment triste en une belle collaboration. Une nouvelle amitié naît, et ${name} apprend l’importance d’agir pour créer des connexions.`,
                skillTitle: ' Empathie active basique 🤝',
            },
            prudent: {
                text: (name) =>
                    `${name} décide d’aller chercher un adulte pour aider l’enfant. L’adulte intervient avec gentillesse et répare le cerf-volant. ${name} observe attentivement la manière dont un problème peut être résolu grâce à l’appui des autres.`,
                skillTitle: ' Médiation encadrée basique 🛠️',
            },
            timide: {
                text: (name, gender) =>
                    `${name} choisit d’observer de loin. Pendant que l’enfant joue seul, ${name} réfléchit à ce qu’${gender === 'masculin' ? 'Il' : 'Elle'
                    } aurait pu faire. Cette introspection renforce sa capacité à analyser les situations en silence.`,
                skillTitle: ' Réflexion sociale basique 🧠',
            },
            ambitieux: {
                text: (name, gender) =>
                    `${name} invite l’enfant à jouer avec ${gender === 'masculin' ? 'lui' : 'elle'
                    }, ignorant le cerf-volant cassé. Très vite, l’enfant rit et oublie son chagrin, trouvant du réconfort dans la spontanéité qu'offra ${name}. Cette initiative renforce le pouvoir de créer du positif à partir de l’imprévu.`,
                skillTitle: ' Leadership social basique 🌟',
            },
        }
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
        consequences: {
            aventureux: {
                text: (name) =>
                    `${name} demande courageusement aux adultes pourquoi ils se disputent. Bien que cela crée un moment de surprise, sa question sincère les pousse à réfléchir à leurs actions. ${name} réalise que poser des questions peut parfois être un premier pas vers la résolution des conflits.`,
                skillTitle: ' Communication assertive basique 🗣️',
            },
            prudent: {
                text: (name, gender) =>
                    `${name} quitte discrètement la pièce pour éviter d’être ${gender === 'masculin' ? 'pris' : 'prise'} dans la dispute. Pendant ce temps, ${name} réfléchit à ce qui pourrait calmer les tensions et se promet d’essayer d’apporter son aide dans un cadre plus sûr.`,
                skillTitle: ' Gestion de retrait basique 🔍',
            },
            timide: {
                text: (name, gender) =>
                    `${name} reste ${gender === 'masculin' ? 'silencieux' : 'silencieuse'}, observant attentivement les échanges à table. ${name} commence à comprendre comment les mots et les émotions influencent les situations. Cette réflexion silencieuse enrichit sa capacité à lire les tensions.`,
                skillTitle: ' Observation émotionnelle basique 👁️',
            },
            ambitieux: {
                text: (name) =>
                    `${name} propose de raconter une histoire pour changer l’ambiance. Cette initiative créative capte l’attention et désamorce la tension, ramenant un peu de calme à la table. ${name} comprend l’importance de détourner l’attention de manière positive.`,
                skillTitle: ' Désamorçage créatif basique ✨',
            },
        }
    },
    5: {
        title: 'L’orage de la nuit',
        text: (name, gender) =>
            `Un orage violent éclate, secouant la maison avec fracas. ${name} se réveille en sursaut, le cœur battant à toute vitesse. Les éclairs illuminent la pièce, et un bruit étrange vient de la porte du jardin. Un mélange de peur et de courage surgit en ${gender === 'masculin' ? 'lui' : 'elle'}.
            `,
        image: Childhood5,
        choices: [
            { text: 'Explore le jardin malgré l’orage', type: 'aventureux' },
            { text: 'Reste caché(e) sous tes couvertures', type: 'timide' },
            { text: 'Prends une lampe pour enquêter', type: 'ambitieux' },
            { text: 'Réveille un adulte pour vérifier', type: 'prudent' },
        ],
        consequences: {
            aventureux: {
                text: (name) =>
                    `${name} brave l’orage et sort dans le jardin. Les éclairs illuminent chaque recoin, révélant un monde transformé par la pluie. Malgré la peur, ${name} avance avec détermination et découvre une cachette secrète sous un vieil arbre.`,
                skillTitle: ' Courage face à l’inconnu basique ⚡',
            },
            prudent: {
                text: (name) =>
                    `${name} réveille un adulte pour signaler le bruit étrange. Ensemble, ils inspectent le jardin et s'assurent que tout est sécurisé. ${name} comprend l’importance de demander de l’aide dans des situations incertaines.`,
                skillTitle: ' Appel à l’aide stratégique basique 🛡️',
            },
            timide: {
                text: (name, gender) =>
                    `${name} reste ${gender === 'masculin' ? 'caché' : 'cachée'
                    } sous ses couvertures, écoutant attentivement les sons de l’orage. Bien que la peur soit présente, ${name} commence à identifier les bruits et à se rassurer en les comprenant.`,
                skillTitle: ' Analyse des bruits basique 🔊',
            },
            ambitieux: {
                text: (name) =>
                    `${name} attrape une lampe de poche et part inspecter les lieux. Cette initiative lui permet de comprendre l’origine du bruit étrange – un simple jouet oublié dans le jardin. ${name} ressent une fierté nouvelle en ayant pris les devants.`,
                skillTitle: ' Initiative en environnement inconnu basique 🔦',
            },
        }

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
        consequences: {
            aventureux: {
                text: (name) =>
                    `${name} s’avance vers un groupe d’enfants et engage la conversation avec enthousiasme. Rapidement, ${name} se fait de nouveaux amis et apprend à s’intégrer dans un environnement dynamique.`,
                skillTitle: ' Interaction sociale active basique 🤝',
            },
            prudent: {
                text: (name) =>
                    `${name} choisit une place discrète et observe attentivement les autres enfants. Cette observation lui permet de mieux comprendre les dynamiques du groupe avant d’agir.`,
                skillTitle: ' Observation des dynamiques sociales basique 👀',
            },
            timide: {
                text: (name, gender) =>
                    `${name} reste en retrait, profitant de ce moment pour s’acclimater à l’ambiance de la cour. Même si ${gender === 'masculin' ? 'il' : 'elle'} ne se sent pas encore ${gender === 'masculin' ? 'prêt' : 'prête'} à interagir, ${name} imagine comment ${gender === 'masculin' ? 'il' : 'elle'} pourrait s’intégrer plus tard.`,
                skillTitle: ' Réflexion sociale introvertie basique 🧠',
            },
            ambitieux: {
                text: (name) =>
                    `${name} propose son aide au professeur pour préparer la salle. Cette initiative lui vaut une reconnaissance immédiate et un sentiment de contribution importante dès le premier jour.`,
                skillTitle: ' Contribution proactive basique ✋',
            },
        }
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
        consequences: {
            aventureux: {
                text: (name) =>
                    `Lors d’un moment décisif, ${name} tente un coup risqué pour surprendre l’équipe adverse. Même si le coup ne réussit pas toujours, le courage et l’audace de ${name} sont remarqués par tous.`,
                skillTitle: ' Courage compétitif basique 🏆',
            },
            prudent: {
                text: (name) =>
                    `${name} joue prudemment, assurant les passes à ses coéquipiers pour maintenir la cohésion de l’équipe. Cette approche stable est saluée et contribue à la réussite collective.`,
                skillTitle: ' Esprit d’équipe basique 🤝',
            },
            timide: {
                text: (name) =>
                    `${name} reste en arrière, observant attentivement les mouvements des joueurs. Cette attention aux détails permet à ${name} de suggérer discrètement des ajustements utiles à ses coéquipiers.`,
                skillTitle: ' Observation tactique basique 👀',
            },
            ambitieux: {
                text: (name) =>
                    `Avant même que le match commence, ${name} propose une stratégie pour l’équipe. Sa capacité à organiser le jeu et à motiver ses coéquipiers fait une forte impression.`,
                skillTitle: ' Leadership stratégique basique 🧠',
            },
        }
    },
};

const Childhood: React.FC<ChildhoodProps> = ({ route, navigation }) => {
    const { name, gender, title } = route.params;

    const scrollViewRef = useRef<ScrollView>(null);
    const [currentDay, setCurrentDay] = useState<number>(1);
    const [currentText, setCurrentText] = useState<string>('');
    const [choices, setChoices] = useState<Choice[]>([]);
    const [userChoices, setUserChoices] = useState<Record<number, keyof typeof characterTraits>>({});
    const [consequence, setConsequence] = useState<string>('');
    const [showConsequence, setShowConsequence] = useState<boolean>(false);
    const [showTransition, setShowTransition] = useState<boolean>(false); // Nouvel état pour l'écran de transition
    const [skillTitle, setSkillTitle] = useState<string>('');
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

    useEffect(() => {
        if (showConsequence || scrollViewRef.current) {
            scrollViewRef.current?.scrollTo({ y: 0, animated: false }); // Ramène en haut avec animation
        }
    }, [currentDay, showConsequence]); // Trigger sur le jour actuel ou la modal


    const handleChoiceSelection = (type: keyof typeof characterTraits) => {
        setCharacterTraits((prev) => ({
            ...prev,
            [type]: prev[type] + 1,
        }));

        setUserChoices((prev) => ({
            ...prev,
            [currentDay]: type,
        }));

        const selectedConsequence = storyData[currentDay]?.consequences?.[type];
        if (selectedConsequence) {
            setConsequence(selectedConsequence.text(name, gender));
            setSkillTitle(selectedConsequence.skillTitle || 'Aucune compétence définie.');
        }
        setShowConsequence(true);
    };

    const handleNextDay = () => {
        setShowConsequence(false);
        setConsequence('');
        setShowTransition(true); // Affiche l'écran de transition
    };

    const handleManualContinue = () => {
        setShowTransition(false);
        if (currentDay < 7) {
            setCurrentDay((prev) => prev + 1); // N'incrémente que si `currentDay` est inférieur à 7
        } else {
            handlePhaseEnd(); // Appeler directement la fin de phase
        }
    };

    const handlePhaseEnd = () => {
        const dominantTrait = Object.entries(characterTraits).sort((a, b) => b[1] - a[1])[0][0];

        const acquiredSkills = Object.entries(userChoices)
            .map(([day, choice]) => storyData[Number(day)]?.consequences?.[choice]?.skillTitle)
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
            <ScrollView ref={scrollViewRef}
                contentContainerStyle={styles.scrollContainer}>
                <View style={styles.hud}>
                    <Text style={styles.hudText}>Jour {currentDay} / 7</Text>
                    <Text style={styles.hudText}>Enfance de {name}</Text>
                </View>
                <Text style={styles.hudTitle}>{storyData[currentDay]?.title || 'Titre indisponible'}</Text>
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
                        <Text style={styles.consequenceTitle}>💫 {name} gagne une compétence du niveau "Enfance" :</Text>
                        <Text style={styles.consequenceText}>{consequence || 'Aucune conséquence définie pour ce choix.'}</Text>
                        {skillTitle ? (
                            <Text style={styles.skillTitle}>{'✅' + skillTitle}</Text>
                        ) : (
                            <Text style={styles.skillTitle}>Aucune compétence acquise.</Text>
                        )}
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
                            source={storyData[currentDay + 1]?.image}
                            style={styles.transitionContainer}
                        >
                            <Text style={styles.transitionText}>Jour {currentDay + 1}</Text>
                            <Pressable
                                style={styles.transitionButton}
                                onPress={handleManualContinue}
                            >
                                <Text style={styles.transitionButtonText}>Continuer</Text>
                            </Pressable>
                        </ImageBackground>
                    </Modal>
                ) : (
                    (() => {
                        handlePhaseEnd(); // Appelle la fonction pour terminer la phase
                        return null; // Retourne null pour que React ne rende rien
                    })()
                )
            )}
        </View>
    );
};

export default Childhood;