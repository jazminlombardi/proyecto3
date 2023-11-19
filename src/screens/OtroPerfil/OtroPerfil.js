import React, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList,Image, ScrollView } from 'react-native';
import Post from '../../components/Post/Post';

class OtroPerfil extends Component{
    constructor(props){
        super(props)
        this.state={
            susPosts: [],
            suInfo: {},
            mailUser: this.props.route.params.mailUser
        }

    }

    componentDidMount(){
        console.log(this.props.route.params)
        let perfil = this.state.mailUser
        db.collection('posts')
        .where ('owner', '==', perfil)
        .onSnapshot(docs => {
            let posts = []
            docs.forEach(doc => posts.push({
                id: doc.id,
                datos: doc.data()
            }))
            this.setState({
                susPosts: posts
            })
        })
        db.collection('users')
            .where ('owner', '==', this.state.mailUser)
            .onSnapshot (doc => {
                doc.forEach(doc =>
                    this.setState ({
                        id: doc.id,
                        suInfo: doc.data()
                }))
            })

    }

    render(){
        console.log(this.state.suInfo)
        console.log(this.state.susPosts)

        return(
            <ScrollView style={styles.container}>
                <Image
                    style={styles.image}
                    source = {require('/assets/logoblanco.png')}
                    resizeMode= "center"
                />
                <Text style={styles.volverH} onPress={() => this.props.navigation.navigate("Home")} >
                Volver a home
                </Text>
                <Text style={styles.volverB} onPress={() => this.props.navigation.navigate("SearchResults")}>
                Volver a Buscador
                </Text>
{/*                 <Image source={{ uri: this.state.suInfo.profileImage}} style={styles.profileImage} />
 */}                <View style={styles.profileInfo}>
                <Text style={styles.userName}>{this.state.suInfo.userName} </Text>
                <Text style={styles.posts}> Biografía:{this.state.suInfo.bio}</Text>
                <Text style={styles.posts} >Cantidad de posts: {this.state.susPosts.length}</Text>
                <Image style={styles.profileImage} source={{ uri: this.state.suInfo.profileImage }}/>
                </View> 

                <Text style={styles.sectionTitle}>Posteos de {this.state.suInfo.userName} </Text>
                <FlatList
                    data={this.state.susPosts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <Post dataPost={item} navigation={this.props.navigation} />}
                />

            
            </ScrollView>

        )
    }
}
const styles = StyleSheet.create({
    image:{
        // height: 100,
        // paddingBottom: 5,
        // width: 50
        alignSelf: "center",
        height: "10%",
        width:"20%",
        margin:5,
  },
    container: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
    },
},
    profileInfo: {
        alignItems: 'center',
        marginBottom: 20,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    bio: {
        fontSize: 16,
        marginBottom: 5,
        color:'black',
    },
    posts: {
        fontSize: 16,
        marginBottom: 15,
    },
    profileImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
        justifyContent:'center',
        backgroundColor:"lightgrey",
        borderRadius: 50,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign:'center'
    },
    volverH:{
        backgroundColor:'lightgrey',
        color:'white',
        padding:8,
        borderRadius:30,
        textAlign:'center',
        justifyContent:'center'
    },
    volverB:{
        backgroundColor:'rgb(244, 236, 236)',
        color:'red',
        padding:8,
        margin:15,
        borderRadius:30,
        textAlign:'center',
        justifyContent:'center'
    },
});
export default OtroPerfil;