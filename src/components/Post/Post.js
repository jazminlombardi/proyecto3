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
                <Text style={styles.text}>{this.props.dataPost.datos.owner}</Text>                     
             </TouchableOpacity>
             <Image
                 style={styles.image}
                 source = {this.props.dataPost.datos.fotoUrl}
                 resizeMode= "center"
             />
             <Text style= {styles.textoPost}>{this.props.dataPost.datos.textoPost}</Text>

             {/* if para like y unlike */}
{/*              {this.state.like ? 
             <TouchableOpacity style={styles.unlike} onPress={()=>this.unLike()} activeOpacity={0.7}>
                <Text style={styles.textButton}>Quitar like</Text>                     
             </TouchableOpacity>
             
             :
             <TouchableOpacity style={styles.like} onPress={()=>this.likear()} activeOpacity={0.7}>
                <Text style={styles.textButton}>Like</Text>    
             </TouchableOpacity>
             } */}
                {this.state.like ? 
                <TouchableOpacity onPress={()=>this.unike()}>
                    <AntDesign name="heart" size={22} color="red" style={styles.text} />
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>this.likear()}>
                    <AntDesign name="hearto" size={22} color="black" style={styles.text} />
                </TouchableOpacity>
                }

                             {/* if para 1 like  o  x likeS */}
             {this.state.cantidadDeLikes == 1 ?
             <Text style={styles.text}>{this.state.cantidadDeLikes} like</Text>
                    :
            <Text style={styles.text}>{this.state.cantidadDeLikes} likes</Text>
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

    button:{
       backgroundColor:'rgb(228, 33, 33)',
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
       backgroundColor:'rgb(228, 33, 33)',
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
       color: 'rgb(228, 33, 33)'
   },
    unPostContainer:{
       flex: 1,
       backgroundColor: '#ffffff',
       borderRadius: 6,
       marginHorizontal: 20,
       padding: 5,
       marginVertical: 5,
       width:'70%',
       alignSelf:'center'
   },
   image: {
       height: 200,
       width: '100%',
       alignContent:"flex-start",

   
   },
   textoPost:{
       textAlign:"center",
       fontSize:"18px",
       fontStyle:"bold"
   },
   text:{
    margin:10,
    textAlign:'center'
   }
})
 export default Post;