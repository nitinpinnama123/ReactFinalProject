import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // Step 2: Validate form fields
  const validateForm = () => {
    if (!userName || !email || !password) {
      Alert.alert('All fields are required.');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid email format.');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Password must be at least 6 characters.');
      return false;
    }

    return true;
  };

  // Step 3: Handle registration
  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const userData = {
        userName,
        email,
        password,
      };

      await AsyncStorage.setItem('user', JSON.stringify(userData));
      Alert.alert('Success', 'Registration complete!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', 'Failed to register. Try again.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Step 1: UI Components */}
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Navigation Prompt */}
      <View style={styles.loginPrompt}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;



const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    input: {
      borderColor: '#ccc',
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      marginBottom: 15,
    },
    button: {
      backgroundColor: '#007bff',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    loginPrompt: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
    },
    loginText: {
      color: 'blue',
      marginLeft: 5,
    },
  });
  
  
