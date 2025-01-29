import React, { useState } from "react";
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

type CareerModalProps = {
    visible: boolean;
    onClose: () => void;
    onCareerSelect: (career: string) => void;
    skills: string[];
};

const CareerModal: React.FC<CareerModalProps> = ({
    visible,
    onClose,
    onCareerSelect,
    skills,
}) => {
    const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
    const [animatedOpacity] = useState(new Animated.Value(1));

    // Génération des métiers basés sur les compétences
    const careers = skills
        .map((skill) => ({
            skill,
            career: careerToScreenMap[skill] || null, // Associe chaque compétence à un métier
        }))
        .filter((item) => item.career !== null);

    const handlePress = (career: string, skill: string) => {
        setSelectedCareer(career);

        // Animation de la transition
        Animated.sequence([
            Animated.timing(animatedOpacity, {
                toValue: 0,
                duration: 200,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(animatedOpacity, {
                toValue: 1,
                duration: 200,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handleConfirm = () => {
        if (selectedCareer) {
            onCareerSelect(selectedCareer);
            onClose();
        }
    };

    return (
        <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
            <ImageBackground
                source={require("../../../assets/TeenageTransitionBackground.webp")}
                style={styles.background}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Choisissez votre métier</Text>

                    {/* Liste des métiers */}
                    <FlatList
                        data={careers}
                        keyExtractor={(item) => item.career as string}
                        renderItem={({ item }) => (
                            <Pressable
                                style={[
                                    styles.careerButton,
                                    selectedCareer === item.career && styles.selectedCareerButton,
                                ]}
                                onPress={() => handlePress(item.career as string, item.skill)}
                            >
                                {/* Texte animé */}
                                <Animated.Text
                                    style={[
                                        styles.skillText,
                                        { opacity: animatedOpacity },
                                    ]}
                                >
                                    {selectedCareer === item.career
                                        ? item.career
                                        : item.skill}
                                </Animated.Text>
                            </Pressable>
                        )}
                        ListEmptyComponent={
                            <Text style={styles.careerText}>
                                Aucun métier disponible pour vos compétences.
                            </Text>
                        }
                    />

                    {/* Bouton pour confirmer */}
                    <Pressable
                        style={[
                            styles.confirmButton,
                            !selectedCareer && styles.disabledButton,
                        ]}
                        onPress={handleConfirm}
                        disabled={!selectedCareer}
                    >
                        <Text style={styles.confirmButtonText}>Confirmer</Text>
                    </Pressable>

                    {/* Bouton pour annuler */}
                    <Pressable style={styles.cancelButton} onPress={onClose}>
                        <Text style={styles.cancelButtonText}>Retour</Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </Modal>
    );
};

export default CareerModal;
