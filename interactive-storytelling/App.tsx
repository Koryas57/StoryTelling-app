import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font/build/FontHooks';
import { ActivityIndicator, View, Text } from 'react-native';
import * as NavigationBar from "expo-navigation-bar";
import styles from './screens/Home/Home.styles';

import Home from './screens/Home/Home';
import Game from './screens/Game/Game';

import Childhood from './screens/Story/Childhood/Childhood';
import TransitionScreen from './screens/Story/TransitionScreen/TransitionScreen';

import TeenageAdventurous from './screens/Story/Teenage/TeenageAdventurous';
import TeenagePrudent from './screens/Story/Teenage/TeenagePrudent';
import TransitionScreen2 from './screens/Story/TransitionScreen/TransitionScreen2';

import FamilyMediatorStory from './screens/Story/Adulthood/FamilyMediatorStory';
import CreativeDirectorStory from './screens/Story/Adulthood/CreativeDirectorStory';
import StrategicPlannerStory from './screens/Story/Adulthood/StrategicPlannerStory';
import PoliceInvestigatorStory from './screens/Story/Adulthood/PoliceInvestigatorStory';
import AdministrativeAssistantStory from './screens/Story/Adulthood/AdministrativeAssistantStory';
import EventManagerStory from './screens/Story/Adulthood/EventManagerStory';
import SportsManagerStory from './screens/Story/Adulthood/SportsManagerStory';
import RiskAnalystStory from './screens/Story/Adulthood/RiskAnalystStory';
import TherapistStory from './screens/Story/Adulthood/TherapistStory';
import RelationshipConsultantStory from './screens/Story/Adulthood/RelationshipConsultantStory';
import ArchivistStory from './screens/Story/Adulthood/ArchivistStory';
import InnovativeProjectManagerStory from './screens/Story/Adulthood/InnovativeProjectManagerStory';
import HumanitarianCoordinatorStory from './screens/Story/Adulthood/HumanitarianCoordinatorStory';
import GeneralSecretaryStory from './screens/Story/Adulthood/GeneralSecretaryStory';
import AmbassadorStory from './screens/Story/Adulthood/AmbassadorStory';
import RightsDefenderStory from './screens/Story/Adulthood/RightsDefenderStory';
import NeutralObserverStory from './screens/Story/Adulthood/NeutralObserverStory';
import InnovativeEntrepreneurStory from './screens/Story/Adulthood/InnovativeEntrepreneurStory';
import EfficiencyConsultantStory from './screens/Story/Adulthood/EfficiencyConsultantStory';
import CommunityMentorStory from './screens/Story/Adulthood/CommunityMentorStory';
import UniversityProfessorStory from './screens/Story/Adulthood/UniversityProfessorStory';
import LifeCoachStory from './screens/Story/Adulthood/LifeCoachStory';
import CrisisMediatorStory from './screens/Story/Adulthood/CrisisMediatorStory';
import SocialWorkerStory from './screens/Story/Adulthood/SocialWorkerStory';
import FamilyTherapistStory from './screens/Story/Adulthood/FamilyTherapistStory';
import HRConsultantStory from './screens/Story/Adulthood/HRConsultantStory';
import ProjectManagerStory from './screens/Story/Adulthood/ProjectManagerStory';
import EducatorStory from './screens/Story/Adulthood/EducatorStory';
import NegotiatorStory from './screens/Story/Adulthood/NegotiatorStory';
import DisorganizedFreelancerStory from './screens/Story/Adulthood/DisorganizedFreelancerStory';
import EconomicAnalystStory from './screens/Story/Adulthood/EconomicAnalystStory';
import EventCoordinatorStory from './screens/Story/Adulthood/EventCoordinatorStory';
import DataEntryClerkStory from './screens/Story/Adulthood/DataEntryClerkStory';
import SecurityOfficerStory from './screens/Story/Adulthood/SecurityOfficerStory';
import PublicRelationsAnalystStory from './screens/Story/Adulthood/PublicRelationsAnalystStory';
import TelemarketerStory from './screens/Story/Adulthood/TelemarketerStory';
import JudgeStory from './screens/Story/Adulthood/JudgeStory';
import DiplomatStory from './screens/Story/Adulthood/DiplomatStory';
import PhilosopherStory from './screens/Story/Adulthood/PhilosopherStory';
import MilitaryPsychologistStory from './screens/Story/Adulthood/MilitaryPsychologistStory';
import DramaticActorStory from './screens/Story/Adulthood/DramaticActorStory';
import WandererStory from './screens/Story/Adulthood/WandererStory';


// Définition des routes pour le typage
export type RootStackParamList = {
  Home: undefined;
  Game: undefined;
  Childhood: {
    name: string;
    gender: string;
    title?: string;
    currentDay?: number;
    userChoices?: Record<number, string>;
  };
  TeenageAdventurous: {
    name: string;
    gender: string;
    title?: string;
    currentDay?: number;
    userChoices?: Record<number, string>;
  };
  TeenagePrudent: {
    name: string;
    gender: string;
    title?: string;
    currentDay?: number;
    userChoices?: Record<number, string>;
  };
  TransitionScreen: {
    name: string;
    gender: string;
    title?: string;
    dominantTrait: string;
    skills: string[];
  };
  TransitionScreen2: {
    name: string;
    gender: string;
    title?: string;
    dominantTrait: string;
    skills: string[];
  };
  TeenageAmbitious: { name: string; gender: string };
  TeenageTimid: { name: string; gender: string };
  StrategicPlannerStory: { name: string; gender: string; title?: string };
  PoliceInvestigatorStory: { name: string; gender: string; title?: string };
  AdministrativeAssistantStory: { name: string; gender: string; title?: string };
  EventManagerStory: { name: string; gender: string; title?: string };
  SportsManagerStory: { name: string; gender: string; title?: string };
  RiskAnalystStory: { name: string; gender: string; title?: string };
  TherapistStory: { name: string; gender: string; title?: string };
  RelationshipConsultantStory: { name: string; gender: string; title?: string };
  ArchivistStory: { name: string; gender: string; title?: string };
  InnovativeProjectManagerStory: { name: string; gender: string; title?: string };
  HumanitarianCoordinatorStory: { name: string; gender: string; title?: string };
  GeneralSecretaryStory: { name: string; gender: string; title?: string };
  AmbassadorStory: { name: string; gender: string; title?: string };
  RightsDefenderStory: { name: string; gender: string; title?: string };
  NeutralObserverStory: { name: string; gender: string; title?: string };
  InnovativeEntrepreneurStory: { name: string; gender: string; title?: string };
  EfficiencyConsultantStory: { name: string; gender: string; title?: string };
  CommunityMentorStory: { name: string; gender: string; title?: string };
  UniversityProfessorStory: { name: string; gender: string; };
  CreativeDirectorStory: { name: string; gender: string; title?: string };
  FamilyMediatorStory: { name: string; gender: string; title?: string };
  //Prudent
  LifeCoachStory: { name: string; gender: string; title?: string };
  NegotiatorStory: { name: string; gender: string; title?: string };
  CrisisMediatorStory: { name: string; gender: string; title?: string };
  SocialWorkerStory: { name: string; gender: string; title?: string };
  FamilyTherapistStory: { name: string; gender: string; title?: string };
  HRConsultantStory: { name: string; gender: string; title?: string };
  ProjectManagerStory: { name: string; gender: string; title?: string };
  EducatorStory: { name: string; gender: string; title?: string };
  DisorganizedFreelancerStory: { name: string; gender: string; title?: string };
  EconomicAnalystStory: { name: string; gender: string; title?: string };
  EventCoordinatorStory: { name: string; gender: string; title?: string };
  DataEntryClerkStory: { name: string; gender: string; title?: string };
  SecurityOfficerStory: { name: string; gender: string; title?: string };
  PublicRelationsAnalystStory: { name: string; gender: string; title?: string };
  TelemarketerStory: { name: string; gender: string; title?: string };
  JudgeStory: { name: string; gender: string; title?: string };
  DiplomatStory: { name: string; gender: string; title?: string };
  PhilosopherStory: { name: string; gender: string; title?: string };
  MilitaryPsychologistStory: { name: string; gender: string; title?: string };
  DramaticActorStory: { name: string; gender: string; title?: string };
  WandererStory: { name: string; gender: string; title?: string };

};



const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {

  const [fontsLoaded] = useFonts({
    'Merriweather-Regular': require('./assets/fonts/Merriweather-Regular.ttf'),
    'Merriweather-Light': require('./assets/fonts/Merriweather-Light.ttf'),
    'Merriweather-LightItalic': require('./assets/fonts/Merriweather-LightItalic.ttf'),
    'Merriweather-Bold': require('./assets/fonts/Merriweather-Bold.ttf'),
    'Merriweather-BoldItalic': require('./assets/fonts/Merriweather-BoldItalic.ttf'),
    'LOKICOLA': require('./assets/fonts/LOKICOLA.ttf'),
    'Babyk': require('./assets/fonts/Babyk.ttf'),
  });

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

  // Affiche un écran de chargement tant que les polices ne sont pas prêtes
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Chargement des polices...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Game"
          component={Game}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Childhood"
          component={Childhood}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TeenageAdventurous"
          component={TeenageAdventurous}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TeenagePrudent"
          component={TeenagePrudent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TransitionScreen"
          component={TransitionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TransitionScreen2"
          component={TransitionScreen2}
          options={{ headerShown: false }}
        />
        {/* Jobs Section */}
        <Stack.Screen
          name="FamilyMediatorStory"
          component={FamilyMediatorStory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreativeDirectorStory"
          component={CreativeDirectorStory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="StrategicPlannerStory"
          component={StrategicPlannerStory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PoliceInvestigatorStory"
          component={PoliceInvestigatorStory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AdministrativeAssistantStory"
          component={AdministrativeAssistantStory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EventManagerStory"
          component={EventManagerStory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SportsManagerStory"
          component={SportsManagerStory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RiskAnalystStory"
          component={RiskAnalystStory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TherapistStory"
          component={TherapistStory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RelationshipConsultantStory"
          component={RelationshipConsultantStory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ArchivistStory"
          component={ArchivistStory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InnovativeProjectManagerStory"
          component={InnovativeProjectManagerStory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HumanitarianCoordinatorStory"
          component={HumanitarianCoordinatorStory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GeneralSecretaryStory"
          component={GeneralSecretaryStory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AmbassadorStory"
          component={AmbassadorStory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RightsDefenderStory"
          component={RightsDefenderStory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NeutralObserverStory"
          component={NeutralObserverStory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InnovativeEntrepreneurStory"
          component={InnovativeEntrepreneurStory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EfficiencyConsultantStory"
          component={EfficiencyConsultantStory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CommunityMentorStory"
          component={CommunityMentorStory}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UniversityProfessorStory"
          component={UniversityProfessorStory}
          options={{ headerShown: false }}
        />
        {/* Prudent */}
        <Stack.Screen name="LifeCoachStory" component={LifeCoachStory} options={{ headerShown: false }} />
        <Stack.Screen name="NegotiatorStory" component={NegotiatorStory} options={{ headerShown: false }} />
        <Stack.Screen name="CrisisMediatorStory" component={CrisisMediatorStory} options={{ headerShown: false }} />
        <Stack.Screen name="SocialWorkerStory" component={SocialWorkerStory} options={{ headerShown: false }} />
        <Stack.Screen name="FamilyTherapistStory" component={FamilyTherapistStory} options={{ headerShown: false }} />
        <Stack.Screen name="HRConsultantStory" component={HRConsultantStory} options={{ headerShown: false }} />
        <Stack.Screen name="ProjectManagerStory" component={ProjectManagerStory} options={{ headerShown: false }} />
        <Stack.Screen name="EducatorStory" component={EducatorStory} options={{ headerShown: false }} />
        <Stack.Screen name="DisorganizedFreelancerStory" component={DisorganizedFreelancerStory} options={{ headerShown: false }} />
        <Stack.Screen name="EconomicAnalystStory" component={EconomicAnalystStory} options={{ headerShown: false }} />
        <Stack.Screen name="EventCoordinatorStory" component={EventCoordinatorStory} options={{ headerShown: false }} />
        <Stack.Screen name="DataEntryClerkStory" component={DataEntryClerkStory} options={{ headerShown: false }} />
        <Stack.Screen name="SecurityOfficerStory" component={SecurityOfficerStory} options={{ headerShown: false }} />
        <Stack.Screen name="PublicRelationsAnalystStory" component={PublicRelationsAnalystStory} options={{ headerShown: false }} />
        <Stack.Screen name="TelemarketerStory" component={TelemarketerStory} options={{ headerShown: false }} />
        <Stack.Screen name="JudgeStory" component={JudgeStory} options={{ headerShown: false }} />
        <Stack.Screen name="DiplomatStory" component={DiplomatStory} options={{ headerShown: false }} />
        <Stack.Screen name="PhilosopherStory" component={PhilosopherStory} options={{ headerShown: false }} />
        <Stack.Screen name="MilitaryPsychologistStory" component={MilitaryPsychologistStory} options={{ headerShown: false }} />
        <Stack.Screen name="DramaticActorStory" component={DramaticActorStory} options={{ headerShown: false }} />
        <Stack.Screen name="WandererStory" component={WandererStory} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );

};

export default App;
