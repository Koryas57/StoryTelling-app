import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.medium,
  },
  stepContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: typography.fontSizeLarge,
    fontWeight: typography.fontWeightBold,
    color: colors.text,
    marginBottom: spacing.large,
    textAlign: 'center',
  },
  choiceButton: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    borderRadius: 8,
    marginBottom: spacing.medium,
    width: '80%',
    alignItems: 'center',
  },
  choiceButtonText: {
    color: colors.buttonText,
    fontSize: typography.fontSizeMedium,
    fontWeight: typography.fontWeightBold,
  },
  inputButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    borderRadius: 8,
    marginTop: spacing.medium,
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: typography.fontSizeMedium,
    fontWeight: typography.fontWeightBold,
  },
});

export default styles;
