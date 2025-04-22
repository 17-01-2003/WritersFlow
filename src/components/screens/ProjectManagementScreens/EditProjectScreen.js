import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { loadProjects, saveProjects } from "../../../utils/storage";
import { COLOURS } from "../../../UI/COLOURS";
import Screen from "../../Layout/Screen";

const EditProjectScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { project } = route.params;

  const [title, setTitle] = useState(project.title);
  const [genre, setGenre] = useState(project.genre);
  const [notes, setNotes] = useState(project.notes);

  const handleUpdate = async () => {
    const updatedProject = { ...project, title, genre, notes };
    const projects = await loadProjects();
    const updatedProjects = projects.map((p) =>
      p.id === project.id ? updatedProject : p
    );

    await saveProjects(updatedProjects);
    Alert.alert("Updated", "Project has been updated.");
    navigation.goBack();
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.header}>Edit Project</Text>

        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Title"
        />
        <TextInput
          style={styles.input}
          value={genre}
          onChangeText={setGenre}
          placeholder="Genre"
        />
        <TextInput
          style={[styles.input, { height: 120 }]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Notes"
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLOURS.primary,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: COLOURS.primary,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: COLOURS.white,
  },
  button: {
    backgroundColor: COLOURS.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: COLOURS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProjectScreen;
