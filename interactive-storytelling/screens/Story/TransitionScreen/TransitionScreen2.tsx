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
    // Adventurous
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
    // Prudent
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
    //Timid
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
    HedgeFundManagerStory: "Gestionnaire de fonds 💰",
    MediaMogulStory: "Magnat des médias 📺",
    CorporateStrategistStory: "Stratège d’entreprise 🏢",
    PoliticalAdvisorStory: "Conseiller politique 🎤",
    CasinoOwnerStory: "Propriétaire de casino 🎲",
    HighFrequencyTraderStory: "Trader haute fréquence 📈",
    WallStreetTraderStory: "Trader à Wall Street 🔥",
    IntelligenceConsultantStory: "Consultant en renseignement 🔎",
    CrisisAdvisorStory: "Conseiller de crise 🕵️",
    NobelScientistStory: "Scientifique primé 🎓",
    TechFounderStory: "Fondateur de startup 🚀",
    OffshoreBankerStory: "Banquier offshore 💰",
    LuxuryDeveloperStory: "Promoteur immobilier 🏡",
    FormulaOneDriverStory: "Pilote de F1 🏎️",
    EliteTaxConsultantStory: "Consultant fiscaliste 🏦",
    SelfMadeBillionaireStory: "Milliardaire autodidacte 💪",
    CorporateSpyStory: "Espion industriel 🕵️",
    HostageNegotiatorStory: "Négociateur d’otages 🎭",
    ArmsDealerStory: "Marchand d’armes 🔥",
    DiplomaticStrategistStory: "Stratège diplomatique 🌍",
    AuctionBrokerStory: "Courtier en enchères 🏛️",
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
            // Adventurous
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
            // Prudent
            case "LifeCoachStory":
                navigation.replace("LifeCoachStory", { name, gender });
                break;
            case "NegotiatorStory":
                navigation.replace("NegotiatorStory", { name, gender });
                break;
            case "CrisisMediatorStory":
                navigation.replace("CrisisMediatorStory", { name, gender });
                break;
            case "SocialWorkerStory":
                navigation.replace("SocialWorkerStory", { name, gender });
                break;
            case "FamilyTherapistStory":
                navigation.replace("FamilyTherapistStory", { name, gender });
                break;
            case "HRConsultantStory":
                navigation.replace("HRConsultantStory", { name, gender });
                break;
            case "ProjectManagerStory":
                navigation.replace("ProjectManagerStory", { name, gender });
                break;
            case "EducatorStory":
                navigation.replace("EducatorStory", { name, gender });
                break;
            case "DisorganizedFreelancerStory":
                navigation.replace("DisorganizedFreelancerStory", { name, gender });
                break;
            case "EconomicAnalystStory":
                navigation.replace("EconomicAnalystStory", { name, gender });
                break;
            case "EventCoordinatorStory":
                navigation.replace("EventCoordinatorStory", { name, gender });
                break;
            case "DataEntryClerkStory":
                navigation.replace("DataEntryClerkStory", { name, gender });
                break;
            case "SecurityOfficerStory":
                navigation.replace("SecurityOfficerStory", { name, gender });
                break;
            case "PublicRelationsAnalystStory":
                navigation.replace("PublicRelationsAnalystStory", { name, gender });
                break;
            case "TelemarketerStory":
                navigation.replace("TelemarketerStory", { name, gender });
                break;
            case "JudgeStory":
                navigation.replace("JudgeStory", { name, gender });
                break;
            case "DiplomatStory":
                navigation.replace("DiplomatStory", { name, gender });
                break;
            case "PhilosopherStory":
                navigation.replace("PhilosopherStory", { name, gender });
                break;
            case "MilitaryPsychologistStory":
                navigation.replace("MilitaryPsychologistStory", { name, gender });
                break;
            case "DramaticActorStory":
                navigation.replace("DramaticActorStory", { name, gender });
                break;
            case "WandererStory":
                navigation.replace("WandererStory", { name, gender });
                break;
            // Timid
            case "ForensicScientistStory":
                navigation.replace("ForensicScientistStory", { name, gender });
                break;
            case "PoetStory":
                navigation.replace("PoetStory", { name, gender });
                break;
            case "NovelistStory":
                navigation.replace("NovelistStory", { name, gender });
                break;
            case "ChessMasterStory":
                navigation.replace("ChessMasterStory", { name, gender });
                break;
            case "BehavioralScientistStory":
                navigation.replace("BehavioralScientistStory", { name, gender });
                break;
            case "StatisticianStory":
                navigation.replace("StatisticianStory", { name, gender });
                break;
            case "WatchmakerStory":
                navigation.replace("WatchmakerStory", { name, gender });
                break;
            case "ComposerStory":
                navigation.replace("ComposerStory", { name, gender });
                break;
            case "RiskManagerStory":
                navigation.replace("RiskManagerStory", { name, gender });
                break;
            case "LaboratoryResearcherStory":
                navigation.replace("LaboratoryResearcherStory", { name, gender });
                break;
            case "PsychotherapistStory":
                navigation.replace("PsychotherapistStory", { name, gender });
                break;
            case "CybersecurityAnalystStory":
                navigation.replace("CybersecurityAnalystStory", { name, gender });
                break;
            case "ConflictResolutionSpecialistStory":
                navigation.replace("ConflictResolutionSpecialistStory", { name, gender });
                break;
            case "PrivateInvestigatorStory":
                navigation.replace("PrivateInvestigatorStory", { name, gender });
                break;
            case "GameNarrativeDesignerStory":
                navigation.replace("GameNarrativeDesignerStory", { name, gender });
                break;
            case "BlackHatHackerStory":
                navigation.replace("BlackHatHackerStory", { name, gender });
                break;
            case "DocumentForgerStory":
                navigation.replace("DocumentForgerStory", { name, gender });
                break;
            case "SmugglerStory":
                navigation.replace("SmugglerStory", { name, gender });
                break;
            case "CardCounterStory":
                navigation.replace("CardCounterStory", { name, gender });
                break;
            case "UndergroundChemistStory":
                navigation.replace("UndergroundChemistStory", { name, gender });
                break;
            case "NightCourierStory":
                navigation.replace("NightCourierStory", { name, gender });
                break;
            // Ambitious
            case "HedgeFundManagerStory":
                navigation.replace("HedgeFundManagerStory", { name, gender });
                break;
            case "MediaMogulStory":
                navigation.replace("MediaMogulStory", { name, gender });
                break;
            case "CorporateStrategistStory":
                navigation.replace("CorporateStrategistStory", { name, gender });
                break;
            case "PoliticalAdvisorStory":
                navigation.replace("PoliticalAdvisorStory", { name, gender });
                break;
            case "CasinoOwnerStory":
                navigation.replace("CasinoOwnerStory", { name, gender });
                break;
            case "HighFrequencyTraderStory":
                navigation.replace("HighFrequencyTraderStory", { name, gender });
                break;
            case "WallStreetTraderStory":
                navigation.replace("WallStreetTraderStory", { name, gender });
                break;
            case "IntelligenceConsultantStory":
                navigation.replace("IntelligenceConsultantStory", { name, gender });
                break;
            case "CrisisAdvisorStory":
                navigation.replace("CrisisAdvisorStory", { name, gender });
                break;
            case "NobelScientistStory":
                navigation.replace("NobelScientistStory", { name, gender });
                break;
            case "TechFounderStory":
                navigation.replace("TechFounderStory", { name, gender });
                break;
            case "OffshoreBankerStory":
                navigation.replace("OffshoreBankerStory", { name, gender });
                break;
            case "LuxuryDeveloperStory":
                navigation.replace("LuxuryDeveloperStory", { name, gender });
                break;
            case "FormulaOneDriverStory":
                navigation.replace("FormulaOneDriverStory", { name, gender });
                break;
            case "EliteTaxConsultantStory":
                navigation.replace("EliteTaxConsultantStory", { name, gender });
                break;
            case "SelfMadeBillionaireStory":
                navigation.replace("SelfMadeBillionaireStory", { name, gender });
                break;
            case "CorporateSpyStory":
                navigation.replace("CorporateSpyStory", { name, gender });
                break;
            case "HostageNegotiatorStory":
                navigation.replace("HostageNegotiatorStory", { name, gender });
                break;
            case "ArmsDealerStory":
                navigation.replace("ArmsDealerStory", { name, gender });
                break;
            case "DiplomaticStrategistStory":
                navigation.replace("DiplomaticStrategistStory", { name, gender });
                break;
            case "AuctionBrokerStory":
                navigation.replace("AuctionBrokerStory", { name, gender });
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
                                text={`Continuer vers ${selectedCareer ? careerTranslations[selectedCareer] || selectedCareer : "Sélectionner un métier"}`}
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
