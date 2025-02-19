import React, { useState }from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const RegistrationScreen = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        if (email && password) {
            setUser({ email });
        } else {
            alert("Please enter email and password");
        }
    };

    return (
        <View style={StyleSheet.container}>
            <Text style={StyleSheet.title}>Register</Text>
            <TextInput style={StyleSheet.input} placeholder='Email' value={email} onChangeText={setEmail} />
            <TextInput style={StyleSheet.input} placeholder='Password' secureTextEntry value={password} onChangeText={setPassword} />
            <Button title="Sign up" onPress={handleRegister} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
    flex:1,
    justifyContent:'center',
    padding:20
},
title:{
    fontSize:24,
    textAlign:'center',
},
input:{
    height:40,
    borderColor:'#ccc',
    borderWidth:1,
    marginBottom:10,
    paddingLeft:8,
    },
});

export default RegistrationScreen;

import React, { useState } from "react";
import { TextInput, TouchableOpacity, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../Layout/Screen";
import { COLOURS } from "../../../UI/colour";

const RegistrationScreen = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    if (email && password) {
      setUser({ email });
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <Screen>
      <Text style={StyleSheet.title}>Create an Account</Text>
      <TextInput
        style={StyleSheet.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={StyleSheet.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.linkText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
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

export default RegistrationScreen;

