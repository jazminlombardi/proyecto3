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
         db.collection('posts').doc(this.props.dataPost.id).update({
             likes:firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
         })
         .then( res => this.setState({
             like: false,
             cantidadDeLikes: this.props.dataPost.datos.likes.length
         })

         )
         .catch( e => console.log(e))
     }


     render(){
         console.log(this.props)
         return (
/*              <View>
                 <Text>{ this.props.dataPost.datos.email }</Text>
                 <Image
                    style={styles.image}
                    source = { this.props.dataPost.datos.fotoURL }
                    resizeMode= "center"
                />                 
                 <Text>{ this.props.dataPost.datos.textoPost }</Text>
                 <Text>Cantidad de Likes:{ this.state.cantidadDeLikes }</Text>
                 {
                     this.state.like ?
                         <TouchableOpacity style={styles.button} onPress={()=>this.unlike()}>
                             <Text style={styles.textButton}>unLike</Text>    
                         </TouchableOpacity>

                         :

                         <TouchableOpacity style={styles.button} onPress={()=> this.likear()} >
                             <Text style={styles.textButton}>Likear</Text>    
                         </TouchableOpacity>
                 }

             </View>
 */
             <View style={styles.unPostContainer}>
             <Text>{this.props.dataPost.datos.owner}</Text>
             <Image
                 style={styles.image}
                 source = {this.props.dataPost.datos.fotoUrl}
                 resizeMode= "center"
             />
             <Text>{this.props.dataPost.datos.textoPost}</Text>
             <Text>Likes: {this.state.cantidadDeLikes}</Text>


             {this.state.like ? 
             <TouchableOpacity onPress={()=>this.unLike()}>
                 <AntDesign name="heart" size={22} color="red" />
             </TouchableOpacity>
             :
             <TouchableOpacity onPress={()=>this.likear()}>
                 <AntDesign name="hearto" size={22} color="black" />
             </TouchableOpacity>
             }

            
         {auth.currentUser.email == this.props.dataPost.datos.owner && 
             <TouchableOpacity style={styles.button} onPress={()=>this.deletePost()}>
                 <Text style={styles.textButton}>Delete post</Text>
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

    },
    textButton:{
        color: 'white'
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
 })

 export default Post;