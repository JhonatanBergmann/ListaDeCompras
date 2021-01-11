import React from 'react'
import {
  View,
  FlatList,
  StyleSheet
} from 'react-native'
import withObservables from '@nozbe/with-observables'
import { Q } from '@nozbe/watermelondb'
import { withDatabase } from '@nozbe/watermelondb/DatabaseProvider'

import Item from './Items'

function ListItems({ todos }) {
  return (
    <FlatList
      data={todos}
      keyExtractor={(todo) => todo.id}
      renderItem={({ item: todo }) => <Item todo={todo} />}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      contentContainerStyle={styles.toDoListContainer}
      showsVerticalScrollIndicator={false}
      style={styles.listItems}
    />
  )
}

const enhance = withObservables(
  ['todos', 'search', 'filter'],
  ({ database, search, filter }) => ({
    todos: database.collections
      .get('todos')
      .query(
        Q.where('title', Q.like(`%${Q.sanitizeLikeString(search)}%`)),
        Q.where(
          'done',
          filter === 'all' ? Q.oneOf([true, false]) : filter === 'done',
        ),
      ),
  }),
)

const styles = StyleSheet.create({
  listItems: {
    width: '100%'
  },
  toDoListContainer: {
    width: '100%',
    paddingVertical: 20,
    paddingBottom: 120
  },
  itemSeparator: {
    width: 1,
    height: 20
  }
})


export default withDatabase(enhance(ListItems));