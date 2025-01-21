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
    borderRadius: 8,
    marginBottom: spacing.medium,
    width: '100%',
    alignItems: 'center',
  },
  choiceButtonText: {
    textAlign:'center',
    color: colors.buttonText,
    padding: spacing.medium,
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
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: spacing.small,
    marginBottom: spacing.large,
  },
  hudText: {
    marginTop: spacing.extraLarge,
    fontSize: typography.fontSizeSmall,
    color: colors.text,
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: spacing.large,
  },
  choicesContainer: {
    alignItems: 'center',
    marginTop: spacing.medium,
    width: '100%',
  },
  adventureImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    objectFit: 'cover',
  },
  adventureText: {
    marginTop: spacing.extraLarge,
    marginBottom: spacing.large,
    fontSize: typography.fontSizeMedium,
    color: colors.text,
    textAlign: 'center',
    paddingHorizontal: spacing.small,
  },
  apiKeyStatus: {
    marginBottom: 16,
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
  },
  errorText: {
    fontSize: typography.fontSizeSmall,
    color: colors.error,
    textAlign: 'center',
    marginTop: spacing.medium,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.large,
  }, 
});

export default styles;
