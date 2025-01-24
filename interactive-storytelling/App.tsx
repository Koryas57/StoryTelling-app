import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './screens/Home/Home.styles';
import Home from './screens/Home/Home';
import Game from './screens/Game/Game';
import Childhood from './screens/Story/Childhood/Childhood';
import TransitionScreen from './screens/Story/TransitionScreen/TransitionScreen';
import { useFonts } from 'expo-font/build/FontHooks';
import { ActivityIndicator, View, Text } from 'react-native';

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
  TransitionScreen: {
    name: string;
    gender: string;
    title?: string;
    dominantTrait: string;
    skills: string[];
  };
  TeenageAmbitious: { name: string; gender: string };
  TeenagePrudent: { name: string; gender: string };
  TeenageTimid: { name: string; gender: string };
  TeenageAdventurous: { name: string; gender: string };
};


const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {

  const [fontsLoaded] = useFonts({
    'Merriweather-Regular': require('./assets/fonts/Merriweather-Regular.ttf'),
    'Merriweather-Light': require('./assets/fonts/Merriweather-Light.ttf'),
    'Merriweather-LightItalic': require('./assets/fonts/Merriweather-LightItalic.ttf'),
    'Merriweather-Bold': require('./assets/fonts/Merriweather-Bold.ttf'),
    'Merriweather-BoldItalic': require('./assets/fonts/Merriweather-BoldItalic.ttf'),
  });

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
          name="TransitionScreen"
          component={TransitionScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
