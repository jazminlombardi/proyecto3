import react, { Component } from 'react';
import { db, auth } from '../../firebase/config';
import {Image, TextInput, TouchableOpacity, View, Text, StyleSheet} from 'react-native';

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
                 this.props.navigation.navigate('Home')
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
                     <Text style={styles.textButton}>Registrarse</Text>    
                 </TouchableOpacity>
                 <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')}>
                    <Text>Ya tengo cuenta. Ir al login</Text>
                 </TouchableOpacity>
             </View>
             </View>

         
         )
     }
 }

 const styles = StyleSheet.create({
      formContainer:{
         paddingHorizontal:10,
         marginTop: 20,
     },
     right:{
        flex: 1,
        justifyContent: 'center',
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
        height:40,
        width:"auto",
        backgroundColor:'darkred',
        borderRadius:8, 
     },
     textButton:{
         color: 'white'
     },
     image: {
        height: 80,
        width: "100%",
    
    },
 
 })


 export default Register;