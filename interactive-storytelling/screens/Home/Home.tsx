import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import styles from './Home.styles';
import { OPENAI_API_KEY } from '@env';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Interactive Storytelling</Text>
            <Text>Clé API : {OPENAI_API_KEY ? 'Accessible' : 'Non accessible'}</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Game')}>
                <Text style={styles.buttonText}>Commencer</Text>
            </Pressable>
        </View>
    );
};

export default Home;
