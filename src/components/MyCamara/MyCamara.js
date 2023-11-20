import React, {Component} from 'react';
import {Camera} from 'expo-camera';
import {db, storage} from '../../firebase/config';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';

class MyCamera extends Component{
    constructor(props){
        super(props),
        this.state = {
            permisosDeHardware: false,
            urlInternaFoto: '',
            mostrarLaCamara: true, //Para elegir si queremos mostrar cámara o preview de foto.
        }
        
        this.metedosDeCamara = '' //Guardar los métodos internos de la cámara.

    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
            .then( ()=>{
                this.setState({
                    permisosDeHardware: true,
                })
            })
            .catch( e => console.log(e))
    }

    sacarFoto(){
        console.log("Sacando la foto...");

        this.metedosDeCamara.takePictureAsync()
            .then( photo => {
                this.setState({
                    urlInternaFoto: photo.uri, //url interna de la foto.
                    mostrarLaCamara: false,
                })
            })
            .catch( e => console.log(e))

    }

    cancelar(){
        console.log("Cancelando...");
        this.setState({
            urlInternaFoto: '',
            mostrarLaCamara: true,
        })
    }

    guardarLaFotoEnStorage(){
        fetch(this.state.urlInternaFoto)
            .then( res => res.blob())
            .then( image => {
                const ruta = storage.ref(`photo/${Date.now()}.jpg`); //storage retorna un Objeto Literal
                ruta.put( image )
                    .then( () => {
                        ruta.getDownloadURL() //la url de guardado en internet de la foto.
                            .then( url => { //url en internet

                                //Pasarle la info de la url al formulario de Posteo.
                                this.props.trearUrlDelaFoto(url);
                                this.setState({
                                    urlInternaFoto: ''
                                })
                            })
                    })


            })
            .catch(e=>console.log(e))

    }


    render(){
        console.log(this.state.photo)

        //El return tiene que mostrar la cámara o el preview de la foto con las opciones de cancelar o confirmar.
        return(
            <View style={ styles.container}>

                {
                    this.state.permisosDeHardware === true ?
                        this.state.mostrarLaCamara === false ?
                        <React.Fragment>
                            <Image 
                                source={{uri:this.state.urlInternaFoto}}
                                style={ styles.cameraBody}
                            />
                            <View style={styles.confirm}>
                                <TouchableOpacity style={styles.cancelButton} onPress={()=>this.cancelar()}>
                                    <Text style={styles.textButton}>Cancelar</Text>
                                </TouchableOpacity>
                                <View style={styles.atencion}>
                                <Text style={styles.atencion}>Atencion!</Text>
                                <Text style={styles.atencion}>Clickear ACEPTAR para guardar la foto correctamente. Clickear CANCELAR para tomarla de nuevo</Text>
                                </View>
                                <TouchableOpacity style={styles.confirmButton} onPress={()=>this.guardarLaFotoEnStorage()}>
                                    <Text style={styles.textButton}>Aceptar</Text>
                                </TouchableOpacity>
                            </View>
                        </React.Fragment>

                        :
                        <React.Fragment>
                            <Camera
                                style = { styles.cameraBody }
                                type={ Camera.Constants.Type.front}
                                ref={ metedosDeCamara => this.metedosDeCamara = metedosDeCamara}
                            />
                            <TouchableOpacity style = { styles.button } onPress={()=>this.sacarFoto()}>
                                <Text style = { styles.textButton }>Sacar Foto</Text>
                            </TouchableOpacity> 
                        </React.Fragment>
                        :
                        <Text>La cámara no tiene permisos para ser usada</Text>
                }



            </View>
        )
    }

}

const styles = StyleSheet.create({
    container:{
        height:"60vh",
        marginBottom: 20,
        marginHorizontal:5,
        padding: 15,
        width:'100%',

        
    },
    cameraBody: {
      marginTop: 20,
      marginBottom: 10,
      width:'100%',
      height:"40vh",
      borderRadius:"10px"

    },
    button:{
        backgroundColor:'rgb(244, 236, 236)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        width:'100%',


    },
    textButton:{
        color: 'darkred',
        textAlign: "center"
    },
    confirm:{
        flexDirection:"row",
        justifyContent: "space-between",
    },
    confirmButton:{
        backgroundColor:'rgb(228, 33, 33)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
    },
    cancelButton:{
        backgroundColor:'rgb(228, 33, 33)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
    },
    atencion:{
        display:'flex',
        flexDirection:'column',
        color:'red',
        textAlign:'center'


    },
})

export default MyCamera