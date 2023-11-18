import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import MyCamera from '../../components/MyCamara/MyCamara';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class PostForm extends Component {
    constructor(){
        super()
        this.state={
           textoPost:'',
           fotoUrl:'',
           showSuccessMessage: false 

        }
    }

    //1)Completar la creación de posts
    crearPost(owner, textoPost, fotoUrl, createdAt){
        //Crear la colección Users
        db.collection('posts').add({
            owner: owner, //auth.currentUser.email,
            textoPost: textoPost, //this.state.textoPost,
            fotoUrl:fotoUrl,
            likes:[],
            createdAt: createdAt //Date.now(), 
        })
        .then( res => {
            console.log('Creando post...');
            this.setState({
                textoPost:'',
                showSuccessMessage: true 
            })

        }) 
        .catch( e => console.log(e))
    }

    //Método para que el form consiga la url de la foto que tiene la cámara
    trearUrlDelaFoto(url){
        this.setState({
            fotoUrl: url
        })
    }


    render(){
        return(
            <View style={styles.formContainer}>
                <Text style={styles.newpost}>New Post</Text>
                <MyCamera style={styles.camara} trearUrlDelaFoto={ url => this.trearUrlDelaFoto(url) }/>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({textoPost: text})}
                    placeholder='Escribir un comentario...'
                    keyboardType='default'
                    value={this.state.textoPost}
                    />
                <TouchableOpacity style={styles.button} onPress={()=>this.crearPost(auth.currentUser.email, this.state.textoPost, this.state.fotoUrl, Date.now())}>
                    <Text style={styles.textButton}>Postear</Text>    
                </TouchableOpacity>
                {this.state.showSuccessMessage && (
                    <View style={styles.successMessageContainer}>
                        <Text style={styles.successMessageText}>
                            Tu post ya está disponible en tu perfil
                        </Text>
                    </View>
                )}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    camara:{
        marginBottom: 0,
        paddingBottom: 10,
        padding:0, 
        justifyContent:"center",
    },
    newpost:{
        color: 'black',
        marginLeft: 15,
        fontSize: 30,
        fontWeight: 'bold',
    },
    formContainer:{
        height:"auto",
        paddingHorizontal:5,
        marginTop: 60,
        marginHorizontal:30,
        padding: 25,
        borderRadius: 6,
        marginLeft: 20,
        backgroundColor: 'lightgrey'
    },
    input:{
        height:40,
        backgroundColor:"white",
        paddingVertical:5,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginVertical:9,
        marginLeft: 13,
        marginRight:15,
    },
    button:{
        backgroundColor:'darkred',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:6, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: 'darkred',
        marginLeft: 13,
        marginRight: 13,
    
    },
    textButton:{
        color: 'white',

    },
    successMessageContainer: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        backgroundColor: 'green',
        padding: 10,
        alignItems: 'center'
    },
    successMessageText: {
        color: 'white'
    }

})


export default PostForm;