import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import react, { Component } from "react";
import {TextInput,TouchableOpacity,View,Text,StyleSheet,FlatList } from "react-native";
import {FontAwesome} from '@expo/vector-icons';

import Home from '../../screens/Home/Home';
import MiPerfil from '../../screens/MiPerfil/MiPerfil';
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
                    title: 'User'}}/>
            <Tab.Screen name='PostForm' component={PostForm} options={{ 
              tabBarIcon:() => <FontAwesome name="camera" size = {15} color="black"/>,
                    headerShown:false,
                    title: 'New Post'}}/>
            <Tab.Screen name='SearchResults' component={SearchResults} options={{ 
              tabBarIcon:() => <FontAwesome name="search" size = {15} color="black"/>,
                    headerShown:false,
                    title: 'Search' }}/>
        </Tab.Navigator>
    );
  }
}

export default Menu;