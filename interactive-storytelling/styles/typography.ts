import { TextStyle } from 'react-native';

const typography: {
  fontSizeSmall: number;
  fontSizeMedium: number;
  fontSizeLarge: number;
  fontWeightLight: TextStyle['fontWeight'];
  fontWeightRegular: TextStyle['fontWeight'];
  fontWeightBold: TextStyle['fontWeight'];
} = {
  fontSizeSmall: 14,
  fontSizeMedium: 18,
  fontSizeLarge: 24,
  fontWeightLight: '300',
  fontWeightRegular: '400',
  fontWeightBold: '700',
};

export default typography;
