import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import react, { Component } from "react";
import {TextInput,TouchableOpacity,View,Text,StyleSheet,FlatList } from "react-native";

import Home from '../../screens/Home/Home';
import MiPerfil from '../../screens/MiPerfil/MiPerfil';
import Filtrado from '../../screens/Filtrado/Filtrado';
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
            <Tab.Screen name='Home' component={Home} options={{ headerShown: false}}/>
            <Tab.Screen name='Mi perfil' component={MiPerfil} options={{ headerShown: false}}/>
            <Tab.Screen name='Filtrado' component={Filtrado} options={{ headerShown: false}}/>
            <Tab.Screen name='SearchResults' component={SearchResults} options={ { headerShown: false } }/>
        </Tab.Navigator>
    );
  }
}

export default Menu;