import { ImageSourcePropType } from 'react-native';

type Choice = {
  text: string;
  type: 'aventureux'; // Limité à aventureux pour TeenageAdventurous
};

type Consequence = {
  text: (name: string) => string;
  skillTitle: string; // Titre de la compétence
};

type TeenageDay = {
  title: string;
  text: (name: string) => string;
  image: ImageSourcePropType;
  sound: any;
  choices: Choice[];
  consequences: Record<string, Consequence>;
};

const teenageAdventurousData: Record<number, TeenageDay> = {
  1: {
    title: 'Le sentier dangereux',
    text: (name) =>
      `${name} découvre un chemin escarpé menant à un ancien temple. Mais une série de pièges doit être évitée pour progresser.`,
    image: require('../assets/Childhood1.webp'),
    sound: require('../assets/sounds/kitchen.mp3'),
    choices: [
      { text: 'Prendre un risque et avancer', type: 'aventureux' },
      { text: 'Observer les pièges pour trouver un chemin sûr', type: 'aventureux' },
    ],
    consequences: {
      aventureux: {
        text: (name) =>
          `${name} parvient à esquiver les pièges avec bravoure. Chaque pas renforce sa confiance en ses instincts.`,
        skillTitle: 'Courage tactique avancé 🧗‍♀️',
      },
    },
  },
  // Ajoute 6 autres jours similaires
};

export default teenageAdventurousData;
