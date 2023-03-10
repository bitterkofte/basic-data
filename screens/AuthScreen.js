import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import React, { useState, useEffect } from 'react'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, onAuthStateChanged, updateProfile 
} from 'firebase/auth'
import { addDoc, serverTimestamp, collection } from 'firebase/firestore';
import { auth, db,  } from '../firebase';

const AuthScreen = ({navigation}) => {
  const [register, setRegister] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const user = auth.currentUser;
  const collUser = collection(db, 'users');

  
  function signUp() {
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      addDoc(collUser, {
        name: name,
        email: email,
      })
      navigation.navigate('NextScreen');
    })
    .catch(err => {
      console.log(err.message)
      setError(err.message);
    })
  }
  
  function logIn() {
    signInWithEmailAndPassword(auth, email, password)
    .then(cred => {
      // console.log('user logged in:', cred.user)
      navigation.navigate('NextScreen');
    })
    .catch(err => {
      console.log(err.message)
      setError(err.message);
    })
  }

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user){
        navigation.navigate("NextScreen")
      }
    });
  }, []);

  return (
    <View style={styles.screenContainer}>
      {register ? 
      <View>
        <Text style={styles.header}>Register</Text>
      </View>
      :
      <View>
        <Text style={styles.header}>Log In</Text>
      </View>
      }
      <View style={styles.inputContainer}>
        {register ? 
        <View>
        <Text style={styles.label}>Name:</Text>
        <TextInput value={name} onChangeText={text => setName(text)} style={styles.ti} maxLength={10}/>
        <Text style={styles.label}>Email: </Text>
        <TextInput value={email} onChangeText={text => setEmail(text)} style={styles.ti} keyboardType='email-address' />
        <Text style={styles.label}>Password:</Text>
        <TextInput value={password} onChangeText={text => setPassword(text)} style={styles.ti} secureTextEntry/>
        </View>
        :
        <View>
        <Text style={styles.label}>Email: </Text>
        <TextInput value={email} onChangeText={text => setEmail(text)} style={styles.ti} keyboardType='email-address' />
        <Text style={styles.label}>Password:</Text>
        <TextInput value={password} onChangeText={text => setPassword(text)} style={styles.ti} secureTextEntry/>
        </View>
        }
      </View>

      <View>
        {register ?
        <View style={styles.buttons}>
        <Button title='??? Log In' color={'grey'} onPress={() => setRegister(false)} />
        <Button title='Sign Up' onPress={()=>signUp()} />
        </View>
        :
        <View style={styles.buttons}>
        <Button title='??? Sign Up' color={'grey'} onPress={() => setRegister(true)} />
        <Button title='Log In' onPress={()=>logIn()} />
        </View>
        }
      </View>

        {!!error && (<View style={styles.errorContainer}><Text style={styles.error}>{error}</Text></View>)}
    </View>
  )
}

export default AuthScreen

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 20
  },
  header: {
    fontSize: 40,
    // fontFamily: 'SofiaProBold',
    textAlign: 'center',
    marginBottom: 20,
  },

  inputContainer: {
    marginBottom: 30,
    height: 200,
    justifyContent: 'center',
  },

  label: {
    // fontFamily: 'SofiaProBold',
  },

  ti: {
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 7,
    marginBottom: 10,
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  errorContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 15,
    padding: 10,
    backgroundColor: '#ffa3a3',
    borderRadius: 10,
  },
  error: {
    fontFamily: 'SofiaProBold',
    // backgroundColor: '#ff8888',
    color: '#bf0000',
    textAlign: 'center',
  },

})