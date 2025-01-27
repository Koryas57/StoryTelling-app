import { ImageSourcePropType } from 'react-native';

type Choice = {
    text: string;
    type: 'aventureux';
    consequence: string;
    isError?: boolean;
  };
  
  type Consequence = {
    text: (name: string, gender: string) => string;
    skillTitle: string;
    miniGameImpact?: string; // Bonus ou malus pour le mini-jeu
  };
  
  type TeenageDay = {
    title: string;
    text: (name: string, gender: string) => string;
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
      sound: require('../assets/sounds/Tower.m4a'),
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
        },
        aventureux_2: {
          text: (name) =>
            `Alors que ${name} et ses amis avancent dans la tour, une ombre mystérieuse traverse leur chemin. Le groupe, terrifié, se sépare. ${name} entend un cri perçant venant d’en haut, mais en gravissant les escaliers, il/elle ne trouve que le silence et une étrange fresque sur le mur, représentant un visage familier. La peur s'installe. Au matin, un des amis manque à l’appel, et les journaux rapportent la disparition mystérieuse d’un adolescent. ${name} n’oubliera jamais cette nuit.`,
          skillTitle: "Analyse situationnelle intermédiaire 🕵️",
        },
        aventureux_3: {
          text: (name) =>
            `Rentrant chez lui/elle après avoir décliné l'invitation, ${name} s’installe confortablement devant un film. Mais le lendemain matin, une alerte sur son téléphone évoque une tragédie : un incendie s’est déclaré dans la tour abandonnée. Aucun blessé, mais la tour est réduite en cendres. Le groupe d’amis, ayant échappé de peu, raconte une série d’événements étranges qui auraient déclenché l’incendie. ${name} ressent un mélange de soulagement et de culpabilité pour cette aventure manquée.`,
          skillTitle: "Manque de progression ⏳",
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
    4: {
      title: "Le tournoi décisif",
      text: (name) =>
          `${name} est sélectionné(e) pour représenter son équipe lors d’un grand tournoi sportif. La pression est forte, et c’est une chance unique de briller.`,
      image: require('../assets/TeenageTournament.webp'),
      sound: require('../assets/sounds/Tournament.m4a'),
      choices: [
          { text: "Donner tout ce que vous avez pour remporter la victoire.", type: "aventureux", isError: false, consequence: "Vous jouez votre rôle de leader et menez l’équipe vers la victoire." },
          { text: "Encourager vos coéquipiers et jouer en équipe.", type: "aventureux", isError: false, consequence: "Vous jouez un rôle clé dans l’effort collectif." },
          { text: "Rester en retrait pour éviter de faire une erreur critique.", type: "aventureux", isError: true, consequence: "L’équipe perd en manquant une opportunité cruciale." },
      ],
      consequences: {
          aventureux_1: {
              text: (name) => `${name} marque un point décisif, devenant le héros/la héroïne de l’équipe.`,
              skillTitle: "Leadership naturel 🌟",
          },
          aventureux_2: {
              text: (name) => `${name} contribue à une victoire collective grâce à son soutien stratégique.`,
              skillTitle: "Esprit d’équipe 🤝",
          },
          aventureux_3: {
              text: (name) => `${name} reste passif/ve et assiste impuissant(e) à la défaite de l’équipe.`,
              skillTitle: "Opportunité manquée ⏳",
          },
      },
    },
    5: {
      title: "La Confrontation",
      text: (name) =>
        `${name} se retrouve au cœur d’un conflit entre deux groupes d’élèves. L’un de ses amis proches est impliqué, et ${name} doit décider s’il/elle veut s’interposer, rester neutre, ou prendre parti.`,
      image: require('../assets/TeenageConflict.webp'),
      sound: require('../assets/sounds/ConflictAmbiance.m4a'),
      choices: [
        {
          text: "Intervenir et essayer de calmer tout le monde.",
          type: "aventureux",
          isError: false,
          consequence: "Votre courage aide à apaiser les tensions, mais tout le monde ne vous écoute pas.",
        },
        {
          text: "Prendre parti pour votre ami(e), même si cela aggrave le conflit.",
          type: "aventureux",
          isError: false,
          consequence: "Votre ami(e) vous remercie pour votre soutien, mais d’autres élèves vous jugent.",
        },
        {
          text: "Rester à l’écart pour ne pas attirer d’ennuis.",
          type: "aventureux",
          isError: true,
          consequence: "Vous évitez le conflit, mais votre ami(e) se sent abandonné(e).",
        },
      ],
      consequences: {
        aventureux_1: {
          text: (name) =>
            `${name} réussit partiellement à calmer les esprits, mais cette expérience montre à quel point il est difficile d’être un médiateur.`,
          skillTitle: "Esprit diplomatique 🤝",
        },
        aventureux_2: {
          text: (name) =>
            `${name} découvre que prendre parti peut être difficile et coûteux, mais cela renforce les liens avec un ami(e) fidèle.`,
          skillTitle: "Loyauté affirmée 💪",
        },
        aventureux_3: {
          text: (name) =>
            `${name} ressent un mélange de honte et de culpabilité en voyant les conséquences de son inaction.`,
          skillTitle: "Échec d’engagement ⏳",
        },
      },
    },
    6: {
      title: "Le Choix Difficile",
      text: (name) =>
        `Un professeur propose à ${name} une opportunité unique : participer à un projet scolaire ambitieux qui pourrait ouvrir des portes pour l’avenir. Cependant, cela signifie renoncer à une activité très attendue avec ses amis.`,
      image: require('../assets/TeenageChoice.webp'),
      sound: require('../assets/sounds/TeenageChoice.m4a'),
      choices: [
        {
          text: "Accepter l’opportunité et prioriser son avenir.",
          type: "aventureux",
          isError: false,
          consequence: "Vous choisissez l’opportunité, sachant qu’elle peut changer votre vie.",
        },
        {
          text: "Essayer de faire les deux, même si cela risque de vous épuiser.",
          type: "aventureux",
          isError: false,
          consequence: "Vous tentez de jongler entre les deux, mais votre énergie s’amenuise.",
        },
        {
          text: "Refuser l’opportunité pour ne pas décevoir vos amis.",
          type: "aventureux",
          isError: true,
          consequence: "Vous restez fidèle à vos amis, mais le doute persiste sur ce que vous avez raté.",
        },
      ],
      consequences: {
        aventureux_1: {
          text: (name) =>
            `${name} réussit brillamment dans le projet et en retire des compétences précieuses pour l’avenir.`,
          skillTitle: "Ambition cultivée 🌟",
        },
        aventureux_2: {
          text: (name) =>
            `${name} parvient à gérer les deux, mais apprend à quel point il est important de fixer des priorités.`,
          skillTitle: "Gestion du temps ⏰",
        },
        aventureux_3: {
          text: (name) =>
            `${name} profite d’un moment chaleureux avec ses amis, mais se demande si ce choix était le bon pour son avenir.`,
          skillTitle: "Compagnon fidèle 🤝",
        },
      },
    },
    7: {
      title: "La Décision Finale",
      text: (name) =>
        `C’est le dernier jour de cette phase importante de l’adolescence. ${name} doit choisir ce qui compte le plus pour lui/elle : se concentrer sur ses études, ses passions créatives, ou renforcer ses amitiés. Ce choix façonnera les années à venir.`,
      image: require('../assets/TeenageFinalChoice.webp'),
      sound: require('../assets/sounds/FinalDecision.m4a'),
      choices: [
        {
          text: "Se concentrer pleinement sur les études.",
          type: "aventureux",
          isError: false,
          consequence: "Vous décidez de prioriser votre avenir académique, en vous consacrant entièrement à vos études.",
        },
        {
          text: "Suivre vos passions créatives et explorer votre potentiel artistique.",
          type: "aventureux",
          isError: false,
          consequence: "Vous choisissez de nourrir votre créativité, prêt(e) à accepter les défis qui l’accompagnent.",
        },
        {
          text: "Renforcer les liens avec vos amis et construire des souvenirs inoubliables.",
          type: "aventureux",
          isError: false,
          consequence: "Vous décidez de prioriser les relations humaines et de profiter de l’instant présent.",
        },
      ],
      consequences: {
        aventureux_1: {
          text: (name, gender) =>
            `${name} se lance dans un parcours académique rigoureux, prêt(e) à atteindre des objectifs élevés.`,
          skillTitle: "Persévérance académique 📘",
        },
        aventureux_2: {
          text: (name, gender) =>
            `${name} explore des talents artistiques uniques, découvrant une nouvelle facette de lui/elle-même.`,
          skillTitle: "Expression artistique 🎨",
        },
        aventureux_3: {
          text: (name, gender) =>
            `${name} renforce des amitiés solides qui resteront gravées dans sa mémoire.`,
          skillTitle: "Relations authentiques ❤️",
        },
      },
    },  
  };
  
  export default teenageAdventurousData;  
  