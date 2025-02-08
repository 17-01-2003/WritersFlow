import React, { useState }from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DashboardScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={StyleSheet.container}>
            <Text style={StyleSheet.titles}>Dashboard</Text>
            <Button title="View Projects" onPress={() => navigation.navigate('ProjectList')} />
            <Button title="Create New Project" onPress={() => navigation.navigate('CreateProject')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
    fontSize:24,
    fontWeight:'bold',
    },
});

export default DashboardScreen