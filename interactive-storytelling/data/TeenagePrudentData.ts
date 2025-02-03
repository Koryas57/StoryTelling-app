import { ImageSourcePropType } from 'react-native';

type Choice = {
    text: string;
    type: 'prudent';
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

const teenagePrudentData: Record<number, TeenageDay> = {
    1: {
        title: "Le piège du groupe",
        text: (name) =>
            `${name} remarque que plusieurs élèves commencent à parler derrière son dos. Un de ses camarades lui conseille de ne pas réagir, tandis qu’un autre lui propose d’aller voir directement ceux qui parlent pour clarifier la situation. Cette première confrontation sociale pourrait changer la façon dont ${name} est perçu(e) à l'école.`,
        image: require('../assets/TeenageSocialPressure.webp'),
        sound: require('../assets/sounds/CrazySSerafim.m4a'),
        choices: [
            {
                text: "Ignorer les rumeurs et rester concentré sur ses objectifs.",
                type: "prudent",
                isError: false,
                consequence: "Vous restez focalisé(e) sur votre avenir sans vous laisser distraire par les commérages.",
            },
            {
                text: "Parler calmement aux concernés pour clarifier la situation.",
                type: "prudent",
                isError: false,
                consequence: "Votre communication posée permet d’éviter une escalade et d’apaiser les tensions.",
            },
            {
                text: "Réagir impulsivement et confronter le groupe.",
                type: "prudent",
                isError: true,
                consequence: "Votre réaction excessive empire la situation et vous isole davantage.",
            },
        ],
        consequences: {
            prudent_1: {
                text: (name) =>
                    `${name} choisit de ne pas accorder d’importance aux bruits de couloir et se concentre sur ses études. Avec le temps, ces rumeurs disparaissent et ${name} garde son énergie pour des choses plus constructives.`,
                skillTitle: "Maîtrise émotionnelle 🧘",
            },
            prudent_2: {
                text: (name) =>
                    `${name} approche calmement les concernés et engage une discussion adulte. Grâce à cette approche posée, le problème se dissipe sans heurt, et ${name} gagne en respect.`,
                skillTitle: "Communication assertive 🗣️",
            },
            prudent_3: {
                text: (name) =>
                    `Face aux tensions, ${name} perd son sang-froid et élève la voix. Cela donne du poids aux rumeurs et alimente une image négative, créant une situation sociale inconfortable.`,
                skillTitle: "Gestion de crise ratée ⏳",
            },
        },
    },
    2: {
        title: "L'ami en difficulté",
        text: (name) =>
            `Un(e) ami(e) proche de ${name} semble préoccupé(e) ces derniers temps, évitant les conversations et s’éloignant du groupe. ${name} sent qu’il y a un problème, mais hésite à s’en mêler, par peur d’être intrusif(ve) ou de dire quelque chose de déplacé.`,
        image: require('../assets/TeenageConcern.webp'),
        sound: require('../assets/sounds/AruarianDance.m4a'),
        choices: [
            {
                text: "Lui donner de l’espace et attendre qu’il/elle en parle.",
                type: "prudent",
                isError: false,
                consequence: "Vous respectez son silence et attendez le bon moment pour discuter.",
            },
            {
                text: "Lui envoyer un message discret pour lui montrer votre soutien.",
                type: "prudent",
                isError: false,
                consequence: "Votre message réconfortant lui permet de s’ouvrir en douceur.",
            },
            {
                text: "Le/la confronter directement et insister pour savoir ce qui ne va pas.",
                type: "prudent",
                isError: true,
                consequence: "Votre insistance le/la met mal à l’aise et crée une distance supplémentaire.",
            },
        ],
        consequences: {
            prudent_1: {
                text: (name) =>
                    `${name} attend patiemment et respecte les limites de son/sa ami(e). Finalement, celui-ci/celle-ci revient naturellement et se confie au moment opportun.`,
                skillTitle: "Empathie mesurée 🤲",
            },
            prudent_2: {
                text: (name) =>
                    `${name} envoie un message sincère et bienveillant. Grâce à ce geste, son/sa ami(e) commence à s’ouvrir progressivement.`,
                skillTitle: "Soutien émotionnel 💬",
            },
            prudent_3: {
                text: (name) =>
                    `${name} insiste trop et met la pression. Son/sa ami(e) se ferme encore plus et commence à éviter tout contact.`,
                skillTitle: "Relation fragilisée ⏳",
            },
        },
    },
    3: {
        title: "L'épreuve des examens",
        text: (name) =>
            `Un examen important approche, et ${name} hésite entre plusieurs stratégies d’étude. Réviser seul(e) permettrait d’avancer à son rythme, tandis qu’étudier avec un groupe pourrait offrir des perspectives différentes. Toutefois, le stress monte, et il/elle doit choisir la meilleure approche.`,
        image: require('../assets/TeenageExamStudy.webp'),
        sound: require('../assets/sounds/TajimaHal.m4a'),
        choices: [
            {
                text: "Préparer un planning détaillé et réviser seul(e) de manière rigoureuse.",
                type: "prudent",
                isError: false,
                consequence: "Vous avancez efficacement et optimisez votre temps de révision.",
            },
            {
                text: "Rejoindre un groupe d’étude pour combiner les forces et combler les lacunes.",
                type: "prudent",
                isError: false,
                consequence: "Vous bénéficiez des connaissances du groupe tout en partageant vos propres idées.",
            },
            {
                text: "Reporter les révisions au dernier moment et improviser.",
                type: "prudent",
                isError: true,
                consequence: "Le stress de dernière minute réduit votre concentration et votre performance.",
            },
        ],
        consequences: {
            prudent_1: {
                text: (name) =>
                    `${name} suit son planning à la lettre et arrive à l’examen en pleine confiance, prêt(e) à affronter l’épreuve sans panique.`,
                skillTitle: "Planification efficace 📅",
            },
            prudent_2: {
                text: (name) =>
                    `${name} collabore avec son groupe d’étude, échange des fiches et participe activement. Cette méthode lui permet de mieux comprendre certaines notions et d’être plus à l’aise pour l’examen.`,
                skillTitle: "Apprentissage collaboratif 🧑‍🏫",
            },
            prudent_3: {
                text: (name) =>
                    `En repoussant les révisions, ${name} se retrouve sous pression la veille de l’examen et réalise qu’il/elle n’a pas assez de temps pour tout assimiler.`,
                skillTitle: "Mauvaise gestion du temps ⏳",
            },
        },
    },
    4: {
        title: "La compétition amicale",
        text: (name) =>
            `${name} est invité(e) à participer à une compétition académique en équipe. C’est une chance de briller, mais aussi une responsabilité. Il/elle doit choisir comment s’y préparer et quelle attitude adopter face à la pression du challenge.`,
        image: require('../assets/TeenageCompetition.webp'),
        sound: require('../assets/sounds/CompetitionPrep.m4a'),
        choices: [
            {
                text: "Analyser les anciennes épreuves et préparer une stratégie.",
                type: "prudent",
                isError: false,
                consequence: "Vous adoptez une approche méthodique et arrivez préparé(e) le jour du concours.",
            },
            {
                text: "Travailler en binôme avec un coéquipier pour mieux s’entraider.",
                type: "prudent",
                isError: false,
                consequence: "Vous combinez vos compétences avec un partenaire et renforcez votre confiance.",
            },
            {
                text: "Se reposer sur son talent naturel et y aller sans préparation.",
                type: "prudent",
                isError: true,
                consequence: "Le manque de préparation vous met en difficulté face aux questions complexes.",
            },
        ],
        consequences: {
            prudent_1: {
                text: (name) =>
                    `${name} a étudié les anciennes épreuves et arrive confiant(e). Grâce à une approche bien structurée, il/elle performe avec assurance.`,
                skillTitle: "Analyse stratégique 📊",
            },
            prudent_2: {
                text: (name) =>
                    `En travaillant en équipe, ${name} découvre des angles d'approche différents et gagne en assurance face aux défis.`,
                skillTitle: "Collaboration efficace 🤝",
            },
            prudent_3: {
                text: (name) =>
                    `Sous-estimant la complexité de la compétition, ${name} peine à répondre aux questions et regrette de ne pas s’être mieux préparé(e).`,
                skillTitle: "Manque d'anticipation ⏳",
            },
        },
    },
    5: {
        title: "L'invitation risquée",
        text: (name) =>
            `Un(e) camarade que ${name} connaît peu propose de sortir tard en ville avec un groupe d’élèves plus âgés. L’idée est tentante, mais il/elle ne sait pas si c’est une bonne décision. Que faire ?`,
        image: require('../assets/TeenageNight.webp'),
        sound: require('../assets/sounds/NightCityPop.m4a'),
        choices: [
            {
                text: "Refuser poliment et rester sur ses habitudes.",
                type: "prudent",
                isError: false,
                consequence: "Vous évitez une situation potentiellement risquée, mais ratez peut-être une opportunité sociale.",
            },
            {
                text: "Accepter, mais poser des questions sur les détails et fixer une heure de retour.",
                type: "prudent",
                isError: false,
                consequence: "Vous préparez un plan de sortie sécurisé et gardez le contrôle sur la soirée.",
            },
            {
                text: "Accepter sans trop réfléchir et suivre le mouvement.",
                type: "prudent",
                isError: true,
                consequence: "Vous vous retrouvez dans un endroit inconnu et perdez le contrôle de la situation.",
            },
        ],
        consequences: {
            prudent_1: {
                text: (name) =>
                    `${name} décline l’invitation et passe une soirée tranquille, évitant ainsi une situation imprévisible.`,
                skillTitle: "Maîtrise des choix personnels 🛑",
            },
            prudent_2: {
                text: (name) =>
                    `En fixant des limites claires, ${name} profite de la soirée sans prendre de risques inutiles.`,
                skillTitle: "Prudence sociale 🔍",
            },
            prudent_3: {
                text: (name) =>
                    `Pris(e) dans l’ambiance, ${name} se retrouve dans une situation inconfortable et réalise qu’il/elle a sous-estimé les risques.`,
                skillTitle: "Manque de discernement ⏳",
            },
        },
    },
    6: {
        title: "Un choix moral difficile",
        text: (name) =>
            `${name} apprend qu’un(e) camarade aurait triché à un examen important. Certains élèves veulent le dénoncer, d’autres préfèrent ne pas s’en mêler. ${name} doit choisir comment réagir face à cette situation délicate.`,
        image: require('../assets/TeenageMoralDilemma.webp'),
        sound: require('../assets/sounds/ThinkingMoment.m4a'),
        choices: [
            {
                text: "En parler discrètement au professeur sans donner de noms.",
                type: "prudent",
                isError: false,
                consequence: "Vous signalez le problème sans causer de tort direct à qui que ce soit.",
            },
            {
                text: "Demander directement à l’élève concerné s’il/elle a vraiment triché.",
                type: "prudent",
                isError: false,
                consequence: "Vous tentez d'éclaircir la situation avant d’agir.",
            },
            {
                text: "Ignorer la situation et faire comme si de rien n’était.",
                type: "prudent",
                isError: true,
                consequence: "Vous choisissez de ne rien dire, mais le sentiment de culpabilité vous pèse.",
            },
        ],
        consequences: {
            prudent_1: {
                text: (name) =>
                    `${name} informe subtilement le professeur qu’une tricherie a pu avoir lieu, sans accuser qui que ce soit. Cela permet d’éviter les injustices tout en maintenant l’équité pour les autres élèves.`,
                skillTitle: "Éthique et discrétion ⚖️",
            },
            prudent_2: {
                text: (name) =>
                    `${name} aborde calmement l’élève en question. Après une discussion honnête, celui-ci/celle-ci avoue son erreur et décide d’aller voir le professeur de son propre chef.`,
                skillTitle: "Communication diplomatique 💬",
            },
            prudent_3: {
                text: (name) =>
                    `${name} décide de ne rien dire, mais quand l’élève est finalement pris(e) en flagrant délit plus tard, il/elle se sent coupable de ne pas avoir réagi plus tôt.`,
                skillTitle: "Conscience pesante ⏳",
            },
        },
    },
    7: {
        title: "L’Adieu Inévitable",
        text: (name) =>
            `Le départ approche. ${name} quitte sa ville natale pour ses études, un nouveau chapitre qui s’ouvre. Mais une ombre plane : son ami(e) d’enfance, atteint(e) d’une maladie, ne pourra sans doute jamais lui rendre visite. Ce dernier moment ensemble est précieux. Comment faire ses adieux ?`,
        image: require('../assets/TeenageFarewell.webp'), 
        sound: require('../assets/sounds/FarewellMelody.m4a'),
        choices: [
            {
                text: "Lui promettre qu’on se reverra, même si c’est un mensonge.",
                type: "prudent",
                isError: false,
                consequence: "Vous offrez un dernier sourire et un espoir fragile, gravé dans vos mémoires.",
            },
            {
                text: "Dire la vérité et exprimer pleinement vos émotions.",
                type: "prudent",
                isError: false,
                consequence: "Vous partagez un dernier moment authentique, sans mensonge, sans masque.",
            },
            {
                text: "Éviter l’adieu et partir sans un mot.",
                type: "prudent",
                isError: true,
                consequence: "Vous laissez la peur décider, et un vide vous hantera toujours.",
            },
        ],
        consequences: {
            prudent_1: {
                text: (name) =>
                    `${name} serre la main de son ami(e), cachant ses larmes derrière un sourire. "On se reverra, c’est sûr." Le train démarre, et ces mots restent en suspens. Des mois plus tard, un message tombe. Il/elle est parti(e). Mais ${name} garde ce dernier souvenir comme un serment inébranlable.`,
                skillTitle: "Force émotionnelle 🛡️",
            },
            prudent_2: {
                text: (name) =>
                    `Les mots sont douloureux mais sincères. "Je ne veux pas te perdre." Son ami(e) lui répond en souriant faiblement : "Vis pour nous deux." Les larmes coulent, mais cet adieu restera comme le plus beau cadeau que ${name} ait pu offrir.`,
                skillTitle: "Authenticité émotionnelle 💙",
            },
            prudent_3: {
                text: (name) =>
                    `${name} choisit d’éviter la douleur et s’en va sans se retourner. Mais plus tard devient jamais. Un jour, il/elle apprend la nouvelle par un message froid. Le vide est immense. Parfois, le courage, c’est d’affronter la douleur.`,
                skillTitle: "Regret indélébile ⏳",
            },
        },
    }, 


};

export default teenagePrudentData;
