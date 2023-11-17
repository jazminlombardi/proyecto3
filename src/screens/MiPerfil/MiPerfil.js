import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import PostInProfile from '../../components/PostInProfile/PostInProfile';
import {Image, TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import Post from "../../components/Post/Post"


class MiPerfil extends Component {
    constructor() {
        super();
        this.state = {
            posts: [], // Initialize posts as an empty array
        };
    }

    componentDidMount() {
        // Traer los datos de Firebase y cargarlos en el estado.
        db.collection('posts').onSnapshot((listaPosts) => {
            let postsAMostrar = [];

            listaPosts.forEach((unPost) => {
                postsAMostrar.push({
                    id: unPost.id,
                    datos: unPost.data(),
                });
            });

            this.setState({
                posts: postsAMostrar,
            });
        });
    }

    logout() {
        auth.signOut();
        this.props.navigation.navigate('Login');
    }

    borrar() {
        // Placeholder for the borrar() method
        // Implement the logic to delete a post
    }


render() {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>MI PERFIL</Text>
            <TouchableOpacity onPressOut={() => this.logout()} style={styles.logoutBtn}>
                <Text>Logout</Text>
            </TouchableOpacity>
            <Text style={styles.userInfoText}>NOMBRE DE USUARIO: </Text>
            <Text style={styles.userInfoText}>EMAIL:</Text>
            <Text style={styles.bio}>BIOGRAFÍA</Text>
            <Image source={{ uri: '' }} style={styles.profileImage} />
            <Text style={styles.userInfoText}>CANTIDAD DE POSTEOS: </Text>
            <TouchableOpacity onPressOut={() => this.borrar()} style={styles.deleteBtn}>
                <Text>BORRAR POSTEO</Text>
            </TouchableOpacity>
            <Text style={styles.postList}>Lista de posteos creados</Text>

            <FlatList
                data={this.state.posts}
                keyExtractor={(unPost) => unPost.id}
                renderItem={({ item }) => <PostInProfile dataPost={item} />}
                style={styles.postList}
            />
            
        </View>
    );
}}


const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
        },
        header: {
            backgroundColor: 'white',
            padding: 10,
            textAlign: 'left',
            color: 'black',
            fontSize: 30,
            fontWeight: 'bold',
            marginLeft: 20,
            marginVertical: 0
        },
        logoutBtn: {
            backgroundColor: 'darkred',
            color: 'white',
            padding: 10,
            marginTop: 10,
            textAlign: 'center',
            borderRadius: 5,
        },
        userInfoText: {
            color: 'black',
            marginBottom: 5,
        },
        bio: {
            marginTop: 20,
            color: 'white',
        },
        profileImage: {
            width: 100,
            height: 100,
            marginBottom: 10,
            borderWidth: 2,
            borderColor: 'darkred',
            borderRadius: 50,
        },
        deleteBtn: {
            backgroundColor: 'darkred',
            color: 'white',
            padding: 5,
            textAlign: 'center',
            cursor: 'pointer',
            borderRadius: 5,
        },
        postList: {
            marginTop: 20,
            display:"flex",
            flexDirection:"row",
        },
        post: {
            borderWidth: 1,
            borderColor: 'darkred',
            padding: 10,
            marginBottom: 10,
            backgroundColor: 'white',
        },
        postImage: {
            width: '100%',
            height: 'auto',
            marginBottom: 10,
        },
    });


export default MiPerfil ;

