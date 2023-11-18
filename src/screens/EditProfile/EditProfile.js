import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { db, auth } from '../../firebase/config';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            userName: '',
            bio: '',
            profileImage: '',
            idUser: this.props.route.params.idUser
        }
    }
    guardarCambios() {
        console.log();
        let id = this.state.idUser
        db.collection('users')
            .doc(id)
            .update({
                userName: this.state.userName,
                bio: this.state.bio,
                profileImage: this.state.profileImage,
            })
            .then(() => {
                console.log('Perfil actualizado exitosamente');
            })
            .catch((error) => {
                console.error('Error al actualizar el perfil', error);
            });
    }
    render() {
        console.log(this.state);
        return (
            <View style={styles.formContainer}>

                <Text style={styles.volver}onPress={() => this.props.navigation.navigate("MiPerfil")}>
                Volver a Mi perfil
                </Text>

                <Text style={styles.titulo}>Edita tu perfil</Text>
                <TextInput style={styles.input}
                    keyboardType='default'
                    placeholder="Nuevo nombre de usuario"
                    onChangeText={(text) => this.setState({ userName: text })}
                    value={this.state.userName}
                />
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder="Nueva mini bio"
                    onChangeText={(text) => this.setState({ bio: text })}
                    value={this.state.bio}
                />
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder="URL de la nueva foto de perfil"
                    onChangeText={(text) => this.setState({ profileImage: text })}
                    value={this.state.profileImage}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.guardarCambios()}>
                    <Text style={styles.textButton}> Guardar Cambios</Text>
                </TouchableOpacity>
                
            </View>
        )
    }

}

const styles = StyleSheet.create({
    formContainer:{
         paddingHorizontal:10,
         marginTop: 20,
         backgroundcolor: 'white',
         margin: 10,

     },
    right:{
        flex: 1,
        justifyContent: 'center',
    },
    text:{
        paddingTop:20,
        paddingBottom:7,
        color:"darkred"

    },
    firstBox:{
        backgroundColor: 'white',
        borderRadius: 6,
        padding: 70,
        marginVertical: 20,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    secondBox:{
        borderRadius: 6,
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 20,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'white',
        alignItems: 'center', 
    },

     input:{
         height:20,
         paddingVertical:15,
         paddingHorizontal: 10,
         backgroundColor:"white",
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
     image: {
        height: 80,
        width: "100%",
    },
    footerText: {
        textAlign: 'center',
        fontSize: 13,
        color: 'darkred',
        paddingTop:10,
    },
    titulo:{
        padding: 10,
        textAlign: 'left',
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        margin: 10,
    },
    volver:{
        margin: 10,

    },


 })




export default EditProfile