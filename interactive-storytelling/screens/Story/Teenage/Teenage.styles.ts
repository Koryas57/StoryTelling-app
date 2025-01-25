import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';
import spacing from '../../../styles/spacing';
import typography from '../../../styles/typography';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: spacing.large,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  hud: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hudText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  adventureImage: {
    width: '100%',
    height: 200,
    marginVertical: spacing.medium,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: spacing.medium,
  },
  adventureText: {
    fontSize: 16,
    marginBottom: spacing.large,
  },
  choicesContainer: {
    marginTop: spacing.medium,
  },
  choiceButton: {
    backgroundColor: colors.secondary,
    borderRadius: 8,
    padding: spacing.medium,
    marginBottom: spacing.medium,
    alignItems: 'center',
  },
  choiceButtonText: {
    color: colors.whiteText,
    fontWeight: 'bold',
  },
  consequenceText: {
    fontSize: 16,
    marginVertical: spacing.medium,
  },
  skillTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.large,
  },
  nextButton: {
    backgroundColor: colors.secondary,
    padding: spacing.medium,
    borderRadius: 8,
  },
  nextButtonText: {
    color: colors.whiteText,
    fontWeight: 'bold',
  },
});
