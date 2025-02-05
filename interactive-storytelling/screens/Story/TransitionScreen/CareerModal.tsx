import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    Modal,
    Pressable,
    FlatList,
    ImageBackground,
    Animated,
    Easing,
} from "react-native";
import styles from "./TransitionScreen2.styles";
import { RootStackParamList } from "../../../App";
import * as NavigationBar from "expo-navigation-bar";
import useSound from "../../../hooks/useSound";
import sounds from "../../../utils/sounds";


// Map des compétences vers les métiers
export const careerToScreenMap: Record<string, keyof RootStackParamList> = {
    // From Adventurous Teenage
    "Préparation stratégique avancée 🎩": "StrategicPlannerStory",
    "Analyse situationnelle intermédiaire 🕵️": "PoliceInvestigatorStory",
    "Manque de progression ⏳": "AdministrativeAssistantStory",
    "Adaptation sociale 🕺": "EventManagerStory",
    "Esprit d’équipe 🎉": "SportsManagerStory",
    "Prudence calculée ⏳": "RiskAnalystStory",
    "Ouverture émotionnelle ❤️": "TherapistStory",
    "Prudence dans les relations 👥": "RelationshipConsultantStory",
    "Précaution excessive ⏳": "ArchivistStory",
    "Leadership naturel 🌟": "InnovativeProjectManagerStory",
    "Esprit d’équipe 🤝": "HumanitarianCoordinatorStory",
    "Opportunité manquée ⏳": "GeneralSecretaryStory",
    "Esprit diplomatique 🤝": "AmbassadorStory",
    "Loyauté affirmée 💪": "RightsDefenderStory",
    "Échec d’engagement ⏳": "NeutralObserverStory",
    "Ambition cultivée 🌟": "InnovativeEntrepreneurStory",
    "Gestion du temps ⏰": "EfficiencyConsultantStory",
    "Compagnon fidèle 🤝": "CommunityMentorStory",
    "Persévérance académique 📘": "UniversityProfessorStory",
    "Expression artistique 🎨": "CreativeDirectorStory",
    "Relations authentiques ❤️": "FamilyMediatorStory",
    // From Prudent Teenage
    "Maîtrise émotionnelle 🧘": "LifeCoachStory",
    "Communication assertive 🗣️": "NegotiatorStory",
    "Gestion de crise ratée ⏳": "CrisisMediatorStory",
    "Empathie mesurée 🤲": "SocialWorkerStory",
    "Soutien émotionnel 💬": "FamilyTherapistStory",
    "Relation fragilisée ⏳": "HRConsultantStory",
    "Planification efficace 📅": "ProjectManagerStory",
    "Apprentissage collaboratif 🧑‍🏫": "EducatorStory",
    "Mauvaise gestion du temps ⏳": "DisorganizedFreelancerStory",
    "Analyse stratégique 📊": "EconomicAnalystStory",
    "Collaboration efficace 🤝": "EventCoordinatorStory",
    "Manque d'anticipation ⏳": "DataEntryClerkStory",
    "Maîtrise des choix personnels 🛑": "SecurityOfficerStory",
    "Prudence sociale 🔍": "PublicRelationsAnalystStory",
    "Manque de discernement ⏳": "TelemarketerStory",
    "Éthique et discrétion ⚖️": "JudgeStory",
    "Communication diplomatique 💬": "DiplomatStory",
    "Conscience pesante ⏳": "PhilosopherStory",
    "Force émotionnelle 🛡️": "MilitaryPsychologistStory",
    "Authenticité émotionnelle 💙": "DramaticActorStory",
    "Regret indélébile ⏳": "WandererStory",
    // Timid
    "Esprit analytique pointu 🔬": "ForensicScientistStory",
    "Sensibilité artistique ✍️": "PoetStory",
    "Création littéraire immersive 📖": "NovelistStory",
    "Stratégie et logique avancées ♟️": "ChessMasterStory",
    "Observation comportementale fine 🧐": "BehavioralScientistStory",
    "Maîtrise des données et prévisions 📊": "StatisticianStory",
    "Patience et minutie ⏱️": "WatchmakerStory",
    "Expression musicale profonde 🎼": "ComposerStory",
    "Gestion prudente des finances 💰": "RiskManagerStory",
    "Recherche méthodique et rigoureuse 🧪": "LaboratoryResearcherStory",
    "Accompagnement psychologique discret 🛋️": "PsychotherapistStory",
    "Protection numérique et confidentialité 🖥️": "CybersecurityAnalystStory",
    "Médiation et diplomatie efficace 🤝": "ConflictResolutionSpecialistStory",
    "Discrétion et investigation 🕵️": "PrivateInvestigatorStory",
    "Narration immersive et conception ludique 🎮": "GameNarrativeDesignerStory",
    "Exploitation des failles numériques 💻": "BlackHatHackerStory",
    "Falsification de documents d'identité 📝": "DocumentForgerStory",
    "Transport clandestin et discret 🚢": "SmugglerStory",
    "Exploitation des probabilités et des jeux 🎰": "CardCounterStory",
    "Synthèse de produits illicites ⚗️": "UndergroundChemistStory",
    "Messagerie secrète et transactions obscures 📦": "NightCourierStory",


};

const careerTranslations: Record<keyof RootStackParamList, string> = {
    // From Adventurous
    StrategicPlannerStory: "Conducteur de go-fast 🚘",
    PoliceInvestigatorStory: "Policier 👮‍♂️",
    AdministrativeAssistantStory: "Falsificateur de papiers 📜",
    EventManagerStory: "Organisateur de combats illégaux 🥊",
    SportsManagerStory: "Garde du corps 🏋️‍♂️",
    RiskAnalystStory: "Éducateur spécialisé en quartier difficile 👨‍🏫",
    TherapistStory: "Médecin urgentiste 🚑",
    RelationshipConsultantStory: "Passeur de clandestins 🛳️",
    ArchivistStory: "Cambrioleur 🏠",
    InnovativeProjectManagerStory: "Trafiquant de voitures 🚗",
    HumanitarianCoordinatorStory: "Sapeur-pompier 🚒",
    GeneralSecretaryStory: "Éboueur de voirie 🗑️",
    AmbassadorStory: "Traficant de drogue 💊",
    RightsDefenderStory: "Vendeur de contrefaçons 👕",
    NeutralObserverStory: "Pêcheur en mer 🎣",
    InnovativeEntrepreneurStory: "Dépanneur de nuit 🛠️",
    EfficiencyConsultantStory: "Conducteur de taxi clandestin 🚖",
    CommunityMentorStory: "Chauffeur routier 🚛",
    UniversityProfessorStory: "Professeur d'université 🗿",
    CreativeDirectorStory: "Livreur à moto 🏍️",
    FamilyMediatorStory: "Parent dévoué 👶",
    // From Prudent
    LifeCoachStory: "Coach de vie 🧘‍♂️",
    NegotiatorStory: "Négociateur professionnel 🤝",
    CrisisMediatorStory: "Médiateur de crise 🔥",
    SocialWorkerStory: "Travailleur social 🏡",
    FamilyTherapistStory: "Thérapeute familial 🏠",
    HRConsultantStory: "Consultant RH 👔",
    ProjectManagerStory: "Chef de projet 📊",
    EducatorStory: "Enseignant 👨‍🏫",
    DisorganizedFreelancerStory: "Freelance désorganisé 📆",
    EconomicAnalystStory: "Analyste économique 💰",
    EventCoordinatorStory: "Coordinateur d'événements 🎉",
    DataEntryClerkStory: "Agent de saisie 📑",
    SecurityOfficerStory: "Officier de sécurité 🚨",
    PublicRelationsAnalystStory: "Analyste en relations publiques 📢",
    TelemarketerStory: "Téléopérateur 📞",
    JudgeStory: "Juge ⚖️",
    DiplomatStory: "Ambassadeur 🌍",
    PhilosopherStory: "Philosophe 📖",
    MilitaryPsychologistStory: "Psychologue militaire 🪖",
    DramaticActorStory: "Acteur dramatique 🎭",
    WandererStory: "Vagabond 🚶",
    // From Timid
    ForensicScientistStory: "Scientifique médico-légal 🔬",
    PoetStory: "Poète rêveur ✍️",
    NovelistStory: "Écrivain solitaire 📖",
    ChessMasterStory: "Grand maître d'échecs ♟️",
    BehavioralScientistStory: "Chercheur en comportement humain 🧐",
    StatisticianStory: "Statisticien analytique 📊",
    WatchmakerStory: "Horloger minutieux ⏱️",
    ComposerStory: "Compositeur mélancolique 🎼",
    RiskManagerStory: "Gestionnaire de risques financiers 💰",
    LaboratoryResearcherStory: "Chercheur en laboratoire 🧪",
    PsychotherapistStory: "Psychothérapeute discret 🛋️",
    CybersecurityAnalystStory: "Analyste en cybersécurité 🖥️",
    ConflictResolutionSpecialistStory: "Spécialiste en résolution de conflits 🤝",
    PrivateInvestigatorStory: "Détective privé silencieux 🕵️",
    GameNarrativeDesignerStory: "Concepteur narratif de jeux vidéo 🎮",
    BlackHatHackerStory: "Hacker clandestin 💻",
    DocumentForgerStory: "Faussaire de documents 📝",
    SmugglerStory: "Passeur discret 🚢",
    CardCounterStory: "Tricheur de casinos 🎰",
    UndergroundChemistStory: "Chimiste du marché noir ⚗️",
    NightCourierStory: "Coursier pour transactions douteuses 📦",
    // Ambitious
    Home: "",
    Game: "",
    Childhood: "",
    TeenageAdventurous: "",
    TransitionScreen: "",
    TransitionScreen2: "",
    TeenageAmbitious: "",
    TeenagePrudent: "",
    TeenageTimid: ""
};


type CareerModalProps = {
    visible: boolean;
    onClose: () => void;
    onCareerSelect: (career: string) => void;
    skills: string[];
    statusBarTranslucent?: boolean;
};

const CareerModal: React.FC<CareerModalProps> = ({
    visible,
    onClose,
    onCareerSelect,
    skills,
    statusBarTranslucent,
}) => {
    const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
    const [animatedOpacity] = useState(new Animated.Value(1));
    const opacityRefs = useRef<{ [key: string]: Animated.Value }>({}).current;
    const choiceSound = useSound(sounds.choiceSound);
    const levelSound = useSound(sounds.levelSound);


    // Génération des métiers basés sur les compétences
    const careers = skills
        .map((skill) => ({
            skill,
            career: careerToScreenMap[skill] || null, // Associe chaque compétence à un métier
        }))
        .filter((item) => item.career !== null);

    const handlePress = (career: string, skill: string) => {
        if (selectedCareer !== career) {
            if (!opacityRefs[career]) {
                opacityRefs[career] = new Animated.Value(1);
            }

            Animated.timing(opacityRefs[career], {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start(() => {
                setSelectedCareer(career);
                opacityRefs[career].setValue(1);
            });
        }
    };

    const handleConfirm = () => {
        if (selectedCareer) {
            onCareerSelect(selectedCareer);
            onClose();
        }
    };

    useEffect(() => {
        const configureNavBar = async () => {
            await NavigationBar.setBackgroundColorAsync("rgba(0, 0, 0, 0)");
            await NavigationBar.setBehaviorAsync("overlay-swipe"); // Swipe pour afficher temporairement
            await NavigationBar.setVisibilityAsync("hidden"); //

            // Écoute les changements de visibilité pour cacher la barre après 2 sec
            const subscription = NavigationBar.addVisibilityListener(({ visibility }) => {
                if (visibility === "visible") {
                    setTimeout(() => {
                        NavigationBar.setVisibilityAsync("hidden"); // Cache la barre après 2 sec
                    }, 2500);
                }
            });

            return () => subscription.remove(); // Nettoie l'événement à la destruction du composant
        };

        configureNavBar();
    }, []);

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose} statusBarTranslucent={true}>
            <ImageBackground
                source={require("../../../assets/TeenageTransitionBackground.webp")}
                style={styles.background}
            >
                <View style={styles.container}>
                    <Text style={styles.titleModal}>Choisissez votre métier</Text>
                    <Text style={styles.careerText}>
                        Chaque compétence est associée à un métier et à une histoire unique.
                    </Text>
                    {/* Liste des métiers */}
                    <FlatList
                        data={careers}
                        keyExtractor={(item) => item.career as string}
                        renderItem={({ item }) => {
                            if (!opacityRefs[item.career]) {
                                opacityRefs[item.career] = new Animated.Value(1);
                            }

                            const isSelected = selectedCareer === item.career;

                            return (
                                <Pressable
                                    onTouchEnd={choiceSound}
                                    style={[
                                        styles.careerButton,
                                        isSelected && styles.selectedCareerButton,
                                    ]}
                                    onPress={() => handlePress(item.career as string, item.skill)}
                                >
                                    <Animated.Text
                                        style={[
                                            styles.skillText,
                                            { opacity: opacityRefs[item.career] },
                                        ]}
                                    >
                                        {isSelected
                                            ? careerTranslations[item.career as keyof RootStackParamList] || item.career
                                            : item.skill}
                                    </Animated.Text>
                                </Pressable>
                            );
                        }}
                        ListEmptyComponent={
                            <Text style={styles.careerText}>
                                Aucun métier disponible pour vos compétences.
                            </Text>
                        }
                    />
                    <Pressable
                        style={[
                            styles.confirmButton,
                            !selectedCareer && styles.disabledButton,
                        ]}
                        onPress={handleConfirm}
                        disabled={!selectedCareer}
                        onTouchStart={levelSound}
                    >
                        <Text style={styles.confirmButtonText}>Confirmer</Text>
                    </Pressable>

                    {/* Bouton pour annuler */}
                    <Pressable style={styles.cancelButton} onPress={onClose} onTouchStart={choiceSound}>
                        <Text style={styles.cancelButtonText}>Retour</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </Modal>
    );
};

export default CareerModal;
