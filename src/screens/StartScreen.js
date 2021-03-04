import React from 'react'
import Background from '../component/Background'
import Logo from '../component/Logo'
import Header from '../component/Header'
import Button from '../component/Button'
import Paragraph from '../component/Paragraph'
import LottieView from "lottie-react-native";

const StartScreen = ({ navigation }) => (
  <Background>
    <LottieView 
        
        style={{
                width: 300, 
                height: 300,
            }} 
        source={require('../assets/4887-book.json')}
        autoPlay
        loop
        
    />
    <Paragraph 
      style=
      {{
        fontSize: 23,
        lineHeight: 30,
        textAlign: 'center',
        marginBottom: 22,
        fontWeight:'bold',
        color: '#808080'
      }}  
    >
      Book Squad
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Entrar
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('RegisterScreen')}
    >
      Cadastre-se
    </Button>
  </Background>
)

export default StartScreen
