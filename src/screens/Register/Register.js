import react, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import {Image, TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-web';

 class Register extends Component {
     constructor(){
         super()
         this.state={
             email:'',
             userName:'',
             password:''
         }
     }
     componentDidMount(){
         console.log("Chequear si el usuario está loguado en firebase.");
         // Puse la funcionalidad aquí para probarla. No necesariamente debe ir en este componente.

         auth.onAuthStateChanged( user => {
             console.log(user)
             if( user ){
                 //Redirigir al usuario a la home del sitio.
                 this.props.navigation.navigate('Menu')
             }

         } )

     }

     register (email, pass, userName){
         auth.createUserWithEmailAndPassword(email, pass)
             .then( response => {
                 //Cuando firebase responde sin error
                 console.log('Registrado ok', response);

                  //Cambiar los estados a vacío como están al inicio.

                 //Crear una colección Users
                 db.collection('users').add({
                     owner:auth.currentUser.email,
                     userName: userName,
                     createdAt: Date.now(),
                 })
                 .then( res => console.log(res))

             })
             .catch( error => {
                 //Cuando Firebase responde con un error
                 console.log(error);

             })
     }

     render(){
         return(
        <View style={styles.formContainer}>
             <View style={styles.right}>
                <View style={styles.primerSeccion}>
                <Image
                    style={styles.image}
                    source = {require('/assets/logo.png')}
                    resizeMode= "center"
                />
                <TextInput
                     style={styles.input}
                     onChangeText={(text)=>this.setState({email: text})}
                     placeholder='email'
                     keyboardType='email-address'
                     value={this.state.email}
                     />
                <TextInput
                     style={styles.input}
                     onChangeText={(text)=>this.setState({userName: text})}
                     placeholder='user name'
                     keyboardType='default'
                     value={this.state.userName}
                     />
                <TextInput
                     style={styles.input}
                     onChangeText={(text)=>this.setState({password: text})}
                     placeholder='password'
                     keyboardType='default'
                     secureTextEntry={true}
                     value={this.state.password}
                 />
                
                <TouchableOpacity style={styles.button} onPress={()=>this.register(this.state.email, this.state.password, this.state.userName)}>
                    <Text style={styles.textButton}>Register</Text>    
                </TouchableOpacity>
            </View>
            
            <View style={styles.segundaSeccion}>
                <Text style={styles.text} >Already have an account?</Text>
                <TouchableOpacity style={styles.button} onPress={ () => this.props.navigation.navigate('Login')}>
                   <Text style={styles.textButton}>Login</Text>
                </TouchableOpacity>
            </View>
            
        </View>                    
        
        <Text style= {styles.footerText}> Cupito - Bordelois - Lombardi</Text>
        </View>
        
        )}}


 const styles = StyleSheet.create({
    formContainer:{
         paddingHorizontal:10,
         marginTop: 20,
         backgroundcolor: 'white'
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

 })


 export default Register;