
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { FIREBASE_AUTH } from '../../firebase_config'; // Ensure you have your Firebase config file
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const signIn = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Login Successful', `Welcome, ${email}!`);
    } catch (error: any) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  }

  const signUp = async () => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Account Created', 'Your account has been created successfully!');
    } catch (error: any) {
      Alert.alert('Account Creation Failed', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 bg-blue-100 justify-center items-center p-4">
      <Text className="text-3xl font-bold text-blue-900 mb-8">User Login</Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="w-full h-12 border border-blue-300 rounded p-3 mb-4"
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#6b7280"
      />
      
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        className="w-full h-12 border border-blue-300 rounded p-3 mb-6"
        secureTextEntry
        placeholderTextColor="#6b7280"
      />
      
      <TouchableOpacity
        onPress={signIn}
        className="bg-blue-500 w-full h-12 rounded flex items-center justify-center"
      >
        <Text className="text-white text-lg font-bold">Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;