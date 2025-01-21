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
  bookContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: spacing.large,
  },
  hud: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: spacing.medium,
    marginBottom: spacing.large,
  },
  hudText: {
    fontSize: typography.fontSizeSmall,
    color: colors.text,
  },
  adventureImage: {
    width: '90%',
    height: 200,
    marginBottom: spacing.large,
    borderRadius: 10,
    backgroundColor: colors.inputBackground, // Fond en cas de délai de chargement
  },
  adventureText: {
    fontSize: typography.fontSizeMedium,
    color: colors.text,
    textAlign: 'center',
    paddingHorizontal: spacing.medium,
  },
});

export default styles;
