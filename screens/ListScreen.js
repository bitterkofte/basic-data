import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { addDoc, doc, updateDoc } from 'firebase/firestore';
import { collUser, db } from '../firebase';

const ListScreen = ({navigation, route}) => {
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [color, setColor] = useState('');
  const [id, setId] = useState(0);
  const [notes, setNotes] = useState([]);

  const updateNotes = () => {
    if (title === '' || detail === '' || color === '') {
      console.warn('Each input must have a value');
    } else {
        setId(id + 1);
        setNotes((prev)=>[...prev, {id:id, title: title, details:detail, color:color}]);
        // console.log(notes);
        console.log(route.params.id);
    }
  }

  // function upload() {
  //   addDoc(collUser, {
  //     notes
  //   })
  //   .then(() => {
  //     console.log('Updated');
  //   })
  // }


  const docRef = doc(db, 'users', route.params.id)
  const update = () => {
    updateDoc(docRef, {
      notes,
    })
    .then(() => {
      console.log('UPDATED')
    })
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} value={title} onChangeText={(t) => setTitle(t)} placeholder="Title" />
        <TextInput style={styles.input} value={detail} onChangeText={(t) => setDetail(t)} placeholder="Detail" />
        <TextInput style={styles.input} value={color} onChangeText={(t) => setColor(t)} placeholder="Color: #ee2345" />
        {/* <Button title="upload" onPress={() => setNotes((prev)=>[...prev, {title: title, details:detail, color:color}])}/> */}
        <View style={styles.buttonContainer}>
        <Button title="add" onPress={updateNotes}/>
        <Button title="upload" onPress={update}/>
        </View>
        {/* <Button title="show" onPress={updateNotes}/> */}
        <View style={styles.divider}/>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          style={styles.flatlist} 
          data={notes}
          keyExtractor={item => item.id}
          renderItem={({item}) => 
            <View style={[styles.items, {backgroundColor: item.color}]}>
              <Text>{item.title}</Text>
              <Text>{item.details}</Text>
            </View>
          } />
      </View>
    </View>
  )
}

export default ListScreen

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  
  inputContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    width: '60%',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: '#ee2345',
    width: '70%',
  },

  divider: {
    marginTop: 10,
    height: 2,
    width: '90%',
    backgroundColor: '#0080ff',
    borderRadius: 10,
  },

  listContainer: {
    flex: 1,
    marginTop: 10,
    // backgroundColor: '#c8c8c8',
    // justifyContent: 'center',
    alignItems: 'center',
  },

  flatlist:{
    // alignItems: 'center',
    // borderWidth: 5,
    width: '80%',
  },
  items: {
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#cc3434',
    borderRadius: 10,
    padding: 10,
    // width: '80%',
    marginBottom: 10,
  }
})