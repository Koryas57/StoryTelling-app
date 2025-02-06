import { ImageSourcePropType } from 'react-native';

type Choice = {
    text: string;
    type: 'ambitieux';
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
  
  const teenageAmbitiousData: Record<number, TeenageDay> = {
    1: {
        title: "L’Étincelle",
        text: (name) =>
            `Dès les premières semaines de lycée, ${name} comprend une chose essentielle : personne ne viendra lui donner quoi que ce soit. Tout le monde est occupé par ses propres affaires, et ceux qui réussissent sont ceux qui prennent les devants. Assis(e) sur un banc, ${name} observe. Certains ont déjà des contacts, des projets, des idées, pendant que d’autres suivent le mouvement, acceptent sans poser de questions. ${name} sent une énergie bouillonner en lui/elle : il faut agir... Maintenant !`,
        image: require('../assets/TeenageAmbitionAwakening.webp'),
        sound: require('../assets/sounds/InnerReflexion.mp3'),
        choices: [
            {
                text: "Dresser un plan. Où est l’argent ? Qui a du pouvoir ?",
                type: "ambitieux",
                isError: false,
                consequence: "Une stratégie commence à se dessiner. Il faut voir grand, viser loin.",
            },
            {
                text: "Se faire remarquer immédiatement, quoi qu’il en coûte.",
                type: "ambitieux",
                isError: false,
                consequence: "L’attente, c’est pour les faibles. Un coup d’éclat attire déjà l’attention.",
            },
            {
                text: "Rien. Attendre et observer davantage.",
                type: "ambitieux",
                isError: true,
                consequence: "Le temps passe. Rien ne change. Les occasions s’effacent aussi vite qu’elles sont apparues.",
            },
        ],
        consequences: {
            ambitieux_1: {
                text: (name) =>
                    `En quelques heures, ${name} a identifié les bons endroits, les bonnes personnes. Il/elle note mentalement les élèves qui vendent des sneakers en édition limitée, ceux qui piratent des comptes Netflix pour de l’argent de poche, ceux qui ont déjà des plans pour acheter et revendre des produits en ligne. Chaque détail compte. Bientôt, ${name} aura sa propre niche et son propre réseau.`,
                skillTitle: "Vision stratégique 🔭",
            },
            ambitieux_2: {
                text: (name) =>
                    `${name} prend son téléphone et ouvre Snapchat. Une rumeur choc, un défi insensé, une punchline qui met le feu au lycée. Une vidéo postée, partagée des dizaines de fois en une heure. Il/elle voit son nom exploser sur les stories. Quelques élèves viennent déjà le/la voir pour parler, intrigués par cette énergie qui sort de nulle part.`,
                skillTitle: "Impact immédiat ⚡",
            },
            ambitieux_3: {
                text: (name) =>
                    `${name} attend. Et attend encore. Pendant ce temps, d’autres prennent des risques et avancent. Camille, au fond de la classe a lancée un compte TikTok qui commence à exploser. Léo, une connaissance, revend des vêtements vintage avec une marge absurde. Ils ont osé, ils récoltent. ${name} regarde, mais ne joue pas.`,
                skillTitle: "Opportunités manquées ⏳",
            },
        },
    },
    2: {
        title: "Le Choix du Terrain",
        text: (name) =>
            `La journée commence avec une énergie nouvelle. ${name} sait que pour réussir, il faut choisir son terrain de jeu. On ne peut pas tout dominer, mais il faut exceller quelque part. Argent, influence, reconnaissance… chaque chemin a ses règles. En cours, une annonce retient son attention : un concours d’éloquence approche. Plus tard, une discussion parle d’un pari sur un événement sportif. Et en fin de journée, un groupe cherche un participant pour un projet en ligne ambitieux. Trois portes, trois mondes. Il faut choisir.`,
        image: require('../assets/TeenagePathChoice.webp'),
        sound: require('../assets/sounds/OpportunityKnocks.mp3'),
        choices: [
            {
                text: "Concours d’éloquence. Faire trembler la salle.",
                type: "ambitieux",
                isError: false,
                consequence: "Un talent d’orateur est une arme redoutable. Il faut apprendre à convaincre.",
            },
            {
                text: "Gérer un pari sportif. Lire le jeu, prendre l’argent.",
                type: "ambitieux",
                isError: false,
                consequence: "Les probabilités, les chiffres… comprendre avant les autres, c’est gagner avant eux.",
            },
            {
                text: "Se rendre en salle informatique pour voir de quoi parle le projet.",
                type: "ambitieux",
                isError: true,
                consequence: "L’occasion passe, et avec elle, une première chance d’élever son niveau.",
            },
        ],
        consequences: {
            ambitieux_1: {
                text: (name) =>
                    `Dans un couloir désert, ${name} s’entraîne à parler à voix haute. Il/elle trouve les bons mots, les bonnes intonations. En classe, une réponse improvisée attire l’attention du prof. "C'est excellent, quelle répartie !", dit-il les yeux écarquillés. ${name} sent que sa voix peut capter l’attention. C’est une arme à perfectionner.`,
                skillTitle: "Charisme verbal 🎤",
            },
            ambitieux_2: {
                text: (name) =>
                    `Quelques billets en poche, ${name} entre dans le jeu. Il/elle analyse les tendances, les dynamiques d’équipe, les cotes en temps réel. Un pari risqué, mais un pari réfléchi. À la fin de la journée, une victoire. Petit gain, mais énorme apprentissage : la logique et l’audace paient.`,
                skillTitle: "Analyse des probabilités 🎲",
            },
            ambitieux_3: {
                text: (name) =>
                    `Le projet informatique sur les sites de commerce en ligne se passe comme vous l'esperiez. Plus tard, ${name} entend parler du succès de ceux qui ont osé. Il/elle reste là, dans l’ombre, alors que le monde avance lentement sans lui/elle.`,
                skillTitle: "Inertie paralysante 🌀",
            },
        },
    },
    3: {
        title: "Seuls les Fous Avancent",
        text: (name) =>
            `En fin de journée, ${name} reçoit un message. " Si tu veux vraiment croquer, sois là à 22h, Allée Marcel Boulard, le hangar après le Batiment C. " Pas de signature, pas d’explication. Seulement une adresse en périphérie de la ville. Tout dans ce message hurle "opportunité", mais aussi "risque énorme". Le cerveau dit non. L’ambition hurle oui.`,
        image: require('../assets/TeenageNightDecision.webp'),
        sound: require('../assets/sounds/SuspenseBuilds.mp3'),
        choices: [
            {
                text: "Y aller. Un vrai pari sur l’avenir.",
                type: "ambitieux",
                isError: false,
                consequence: "Ceux qui ont peur restent en arrière. Ceux qui avancent changent leur destinée.",
            },
            {
                text: "Tenter de savoir qui a envoyé le message avant d’y aller.",
                type: "ambitieux",
                isError: false,
                consequence: "La prudence n’est pas un frein si elle est bien employée.",
            },
            {
                text: "Ignorer le message en sachant que personne ne se souvient de ceux qui reculent.",
                type: "ambitieux",
                isError: true,
                consequence: "L’opportunité disparaît. Demain, il/elle sera toujours le/la même.",
            },
        ],
        consequences: {
            ambitieux_1: {
                text: (name) =>
                    `L’endroit est sombre, discret. Quelques personnes sont déjà là, toutes plus ambitieuses et déterminées que jamais. Une discussion commence, une connexion se crée. Ce soir, ${name} vient de pénétrer un cercle restreint.`,
                skillTitle: "Prise de risques éclairée 🔥",
            },
            ambitieux_2: {
                text: (name) =>
                    `Quelques recherches sur Insta et Snapchat révèlent l’expéditeur : un ancien élève, désormais à la tête d’un petit business underground. Une rencontre est arrangée. Une autre porte s’ouvre.`,
                skillTitle: "Investigation stratégique 🔎",
            },
            ambitieux_3: {
                text: (name) =>
                    `${name} efface le message. Fin de l’histoire. Pendant ce temps, un autre prend sa place.`,
                skillTitle: "Refus du risque ❄️",
            },
        },
    },
    4: {
        title: "Le Croisement des Destins",
        text: (name) =>
            `Les ambitions de ${name} ne passent plus inaperçues. En quelques semaines, il/elle s'est forgé(e) une réputation : certains admirent son audace, d'autres le/la jalousent en silence. Mais une chose est sûre, il/elle n'est plus un élève ordinaire. Ce matin, trois propositions inattendues surgissent, chacune capable de changer une vie. Un professeur glisse discrètement un dossier sur la table de ${name} : une bourse exceptionnelle pour étudier à l’étranger, un programme réservé aux esprits les plus brillants. Singapour, New York, Genève… des villes où tout se joue. À la pause, un entrepreneur local, impressionné par l’énergie et la vision de ${name}, lui propose un financement pour lancer une startup. « Oublie les cours, viens bâtir quelque chose de grand. Tu as le feu en toi. » En fin de journée, un type bien connu au Hangar l’aborde à la sortie. « T’as de l’instinct et des tripes. Si tu veux faire de l’argent réel, du vrai, sans règles, viens me voir demain. » Trois chemins. Trois avenirs. Pas de retour en arrière.`,
        image: require('../assets/TeenagePathDecision.webp'),
        sound: require('../assets/sounds/SeriousChoice.mp3'),
        choices: [
            {
                text: "Accepter la bourse et viser l’excellence académique.",
                type: "ambitieux",
                isError: false,
                consequence: "Un avenir structuré, des portes ouvertes dans les sphères d’élite. Mais cela demandera des sacrifices.",
            },
            {
                text: "Fonder la startup et plonger dans l’inconnu.",
                type: "ambitieux",
                isError: false,
                consequence: "Construire un empire à partir de rien. Un pari insensé, mais les vrais gagnants osent.",
            },
            {
                text: "Accepter l’offre clandestine, et s’enrichir vite, sans état d’âme.",
                type: "ambitieux",
                isError: true,
                consequence: "Le gain est rapide, l’adrénaline est forte, mais la chute peut être brutale.",
            },
        ],
        consequences: {
            ambitieux_1: {
                text: (name) =>
                    `Quelques jours plus tard, ${name} reçoit un mail officiel : "Félicitations, vous êtes sélectionné(e) pour intégrer un programme de formation internationale." Dans ses mains, un billet d’avion, une chance rare. Il/elle sait que ce sera exigeant, que ce chemin demandera plus qu’un simple talent. Il faudra se dépasser, être meilleur(e) que tous les autres. Mais c’est ainsi que l’élite se construit.`,
                skillTitle: "Excellence académique 🎓",
            },
            ambitieux_2: {
                text: (name) =>
                    `Dès le lendemain, ${name} enchaîne les rendez-vous avec des investisseurs, façonne une vision, recrute une équipe. Il/elle dort peu, vit sous tension, mais chaque jour marque une avancée. Les premières semaines sont une ascension fulgurante. Son projet est sur toutes les lèvres, ses idées inspirent, et il/elle se sent invincible. Pour la première fois, il/elle crée quelque chose de grand.`,
                skillTitle: "Esprit entrepreneurial 🚀",
            },
            ambitieux_3: {
                text: (name) =>
                    `L’argent coule à flots. ${name} apprend vite les règles du jeu, ou plutôt l’absence de règles. Magouilles, transactions sous le radar, cercles fermés où les opportunités sont aussi vastes que dangereuses. Il/elle est malin(e), sait comment éviter les problèmes. Mais chaque billet gagné s’accompagne d’une ombre. Il n’y a pas de filet de sécurité ici.`,
                skillTitle: "Sens du risque 💰",
            },
        },
    },
    5: {
        title: "L’Envol",
        text: (name) =>
            `Le sac bouclé, les clés dans la poche, ${name} se tient devant la porte d’entrée. C’est la dernière fois qu’il/elle franchira ce seuil en tant qu’adolescent(e). Aujourd’hui marque le début d’autre chose. Sa petite sœur le/la regarde depuis l’escalier, les yeux grands ouverts, incapable de comprendre ce qui est en train de se jouer. L’ambition de ${name} l’a mené(e) ici, à cette séparation inévitable. Ce qui l’attend dehors n’a plus rien à voir avec les murs de cette maison. Il/elle inspire profondément. Il est temps.`,
        image: require('../assets/TeenageDeparture.webp'),
        sound: require('../assets/sounds/DecisionMoment.mp3'),
        choices: [
            {
                text: "Se retourner une dernière fois avant de partir, un adieu symbolique.",
                type: "ambitieux",
                isError: false,
                consequence: "Il/elle ancre cet instant dans sa mémoire, puis franchit la porte avec une détermination intacte.",
            },
            {
                text: "Quitter les lieux sans se retourner, le regard fixé sur l’avenir.",
                type: "ambitieux",
                isError: false,
                consequence: "Il/elle avance d’un pas ferme, laissant le passé derrière lui/elle sans un regard en arrière.",
            },
            {
                text: "S’arrêter sur le seuil, la main tremblante sur la poignée.",
                type: "ambitieux",
                isError: true,
                consequence: "L’hésitation est un poison. Chaque seconde de doute est une opportunité de moins.",
            },
        ],
        consequences: {
            ambitieux_1: {
                text: (name) =>
                    `Un bref regard en arrière. Une photo de famille sur la commode, le chat roulé en boule sur le canapé, la petite sœur qui serre son doudou un peu plus fort. ${name} serre les dents et inspire profondément. Un dernier souvenir, puis il/elle tourne les talons et s’éloigne. Ce départ n’est pas une fuite, c’est une ascension.`,
                skillTitle: "Ancrage émotionnel 🏡",
            },
            ambitieux_2: {
                text: (name) =>
                    `${name} ne laisse aucune place au doute. Il/elle attrape son sac et quitte la maison sans ralentir. Chaque pas le/la propulse plus loin de ce qu’il/elle était. Il n’y aura pas de retour en arrière. Seul compte ce qui l’attend.`,
                skillTitle: "Détermination inébranlable 🚀",
            },
            ambitieux_3: {
                text: (name) =>
                    `Les doigts de ${name} restent figés sur la poignée. L’espace d’un instant, tout ce qu’il/elle quitte pèse plus lourd que tout ce qu’il/elle espère. Il/elle hésite un long moment, et cette hésitation lui coûte. Le monde continue d'avancer, mais pas ${name}. Pas encore.`,
                skillTitle: "Lenteur stratégique ⏳",
            },
        },
    },
    6: {
        title: "Le Premier Mur",
        text: (name) =>
            `Les débuts avaient un goût d’adrénaline pure. ${name} avançait vite, trop vite peut-être. Tout semblait à portée de main : l’argent, la reconnaissance, le contrôle. Mais aujourd’hui, un imprévu brutal vient tout remettre en question. Un investissement mal calculé, une opportunité qui se retourne contre lui/elle, un contact clé qui disparaît sans prévenir. La roue tourne, et cette fois, elle tourne contre lui/elle. ${name} sent une tension monter. L’échec n’a jamais fait partie du plan, mais il est là, inévitable. Ce moment-là, il/elle s’en souviendra toute sa vie.`,
        image: require('../assets/TeenageFirstFailure.webp'),
        sound: require('../assets/sounds/FallFromGrace.mp3'),
        choices: [
            {
                text: "Rebondir immédiatement et transformer cet échec en tremplin.",
                type: "ambitieux",
                isError: false,
                consequence: "L’échec n’est qu’un détour, pas une fin. Il/elle en tire une leçon et repart plus fort(e).",
            },
            {
                text: "Chercher un responsable. Quelqu’un doit payer.",
                type: "ambitieux",
                isError: false,
                consequence: "L’erreur n’est pas toujours la sienne. Il/elle trouve un coupable, mais à quel prix ?",
            },
            {
                text: "Douter et remettre en question toute cette ambition.",
                type: "ambitieux",
                isError: true,
                consequence: "Le doute s’installe. L’ambition vacille. Une faiblesse impardonnable dans ce monde.",
            },
        ],
        consequences: {
            ambitieux_1: {
                text: (name) =>
                    `Là où d’autres s’écroulent, ${name} voit une opportunité d’apprendre. Il/elle note chaque erreur, comprend où il/elle s’est trompé(e) et adapte immédiatement son approche. Rien n’arrêtera sa progression. L’échec n’est pas une défaite, c’est un levier.`,
                skillTitle: "Résilience absolue 💪",
            },
            ambitieux_2: {
                text: (name) =>
                    `L’échec ne vient jamais de nulle part, et ${name} refuse d’en porter seul(e) la responsabilité. Il/elle creuse, cherche, confronte. À force de détermination, un maillon faible est trouvé, un traître identifié. L’équilibre se rétablit, mais à quel prix ?`,
                skillTitle: "Détection des failles 🔎",
            },
            ambitieux_3: {
                text: (name) =>
                    `Le doute est un poison, et ${name} le laisse s’infiltrer. Une nuit sans sommeil, l’esprit encombré par une question insupportable : "Et si je n’étais pas fait(e) pour ça ?". Cette pensée ronge tout ce qui a été construit. Une faiblesse qu’il/elle devra payer.`,
                skillTitle: "Fragilité intérieure ⏳",
            },
        },
    },
    7: {
        title: "L’Instant de Vérité",
        text: (name) =>
            `L’aube se lève sur un monde qui ne sait rien de ce qui vient de se jouer. ${name}, lui/elle, sait. Il/elle regarde son reflet, les traits tendus, les yeux marqués par l’intensité des derniers mois. Plus rien n’est comme avant. L’adolescence touche à sa fin, et l’ambition a pris toute la place. Il/elle repense aux décisions, aux sacrifices, aux risques. Les erreurs ont coûté cher, les victoires encore plus. Il/elle a brûlé les étapes, forcé le destin, écrasé les doutes. Désormais, une seule chose compte : avancer encore. Le regard de ${name} se pose sur son téléphone. Un message, un appel manqué, une opportunité. Une dernière barrière avant la suite. Il/elle a déjà choisi. Il ne reste plus qu’à le prouver.`,
        image: require('../assets/TeenageTurningPoint.webp'),
        sound: require('../assets/sounds/FinalDecisionAmbitious.mp3'),
        choices: [
            {
                text: "Saisir cette dernière opportunité, quoi qu’il en coûte.",
                type: "ambitieux",
                isError: false,
                consequence: "Il/elle s’engouffre dans la brèche. Plus d’hésitation. C’est là que tout commence.",
            },
            {
                text: "Rétablir le contact avec ce qu’il/elle a laissé derrière.",
                type: "ambitieux",
                isError: false,
                consequence: "Il/elle n’a plus rien à prouver, mais certains liens méritent d’être renoués.",
            },
            {
                text: "Regarder tout ce qui a été accompli, regretter et reculer au dernier moment.",
                type: "ambitieux",
                isError: true,
                consequence: "Le doute surgit là où il ne devrait pas. Une seconde de trop, et tout s’effondre.",
            },
        ],
        consequences: {
            ambitieux_1: {
                text: (name) =>
                    `Sans un mot, ${name} attrape son téléphone et compose un numéro. Quelques phrases suffisent. Le rendez-vous est fixé, le futur s’écrit maintenant. Une voiture démarre quelque part en ville. Une porte s’ouvre. Un chemin sans retour.`,
                skillTitle: "Engagement total 🔥",
            },
            ambitieux_2: {
                text: (name) =>
                    `Les ambitions n’effacent pas tout. ${name} le sait. Un message envoyé, une voix familière au bout du fil. Camille n’a pas changée, mais il/elle sait désormais ce qu’elle vaut. Et cette fois, c’est en pleine conscience qu’il/elle avance.`,
                skillTitle: "Contrôle des racines 🌍",
            },
            ambitieux_3: {
                text: (name) =>
                    `L’impulsion est là, mais quelque chose casse. Une hésitation, un vertige. ${name} regarde l’écran du téléphone, les chiffres défilent. Trop tard. L’opportunité disparaît sous ses yeux. Une seule certitude demeure : ceux qui hésitent ne vont nulle part.`,
                skillTitle: "Indécision fatale ⏳",
            },
        },
    },    

  };
  
  export default teenageAmbitiousData;  
  