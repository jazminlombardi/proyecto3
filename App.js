import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

 import Register from './src/screens/Register/Register';
 import Login from './src/screens/Login/Login';
 import Menu from './src/components/Menu/Menu';
 import Comment from './src/screens/Comment/Comment';
 import OtroPerfil from './src/screens/OtroPerfil/OtroPerfil';
 import EditProfile from './src/screens/EditProfile/EditProfile';




 
 const Stack = createNativeStackNavigator();
 const Tab = createBottomTabNavigator();


 export default function App() {
   // El control de sesión debería ser en app.js. Para ello tendriamos que transformarlo en componente con estado y chequear sesión en componentDidMount.

   //Para mejorar la experiencia de usuario podemos usar un loader mientras chequeamos sesión.


   return (

    <NavigationContainer style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name='Register' component={Register} options={{ headerShown: false}}/>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false}}/>
        <Stack.Screen name='Menu' component={Menu} options={{ headerShown: false}}/>
        <Stack.Screen name='OtroPerfil' component={OtroPerfil} options= {{ headerShown : false}}/>
        <Stack.Screen name='EditProfile' component={EditProfile} options= {{ headerShown : false}}/>
        <Stack.Screen name='Comment' component={Comment} options= {{ headerShown : false}}/>

      </Stack.Navigator>
    </NavigationContainer>

   );
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: 'f1f1f1',
     alignItems: 'center',
     justifyContent: 'flex-start',
   },
 });

