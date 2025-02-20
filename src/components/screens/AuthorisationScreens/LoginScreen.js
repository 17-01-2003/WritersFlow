import React, { useState } from "react";
import { TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../Layout/Screen";
import { COLOURS } from "../../../UI/colour";

const LoginScreen = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    if (email && password) {
      setUser({ email });
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <Screen>
      <Text style={StyleSheet.title}>Welcome Back</Text>
      <TextInput
        style={StyleSheet.input}
        placeholder="Email"
        placeholderTextColor={COLOURS.darkGray}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={StyleSheet.input}
        placeholder="Password"
        placeholderTextColor={COLOURS.darkGray}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.linkText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOURS.white,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLOURS.primary,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: COLOURS.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingHoriszontal: 15,
    marginBottom: 15,
    backgroundColor: COLOURS.lightGray,
  },
  button: {
    width: "100%",
    backgroundColor: COLOURS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: COLOURS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  linkText: {
    color: COLOURS.secondary,
    fontSize: 16,
    marginTop: 10,
  },
});

export default LoginScreen;
