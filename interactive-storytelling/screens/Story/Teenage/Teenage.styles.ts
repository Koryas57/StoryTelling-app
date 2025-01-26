import { StyleSheet } from 'react-native';
import colors from '../../../styles/colors';
import spacing from '../../../styles/spacing';
import typography from '../../../styles/typography';

const stylesT = StyleSheet.create({
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
    color: colors.whiteText,
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
miniGameText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: 'Merriweather-Bold',
    marginVertical: 20,
    textAlign: 'center'
},
miniGameBackground: {
  flex: 1,
  resizeMode: 'cover', // Assure que l'image couvre tout l'écran
  justifyContent: 'center', // Centrage vertical des éléments
  alignItems: 'center', // Centrage horizontal des éléments
},
miniGameContainer: {
  padding: spacing.medium,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond semi-transparent pour contraster avec l'image
  borderRadius: 8,
},
grid: {
  marginTop: 16,
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',
  alignSelf: 'center',
  width: '100%',
},
gridCell: {
  width: 60,
  height: 60,
  margin: 5,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#ccc',
  borderRadius: 8,
},
cellRevealed: {
  backgroundColor: '#4CAF50', // Couleur pour les cases révélées
},
cellText: {
  fontSize: 16,
  color: '#fff',
},
successButton: {
  marginTop: 16,
  padding: 10,
  backgroundColor: '#4CAF50',
  borderRadius: 8,
},
successButtonText: {
  textAlign: 'center',
  fontSize: 18,
  color: '#fff',
},
});

export default stylesT;