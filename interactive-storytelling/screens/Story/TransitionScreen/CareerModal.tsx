import React, { useState } from "react";
import { View, Text, Modal, Pressable, FlatList, ImageBackground, Alert } from "react-native";
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

    // Génération des métiers basés sur les compétences
    const careers = skills
        .map((skill) => ({
            skill,
            career: careerToScreenMap[skill] || null, // Associe chaque compétence à un métier
        }))
        .filter((item) => item.career !== null);

    console.log("Compétences transmises :", skills);
    console.log("Métiers disponibles :", careers);

    const handleConfirm = () => {
        if (selectedCareer) {
            onCareerSelect(selectedCareer);
            onClose();
        } else {
            Alert.alert("Erreur", "Veuillez sélectionner un métier.");
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
                                onPress={() => setSelectedCareer(item.career as string)}
                            >
                                <Text style={styles.careerText}>{item.skill}</Text>
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
