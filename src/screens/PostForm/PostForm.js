import React, { Component } from 'react';
import {db, auth } from '../../firebase/config';
import {TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

class PostForm extends Component {
    constructor(){
        super()
        this.state={
           textoPost:'',
        }
    }

    //1)Completar la creación de posts
    crearPost(owner, textoPost, createdAt){
        //Crear la colección Users
        db.collection('posts').add({
            owner: owner, //auth.currentUser.email,
            textoPost: textoPost, //this.state.textoPost,
            createdAt: createdAt, //Date.now(), 
            likes: []
        })
        .then( res => console.log(res))
        .catch( e => console.log(e))
    }


    render(){
        return(
            <View style={styles.formContainer}>
                <Text>New Post</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({textoPost: text})}
                    placeholder='Escribir...'
                    keyboardType='default'
                    value={this.state.textoPost}
                    />
                <TouchableOpacity style={styles.button} onPress={()=>this.crearPost(auth.currentUser.email, this.state.textoPost, Date.now())}>
                    <Text style={styles.textButton}>Postear</Text>    
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
        backgroundColor:"white",
        margin:"10px",
        padding:"20px",
        borderRadius:"10px",
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'darkred',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
   
    },
    textButton:{
        color: 'white'
    }

})


export default PostForm;