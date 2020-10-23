import React, {useState, useRef} from 'react'
import {
  View,
  Text,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TouchableOpacity, 
  StyleSheet,
  Image
} from 'react-native'
import {heightPercentageToDP as h} from 'react-native-responsive-screen'
import {useNavigation} from '@react-navigation/native'
import {useDatabase} from '@nozbe/watermelondb/hooks'

function Register() {
  const navigation = useNavigation()
  const database = useDatabase()

  const descriptionRef = useRef(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  async function handleRegister() {
    await database.action(async () => {
      const todos = database.collections.get('todos')

      return await todos.create((todo) => {
        todo.title = title
        todo.description = description
        todo.done = false
      })
    })

    Keyboard.dismiss()
    navigation.goBack()
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}>
        <Text style={styles.grayText}>
          Registre um novo produto na sua 
          <Text style={styles.pinkText}> lista de compras </Text> 
          e organize suas taréfas
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Produto"
            placeholderTextColor="#777"
            value={title}
            onChangeText={setTitle}
            onSubmitEditing={() => descriptionRef.current.focus()}
            style={styles.input}
          />

          <TextInput
            ref={descriptionRef}
            placeholder="Descrição"
            placeholderTextColor="#777"
            value={description}
            onChangeText={setDescription}
            onSubmitEditing={handleRegister}
            style={styles.input}
          />
        </View>

        <Image style={styles.image}
          source={require('../../assets/imgs/figureNewItem.png')}
        />

        <TouchableOpacity
          onPress={handleRegister}
          style={styles.registerButton}>
          <Text style={styles.registerButtonTitle}>Registrar</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#b33a5d',
    padding: 20
  },
  grayText: {
    color: '#c9d6df',
    fontSize: h('2%'),
    textAlign: 'center',
    paddingVertical: h('1%')
  },
  pinkText: {
    fontSize: h('2%'),
    color: '#0d7377',
    fontWeight: 'bold'
  },
  inputContainer: {
    width: '100%'
  },
  input: {
    backgroundColor: '#00000030',
    width: '100%',
    borderRadius: 10,
    padding: h('2%'),
    color: '#fff',
    fontSize: h('2%'),
    marginBottom: h('1%'),
    borderWidth: 1,
    borderColor: '#77777750'
  },
  image: {
    top: ('2%'),
    resizeMode: 'contain'
  },
  registerButton: {
    backgroundColor: '#0d7377',
    paddingVertical: h('3%'),
    marginTop: 20,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  registerButtonTitle: {
    color: '#c9d6df',
    fontSize: h('2%'),
    fontWeight: 'bold'
  }
})

export default Register
