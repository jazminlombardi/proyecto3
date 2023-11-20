import react, { Component } from 'react';
import {TextInput, TouchableOpacity, View, Text, StyleSheet, Button, Image, Modal} from 'react-native';
import { db, auth } from '../../firebase/config';
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase';

class PostInProfile extends Component {
    constructor(props){
        super(props)
        this.state={
            like: false,
            showModal: false,
            deleteConfirmation: false, // Nueva bandera de estado
            cantidadDeLikes: this.props.dataPost.datos.likes.length,
            cantidadDeComentarios: this.props.dataPost.datos.comentarios ? this.props.dataPost.datos.comentarios.length : 0,

        }
    }

    componentDidMount(){
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
   
   deletePost() {
    db.collection('posts')
        .doc(this.props.dataPost.id)
        .delete()
        .then(res => {
            console.log('Post eliminado');
            this.setState({ showModal: false, deleteConfirmation: false }); // Actualizar ambos estados después de eliminar el post
        })
        .catch(e => console.log(e));
}


    render(){


        return(

            <View style={styles.unPostContainer}>
            <View style={styles.contenido}>

                <Text style={styles.text}>{this.props.dataPost.datos.owner}</Text>
                <Image
                    style={styles.image}
                    source = {this.props.dataPost.datos.fotoUrl}
                    resizeMode= "center"
                />
                <Text style={styles.text}>{this.props.dataPost.datos.textoPost}</Text>


                {this.state.like ? 
                <TouchableOpacity onPress={()=>this.unLike()}>
                    <AntDesign name="heart" size={22} color="red" style={styles.text}/>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={()=>this.likear()}>
                    <AntDesign name="hearto" size={22} color="black" style={styles.text}/>
                </TouchableOpacity>
                }
            {/* if para 1 like  o  x likeS */}
             {this.state.cantidadDeLikes == 1 ?
             <Text style={styles.text}>{this.state.cantidadDeLikes} like</Text>
                    :
            <Text style={styles.text}>{this.state.cantidadDeLikes} likes</Text>
             }

                              {/* if para 1 coment  o  x comentS */}

            {this.state.cantidadDeComentarios == 1 ? 
            <Text style = {styles.text} >{this.state.cantidadDeComentarios} Comentario</Text>
            :
            <Text style = {styles.text} >{this.state.cantidadDeComentarios} Comentarios</Text>
            }
            

               
            {auth.currentUser.email === this.props.dataPost.datos.owner && (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.setState({ showModal: true, deleteConfirmation: true })} // Cambiar la bandera de estado al hacer clic
                    >
                        <Text style={styles.textButton}>Eliminar post</Text>
                    </TouchableOpacity>
                )}

                {/* Modal para confirmar la eliminación del post */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showModal && this.state.deleteConfirmation} // Asegurarse de que el modal se muestre solo si se activa la bandera de confirmación
                    onRequestClose={() => this.setState({ showModal: false, deleteConfirmation: false })}
                >
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>¿Estás seguro de que deseas eliminar este post?</Text>
                            <View style={styles.modalButtons}>
                                <Button title="Cancelar" onPress={() => this.setState({ showModal: false, deleteConfirmation: false })} color='lightgrey'/>
                                <Button title="Eliminar" onPress={() => this.deletePost()} color="red" />
                            </View>
                        </View>
                </Modal>
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
        paddingHorizontal: 50,
        paddingVertical:5,
        margin: 5,

    },
    contenido:{
        margin:5,
        textAlign:'center',
        justifyContent:'center',


    },
    text:{
        textAlign:'center'
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

        // Estilos para el modal

        modalView: {
            margin: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 15,
            borderWidth:2,
            borderColor:'lightgrey',

        },
        modalText: {
            marginBottom: 15,
            textAlign: 'center',
        },
        modalButtons: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            
        },
})


export default PostInProfile;