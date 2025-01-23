import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';
import spacing from '../../../styles/spacing';
import typography from '../../../styles/typography';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blackBackground,
    padding: spacing.medium,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: spacing.large,
  },
  hud: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: spacing.medium,
    marginBottom: spacing.medium,
  },
  hudText: {
    marginTop: spacing.extraLarge,
    paddingVertical: spacing.medium,
    fontSize: typography.fontSizeMedium,
    color: colors.whiteText,
  },
  adventureImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: spacing.large,
  },
  adventureText: {
    fontSize: typography.fontSizeMedium,
    color: colors.whiteText,
    textAlign: 'center',
    marginBottom: spacing.large,
    paddingHorizontal: spacing.medium,
  },
  choicesContainer: {
    width: '100%',
    marginTop: spacing.large,
  },
  choiceButton: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    padding: spacing.medium,
    marginBottom: spacing.medium,
    alignItems: 'center',
  },
  choiceButtonText: {
    fontSize: typography.fontSizeMedium,
    color: colors.buttonText,
    fontWeight: typography.fontWeightBold,
    textAlign: 'center',
  },
  consequenceTitle: {
    width: '80%',
    fontSize: typography.fontSizeLarge,
    fontWeight: typography.fontWeightBold,
    color: colors.whiteText,
    marginBottom: spacing.small,
    textAlign: 'center',
},
consequenceText: {
    width: '100%',
    fontSize: typography.fontSizeSuperMedium,
    fontWeight: typography.fontWeightRegular,
    color: colors.whiteText,
    marginBottom: spacing.large,
    textAlign: 'center',
},
skillTitle: {
  fontSize: typography.fontSizeLarge,
  fontWeight: typography.fontWeightBold,
  color: colors.success,
  textAlign: 'center',
  marginBottom: spacing.extraLarge,
},
nextButton: {
    backgroundColor: colors.primary,
    padding: spacing.medium,
    borderRadius: spacing.small,
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
});

export default styles;
