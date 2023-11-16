import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import react, { Component } from "react";
import {TextInput,TouchableOpacity,View,Text,StyleSheet,FlatList } from "react-native";
import {FontAwesome} from '@expo/vector-icons';

import Home from '../../screens/Home/Home';
import MiPerfil from '../../screens/MiPerfil/MiPerfil';
import Filtrado from '../../screens/Filtrado/Filtrado';
import PostForm from "../../screens/PostForm/PostForm";
import SearchResults from '../../screens/SearchResults/SearchResults';

const Tab = createBottomTabNavigator()

class Menu extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {

    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={Home} options={{ 
              tabBarIcon:() => <FontAwesome name="home" size = {15} color="black"/>,
                    headerShown:false,
                    title: 'Home'}}/>
            <Tab.Screen name='Mi perfil' component={MiPerfil} options={{ 
              tabBarIcon:() => <FontAwesome name="user" size = {15} color="black"/>,
                    headerShown:false,
                    title: 'user'}}/>
            <Tab.Screen name='PostForm' component={PostForm} options={{ 
              tabBarIcon:() => <FontAwesome name="camara" size = {15} color="black"/>,
                    headerShown:false,
                    title: 'camara'}}/>
            <Tab.Screen name='SearchResults' component={SearchResults} options={{ 
              tabBarIcon:() => <FontAwesome name="busqueda" size = {15} color="black"/>,
                    headerShown:false,
                    title: 'busqueda' }}/>
        </Tab.Navigator>
    );
  }
}

export default Menu;