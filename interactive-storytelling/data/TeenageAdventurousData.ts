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
          isError: false,
          consequence: "Vous avez hâte de partir à l'aventure et préparez tout ce qui pourrait être utile.",
        },
        {
          text: "Hésiter mais accepter après avoir demandé des détails sur l'endroit.",
          type: "aventureux",
          isError: false,
          consequence: "Vous apprenez quelques détails clés sur la tour, mais la peur vous ralentit un peu.",
        },
        {
          text: "Refuser poliment l'invitation et éviter le danger.",
          type: "aventureux",
          isError: true,
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
    2: {
      title: "La Fête Interdite",
      text: (name) =>
        `${name} apprend que l'un des élèves les plus populaires organise une soirée secrète dans une maison abandonnée à la périphérie de la ville. L'événement promet d'être le moment fort de l'année, mais des rumeurs circulent sur des incidents passés.`,
      image: require('../assets/TeenageParty.webp'),
      sound: require('../assets/sounds/PartyAmbiance.m4a'),
      choices: [
        {
          text: "Se rendre à la fête et tenter de se fondre dans la foule.",
          type: "aventureux",
          isError: false,
          consequence: "Vous choisissez de profiter de la soirée malgré les risques et de voir où cela mène.",
        },
        {
          text: "Rassembler un groupe d'amis et y aller ensemble pour plus de sécurité.",
          type: "aventureux",
          isError: false,
          consequence: "Avec vos amis, vous avez moins peur de l’inconnu et profitez pleinement de l'expérience.",
        },
        {
          text: "Refuser l’invitation et rester chez vous.",
          type: "aventureux",
          isError: true,
          consequence: "Vous décidez de ne pas prendre le risque, mais le sentiment de manquer quelque chose reste présent.",
        },
      ],
      consequences: {
        aventureux_1: {
          text: (name) =>
            `À la fête, ${name} se retrouve dans un moment intense, où la musique et les rires semblent masquer une tension sous-jacente. ${name} finit par être témoin d'une altercation mais choisit de rester à l'écart, gravant dans sa mémoire la complexité de cette nuit.`,
          skillTitle: "Adaptation sociale 🕺",
        },
        aventureux_2: {
          text: (name) =>
            `${name} et ses amis arrivent à la fête, où tout semble parfait jusqu'à ce qu'une alerte annonce l'arrivée de la police. Le groupe s’échappe par une fenêtre, leurs cœurs battant la chamade. Une soirée mémorable.`,
          skillTitle: "Esprit d’équipe 🎉",
        },
        aventureux_3: {
          text: (name) =>
            `Restant à la maison, ${name} voit des stories sur les réseaux sociaux montrant la fête. Mais soudain, les nouvelles changent : une bagarre éclate, et les autorités interviennent. ${name} ressent un mélange de soulagement et de regret.`,
          skillTitle: "Prudence calculée ⏳",
        },
      },
    },
    3: {
      title: "Le Premier Amour",
      text: (name) =>
        `Un(e) camarade de classe que ${name} admire laisse une note dans son casier, lui demandant de se retrouver après les cours. Le cœur battant, ${name} doit choisir de répondre ou d'ignorer cette proposition.`,
      image: require('../assets/TeenageFirstLove.webp'),
      sound: require('../assets/sounds/RomanticAmbiance.m4a'),
      choices: [
        {
          text: "Accepter l’invitation et aller au parc avec enthousiasme.",
          type: "aventureux",
          isError: false,
          consequence: "Vous prenez une grande inspiration et décidez de vous rendre à ce rendez-vous.",
        },
        {
          text: "Accepter mais demander à un(e) ami(e) de rester discrètement à proximité.",
          type: "aventureux",
          isError: false,
          consequence: "Vous décidez d’être prudent tout en répondant à l’invitation.",
        },
        {
          text: "Ignorer la note et continuer votre routine.",
          type: "aventureux",
          isError: true,
          consequence: "Vous laissez passer cette opportunité par peur ou indifférence.",
        },
      ],
      consequences: {
        aventureux_1: {
          text: (name) =>
            `Au parc, ${name} passe un moment magique à parler de ses rêves avec cette personne spéciale. La soirée se termine par un regard complice, laissant ${name} sur un nuage.`,
          skillTitle: "Ouverture émotionnelle ❤️",
        },
        aventureux_2: {
          text: (name) =>
            `Avec un(e) ami(e) proche à proximité, ${name} passe une soirée agréable mais reste sur ses gardes. Une gêne s’installe, et la connexion semble moins forte.`,
          skillTitle: "Prudence dans les relations 👥",
        },
        aventureux_3: {
          text: (name) =>
            `En ignorant la note, ${name} apprend que la personne voulait offrir un cadeau symbolique. Cette occasion manquée laisse un vide et une question sans réponse : "Et si ?"`,
          skillTitle: "Précaution excessive ⏳",
        },
      },
    },
  };
  
  export default teenageAdventurousData;  
  