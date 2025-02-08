import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProjectDetailScreeen = () => {
    const navigation = useNavigation();

    return (
        <View style={StyleSheet.container}>
            <Text style={StyleSheet.title}>Project Details</Text>
            <Button title="Edit Project" onPress={() => console.log('Edit Project')} />
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
        fontWeight:'bold'
    },
});

export default ProjectDetailScreeen;