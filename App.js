import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { auth } from './src/firebase/config';
import Register from './src/screens/Register/Register';


export default function App() {
   //Registrar un Usuario
   auth.createUserWithEmailAndPassword(email, pass)
   //Loguear un Usuario
   auth.signInWithEmailAndPassword(email, pass)
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
