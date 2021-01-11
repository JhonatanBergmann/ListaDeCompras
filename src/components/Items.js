import React, { useCallback } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import withObservables from '@nozbe/with-observables'

Icon.loadFont()

function Item({ todo }) {
  const handleToggleCheck = useCallback(async () => {
    await todo.toggleCheck()
  }, [todo])

  const handleDelete = useCallback(async () => {
    await todo.delete()
  }, [todo])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleToggleCheck} style={styles.checkButton}>
        <View
          style={[
            styles.borderIcon,
            { borderColor: todo.done ? '#00adb5' : '#c9d6df' },
          ]}>
          {todo.done && <Icon name="check" color="#f0d379" size={30} />}
        </View>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {todo.title}
        </Text>

        <Text numberOfLines={2} style={styles.description}>
          {todo.description}
        </Text>
      </View>

      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Icon name="trash-2" color="#ea5455" size={25} />
      </TouchableOpacity>
    </View>
  )
}

const enhance = withObservables(['todo'], ({ todo }) => ({
  todo,
}))

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#393e46',
    borderRadius: 10,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12
  },
  checkButton: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  borderIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#00adb5',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 20
  },
  title: {
    color: '#f9f7f7',
    fontSize: 25,
    fontFamily: 'ArchitectsDaughter-Regular',
    marginBottom: 10,
    marginRight: 40
  },
  description: {
    color: '#c9d6df',
    fontSize: 13,
    fontFamily: 'ArchitectsDaughter-Regular',
  },
  deleteButton: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0
  },
})

export default enhance(Item)