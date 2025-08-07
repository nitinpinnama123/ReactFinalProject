limport React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  // 🔍 Step 2: Form Validation
  const validateForm = () => {
    if (!userName || !email || !password) {
      Alert.alert("All fields are required!");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Password must be at least 6 characters.");
      return false;
    }
    return true;
  };

  // 📝 Step 3: Handle Registration
  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const userData = {
        userName,
        email,
        password,
      };
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      Alert.alert("Registration successful!");
      navigation.navigate("Login"); // Assuming Login screen exists in navigator
    } catch (error) {
      Alert.alert("Error saving user data");
    }
  };

  return (
    <View style={styles.container}>
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

      <View style={styles.loginPrompt}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginText}> Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;
