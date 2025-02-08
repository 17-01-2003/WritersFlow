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