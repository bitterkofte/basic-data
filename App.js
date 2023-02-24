import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavCenter from './component/NavCenter';
import ColorContextProvider from './context/color-context';

export default function App() {
  return (
    <ColorContextProvider>
      <NavigationContainer style={styles.container}>
        <StatusBar style="auto" />
        <NavCenter/>
      </NavigationContainer>
    </ColorContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
