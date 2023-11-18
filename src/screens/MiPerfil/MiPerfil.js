import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import PostInProfile from '../../components/PostInProfile/PostInProfile';
import {Image, TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import Post from "../../components/Post/Post"



class MiPerfil extends Component {
    constructor(props){
        
        super(props)
        this.state = {
            posts: [],
            infoUser: {},
            id: ''
        }
    }

    componentDidMount(){
        db.collection('posts').where('owner', '==', auth.currentUser.email)
        .onSnapshot(
            listaPosts => {
                let postsAMostrar = [];

                listaPosts.forEach(unPost => {
                    postsAMostrar.push({
                        id: unPost.id,
                        datos: unPost.data(),
                    })
                })

                this.setState({
                    posts: postsAMostrar
                })
            }
        )

        db.collection('users')
            .where('owner', '==', auth.currentUser.email)
            .onSnapshot(doc => {
                doc.forEach(doc =>
                    this.setState({
                        id: doc.id,
                        infoUser: doc.data()
                    }))
            })
    }

    signOut() {
        auth.signOut();
    }



render() {
    console.log(this.state.suInfo)
    console.log(this.state.susPosts)

    return (
        <View style={styles.container}>
            <Text style={styles.header}>MI PERFIL</Text>
            <Image source={{ uri: this.state.infoUser.profileImage  }} style={styles.profileImage} />

            <Text style={styles.userName}>{this.state.infoUser.userName} </Text>
            <Text style={styles.bio}>BIOGRAFÍA {this.state.infoUser.bio} </Text>
            <Text style={styles.userInfoText}>email: {this.state.infoUser.owner} </Text>

            <Text style={styles.userInfoText}>CANTIDAD DE POSTEOS:{this.state.posts.length} </Text>

            <TouchableOpacity onPressOut={() => this.logout()} style={styles.logoutBtn}>
                <Text style={styles.buttontext}>Logout</Text>
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
            padding: 10,
            marginTop: 10,
            textAlign: 'center',
            borderRadius: 5,
        },
        buttontext:{
            color:"white"
        },
        userInfoText: {
            color: 'black',
            marginBottom: 5,
        },
        bio:{
            color: 'black',
            marginBottom: 5,
        },
        userName: {
            color: 'black',
            padding: 5,
            fontSize:"18px"
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
            width:"auto"
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

