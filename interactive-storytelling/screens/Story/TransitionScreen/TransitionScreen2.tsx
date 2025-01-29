import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, ScrollView, Pressable } from "react-native";
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

const TransitionScreen2: React.FC<TransitionScreen2Props> = ({ route, navigation }) => {
    const { name, gender, skills } = route.params;

    const introMusic = useSound(sounds.Intro);
    const levelSound = useSound(sounds.levelSound);
    const choiceSound = useSound(sounds.choiceSound2);

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedCareer, setSelectedCareer] = useState<string | null>(null);

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

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <ImageBackground
                source={require("../../../assets/TeenageTransitionBackground.webp")}
                style={styles.background}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Félicitations {name} !</Text>
                    <Text style={styles.subtitle}>Résumé des compétences acquises</Text>
                    <View style={styles.skillsContainer}>
                        {skills.map((skill, index) => (
                            <Text key={index} style={styles.skillText}>
                                {skill}
                            </Text>
                        ))}
                    </View>

                    {selectedCareer && (
                        <Text style={styles.careerText}>
                            Métier choisi : {selectedCareer}
                        </Text>
                    )}

                    <Pressable
                        style={styles.continueButton}
                        onPress={() => setModalVisible(true)}
                        onTouchStart={choiceSound}
                    >
                        <Text style={styles.continueButtonText}>Choisir un métier</Text>
                    </Pressable>
                    <GameButton2
                        text={selectedCareer ? `Continuer vers ${selectedCareer}` : "Sélectionner un métier"}
                        textStyle={styles.continueButtonText}
                        buttonStyle={styles.continueButton}
                        onPress={handleContinue}
                        disabled={!selectedCareer}
                    />
                </View>
            </ImageBackground>

            <CareerModal
                visible={isModalVisible}
                onClose={() => setModalVisible(false)}
                onCareerSelect={(career) => setSelectedCareer(career)}
                skills={skills}
            />
        </ScrollView>
    );
};

export default TransitionScreen2;
