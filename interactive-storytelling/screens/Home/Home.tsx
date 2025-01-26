import React, { useEffect } from 'react';
import { View, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import styles from './Home.styles';
import useSound from '../../hooks/useSound';
import sounds from '../../utils/sounds';
import GameButton from '../../Components/GameButton'; // Import du nouveau composant

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
    const introMusic = useSound(sounds.Intro);
    const choiceSound = useSound(sounds.choiceSound);

    useEffect(() => {
        introMusic(); // Lance la musique
        return () => {
            introMusic.stop(); // Arrête la musique lorsque le composant est démonté
        };
    }, []);

    const handleStartGame = () => {
        introMusic.stop();
        navigation.navigate('Game');
    };

    return (
        <ImageBackground
            source={require('../../assets/mainBackground.webp')}
            style={styles.container}
        >
            <View style={styles.container}>
                <GameButton
                    text="Commencer"
                    onPress={handleStartGame}
                    onTouchStart={choiceSound}
                />
            </View>
        </ImageBackground>
    );
};

export default Home;
