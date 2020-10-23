import React, {useCallback, useState} from 'react'
import {
  View, 
  TouchableOpacity, 
  TextInput, 
  Text, 
  StyleSheet,
  Image
} from 'react-native'
import {heightPercentageToDP as h} from 'react-native-responsive-screen'
import Icon from 'react-native-vector-icons/Feather'

Icon.loadFont()

import ListItems from '../components/ListItems'

function Home({todos, navigation}) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const handleNewRegister = useCallback(() => {
    navigation.navigate('Register')
  }, [navigation])

  const handleTogglePending = useCallback(() => {
    if (filter === 'all') {
      setFilter('done')
    } else {
      setFilter('all')
    }
  }, [filter])

  const handleToggleBuyed = useCallback(() => {
    if (filter === 'all') {
      setFilter('pending')
    } else {
      setFilter('all')
    }
  }, [filter])

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Pesquisar..."
        placeholderTextColor="#777"
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />

      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={handleTogglePending}
          style={[
            styles.filterButton,
            {
              backgroundColor: filter === 'done' ? 'transparent' : '#0d7377',
              marginRight: 10,
            },
          ]}>
          <Text style={styles.filterText}>Pendente</Text>
          <Icon name="eye-off" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleToggleBuyed}
          style={[
            styles.filterButton,
            {
              backgroundColor: filter === 'pending' ? 'transparent' : '#0d7377',
            },
          ]}>
          <Text style={styles.filterText}>Comprado</Text>
          <Icon name="eye-off" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <Image style={styles.image}
        source={require('../../assets/imgs/figureHome.png')} 
      />

      <ListItems search={search} filter={filter} />

      <TouchableOpacity onPress={handleNewRegister} style={styles.newRegisterButton}>
        <Icon name="plus" size={35} color="#323232" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  alignItems: 'center',
  backgroundColor: '#b33a5d',
  padding: 20
},
image: {
  bottom: 20,
  resizeMode: 'contain' 
},
input: {
  backgroundColor: '#00000030',
  width: '100%',
  borderRadius: 10,
  padding: h('2%'),
  color: '#fff',
  fontSize: 20,
  borderWidth: 1,
  borderColor: '#77777750',
  top: 10,
  elevation: 1,
  fontSize: h('2%')
},
filterContainer: {
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
  paddingVertical: 15
},
filterButton: {
  borderWidth: 1,
  borderColor: '#0d7377',
  paddingVertical: 5,
  paddingHorizontal: 25,
  borderRadius: 10,
  marginRight: 10,
  alignItems: 'center'
},
filterText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: h('1.5%')
},
newRegisterButton: {
  width: 70,
  height: 70,
  borderRadius: 35,
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  backgroundColor: '#0d7377',
  paddingTop: 2,
  right: 20,
  bottom: 40,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 6
  },
  shadowOpacity: 0.37,
  shadowRadius: 7.49,
  elevation: 12
  }
})

export default Home
