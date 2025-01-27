import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';
import spacing from '../../../styles/spacing';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerText: {
        fontFamily: 'Merriweather-Bold',
        textAlign: 'center',
        textShadowRadius: 10,
        textShadowColor: colors.text,
        color: colors.white,
        fontSize: 50,
        margin: spacing.medium,
        marginBottom: spacing.extraLarge * 2,
    },
    animatedTarget: {
        width: 150,
        height: 150,
        marginHorizontal: spacing.large,
        backgroundColor: colors.secondary,
        borderRadius: 75,
        alignSelf: 'center',
        boxShadow: '0 0 10px 10px white',
    },
    targetButton: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 75,
    },
    targetText: {
        textShadowRadius: 10,
        textShadowColor: colors.text,
        color: colors.white,
        fontSize: 16,
        fontFamily: 'Merriweather-Bold',
    },
});

export default styles;
