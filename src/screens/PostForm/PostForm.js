import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import MyCamera from '../../components/MyCamara/MyCamara';
import * as ImagePicker from 'expo-image-picker';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';

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
/*             userName: userName,
 */         textoPost: textoPost, //this.state.textoPost,
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

    async pickImage() {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
    
          if (!result.cancelled) {
            this.setState({ fotoUrl: result.uri });
          }
        } catch (e) {
          console.log(e);
        }
      }


    render(){
        return(
            <View>
                <Image
                    style={styles.image}
                    source = {require('/assets/logo.png')}
                    resizeMode= "center"
                />
            <View style={styles.formContainer}>

                <Text style={styles.newpost}>New Post</Text>
                <TouchableOpacity onPress={() => this.pickImage()} style={styles.pickimage}>
                    <Text>Subir imagen</Text>
                </TouchableOpacity>

                <MyCamera style={styles.camara} trearUrlDelaFoto={ (url) => this.trearUrlDelaFoto(url) }/>

                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({textoPost: text})}
                    placeholder='Escribir un pie de foto...'
                    keyboardType='default'
                    value={this.state.textoPost}
                    />
                {this.state.fotoUrl !== ''? 
                <TouchableOpacity style={styles.button} onPress={()=>this.crearPost(auth.currentUser.email, this.state.textoPost, this.state.fotoUrl, Date.now())}>
                    <Text style={styles.textButton}>Postear</Text>    
                </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.button} >
                    <Text style={styles.textButton}>Postear</Text>    
                    </TouchableOpacity>
                }

                {this.state.showSuccessMessage && (
                    <View style={styles.successMessageContainer}>
                        <Text style={styles.successMessageText}>
                            Tu post ya está disponible en tu perfil
                        </Text>
                    </View>
                )}

            </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    pickimage:{
        backgroundColor:'rgb(244, 236, 236)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:6, 
        marginLeft: 13,
        marginRight: 13,

    },
    image:{
        // height: 100,
        // paddingBottom: 5,
        // width: 50
        alignSelf: "center",
        height: "10%",
        width:"20%",
  },
    camara:{
        marginBottom: 0,
        paddingBottom: 10,
        width:'100%',

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
        height:'fit-content',
        paddingHorizontal:5,
        marginTop: 5,
        marginHorizontal:30,
        padding: 25,
        borderRadius: 6,
        backgroundColor: 'white'
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
        borderWidth:1,
        borderColor:'lightgrey',
    },
    button:{
        backgroundColor:'rgb(228, 33, 33)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:6, 
        marginLeft: 13,
        marginRight: 13,
    
    },
    textButton:{
        color: 'white',
        textAlign:'center',


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