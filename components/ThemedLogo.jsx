import { Image, StyleSheet, useColorScheme } from 'react-native';

import DarkLogo from '../assets/img/k.jpg';
import LightLogo from '../assets/img/k.jpg';

const ThemedLogo = () => {
  const colorScheme = useColorScheme();

  const logo = colorScheme === 'dark'
    ? DarkLogo
    : LightLogo;

  return (
    <Image 
      source={logo}
      style={styles.logo}
    />
  );
};


const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
});


export default ThemedLogo;