import { Text, View, TextInput, TouchableOpacity, StyleSheet,FlatList} from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import firebase from 'firebase'

class Comment extends Component{
    constructor(props){
        super(props)
        this.state = {
            newComment: "",
            id: "",
            data: {},
        }
    }
    componentDidMount(){
        db.collection("posts")
        .doc(this.props.route.params.id)
        .onSnapshot(doc=>{
            this.setState({id:doc.id,data:doc.data()})
        })
    }
    addComment(id,comentario){
        db.collection("posts")
        .doc(id)
        .update({
            comentarios: firebase.firestore.FieldValue.arrayUnion({
                owner:auth.currentUser.email,
                createdAt:Date.now(),
                comentario:comentario
            })
        })

    }
    render() {
        return (
          <View style={styles.container}>

            <Text onPress={() => this.props.navigation.navigate("Home")} style={styles.volverH}>
              Volver a home
            </Text>

            {this.state.data.comentarios && this.state.data.comentarios.length > 0 ? (
              <View>
                <FlatList
                  data={this.state.data.comentarios}
                  keyExtractor={item => item.createdAt.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.commentContainer}>
                      <Text style={styles.userText}>{item.owner}:</Text>
                      <Text>{item.comentario}</Text>
                    </View>
                  )}
                />
              </View>
            ) : (
              <Text>No hay comentarios aún.</Text>
            )}

              <TextInput
                onChangeText={text => this.setState({ newComment: text })}
                keyboardType='default'
                placeholder='Agrega un comentario'
                value={this.state.newComment}
                style={styles.input}
              />
              <TouchableOpacity onPress={() => this.addComment(this.state.id, this.state.newComment)} style={styles.button}>
                <Text style={styles.textButton}>Comentar</Text>
              </TouchableOpacity>
          </View>
        );
      }
    }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  commentContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingBottom: 10,
    margin: 10,
  },
  userText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },

  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
 
    input:{
      height:20,
      paddingVertical:15,
      paddingHorizontal: 10,
      borderWidth:1,
      borderColor:"lightgrey",
      borderRadius: 6,
      marginVertical:10,
  },

  button:{
    backgroundColor:'red',
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: 'center',
    borderRadius:4, 
 },
 textButton:{
     color: 'white'
 },
  
 volverH:{
  backgroundColor:'lightgrey',
  color:'white',
  padding:8,
  borderRadius:30,
  textAlign:'center',
  justifyContent:'center'
},
});

export default Comment;
