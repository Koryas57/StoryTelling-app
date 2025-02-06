import React, { useEffect } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import styles from './Home.styles';
import useSound from '../../hooks/useSound';
import sounds from '../../utils/sounds';
import GameButton from '../../Components/GameButton';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
    const introMusic = useSound(sounds.Intro2);
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
            source={require('../../assets/MainBackground2.webp')}
            style={styles.container}
        >
            <View style={styles.container}>
                <Animated.Text
                    style={styles.gameName}
                    entering={FadeInUp.duration(7500)}
                    exiting={FadeOutUp.duration(5000)}
                >
                    Human Stories
                </Animated.Text>
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
