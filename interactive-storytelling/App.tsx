import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home/Home';
import Game from './screens/Game/Game';
import Childhood from './screens/Story/Childhood/Childhood';

// Définition des routes pour le typage
export type RootStackParamList = {
  Home: undefined;
  Game: undefined;
  Childhood: { name: string; gender: string };
  TeenageAmbitious: { name: string; gender: string };
  TeenagePrudent: { name: string; gender: string };
  TeenageTimid: { name: string; gender: string };
  TeenageAdventurous: { name: string; gender: string };
};


const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
