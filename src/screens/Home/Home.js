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
             <View style = {styles.home}>
                <Image
                    style={styles.image}
                    source = {require('/assets/isologo.png')}
                    resizeMode= "center"
                />
                 <Text style={styles.screenTitle} >HOME</Text>
                 <TouchableOpacity style={styles.button} onPress={()=>this.logout()}>
                     <Text style={styles.logout}>Logout</Text>
                 </TouchableOpacity>


            {/* Botón para ir a la pantalla de log in */}

                 <Text style={styles.title}>Foodies Feed</Text>

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
    home:{
        backgroundColor:"f1f1f1"
    },

    screenTitle:{
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20,
        marginVertical: 0
    },

    logout:{
        color: 'white'
    },
    title:{
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        marginVertical: 10
    },

      button: {
        marginTop: 20,
        marginLeft: 20,
        padding: 10,
        backgroundColor: 'darkred',
        borderRadius: 4,
        width:"fit-content",
      },

      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        
      },
      image:{
            height: 150,
            paddingBottom: 5,
      }

    
 })


 export default Home;