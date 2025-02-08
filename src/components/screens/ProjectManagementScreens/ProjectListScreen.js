import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

const ProjectListScreeen = () => {
    const naviagation = useNavigation();

    return (
        <View style={StyleSheet.container}>
            <Text style={StyleSheet.title}>Your Writing Projects</Text>
            <Button title="Your Project Details" onPress={() => naviagation.navigate('ProjectDetail')} />
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

export default ProjectListScreeen;