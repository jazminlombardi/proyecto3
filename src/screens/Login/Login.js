import react, { Component } from 'react';
 import { auth } from '../../firebase/config';
 import {TextInput, TouchableOpacity, View, Text, StyleSheet, Image} from 'react-native';

 class Login extends Component {
     constructor(){
         super()
         this.state={
             email:'',
             password:''
         }
     }

     login (email, pass){
         auth.signInWithEmailAndPassword(email, pass)
             .then( response => {
                 //Cuando firebase responde sin error
                 console.log('Login ok', response);

                 //Cambiar los estados a vacío como están al inicio.


                 //Redirigir al usuario a la home del sitio.
                 this.props.navigation.navigate('Home')

             })
             .catch( error => {
                 //Cuando Firebase responde con un error.
                 console.log(error);
             })
     }

     render(){
         return(
             <View style={styles.formContainer}>
                <Image
                    style={styles.image}
                    source = {require('/assets/logo.png')}
                    resizeMode= "center"
                />
                 <Text style={styles.titulo}>Login</Text>
                 <TextInput
                     style={styles.input}
                     onChangeText={(text)=>this.setState({email: text})}
                     placeholder='email'
                     keyboardType='email-address'
                     value={this.state.email}
                     />
                 <TextInput
                     style={styles.input}
                     onChangeText={(text)=>this.setState({password: text})}
                     placeholder='password'
                     keyboardType='default'
                     secureTextEntry={true}
                     value={this.state.password}
                 />
                 <TouchableOpacity style={styles.button} onPress={()=>this.login(this.state.email, this.state.password)}>
                     <Text style={styles.textButton}>Ingresar</Text>    
                 </TouchableOpacity>
                 <Text style={styles.preg}>No tenes cuenta?</Text>
                 <TouchableOpacity onPress={ () => this.props.navigation.navigate('Register')} style={styles.registrate}>
                    <Text >Registrate</Text>
                 </TouchableOpacity>
             </View>
         )
     }
 }

 const styles = StyleSheet.create({
    titulo:{
        padding: 10,
        textAlign: 'left',
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        margin: 10,
    },

     formContainer:{
         paddingHorizontal:10,
         marginTop: 20,
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
         backgroundColor:'red',
         backgroundColor:"red",
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
    preg:{
        margin:5,
        marginTop:20
    },
    registrate:{
        backgroundColor:'white',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4,
        borderWidth:0.5, 
        borderColor:'lightgrey' ,    
    },
    


 })


 export default Login;