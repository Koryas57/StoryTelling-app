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
      </Stack.Navigator>
    </NavigationContainer>
  );

};

export default App;
