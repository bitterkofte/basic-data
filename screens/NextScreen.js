import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ColorContext } from '../context/color-context';

import { onSnapshot, query, where } from 'firebase/firestore';
import { auth, collUser } from '../firebase';
import { signOut } from 'firebase/auth';

// import { users } from '../firebase';

const NextScreen = ({navigation}) => {
  // const CCX = useContext(ColorContext);
  // CCX.setColor('#d3ffb7');
  
  const q = query(collUser, where("email", "==", auth.currentUser.email))

  //GETTING USER DATA
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const subscriber = onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach(doc => {
          users.push({...doc.data(), id: doc.id});
        });
        setUsers(users);
        console.log(users)
      });
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, [users]);

  //SIGN OUT
  function signOutHandler() {
    signOut(auth)
    .then(() => {
      console.log('user signed out')
      navigation.navigate('AuthScreen');
    })
    .catch(err => {
      console.log(err.message)
    })
  }

  return (
    <View style={styles.container}>
      <Text>a</Text>
      <Button title="Sign Out" color={'red'} onPress={signOutHandler} />
      <Button title="Create Data List" color={'purple'} onPress={() => navigation.navigate('ListScreen', {id: users[0].id})} />
    </View>
  )
}

export default NextScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})