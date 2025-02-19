import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

const ProjectCreateScreeen = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const naviagation = useNavigation();

    const handleCreateProject = () => {
        console.log(`Creating project: ${title}`);
        naviagation.navigate('ProjectList');
    };

    return (
        <View style={StyleSheet.container}>
            <Text style={StyleSheet.title}>Create a New Project</Text>
            <TextInput style={styles.input} placeholder='Project Title' value={title} onChangeText={setTitle} />
            <TextInput style={styles.input} placeholder='Project Description' value={description} onChangeText={setDescription} />
            <Button title="Create Project" onPress={handleCreateProject} />
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
        fontWeight:'bold',
        marginBottom:20
    },
    input: {
        height:40,
        borderColor:'#ccc',
        borderWidth:1,
        marginBottom:10,
        padding:8,
    },
});

export default ProjectCreateScreeen;

import React from "react";
import { Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../Layout/Screen";
import { TextInput } from "react-native-gesture-handler";

const ProjectCreateScreeen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const naviagation = useNavigation();

  const handleCreateProject = () => {
    console.log(`Creating project: ${title}`);
    naviagation.navigate("ProjectList");
  };

  return (
    <Screen>
      <Text style={StyleSheet.title}>Create a New Project</Text>
      <TextInput
        style={styles.input}
        placeholder="Project Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Project Description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Create Project" onPress={handleCreateProject} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
});

export default ProjectCreateScreeen;

