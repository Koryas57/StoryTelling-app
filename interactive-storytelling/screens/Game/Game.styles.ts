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
    width: '100%',
  },
  title: {
    fontSize: typography.fontSizeLarge,
    fontWeight: typography.fontWeightBold,
    color: colors.text,
    marginBottom: spacing.large,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    padding: spacing.medium,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
    marginBottom: spacing.large,
    backgroundColor: colors.inputBackground,
    color: colors.text,
    fontSize: typography.fontSizeMedium,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: typography.fontSizeMedium,
    fontWeight: typography.fontWeightBold,
  },
  loadingText: {
    fontSize: typography.fontSizeMedium,
    fontWeight: typography.fontWeightRegular,
    color: colors.text,
    textAlign: 'center',
  },
});

export default styles;
