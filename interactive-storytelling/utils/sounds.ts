const sounds = {
    Intro: require('../assets/sounds/Intro.mp3'),
    pageFlip: require('../assets/sounds/PageTurn.mp3'),
    ambiance: require('../assets/sounds/kitchen.mp3'),
    gardenAmbiance : require('../assets/sounds/GardenBirds.mp3'),
    choiceSound : require('../assets/sounds/ButtonSoundEffect1.mp3'),
    choiceSound2 : require('../assets/sounds/ButtonSoundEffect2.mp3'),
    startSound : require('../assets/sounds/ButtonSoundEffectStart.mp3'),
    levelSound : require('../assets/sounds/LevelSoundEffect.mp3'),
};

export type SoundKeys = keyof typeof sounds;

export default sounds;
