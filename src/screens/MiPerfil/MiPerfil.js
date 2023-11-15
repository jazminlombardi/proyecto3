import React, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, Image, FlatList} from 'react-native';
import { auth, db } from '../../firebase/config';
import Post from '../../components/Post/Post';


class MiPerfil extends Component {
    constructor(){
        super()
        this.state={
      
        }
    }
    componentDidMount(){
        //Traer los datos de Firebase y cargarlos en el estado.
        db.collection('posts').onSnapshot(
            listaPosts => {
                let postsAMostrar = [];

                listaPosts.forEach(unPost => {
                    postsAMostrar.push({
                        id:unPost.id,
                        datos: unPost.data()            
                    })
                })

                this.setState({
                    posts:postsAMostrar
                })
            }
        )

    }

    logout(){
        auth.signOut();

        this.props.navigation.navigate('Login')

    }


    render(){
        return(
            <View>
                <Text>MI PERFIL</Text>
                <TouchableOpacity onPressOut={()=>this.logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
                <Text>NOMBRE DE USUARIO: </Text>
                <Text>EMAIL:</Text>
                <Text>BIOGRAFÍA</Text>
                <Image source={{url: ""}}/> 
                <Text>CANTIDAD DE POSTEOS: </Text>
                <TouchableOpacity onPressOut={()=>this.borrar()}>
                    <Text>BORRAR POSTEO</Text>
                </TouchableOpacity>
                <Text>Lista de posteos creados</Text>

                <FlatList
                    data={this.state.posts}
                    keyExtractor={ unPost => unPost.id }
                    renderItem={ ({item}) => <Post dataPost = {item} />  }
                />
            </View>
        )
    }
}



export default MiPerfil;
