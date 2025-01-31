import { StyleSheet, TextStyle } from 'react-native';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import spacing from '../../../styles/spacing';

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.medium,
    marginBottom: spacing.large,
  },
  scrollContainer: {
    flexGrow: 1, // Permet au ScrollView de s'étendre si nécessaire
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15, 
  },
  title: {
    fontFamily: 'Merriweather-Bold',
    textShadowRadius: 10,
    textShadowColor: colors.text,
    fontSize: typography.fontSizeLarge * 1.05,
    color: colors.whiteText,
    borderRadius: 5,
    marginTop: spacing.large,
    textAlign: 'center',
  },
  title2: {
    width: '100%',
    fontFamily: 'Babyk',
    textShadowRadius: 50,
    textShadowColor: 'rgba(7, 174, 252, 0.8)',
    fontSize: 70,
    color: colors.whiteText,
    borderRadius: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Merriweather-Bold',
    fontSize: typography.fontSizeMedium,
    textShadowRadius: 10,
    textShadowColor: colors.text,
    color: colors.whiteText,
    marginVertical: 10,
    padding: spacing.small,
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    boxShadow: '0 0 10px 0.5px rgba(0, 0, 0, 0.5)',
  },
  skillsContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  skillText: {
    fontWeight: typography.fontWeightBold,
    fontSize: 15,
    textShadowRadius: 3,
    textShadowColor: colors.text,
    color: colors.whiteText,
    textAlign: 'center',
    marginVertical: 5,
    padding: 10,
    borderRadius: 50,
    borderTopWidth: 1,
    borderBottomWidth: 2,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomColor: colors.text,
    backgroundColor:'rgba(219, 180, 6, 0.67)',
  },
  unlockedMessage: {
    fontWeight: typography.fontWeightBold,
    fontSize: typography.fontSizeMedium,
    textShadowRadius: 10,
    textShadowColor: colors.text,
    backgroundColor: 'rgba(19, 211, 83, 0.25)',
    boxShadow: '0 0 10px 0.25px rgba(255, 255, 255, 0.84)',
    borderRadius: 5,
    padding: 10,
    color: colors.white,
    marginTop: spacing.large,
    marginBottom: spacing.extraLarge,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: 'rgba(37, 37, 37, 0.5)',
    borderRadius: 10,
    marginBottom: 0,
  },
  continueButtonText: {
    fontFamily: 'Merriweather-Bold',
    fontSize: typography.fontSizeMedium,
    color: colors.whiteText,
    textShadowColor: colors.text,
    textShadowRadius: 7,
  },
});

export default styles;
