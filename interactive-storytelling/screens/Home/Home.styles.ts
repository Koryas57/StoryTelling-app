import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000030',
    width: '100%',
  },
  animatedContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    boxShadow: '0 0 25px 10px rgba(255, 255, 255, 0.8)',
},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  gameName: {
    width: '90%',
    textAlign: 'center',
    fontFamily: 'DarkSpartan',
    textShadowRadius: 25,
    marginBottom: spacing.medium,
    textShadowColor: '0 0 10px 5px rgb(231, 161, 8)',
    fontSize: typography.fontSizeLarge * 3,
    color: 'rgba(240, 255, 255, 0.98)',

  },
  title: {
    fontSize: typography.fontSizeLarge,
    fontWeight: typography.fontWeightBold,
    color: colors.text,
    marginBottom: spacing.large,
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
},
  button: {
    backgroundColor: 'rgba(0,0,0,0.5)', // Couleur normale
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
},
buttonPressed: {
    backgroundColor: '#4626a6', // Couleur lorsqu'il est pressé
},
buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Merriweather-Bold',
},
});

export default styles;
