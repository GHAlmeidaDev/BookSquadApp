
import { StyleSheet, Alert, Text, TextInput, Button, View, Image, RefreshControl, ScrollView, TouchableOpacity, TouchableHighlight, ImageBackground, Dimensions } from 'react-native';
import { API, graphqlOperation, Amplify } from 'aws-amplify'
import Modal from 'react-native-modal';
import { listBooks } from '../../graphql/queries'
import {deleteBook, updateBook} from '../../graphql/mutations';
import { createBook } from '../../graphql/mutations';
import { AntDesign, Foundation, FontAwesome, FontAwesome5, Entypo, Feather, SimpleLineIcons } from "@expo/vector-icons";
import colors from "../component/colors";
import { Avatar } from 'react-native-paper';
import { logoutUser } from '../api/auth-api';
import * as ImagePicker from 'expo-image-picker'
import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
const { width } = Dimensions.get('window');

export default function livros () {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hide, setHide] = useState(false);


  const getModal = () => {
    setIsVisible(true);
  }

  const getModal2 = () => {
    setHide(true);
  }

      
  
  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }
  
  const addTodo = async () => {
    const input = { name, description, image};
    const result = await API.graphql(graphqlOperation(createBook, {input}));
    const newTodo = result.data.createBook;
    const updateBook = [newTodo, ...books];
    setBooks(updateBook);
    setName('');
    setDescription('');
    setImage('');
    setIsVisible(false)
    setHide(false)
  }
    useEffect(() => {
      fetchTodos();
    }, []);

    async function fetchTodos() {
      try {
        const booksData = await API.graphql(graphqlOperation(listBooks));
        const books = booksData.data.listBooks.items;
        console.log(books);
        setBooks(books);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log('Error fetching data');
      }
    }
  
   


  const removeTodo = async id => {
    try {
      const input = { id };
      const result = await API.graphql(
        graphqlOperation(deleteBook, {
          input
        })
      );
      const deleteBookId = result.data.deleteBook.id;
      const updateBook = books.filter(books => books.id !== deleteBookId);
      setBooks(updateBook);
    } catch (err) {
      console.log(err);
    }
  };

  

  const _getPhotoLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,

      aspect: [4, 3]
    });
    if (!result.cancelled) {
      setImage(  result.uri );
    }

  }



  
    
    return (


      <View >
        <View style={{ backgroundColor: "black", marginTop: 30 }}>


          <View
            style=
            {{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 3,
              marginTop: 0,
              paddingLeft: 10,
              paddingTop: -10,
              marginRight: 0,
              paddingBottom: 30,
              height: 70,
              backgroundColor: '#9FE6CF'
            }}>
            <TouchableOpacity

              onPress={logoutUser}
            >

              <SimpleLineIcons style={{ paddingLeft: 10, paddingTop: 25 }} name="logout" size={24} color="black" />

            </TouchableOpacity>
            <TouchableOpacity onPress={getModal} >
              <Feather style={{ paddingLeft: 10, paddingTop: 25, marginRight: 30 }} name="plus-square" size={24} color="black" />
            </TouchableOpacity>
          </View>


         

          <View style={styles.container2}>
            <Modal
              animationType={'slide'}
              transparent={false}
              visible={isVisible}
              onRequestClose={() => {
                this.setState({ isVisible: false });
              }}
            >

              <TextInput
                style={styles.input}
                value={name}
                onChangeText={text  => setName(text)}
                placeholder="Nome do livro..."
              />
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={text => setDescription(text)}
                placeholder="O que você pensa dele ?"
              />


              <View style={{ width: '95%', paddingLeft: 20, }}>

                <Button disabled={!image || !name || !description} onPress={addTodo} title="Postar" color="#9FE6CF" />
              </View>




              <View style={styles.activeImageContainer}>
                {image ? (
                  <Image source={{ uri: image }} style={{ flex: 1 }} />

                ) : (
                    <View />
                  )}
              </View>

              <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

                <TouchableOpacity>
                  <TouchableOpacity
                    onPress={_getPhotoLibrary}
                    value={image}
                    title="Escolha a Imagem"

                  >

                    <AntDesign name="pluscircle" size={24} color="black" />

                  </TouchableOpacity>
                </TouchableOpacity>





              </View>
              <TouchableOpacity
                style={{ marginBottom: 60, alignItems: 'center' }}
                onPress={setIsVisible}>
                <Entypo name="arrow-left" size={50} color="black" />
              </TouchableOpacity>

            </Modal>




          </View>
        </View>


        <View style={styles.container}>
          <ScrollView
            style={{ height: "70%", paddingTop: 10 }}

          >

          {loading && (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator size="large" color="tomato" />
                    </View>
                  )}

            {books.map((book, index) => (
              <View elevation={10} key={index} style={styles.book}>


                <View style={styles.iconDivView2}>


                  <View style={styles.icons}>
                    <Avatar.Image style={{ marginRight: 20 }} size={50} source={require('../../assets/icon.png')} />


                    <Text style={{ color: 'white', marginTop: 15, fontWeight: 'bold', }}>{book.name}</Text>
                  </View>


                  <View style={styles.icons2}>
                    <TouchableOpacity onPress={getModal2} style={{ paddingRight: 20, marginTop: 25, alignContent: 'center' }}>
                      <Entypo style={{ color: 'white', fontWeight: 'bold' }} name="dots-three-vertical" size={24} color="white" />
                    </TouchableOpacity>


                    <Modal visible={hide} onRequestClose={() => {
                this.setState({ hide: false });
              }}style={{ justifyContent: 'flex-end', }}>


                      <View style={{ backgroundColor: "white", height: 120, borderRadius: 30, marginBottom: -10 }}>
                        <View style={styles.menu}>
                        
                          <TouchableOpacity onPress={() => removeTodo(book.id)}>
                              
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#565656' }}>Delete</Text>
                          </TouchableOpacity>
                          
                          <TouchableOpacity onPress={setHide}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#565656' }}>Cancel</Text>
                          </TouchableOpacity>
                        </View>

                      </View>
                      <View style={{ flexDirection: 'row' }}>


                      </View>

                    </Modal>


                  </View>


                </View>


                <View>



                  <Image style={styles.postImage} style={{ width: "100%", height: 500, alignContent: 'center', paddingBottom: 20 }} source={{ uri: book.image }} />



                </View>

                < View style={styles.icons}>

                  <TouchableHighlight
                    style={styles.iconDiv}
                    underlayColor={colors.light}
                    onPress={() => this.props.navigation.navigate("livros")}
                  >

                    <View style={styles.iconDivView}>
                      <FontAwesome5 name="book" size={24} color="white" />

                    </View>
                  </TouchableHighlight>

                  <TouchableHighlight
                    style={styles.iconDiv}
                    underlayColor={colors.light}
                    onPress={() => this.props.navigation.navigate("livros")}
                  >

                    <View style={styles.iconDivView}>
                      <FontAwesome5 name="comments" size={24} color="white" />

                    </View>
                  </TouchableHighlight>







                </View>

                <View
                  style=
                  {{
                    color: 'white', display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    paddingLeft: 20,

                    marginBottom: 10
                  }}>

                  <Text style={{ color: 'white', paddingRight: 5, paddingLeft: 5, fontWeight: 'bold' }}>Descrição: </Text>
                  <Text style={{ color: 'white', paddingBottom: 40 }}> {book.description}</Text>

                </View>


              </View>


            ))}

          </ScrollView>
        </View>
      </View>

    );
  }


const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    shadowColor: "#000000",
    marginBottom: -48,
    
    height: '90%',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },

  },

  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 20
  },
  postImage: {
    width: Dimensions.get("screen").width,


  },

  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00ff00',
    padding: 100,
  },

  modal2: {
    width: '20%',
    height: '40%',
    backgroundColor: 'red'
  },
  text2: {
    color: '#000000',
    marginTop: 10,
  },
  image: {
    borderColor: 'purple',
    borderRadius: 50,
    borderWidth: 2.5,

  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center'
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold'
  },
  activeImageContainer: {
    flex: 1,
    marginTop: 40,
    width: Dimensions.get("window").width / 1.5,
    height: Dimensions.get("window").height / 2,
    backgroundColor: "#eee",
    alignSelf: 'center',
    borderBottomWidth: 0.5,
    borderColor: "#fff"
  },

  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop: 10
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold'
  },
  activeImageContainer: {
    flex: 1,
    marginTop: 40,
    width: Dimensions.get("window").width / 1.5,
    height: Dimensions.get("window").height / 2,
    backgroundColor: "#eee",
    alignSelf: 'center',
    borderBottomWidth: 0.5,
    borderColor: "#fff"
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 12,
    marginRight: 50,
    marginLeft: -5,
    paddingLeft: 5,
    paddingBottom: 8,
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 70,
    paddingLeft: 50,
    paddingRight: 50
  },
  icons2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",

    paddingTop: -40,
    marginLeft: -5,
    paddingLeft: 5,
  },
  input: {
    height: 50,
    width: '90%',
    borderWidth: 2,
    paddingLeft: 30,
    marginLeft: 20,  // size/width of the border
    borderColor: 'lightgrey',
    marginVertical: 10,
    borderRadius: 7,

  },
  iconDiv: {
    width: "10%",
    marginLeft: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 8,

  },
  iconDivView: {
    display: "flex",
    flexDirection: 'row',
    alignItems: "flex-start",

  },

  iconDivView2: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 20,
    paddingBottom: 10,
    justifyContent: 'space-between'
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center'
  },

  book: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingVertical: 10,
    paddingTop: -5,
    borderRadius: 20
  },
  text: {
    fontSize: 11,
    paddingVertical: 4
  },
  loadingContainer: {
    marginVertical: 10
  },
  view: {

    display: "flex",
    marginTop: 8,
    marginRight: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'flex-start',
    marginTop: 10,
    paddingLeft: 10,
    marginRight: 35,
    paddingBottom: 30
  },
  name: { fontSize: 16 },
  description: { color: 'rgba(0, 0, 0, .5)' }
});


  