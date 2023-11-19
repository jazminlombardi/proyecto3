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

    logout() {
        auth.signOut();
    }



render() {
    console.log(this.state.suInfo)
    console.log(this.state.susPosts)

    return (
        <View style={styles.container}>
                <Image
                    style={styles.image}
                    source = {require('/assets/logoblanco.png')}
                    resizeMode= "center"
                />
            <Image source={{ uri: this.state.infoUser.profileImage  }} style={styles.profileImage} />

            <Text style={styles.userName}>{this.state.infoUser.userName} </Text>
            <Text style={styles.userName}>BIOGRAFÍA: {this.state.infoUser.bio} </Text>
            <Text style={styles.userInfoText}>email: {this.state.infoUser.owner} </Text>

            <Text style={styles.userInfoText}>CANTIDAD DE POSTEOS:{this.state.posts.length} </Text>


            <TouchableOpacity  onPress={()=>this.props.navigation.navigate('EditProfile', {idUser: this.state.id ,infoUser: this.state.infoUser})} activeOpacity={0.7} style={styles.editarboton}>
                <Text style={styles.buttontext}>Editar Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPressOut={() => this.logout()} style={styles.logout}>
                <Text style={styles.buttontext}>Logout</Text>
            </TouchableOpacity>

            <Text style={styles.header}>Mis Posts</Text>
            <ScrollView  style={styles.scroll}>
            <FlatList
                data={this.state.posts}
                keyExtractor={(unPost) => unPost.id}
                renderItem={({ item }) => <PostInProfile dataPost={item} />}
                style={styles.postList}
                numColumns={3}
                columnWrapperStyle={styles.row}
            />
            </ScrollView>
            
        </View>
    );
}}


const styles = StyleSheet.create({
    image:{
        // height: 100,
        // paddingBottom: 5,
        // width: 50
        alignSelf: "center",
        height: "10%",
        width:"20%",
        margin:10,
  },
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            padding:80,

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
        editarboton: {
            backgroundColor: 'rgb(228, 33, 33)',
            padding: 10,
            marginTop: 10,
            textAlign: 'center',
            borderRadius: 5,
        },
        logout:{
            backgroundColor:"lightgrey",
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
            backgroundColor:"lightgrey",
            borderRadius: 50,
        },
        deleteBtn: {
            backgroundColor: 'rgb(228, 33, 33)',
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
            flexWrap:'wrap'
        },

        post: {
            borderWidth: 1,
            borderColor: 'rgb(228, 33, 33)',
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

