import react, { Component } from 'react';
 import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image} from 'react-native';
 import { db, auth } from '../../firebase/config';
 import PostForm from '../PostForm/PostForm';
 import Post from '../../components/Post/Post';

 class Home extends Component {
     constructor(){
         super()
         this.state={
             posts:[]
         }
     }

     componentDidMount(){
         //Traer los datos de Firebase y cargarlos en el estado.
         db.collection('posts').onSnapshot(
             listaPosts => {
                 let postsAMostrar = [];

                 listaPosts.forEach(unPost => {
                     postsAMostrar.push({
                         id:unPost.id,
                         datos: unPost.data()            
                     })
                 })

                 this.setState({
                     posts:postsAMostrar
                 })
             }
         )

     }


     logout(){
         auth.signOut();
          //Redirigir al usuario a la home del sitio.
         // this.props.navigation.navigate('Login')
     }

     render(){
         console.log(this.state);
         return(

             <View>
                <Image
                    style={styles.image}
                    source = {require('/assets/logo.png')}
                    resizeMode= "center"
                />
                 <Text style={styles.screenTitle} >HOME</Text>
                 <TouchableOpacity onPress={()=>this.logout()}>
                     <Text>Logout</Text>
                 </TouchableOpacity>
            {/* Botón para ir a la pantalla de registro */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('Register')}>

                     <Text style={styles.buttonText}>Ir a Registro</Text>
                 </TouchableOpacity>

            {/* Botón para ir a la pantalla de log in */}

                 <Text style={styles.title}>Crear nuevo post</Text>
                 <PostForm />

                 <Text>Lista de posteos creados</Text>

                 <FlatList
                     data={this.state.posts}
                     keyExtractor={ unPost => unPost.id }
                     renderItem={ ({item}) => <Post dataPost = {item} />  }
                 />

             </View>
         )
     }
 }

 const styles = StyleSheet.create({

    //CONTENEDOR GENERAL
    screenTitle:{
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20,
        marginVertical: 10
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        marginVertical: 10
    },

      button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'darkred',
        borderRadius: 4,
        width:"fit-content",
      },

      buttonText: {
        color: 'white',
        fontWeight: 'bold',
      },

    
 })


 export default Home;