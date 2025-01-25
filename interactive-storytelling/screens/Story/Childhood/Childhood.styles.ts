import { StyleSheet, ScrollView } from 'react-native';
import colors from '../../../styles/colors';
import spacing from '../../../styles/spacing';
import typography from '../../../styles/typography';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: spacing.large,
    backgroundColor: colors.text
  },
  hud: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: spacing.large,
    marginBottom: spacing.medium,
  },
  hudText: {
    marginTop: spacing.extraLarge,
    paddingVertical: spacing.medium,
    fontSize: typography.fontSizeMedium,
    color: colors.whiteText,
  },
  hudTitle: {
    fontFamily: 'Merriweather-BoldItalic',
    marginBottom: spacing.large,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    fontSize: typography.fontSizeLarge,
    color: colors.whiteText,
    backgroundColor: colors.secondary,
    borderRadius: spacing.large,
    textShadowRadius: 10,
    textShadowColor: colors.whiteText,
  },
  adventureImage: {
    width: '96%',
    height: 300,
    borderRadius: 10,
    marginBottom: spacing.large,
    boxShadow: '0 0 10px 0.25px white',
  },
  adventureText: {
    width: '100%',
    overflow: 'scroll',
    fontFamily: 'Merriweather-LightItalic',
    fontSize: typography.fontSizeSuperMedium,
    color: colors.whiteText,
    textAlign: 'center',
    marginVertical: spacing.small,
    paddingHorizontal: spacing.medium,
  },
  choicesContainer: {
    width: '100%',
    marginTop: spacing.extraLarge,
    paddingHorizontal: spacing.medium
  },
  choiceButton: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    padding: spacing.medium,
    marginBottom: spacing.large,
    alignItems: 'center',
  },
  choiceButtonText: {
    fontFamily: 'Merriweather-Bold',
    fontSize: typography.fontSizeSuperMedium,
    color: colors.buttonText,
    textAlign: 'center',
  },
  consequenceTitle: {
    width: '100%',
    fontSize: typography.fontSizeLarge,
    fontFamily: 'Merriweather-Bold',
    color: colors.whiteText,
    marginVertical: spacing.medium,
    textAlign: 'center',
},
consequenceText: {
    width: '100%',
    fontSize: typography.fontSizeSuperMedium,
    fontFamily: 'Merriweather-BoldItalic',
    color: colors.whiteText,
    marginBottom: spacing.large,
    padding: spacing.medium,
    textAlign: 'center',
},
skillTitle: {
  width: '94%',
  fontSize: typography.fontSizeLarge,
  fontFamily: 'Merriweather-Bold',
  color: colors.success,
  textAlign: 'center',
  textShadowRadius: 5,
  textShadowColor: colors.text,
  marginVertical: spacing.extraLarge,
  backgroundColor: colors.secondary,
  borderRadius: spacing.small,
  boxShadow: '0 0 10px 0.25px white',
  padding: spacing.small,
  transform: 'rotate',
},
nextButton: {
    backgroundColor: colors.primary,
    padding: spacing.medium,
    borderRadius: spacing.small,
    boxShadow: '0 0 5px 0.25px white',
},
nextButtonText: {
    fontSize: typography.fontSizeMedium,
    fontWeight: typography.fontWeightBold,
    color: colors.white,
    textAlign: 'center',
},
  errorText: {
    fontSize: typography.fontSizeSmall,
    color: colors.error,
    textAlign: 'center',
    marginTop: spacing.medium,
  },
  transitionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
transitionText: {
    fontSize: 100,
    fontFamily: 'Merriweather-Bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
},
transitionButton: {
    marginTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
    borderRadius: 8,
    boxShadow: '0 0 10px 0.25px white',
},
transitionButtonText: {
    color: '#fff',
    fontSize: spacing.large,
    textAlign: 'center',
},
});

export default styles;
