import { ImageSourcePropType } from 'react-native';

type Choice = {
    text: string;
    type: 'aventureux';
    consequence: string;
    isError?: boolean;
  };
  
  type Consequence = {
    text: (name: string) => string;
    skillTitle: string;
    miniGameImpact?: string; // Bonus ou malus pour le mini-jeu
  };
  
  type TeenageDay = {
    title: string;
    text: (name: string) => string;
    image: ImageSourcePropType;
    sound: any;
    choices: Choice[];
    consequences?: Record<string, Consequence>;
  };
  
  const teenageAdventurousData: Record<number, TeenageDay> = {
    1: {
      title: "Un défi inattendu",
      text: (name) =>
        `${name} reçoit une invitation inattendue d'un groupe d'amis à explorer une vieille tour abandonnée située à l'extérieur de la ville. Bien qu’excitant, cet endroit est réputé pour être dangereux. C'est une opportunité d'aventure, mais aussi un moment décisif pour montrer du courage.`,
      image: require('../assets/TeenageTower.webp'),
      sound: require('../assets/sounds/Intro.mp3'),
      choices: [
        {
            text: "Accepter immédiatement l'invitation et se préparer pour l'exploration.",
            type: "aventureux",
            isError: false, // Choix valide
            consequence: "Vous avez hâte de partir à l'aventure et préparez tout ce qui pourrait être utile.",
        },
        {
            text: "Hésiter mais accepter après avoir demandé des détails sur l'endroit.",
            type: "aventureux",
            isError: false, // Choix valide
            consequence: "Vous apprenez quelques détails clés sur la tour, mais la peur vous ralentit un peu.",
        },
        {
            text: "Refuser poliment l'invitation et éviter le danger.",
            type: "aventureux",
            isError: true, // Choix incorrect
            consequence: "En refusant, vous évitez le danger immédiat, mais ratez une chance de grandir.",
        },
    ],
    
      consequences: {
        aventureux_1: {
            text: (name) =>
                `En pénétrant dans la tour avec ses amis, ${name} trébuche sur une trappe dissimulée et tombe sur un vieux coffre rempli d’objets étranges et poussiéreux. Après une fouille maladroite, un chapeau ridicule mais fascinant est découvert. Le groupe éclate de rire alors que ${name} décide de le porter comme un trophée tout au long de la soirée. La soirée se termine par une danse improvisée dans la lumière des lampes torches, un moment drôle et inoubliable.`,
            skillTitle: "Préparation stratégique avancée 🎩",
            miniGameImpact: "Départ avec des indices bonus dans le mini-jeu.",
        },
        aventureux_2: {
            text: (name) =>
                `Alors que ${name} et ses amis avancent dans la tour, une ombre mystérieuse traverse leur chemin. Le groupe, terrifié, se sépare. ${name} entend un cri perçant venant d’en haut, mais en gravissant les escaliers, il/elle ne trouve que le silence et une étrange fresque sur le mur, représentant un visage familier. La peur s'installe. Au matin, un des amis manque à l’appel, et les journaux rapportent la disparition mystérieuse d’un adolescent. ${name} n’oubliera jamais cette nuit.`,
            skillTitle: "Analyse situationnelle intermédiaire 🕵️",
            miniGameImpact: "Départ équilibré, ni bonus ni malus.",
        },
        aventureux_3: {
            text: (name) =>
                `Rentrant chez lui/elle après avoir décliné l'invitation, ${name} s’installe confortablement devant un film. Mais le lendemain matin, une alerte sur son téléphone évoque une tragédie : un incendie s’est déclaré dans la tour abandonnée. Aucun blessé, mais la tour est réduite en cendres. Le groupe d’amis, ayant échappé de peu, raconte une série d’événements étranges qui auraient déclenché l’incendie. ${name} ressent un mélange de soulagement et de culpabilité pour cette aventure manquée.`,
            skillTitle: "Manque de progression ⏳",
            miniGameImpact: "Pas d'accès au mini-jeu, échec automatique.",
        },
    },    
    },
  };
  
  export default teenageAdventurousData;
  