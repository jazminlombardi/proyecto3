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

            </View>
        )
    }
}

const styles = StyleSheet.create({
    camara:{
        marginBottom: 0,
        paddingBottom: 10,
        padding:0, 
        height:25,
    },
    newpost:{
        color: 'black',
        marginLeft: 15,
        fontSize: 30,
        fontWeight: 'bold',
    },
    formContainer:{
        paddingHorizontal:5,
        marginTop: 60,
        marginHorizontal:30,
        padding: 25,
        borderWidth: 4,
        borderColor: "black",
        borderRadius: 6,
        marginLeft: 20,
        backgroundColor: 'lightgrey'
    },
    input:{
        height:25,
        paddingVertical:5,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: 'black',
        borderStyle: 'solid',
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

    }

})


export default PostForm;