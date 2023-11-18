import React, { Component } from 'react';
 import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
 import { db, auth } from '../../firebase/config';
 import { AntDesign } from '@expo/vector-icons';
 import firebase from 'firebase';

 class Post extends Component {

     constructor(props){
         super(props);

         this.state = {
             like: false,
             cantidadDeLikes: this.props.dataPost.datos.likes.length
         }
     }

     componentDidMount() {
        //Chequear si el usuario está autenticado y luego ver si le gusta el post
        const user = auth.currentUser;
        if (user && this.props.dataPost.datos.likes.includes(user.email)) {
            this.setState({
                like: true
            });
        }
    }
    

     //Necesitamos en FB que cada Post tenga una propiedad con un array de emails

     likear(){
         //Agrega un email en la propiedad like del post.
         db.collection('posts').doc(this.props.dataPost.id).update({
             likes:firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
         })
         .then( res => this.setState({
             like: true,
             cantidadDeLikes: this.props.dataPost.datos.likes.length
         })

         )
         .catch( e => console.log(e))
     }

     unlike(){
         //Quita un email en la propiedad like del post.
         db.collection('posts').doc(this.props.dataPost.id).delete({
             likes:firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
         })
         .then( res => this.setState({
             like: false,
             cantidadDeLikes: this.props.dataPost.datos.likes.length
         })

         )
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
         console.log(this.props)
         return (

             <View style={styles.unPostContainer}>
             <TouchableOpacity onPress={()=>this.props.navigation.navigate('OtroPerfil', {mailUser: this.props.dataPost.datos.owner})} activeOpacity={0.7}>
                <Text>{this.props.dataPost.datos.owner}</Text>                     
             </TouchableOpacity>
             {/* <Text>{this.props.dataPost.datos.owner}</Text> */}
             <Image
                 style={styles.image}
                 source = {{uri: this.props.dataPost.datos.fotoUrl}}
                 resizeMode= "center"
             />
             <Text style= {styles.textoPost}>{this.props.dataPost.datos.textoPost}</Text>

             {/* if para 1 like  o  x likeS */}
             {this.state.cantidadDeLikes == 1 ?
             <Text>Este post tiene {this.state.cantidadDeLikes} like</Text>
                    :
            <Text>Este post tiene {this.state.cantidadDeLikes} likes</Text>
             }

             {/* if para like y unlike */}
             {this.state.like ? 
             <TouchableOpacity style={styles.unlike} onPress={()=>this.unLike()} activeOpacity={0.7}>
                <Text style={styles.textButton}>Quitar like</Text>                     
             </TouchableOpacity>
             
             :
             <TouchableOpacity style={styles.like} onPress={()=>this.likear()} activeOpacity={0.7}>
                <Text style={styles.textButton}>Like</Text>    
             </TouchableOpacity>
             }

            
         {auth.currentUser.email == this.props.dataPost.datos.owner && 
             <TouchableOpacity style={styles.deletebutton} onPress={()=>this.deletePost()} activeOpacity={0.7}>
                 <Text style={styles.deletetextButton}>Delete post</Text>
             </TouchableOpacity>
              } 
             
         </View>
         )
     }

 }

 const styles = StyleSheet.create({
     formContainer:{
         paddingHorizontal:10,
         marginTop: 20,
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
        marginTop:4,
        marginBottom:4,

    },
    deletebutton:{
        backgroundColor:'lightgrey',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        marginTop:4,
        marginBottom:4,

    },
    unlike:{
        backgroundColor:'darkred',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        marginTop:4,
        marginBottom:4,

    },

    like:{
        backgroundColor:'lightgrey',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4,
        marginTop:4,
        marginBottom:4,
    },


    textButton:{
        color: 'white'
    },
    deletetextButton:{
        color: 'darkred'
    },
     unPostContainer:{
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 6,
        marginHorizontal: 20,
        padding: 5,
        marginVertical: 5
    },

    image: {
        height: 100,
        width: "100%",
        alignContent:"flex-start"
    
    },
    textoPost:{
        textAlign:"center",
        fontSize:"18px",
        fontStyle:"bold"
    }
 })

 export default Post;