import React from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Screen from "../../Layout/Screen";
import { COLOURS } from "../../../UI/COLOURS";
import { loadProjects, saveProjects } from "../../../utils/storage";

const ProjectDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { project } = route.params;

  const handleDelete = async () => {
    const projects = await loadProjects();
    const updated = projects.filter((p) => p.id !== project.id);
    await saveProjects(updated);
    navigation.goBack();
  };

  const confirmDelete = () => {
    Alert.alert(
      "Delete Project",
      "Are you sure you want to delete this project?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: handleDelete, style: "destructive" },
      ]
    );
  };

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.subtitle}>Genre: {project.genre}</Text>
        <Text style={styles.label}>Notes:</Text>
        <Text style={styles.text}>{project.notes || "No notes provided."}</Text>

        <Text style={styles.label}>Structure:</Text>
        {project.structure?.map((step, index) => (
          <View key={index} style={styles.stepCard}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDetail}>{step.detail}</Text>
          </View>
        ))}

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => navigation.navigate("EditProject", { project })}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLOURS.primary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLOURS.darkGray,
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    color: COLOURS.primary,
    marginTop: 10,
  },
  text: {
    fontSize: 15,
    color: COLOURS.darkGray,
    marginBottom: 10,
  },
  stepCard: {
    backgroundColor: COLOURS.lightGray,
    borderRadius: 8,
    padding: 10,
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
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  editButton: {
    backgroundColor: COLOURS.primary,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  buttonText: {
    color: COLOURS.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProjectDetailScreen;
