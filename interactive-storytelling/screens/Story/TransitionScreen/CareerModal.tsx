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
};

const careerTranslations: Record<keyof RootStackParamList, string> = {
    StrategicPlannerStory: "Planificateur stratégique",
    PoliceInvestigatorStory: "Enquêteur de police",
    AdministrativeAssistantStory: "Assistant administratif",
    EventManagerStory: "Organisateur d'événements",
    SportsManagerStory: "Manager sportif",
    RiskAnalystStory: "Analyste des risques",
    TherapistStory: "Thérapeute",
    RelationshipConsultantStory: "Consultant en relations",
    ArchivistStory: "Archiviste",
    InnovativeProjectManagerStory: "Chef de projet innovant",
    HumanitarianCoordinatorStory: "Coordinateur humanitaire",
    GeneralSecretaryStory: "Secrétaire général",
    AmbassadorStory: "Ambassadeur",
    RightsDefenderStory: "Défenseur des droits",
    NeutralObserverStory: "Observateur neutre",
    InnovativeEntrepreneurStory: "Entrepreneur innovant",
    EfficiencyConsultantStory: "Consultant en efficacité",
    CommunityMentorStory: "Mentor communautaire",
    UniversityProfessorStory: "Professeur universitaire",
    CreativeDirectorStory: "Directeur créatif",
    FamilyMediatorStory: "Médiateur familial",
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
