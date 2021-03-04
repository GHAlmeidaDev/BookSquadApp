import React, { useState } from 'react'
import Background from '../component/Background'
import BackButton from '../component/BackButton'
import Logo from '../component/Logo'
import Header from '../component/Header'
import TextInput from '../component/TextInput'
import Button from '../component/Button'
import { emailValidator } from '../helpers/emailValidator'
import { sendEmailWithPassword } from '../api/auth-api'
import Toast from '../component/Toast'
import LottieView from "lottie-react-native";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: '', error: '' })
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ value: '', type: '' })

  const sendResetPasswordEmail = async () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }
    setLoading(true)
    const response = await sendEmailWithPassword(email.value)
    if (response.error) {
      setToast({ type: 'error', message: response.error })
    } else {
      setToast({
        type: 'sucesso',
        message: 'Email com senha foi enviado.',
      })
    }
    setLoading(false)
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      
      <Header style={{paddingTop: 40, fontWeight: 'bold'}}>Restaurar senha</Header>
      <TextInput
        label="Insira seu Email"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="Você receberá um e-mail com o link de redefinição de senha."
      />
      <Button
        loading={loading}
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Enviar
      </Button>
      <Toast {...toast} onDismiss={() => setToast({ value: '', type: '' })} />
    </Background>
  )
}

export default ForgotPasswordScreen
