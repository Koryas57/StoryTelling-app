import { ImageSourcePropType } from 'react-native';

type Choice = {
    text: string;
    type: 'timide';
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

const teenageTimidData: Record<number, TeenageDay> = {
    1: {
        title: "L’ombre de la solitude",
        text: (name) =>
            `Depuis la rentrée, ${name} a pris l’habitude de travailler seul(e). Il/elle apprécie la tranquillité, loin des bavardages incessants des autres élèves. Mais aujourd’hui, un professeur impose un travail de groupe. ${name} voit déjà les groupes se former rapidement, alors que lui/elle reste seul(e) à sa table. C’est alors qu’une voix timide l’interpelle. "Salut… tu veux faire équipe avec moi ?" demande Camille, une élève souvent discrète, mais studieuse.  ${name} doit choisir comment réagir.`,
        image: require('../assets/TeenageIsolation.webp'),
        sound: require('../assets/sounds/Lonely.mp3'),
        choices: [
            {
                text: "Proposer un partage des tâches pour limiter les interactions.",
                type: "timide",
                isError: false,
                consequence: "Vous organisez le travail de manière efficace, réduisant ainsi le besoin d’interactions inutiles.",
            },
            {
                text: "Accepter et tenter d’échanger avec Camille.",
                type: "timide",
                isError: false,
                consequence: "Vous découvrez que Camille partage vos centres d’intérêt, rendant le travail plus agréable.",
            },
            {
                text: "Prétexter une excuse pour travailler seul(e).",
                type: "timide",
                isError: true,
                consequence: "Vous évitez le travail de groupe, mais cela attire l’attention du professeur et vous isole davantage.",
            },
        ],
        consequences: {
            timide_1: {
                text: (name) =>
                    `Avec méthode, ${name} propose une organisation efficace du travail. Camille semble soulagée : "Ça me va, je préfère travailler comme ça aussi." Finalement, l’expérience se passe bien, et ${name} réalise que structurer les tâches permet d’éviter les discussions inutiles.`,
                skillTitle: "Esprit analytique pointu 🔬",
            },
            timide_2: {
                text: (name) =>
                    `Camille engage timidement la conversation pendant qu’ils travaillent. "Tu lis beaucoup, non ?" demande-t-elle en pointant le livre sur le bureau de ${name}. Au fil de la discussion, ${name} se surprend à parler avec aisance d’un roman qu’il/elle adore. Peut-être que la solitude n’est pas une fatalité.`,
                skillTitle: "Sensibilité artistique ✍️",
            },
            timide_3: {
                text: (name) =>
                    `${name} invente une excuse maladroite pour éviter de travailler en groupe. Camille acquiesce en silence, puis va chercher un autre partenaire. À la fin du cours, le professeur note l’isolement de ${name} et l’interroge sur son refus de collaborer. "Travailler seul(e) n’est pas toujours la meilleure solution," dit-il en rendant sa copie.`,
                skillTitle: "Patience et minutie ⏱️",
            },
        },
    },
    2: {
        title: "Un monde en silence",
        text: (name) =>
            `Pendant la pause, ${name} observe les groupes d’élèves discuter et rire dans la cour. Il/elle reste à l’écart, assis(e) sur un banc à l’ombre, plongé(e) dans ses pensées. C’est alors qu’un élève qu’il/elle connaît à peine, Lucas, vient s’asseoir à côté. "Tu lis quoi ?" demande-t-il en regardant le livre que ${name} tient entre ses mains. La question est simple, mais elle marque un tournant. Que faire ?`,
        image: require('../assets/TeenageQuietMoment.webp'),
        sound: require('../assets/sounds/SilentObserving.mp3'),
        choices: [
            {
                text: "Répondre brièvement et s’éclipser ensuite.",
                type: "timide",
                isError: false,
                consequence: "Vous évitez une discussion prolongée tout en restant poli(e).",
            },
            {
                text: "Engager une véritable conversation avec Lucas.",
                type: "timide",
                isError: false,
                consequence: "L’échange est hésitant, mais vous réalisez que Lucas partage des intérêts communs avec vous.",
            },
            {
                text: "Ignorer la question et détourner le regard.",
                type: "timide",
                isError: true,
                consequence: "Lucas se sent rejeté et part sans insister. L’occasion de tisser un lien s’évapore.",
            },
        ],
        consequences: {
            timide_1: {
                text: (name) =>
                    `${name} répond sobrement : "Un roman de science-fiction." Lucas acquiesce avec un sourire : "Sympa. J’aime bien les histoires un peu folles aussi." Puis, voyant que ${name} ne cherche pas à poursuivre la discussion, il s’éloigne. ${name} se sent soulagé(e), mais une partie de lui/elle se demande si ce n’était pas une occasion manquée.`,
                skillTitle: "Maîtrise des données et prévisions 📊",
                },
            timide_2: {
                text: (name) =>
                    `Hésitant(e), ${name} montre la couverture du livre. "C’est un thriller psychologique…" Lucas s’illumine : "Oh, j’adore ce genre ! Tu connais *Le Parfum* ?" La conversation continue plus naturellement que prévu. ${name} réalise que discuter avec quelqu’un peut être plus simple qu’il/elle ne le pensait.`,
                skillTitle: "Observation comportementale fine 🧐",
            },
            timide_3: {
                text: (name) =>
                    `${name} détourne les yeux et fixe un point au loin. Lucas comprend immédiatement le message et se lève sans insister. Plus tard dans la journée, ${name} le surprend en train de parler avec d’autres élèves… Une opportunité sociale qui aurait pu être saisie.`,
                skillTitle: "Messagerie secrète et transactions obscures 📦",
            },
        },
    },
    3: {
        title: "L’épreuve de l’oral",
        text: (name) =>
            `Un exposé oral est prévu cette semaine et ${name} redoute cet exercice. Parler devant toute la classe est une source de stress immense. Tandis que certains élèves semblent excités à l'idée de s'exprimer, ${name} sent une boule au ventre grandir chaque jour qui approche. Que faire ?`,
        image: require('../assets/TeenageOralExam.webp'),
        sound: require('../assets/sounds/StageFright.mp3'),
        choices: [
            {
                text: "Se préparer minutieusement et répéter seul(e) devant un miroir.",
                type: "timide",
                isError: false,
                consequence: "Grâce à un entraînement rigoureux, vous parvenez à maîtriser votre stress et à assurer un oral correct.",
            },
            {
                text: "Demander de faire l’exposé en binôme pour partager la charge.",
                type: "timide",
                isError: false,
                consequence: "Avec un partenaire, la pression diminue et vous réussissez à mieux gérer votre appréhension.",
            },
            {
                text: "Tenter de négocier avec le professeur pour éviter de passer.",
                type: "timide",
                isError: true,
                consequence: "Le professeur refuse, et vous êtes encore plus stressé(e) en sachant que vous devrez finalement passer sans préparation.",
            },
        ],
        consequences: {
            timide_1: {
                text: (name) =>
                    `${name} passe des heures à s'entraîner devant le miroir, répétant chaque phrase jusqu'à ce qu'elles deviennent naturelles. Le jour venu, la peur est toujours là, mais ${name} arrive à surmonter la panique. Bien que sa voix tremble au début, les phrases s'enchaînent et une fois l’exposé terminé, il/elle se rend compte que personne ne l’a jugé(e) autant qu’il/elle l’imaginait. C’est une victoire silencieuse.`,
                skillTitle: "Création littéraire immersive 📖",
            },
            timide_2: {
                text: (name) =>
                    `${name} demande discrètement à Camille, une élève plutôt studieuse, si elle accepterait de présenter l’exposé en binôme. Camille accepte sans hésiter et prend en charge la partie la plus difficile. Sentant la pression diminuer, ${name} se concentre sur sa partie et, pour la première fois, il/elle se rend compte qu’avec le bon soutien, il/elle peut gérer ce type de situation.`,
                skillTitle: "Médiation et diplomatie efficace 🤝",
            },
            timide_3: {
                text: (name) =>
                    `Lors du cours, ${name} tente de négocier avec M. Lafont, le professeur, en expliquant qu’il/elle n’est pas à l’aise à l’oral. Mais le professeur refuse catégoriquement : "C'est justement pour ça que c'est important." Résultat, ${name} se retrouve sans préparation le jour J, la gorge sèche, incapable d’enchaîner plus de deux phrases sans hésitation. La honte l’envahit, et il/elle entend quelques ricanements dans le fond de la salle.`,
                skillTitle: "Exploitation des probabilités et des jeux 🎰",
            },
        },
    },
    4: {
        title: "Une invitation inattendue",
        text: (name) =>
            `Pendant le déjeuner, alors que ${name} est assis(e) à sa table habituelle, un élève du nom de Lucas vient s’asseoir en face de lui/elle. "Hé, y'a une fête ce week-end chez Clément. Tout le monde vient, tu devrais passer aussi ! " La dernière fois que ${name} est allé(e) à une fête, c'était pour l'anniversaire d’un cousin et il/elle s'était senti(e) mal à l’aise toute la soirée. Cette invitation est une opportunité, mais aussi une source de stress.`,
        image: require('../assets/TeenagePartyInvite.webp'),
        sound: require('../assets/sounds/PartyAmbiance.mp3'),
        choices: [
            {
                text: "Accepter mais prévoir un plan pour partir tôt en cas de malaise.",
                type: "timide",
                isError: false,
                consequence: "Vous profitez un peu de la soirée, puis partez discrètement avant d’être submergé(e).",
            },
            {
                text: "Refuser poliment en expliquant que ce n’est pas votre truc.(Vous irez quand-même)",
                type: "timide",
                isError: false,
                consequence: "Votre honnêteté est appréciée et votre camarade ne vous en veut pas.",
            },
            {
                text: "Accepter sous pression et subir la soirée sans oser partir.",
                type: "timide",
                isError: true,
                consequence: "Vous vous sentez oppressé(e) toute la soirée sans réussir à vous échapper.",
            },
        ],
        consequences: {
            timide_1: {
                text: (name) =>
                    `${name} décide d’accepter, mais planifie une sortie stratégique en cas d'inconfort. Arrivé(e) à la fête, il/elle reste dans un coin, observant le groupe. Lucas, l'élève qui l'avait invité(e), passe de temps en temps discuter avec lui/elle pour qu'il/elle ne se sente pas trop seul(e). Après une heure, ${name} envoie un message à sa mère et trouve une excuse pour partir sans attirer l’attention. Finalement, c’était moins terrible que prévu.`,
                skillTitle: "Protection numérique et confidentialité 🖥️",
            },
            timide_2: {
                text: (name) =>
                    `${name} remercie Lucas mais décline avec sincérité. "Je préfère éviter ce genre de soirées, c’est pas trop mon truc." Lucas hausse les épaules en souriant : "Pas de souci, si jamais tu veux juste passer boire un verre, tu es le/la bienvenu(e)." ${name} ressent un certain soulagement. Il/elle n'a pas besoin de se forcer et son refus est bien accepté.`,
                skillTitle: "Gestion prudente des finances 💰",
            },
            timide_3: {
                text: (name) =>
                    `${name} accepte malgré l’anxiété, pensant que ce serait impoli de refuser. La fête est bondée, la musique forte, et il/elle ne sait pas où se mettre. Chaque tentative de conversation se solde par un silence gênant, et ${name} finit par se caler contre un mur, fixant son téléphone. Mais il/elle n’ose pas partir, de peur d’attirer l'attention. Finalement, c’est Lucas qui vient lui parler en fin de soirée : "Tu veux que je te raccompagne ? T’as pas l’air bien..." Trop tard, l’expérience s’est révélée oppressante et épuisante.`,
                skillTitle: "Synthèse de produits illicites ⚗️",
            },
        },
    },
    5: {
        title: "Un secret bien gardé",
        text: (name) =>
            `Alors que ${name} range ses affaires après le dernier cours, il/elle surprend une conversation entre deux élèves dans un coin isolé du couloir. L’un d’eux, Hugo, semble inquiet et parle à voix basse : "Si quelqu’un découvre ça, je suis foutu..." ${name} ne comprend pas tout, mais perçoit que quelque chose d’important se joue ici. Faut-il agir ou faire semblant de n’avoir rien entendu ?`,
        image: require('../assets/TeenageSecret.webp'),
        sound: require('../assets/sounds/MysteryUnfolds.mp3'),
        choices: [
            {
                text: "Continuer son chemin et faire comme si de rien n’était.",
                type: "timide",
                isError: false,
                consequence: "Vous choisissez de ne pas vous mêler de cette histoire, évitant ainsi tout problème.",
            },
            {
                text: "Demander discrètement à Hugo si tout va bien.",
                type: "timide",
                isError: false,
                consequence: "Vous tentez d’apporter un soutien discret sans trop vous exposer.",
            },
            {
                text: "Chercher à savoir de quoi il s’agit en interrogeant d’autres élèves.",
                type: "timide",
                isError: true,
                consequence: "Votre curiosité attire l’attention, et les rumeurs finissent par vous impliquer malgré vous.",
            },
        ],
        consequences: {
            timide_1: {
                text: (name) =>
                    `${name} continue son chemin, évitant tout contact visuel. Quelques jours plus tard, il/elle apprend qu’un scandale a éclaté dans l’école, mais personne ne semble l’associer à cette histoire. Peut-être que parfois, ne pas s’impliquer est la meilleure solution.`,
                skillTitle: "Discrétion et investigation 🕵️",
            },
            timide_2: {
                text: (name) =>
                    `${name} hésite, puis s’approche de Hugo après les cours. "Tout va bien ?" demande-t-il/elle d’une voix calme. Hugo le/la fixe un instant, surpris, avant de répondre avec un sourire crispé : "Merci, mais c’est rien." Même si Hugo ne se confie pas, ${name} sent qu’un lien fragile vient de se tisser.`,
                skillTitle: "Accompagnement psychologique discret 🛋️",
            },
            timide_3: {
                text: (name) =>
                    `Intrigué(e), ${name} pose des questions à plusieurs élèves, espérant en apprendre plus. Malheureusement, les bruits courent vite, et le lendemain, Hugo vient le/la voir, furieux : "Pourquoi tu racontes des trucs sur moi ? T’as rien de mieux à faire ?" Pris(e) dans une situation délicate, ${name} réalise qu’il/elle aurait dû être plus prudent(e).`,
                skillTitle: "Falsification de documents d'identité 📝",
            },
        },
    },
    6: {
        title: "L’offre dangereuse",
        text: (name) =>
            `Après les cours, alors que ${name} s’apprête à rentrer chez lui/elle, une silhouette familière s’approche. C’est Maxime, un élève plus âgé, connu pour ses fréquentations douteuses. "Hé, j’ai un plan pour se faire un peu d’argent facile… Ça t’intéresse ?" Son ton est décontracté, mais quelque chose dans son regard met ${name} mal à l’aise.`,
        image: require('../assets/TeenageDangerousOffer.webp'),
        sound: require('../assets/sounds/TensionBuilds.mp3'),
        choices: [
            {
                text: "Refuser catégoriquement et partir.",
                type: "timide",
                isError: false,
                consequence: "Vous ne voulez pas vous mêler de ce genre d’histoire et vous éloignez rapidement.",
            },
            {
                text: "Demander plus d’informations avant de décider.",
                type: "timide",
                isError: false,
                consequence: "Vous écoutez attentivement avant de prendre une décision réfléchie.",
            },
            {
                text: "Accepter sans poser de questions.",
                type: "timide",
                isError: true,
                consequence: "Vous vous engagez dans quelque chose dont vous ne mesurez pas les conséquences.",
            },
        ],
        consequences: {
            timide_1: {
                text: (name) =>
                    `${name} sent un frisson lui parcourir l’échine. "Non merci." Sans attendre de réponse, il/elle s’éloigne rapidement. Le lendemain, il/elle entend des rumeurs : Maxime aurait eu des ennuis avec la direction. Un soulagement s’empare de ${name} en réalisant qu’il/elle a évité de gros problèmes.`,
                skillTitle: "Stratégie et logique avancées ♟️",
            },
            timide_2: {
                text: (name) =>
                    `${name} hésite, puis demande calmement : "Quel genre de plan ?" Maxime sourit : "Juste livrer un truc, rien de fou." ${name} sent une tension dans sa voix. Après quelques secondes de réflexion, il/elle décline poliment, réalisant que cela pourrait être risqué. Cette fois, il/elle a su garder son sang-froid.`,
                skillTitle: "Exploitation des failles numériques 💻",
            },
            timide_3: {
                text: (name) =>
                    `Sans trop réfléchir, ${name} accepte. Après tout, un peu d’argent ne ferait pas de mal. Mais lorsqu’il/elle découvre qu’il/elle doit transporter un paquet pour un inconnu, l’angoisse monte. Trop tard pour faire marche arrière. ${name} sent qu’il/elle s’est embarqué(e) dans une situation incontrôlable.`,
                skillTitle: "Transport clandestin et discret 🚢",
            },
        },
    },
    7: {
        title: "L’Adieu aux Ombres",
        text: (name) =>
            `C’est le dernier jour avant les vacances d’été. L’année scolaire touche à sa fin, et ${name} regarde les élèves rire, échanger des numéros, et faire des plans pour les semaines à venir. Pourtant, ${name} ressent un mélange étrange de soulagement et de vide. Lucas, qui lui avait proposé une invitation il y a quelques semaines, vient s’asseoir à côté de lui/elle sur un banc. "Alors, tu vas faire quoi cet été ?" demande-t-il d’un ton léger, mais ${name} sent qu’il y a une attente derrière cette question. Peut-être qu’il est temps de choisir comment dire au revoir.`,
        image: require('../assets/TeenageFarewellTimid.webp'),
        sound: require('../assets/sounds/LastDay.mp3'),
        choices: [
            {
                text: "Expliquer honnêtement ses ressentis à Lucas et aux autres.",
                type: "timide",
                isError: false,
                consequence: "Vous partagez vos pensées avec sincérité, renforçant un lien avant la séparation.",
            },
            {
                text: "Éviter les adieux et partir discrètement après les cours.",
                type: "timide",
                isError: false,
                consequence: "Vous préférez disparaître doucement, sans grand discours.",
            },
            {
                text: "Dire que vous avez des projets, même si ce n’est pas vrai.",
                type: "timide",
                isError: true,
                consequence: "Vous cachez vos véritables émotions, mais cela vous laisse un goût amer.",
            },
        ],
        consequences: {
            timide_1: {
                text: (name) =>
                    `${name} prend une grande inspiration. "Honnêtement ? Je ne sais pas trop. J’ai toujours eu du mal avec ce genre de choses." Lucas l’écoute attentivement, puis sourit : "Tu sais, je pense que t’as changé cette année. T’es peut-être encore discret(e), mais t’es plus fermé(e) comme avant." ${name} réalise qu’il/elle a appris à exprimer un peu plus qui il/elle est. Peut-être que les au revoir ne sont pas si effrayants que ça.`,
                skillTitle: "Narration immersive et conception ludique 🎮",
            },
            timide_2: {
                text: (name) =>
                    `Lorsque la cloche sonne, ${name} se lève et sort du lycée sans se retourner. Il/elle marche lentement dans les rues familières, réalisant que cette année n’a pas été aussi terrible que prévu. Peut-être que l’année prochaine, il/elle trouvera une autre manière de gérer ces moments. Mais pour aujourd’hui, disparaître en silence lui semble la meilleure option.`,
                skillTitle: "Recherche méthodique et rigoureuse 🧪",
            },
            timide_3: {
                text: (name) =>
                    `${name} ne veut pas que Lucas ou quelqu’un d’autre pense qu’il/elle est seul(e), alors il/elle répond rapidement : "J’ai plein de plans, ouais… Je vais partir un peu avec des amis." Lucas semble surpris, mais ne pose pas de questions. Alors qu’il/elle rentre chez lui/elle, ${name} sent une pointe de regret. Pourquoi était-ce si difficile d’admettre qu’il/elle n’avait rien de prévu ? La solitude n’est pas toujours un poids, mais parfois, ne pas l’assumer l’est encore plus.`,
                skillTitle: "Expression musicale profonde 🎼",
            },
        },
    },
};

export default teenageTimidData;
