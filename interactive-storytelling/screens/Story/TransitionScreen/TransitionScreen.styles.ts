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
  },
  title: {
    fontWeight: typography.fontWeightBold,
    textShadowRadius: 10,
    fontSize: typography.fontSizeLarge * 1.05,
    padding: spacing.small,
    color: colors.whiteText,
    borderRadius: 5,
    marginTop: spacing.extraLarge,
    marginBottom: spacing.large,
    textAlign: 'center',
  },
  subtitle: {
    fontWeight: typography.fontWeightRegular,
    fontSize: typography.fontSizeMedium,
    textShadowRadius: 10,
    textShadowColor: colors.text,
    color: colors.whiteText,
    marginBottom: 10,
    textAlign: 'center',
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
    borderRadius: 5,
    borderTopWidth: 1,
    borderBottomWidth: 2,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomColor: colors.text,
    backgroundColor: colors.success,
  },
  unlockedMessage: {
    fontWeight: typography.fontWeightBold,
    fontSize: typography.fontSizeMedium,
    textShadowRadius: 10,
    textShadowColor: colors.whiteText,
    backgroundColor: colors.secondary,
    borderRadius: 5,
    padding: 10,
    color: colors.white,
    marginVertical: 10,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: colors.primary,
    marginVertical: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1.5,
    borderBottomColor: colors.text,
  },
  continueButtonText: {
    fontWeight: typography.fontWeightBold,
    fontSize: typography.fontSizeMedium,
    paddingHorizontal: 5,
    color: colors.whiteText,
    textShadowColor: colors.text,
    textShadowRadius: 7,
  },
});

export default styles;
