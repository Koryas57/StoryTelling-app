import { StyleSheet, TextStyle } from 'react-native';
import colors from '../../../styles/colors';
import typography from '../../../styles/typography';
import spacing from '../../../styles/spacing';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
background: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Merriweather-Bold',
    textShadowRadius: 10,
    textShadowColor: colors.text,
    fontSize: typography.fontSizeLarge * 1.05,
    padding: spacing.large,
    color: colors.whiteText,
    borderRadius: 5,
    marginBottom: spacing.medium,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Merriweather-Bold',
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
    backgroundColor:'rgba(219, 180, 6, 0.67)',
  },
  unlockedMessage: {
    fontWeight: typography.fontWeightBold,
    fontSize: typography.fontSizeMedium,
    textShadowRadius: 10,
    textShadowColor: colors.text,
    backgroundColor: 'rgba(19, 211, 83, 0.25)',
    boxShadow: '0 0 10px 0.25px rgba(255, 255, 255, 0.84)',
    borderRadius: 5,
    padding: 10,
    color: colors.white,
    margin: spacing.large,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: 'rgba(37, 37, 37, 0.5)',
    borderRadius: 10,
    marginBottom: 0,
  },
  continueButtonText: {
    fontFamily: 'Merriweather-Bold',
    fontSize: typography.fontSizeMedium,
    color: colors.whiteText,
    textShadowColor: colors.text,
    textShadowRadius: 7,
  },
  careerButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 10,
},
selectedCareerButton: {
    backgroundColor: "#007BFF",
    borderColor: "#0056b3",
},
careerText: {
    fontSize: 18,
    textAlign: "center",
},
confirmButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
},
disabledButton: {
    backgroundColor: "#ccc",
},
confirmButtonText: {
    color: "#fff",
    fontSize: 18,
},
cancelButton: {
    marginTop: 10,
    padding: 15,
    alignItems: "center",
},
cancelButtonText: {
    color: "#007BFF",
    fontSize: 18,
},
});

export default styles;
