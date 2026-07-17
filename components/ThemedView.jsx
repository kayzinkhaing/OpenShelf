import { View, StyleSheet, useColorScheme } from 'react-native';

const ThemedView = ({ style, children }) => {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        colorScheme === 'dark'
          ? styles.dark
          : styles.light,
        style
      ]}
    >
      {children}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  light: {
    backgroundColor: '#F8FAFC',
  },

  dark: {
    backgroundColor: '#0F172A',
  },
});


export default ThemedView;