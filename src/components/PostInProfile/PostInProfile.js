import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image} from 'react-native';
import { db, auth } from '../../firebase/config';
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase';

class PostInProfile extends Component {
    constructor(props){
        super(props)
        this.state={
            like: false,
            cantidadDeLikes: this.props.dataPost.datos.likes.length
        }
    }

    componentDidMount(){
        console.log("En PostInProfile")
        //Indicar si el post ya está likeado o no.
        if(this.props.dataPost.datos.likes.includes(auth.currentUser.email)){
            this.setState({
                like: true
            })
        }
        if(this.props.dataPost.datos.owner.includes(auth.currentUser.email)){
            this.setState({
                owner: true
            })
        }
    }


   likear(){
    //El post tendría que guardar una propiedad like con un array de los usuario que lo likearon.

    //update en base de datos
    db.collection('posts').doc(this.props.dataPost.id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then( res => {
        this.setState({
            like: true,
            cantidadDeLikes: this.props.dataPost.datos.likes.length
        })
    })
    .catch( e => console.log(e))


   }

   unLike(){
    //Quitar del array de likes al usario que está mirando el post.
    db.collection('posts').doc(this.props.dataPost.id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then( res => {
        this.setState({
            like: false,
            cantidadDeLikes: this.props.dataPost.datos.likes.length
        })
    })
    .catch( e => console.log(e))
   }
   
    deletePost(){
    db.collection('posts').doc(this.props.dataPost.id).delete()
    .then( res => {
        console.log('Post eliminado');
    })
    .catch( e => console.log(e))
   }

    render(){


        return(

            <View style={styles.unPostContainer}>
            <View style={styles.contenido}>

                <Text>{this.props.dataPost.datos.owner}</Text>
                <Image
                    style={styles.image}
                    source = {{uri: this.props.dataPost.datos.fotoUrl}}
                    resizeMode= "center"
                />
                <Text>{this.props.dataPost.datos.textoPost}</Text>


                {this.state.like ? 
                <TouchableOpacity onPress={()=>this.unLike()}>
                    <AntDesign name="heart" size={22} color="red" />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>this.likear()}>
                    <AntDesign name="hearto" size={22} color="black" />
                </TouchableOpacity>
                }
            {/* if para 1 like  o  x likeS */}
             {this.state.cantidadDeLikes == 1 ?
             <Text>{this.state.cantidadDeLikes} like</Text>
                    :
            <Text>{this.state.cantidadDeLikes} likes</Text>
             }

               
            {auth.currentUser.email == this.props.dataPost.datos.owner && 
                <TouchableOpacity style={styles.button} onPress={()=>this.deletePost()}>
                    <Text style={styles.textButton}>Delete post</Text>
                </TouchableOpacity>
                
                 } 
            </View>
            </View>

            
            
        )
    }
}

const styles = StyleSheet.create({
    //CONTENEDOR GENERAL
    unPostContainer:{
        flex: 1,
        backgroundColor: 'rgb(235, 235, 235)',
        borderRadius: 6,
        marginHorizontal: 20,
        padding: 5,
        marginVertical: 5
    },
    contenido:{
        margin:5
    },

    image: {
        height: 80,
        width: "100%",
    
    },
    button:{
        backgroundColor:'rgb(228, 33, 33)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        margin:5


    },
    textButton:{
        color: 'white',
        margin:5

    },

})


export default PostInProfile;