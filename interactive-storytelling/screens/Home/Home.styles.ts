import { StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import typography from '../../styles/typography';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: typography.fontSizeLarge,
    fontWeight: typography.fontWeightBold,
    color: colors.text,
    marginBottom: spacing.large,
  },
  buttonText: {
    fontFamily: 'Merriweather-Bold',
    fontSize: typography.fontSizeMedium,
    textShadowRadius: 5,
    textShadowColor: colors.text,
    color: colors.white,
    textAlign: 'center',
},
  button: {
    marginTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 12,
    borderRadius: 8,
    boxShadow: '0 0 10px 0.25px white',
},
});

export default styles;
