 import react, { Component } from 'react';
 import {TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList, Image} from 'react-native';
 import { db, auth } from '../../firebase/config';
import Post from '../../components/Post/Post';
import { ScrollView } from 'react-native-web';

 class Home extends Component {
     constructor(){
         super()
         this.state={
             posts:[]
         }
     }

     componentDidMount(){
         //Traer los datos de Firebase y cargarlos en el estado.
         db.collection('posts').where('owner', '!=', auth.currentUser.email)
         .onSnapshot(
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
             <ScrollView style = {styles.home}>
                <Image
                    style={styles.image}
                    source = {require('/assets/logo.png')}
                    resizeMode= "center"
                />
                 <Text style={styles.screenTitle} >HOME</Text>
                 <TouchableOpacity style={styles.button} onPress={()=>this.logout()}>
                     <Text style={styles.logout}>Logout</Text>
                 </TouchableOpacity>


            {/* Botón para ir a la pantalla de log in */}

                 <Text style={styles.title}> Feed</Text>

                 <FlatList
                    data={this.state.posts}
                    keyExtractor={ unPost => unPost.id }
                    renderItem={ ({item}) => <Post dataPost = {item} />  }
                /> 

               

             </ScrollView>
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
        backgroundColor: 'rgb(228, 33, 33)',
        borderRadius: 4,
        width:"fit-content",
      },

      buttonText: {
        color: 'white',
        fontWeight: 'bold',
        
      },
      image:{
            // height: 100,
            // paddingBottom: 5,
            // width: 50
            alignSelf: "center",
            height: "10%",
            width:"20%",
      }

    
 })


 export default Home;