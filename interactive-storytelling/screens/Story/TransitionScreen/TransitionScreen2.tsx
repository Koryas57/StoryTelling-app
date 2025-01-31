import React, { useEffect, useRef, useState } from "react";
import { View, Text, ImageBackground, ScrollView, Pressable } from "react-native";
import * as NavigationBar from "expo-navigation-bar";
import styles from "./TransitionScreen2.styles";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";

import useSound from "../../../hooks/useSound";
import sounds from "../../../utils/sounds";
import CareerModal from "./CareerModal";
import GameButton2 from "../../../Components/GameButton2";

type TransitionScreen2Props = NativeStackScreenProps<
    RootStackParamList,
    "TransitionScreen2"
>;

const careerTranslations: Record<string, string> = {
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

const TransitionScreen2: React.FC<TransitionScreen2Props> = ({ route, navigation }) => {
    const { name, gender, skills } = route.params;

    const introMusic = useSound(sounds.Intro);
    const levelSound = useSound(sounds.levelSound);
    const choiceSound = useSound(sounds.choiceSound2);

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
    const scrollViewRef = useRef<ScrollView>(null);


    useEffect(() => {
        const playMusic = async () => {
            await levelSound(), introMusic();
        };

        playMusic();

        return () => {
            levelSound.stop();
            introMusic.stop();
        };
    }, [levelSound, introMusic]);

    const handleContinue = () => {
        if (!selectedCareer) {
            console.log("Aucun métier sélectionné.");
            return;
        }

        // Navigation explicite pour chaque métier
        switch (selectedCareer) {
            case "StrategicPlannerStory":
                navigation.replace("StrategicPlannerStory", { name, gender });
                break;
            case "PoliceInvestigatorStory":
                navigation.replace("PoliceInvestigatorStory", { name, gender });
                break;
            case "AdministrativeAssistantStory":
                navigation.replace("AdministrativeAssistantStory", { name, gender });
                break;
            case "EventManagerStory":
                navigation.replace("EventManagerStory", { name, gender });
                break;
            case "SportsManagerStory":
                navigation.replace("SportsManagerStory", { name, gender });
                break;
            case "RiskAnalystStory":
                navigation.replace("RiskAnalystStory", { name, gender });
                break;
            case "TherapistStory":
                navigation.replace("TherapistStory", { name, gender });
                break;
            case "RelationshipConsultantStory":
                navigation.replace("RelationshipConsultantStory", { name, gender });
                break;
            case "ArchivistStory":
                navigation.replace("ArchivistStory", { name, gender });
                break;
            case "InnovativeProjectManagerStory":
                navigation.replace("InnovativeProjectManagerStory", { name, gender });
                break;
            case "HumanitarianCoordinatorStory":
                navigation.replace("HumanitarianCoordinatorStory", { name, gender });
                break;
            case "GeneralSecretaryStory":
                navigation.replace("GeneralSecretaryStory", { name, gender });
                break;
            case "AmbassadorStory":
                navigation.replace("AmbassadorStory", { name, gender });
                break;
            case "RightsDefenderStory":
                navigation.replace("RightsDefenderStory", { name, gender });
                break;
            case "NeutralObserverStory":
                navigation.replace("NeutralObserverStory", { name, gender });
                break;
            case "InnovativeEntrepreneurStory":
                navigation.replace("InnovativeEntrepreneurStory", { name, gender });
                break;
            case "EfficiencyConsultantStory":
                navigation.replace("EfficiencyConsultantStory", { name, gender });
                break;
            case "CommunityMentorStory":
                navigation.replace("CommunityMentorStory", { name, gender });
                break;
            case "UniversityProfessorStory":
                navigation.replace("UniversityProfessorStory", { name, gender });
                break;
            case "CreativeDirectorStory":
                navigation.replace("CreativeDirectorStory", { name, gender });
                break;
            case "FamilyMediatorStory":
                navigation.replace("FamilyMediatorStory", { name, gender });
                break;
            default:
                console.error("Métier non mappé :", selectedCareer);
                break;
        }
    };

    useEffect(() => {
        const configureNavBar = async () => {
            await NavigationBar.setBackgroundColorAsync("rgb(0, 0, 0)");
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
        <ScrollView ref={scrollViewRef} contentContainerStyle={styles.container}
        >
            <ImageBackground
                source={require("../../../assets/TeenageTransitionBackground.webp")}
                style={styles.background}
            >
                <View style={styles.transitionContainer}>
                    <Text style={styles.title}>Félicitations {name}, vous avez terminé le chapitre</Text>
                    <Text style={styles.title2}>Adolescence</Text>
                    <Text style={styles.subtitle}>Résumé des compétences acquises : </Text>
                    <View style={styles.skillsContainer}>
                        {skills.map((skill, index) => (
                            <Text key={index} style={styles.skillText}>
                                {skill}
                            </Text>
                        ))}
                    </View>

                    {selectedCareer && (
                        <>
                            <Text style={styles.careerText}>
                                Vous avez choisi : {selectedCareer ? careerTranslations[selectedCareer] || selectedCareer : "Aucun métier sélectionné"}

                            </Text>
                            <GameButton2
                                text={`Continuer vers une vie de ${selectedCareer ? careerTranslations[selectedCareer] || selectedCareer : "Sélectionner un métier"}`}
                                textStyle={styles.continueButtonText}
                                buttonStyle={styles.continueStoryButton}
                                onPress={handleContinue}
                                disabled={!selectedCareer}
                            />
                            <Text style={styles.separatorText}>Ou bien</Text>
                        </>
                    )}
                    <GameButton2
                        text={selectedCareer ? `Changer de métier` : "Choisir un métier"}
                        buttonStyle={styles.continueButton}
                        onPress={() => setModalVisible(true)}
                        onTouchStart={choiceSound}
                    />
                </View>
            </ImageBackground>
            <CareerModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onCareerSelect={(career) => setSelectedCareer(career)}
                statusBarTranslucent={true}
                skills={skills}
            />
        </ScrollView>
    );
};

export default TransitionScreen2;
