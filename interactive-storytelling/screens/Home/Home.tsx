import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import styles from './Home.styles';
import useSound from '../../hooks/useSound';
import sounds from '../../utils/sounds';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
    const introMusic = useSound(sounds.Intro);
    const choiceSound = useSound(sounds.choiceSound);

    // Joue la musique à l'arrivée sur la page et arrête-la en quittant
    useEffect(() => {
        introMusic(); // Lance la musique
        return () => {
            introMusic.stop(); // Arrête la musique lorsque le composant est démonté
        };
    }, []);

    const handleStartGame = () => {
        introMusic.stop(); // Arrête la musique
        navigation.navigate('Game'); // Navigue vers Game
    };

    return (
        <View style={styles.container}>
            <Pressable
                onTouchStart={choiceSound}
                style={styles.button}
                onPress={handleStartGame}>
                <Text style={styles.buttonText}>Commencer</Text>
            </Pressable>
        </View>
    );
};

export default Home;
