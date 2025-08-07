import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  // ✅ Step 2: Form Validation
  const validateForm = () => {
    if (!email || !password) {
      Alert.alert("Both email and password are required.");
      return false;
    }
    return true;
  };

  // 🔐 Step 3: Authenticate User
  const handleLogin = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");

      if (!storedUser) {
        Alert.alert("No user found. Please sign up first.");
        return;
      }

      const parsedUser = JSON.parse(storedUser);

      if (email === parsedUser.email && password === parsedUser.password) {
        Alert.alert("Login successful!");
        // Navigate to the home or dashboard screen here
      } else {
        Alert.alert("Invalid email or password.");
      }
    } catch (error) {
      Alert.alert("An error occurred while logging in.");
    }
  };

  // 🟢 Step 4: Handle Login Button Press
  const handleLoginPress = () => {
    if (validateForm()) {
      handleLogin();
    }
  };

  return (
    <View style={styles.container}>
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
      <Button title="Login" onPress={handleLoginPress} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      justifyContent: "center",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      borderRadius: 5,
      marginBottom: 15,
    },
  });
  