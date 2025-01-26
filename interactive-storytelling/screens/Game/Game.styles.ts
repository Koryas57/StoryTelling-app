import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

const styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1, // S'assurer que le ScrollView prend toute la hauteur
    justifyContent: 'center', // Centrage vertical
    alignItems: 'center', // Centrage horizontal
    padding: spacing.medium,
  },
  stepContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Merriweather-Bold',
    fontSize: typography.fontSizeLarge,
    color: colors.whiteText,
    marginBottom: spacing.extraLarge,
    textAlign: 'center',
  },
  input: {
    fontFamily: 'Merriweather-BoldItalic',
    width: '80%',
    padding: spacing.medium,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 8,
    marginBottom: spacing.large,
    backgroundColor: colors.inputBackground,
    color: colors.text,
    fontSize: typography.fontSizeMedium,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    marginBottom: spacing.extraLarge,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Merriweather-Bold',
    color: colors.whiteText,
    fontSize: typography.fontSizeMedium,
  },
  choiceButton: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    marginBottom: spacing.medium,
    width: '80%',
    alignItems: 'center',
  },
  choiceButtonText: {
    fontFamily: 'Merriweather-BoldItalic',
    color: colors.buttonText,
    padding: spacing.medium,
    fontSize: typography.fontSizeMedium,
    textAlign: 'center',
  },
  choiceContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: spacing.medium,
    width: '100%',
  },
  choiceSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  selectedChoice: {
    backgroundColor: colors.primary, // Changement de couleur pour indiquer la sélection
    borderColor: colors.secondary,
    borderWidth: 2,
  },
  startButton: {
    marginTop: 24,
    backgroundColor: colors.primary,
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
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
  adventureImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover', // Correction pour l'affichage de l'image
  },
  adventureText: {
    marginTop: spacing.extraLarge,
    marginBottom: spacing.large,
    fontSize: typography.fontSizeMedium,
    color: colors.text,
    textAlign: 'center',
    paddingHorizontal: spacing.small,
  },
  errorText: {
    fontSize: typography.fontSizeSmall,
    color: colors.error,
    textAlign: 'center',
    marginTop: spacing.medium,
  },
});

export default styles;
