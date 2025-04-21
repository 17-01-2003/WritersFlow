import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { COLOURS } from "../../../UI/COLOURS";
import Screen from "../../Layout/Screen";
import { loadProjects, saveProjects } from "../../../utils/storage";

const ProjectCreateScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { template } = route.params || {};

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [notes, setNotes] = useState("");
  const [structure, setStructure] = useState(template?.steps || []);

  const handleCreate = async () => {
    const newProject = {
      id: Date.now().toString(),
      title,
      genre,
      notes,
      structure,
      createdAt: new Date().toISOString(),
    };

    const existing = await loadProjects();
    const updated = [newProject, ...existing];
    await saveProjects(updated);

    navigation.goBack();
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Create Project</Text>

        <TextInput
          style={styles.input}
          placeholder="Project Title"
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={styles.input}
          placeholder="Genre"
          value={genre}
          onChangeText={setGenre}
        />

        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Notes or Summary"
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        {structure.length > 0 && (
          <View style={styles.templateSection}>
            <Text style={styles.templateHeader}>Structure (from template)</Text>
            {structure.map((step, index) => (
              <View key={index} style={styles.stepCard}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDetail}>{step.detail}</Text>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Create Project</Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLOURS.primary,
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    backgroundColor: COLOURS.white,
    borderColor: COLOURS.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    height: 50,
  },
  templateSection: {
    marginTop: 20,
  },
  templateHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLOURS.primary,
    marginBottom: 10,
  },
  stepCard: {
    backgroundColor: COLOURS.lightGray,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  stepTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  stepDetail: {
    fontSize: 14,
    color: COLOURS.darkGray,
  },
  button: {
    backgroundColor: COLOURS.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: COLOURS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProjectCreateScreen;
