import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLOURS } from "../../../UI/COLOURS";
import { loadProjects, saveProjects } from "../../../utils/storage";
import Screen from "../../Layout/Screen";
import { storyTemplates } from "../../../data/storyTemplates";

const TemplateGuidedWritingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { template } = route.params;

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(Array(template.steps.length).fill(""));

  const handleNext = () => {
    if (currentStep < template.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      saveStory();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const saveStory = async () => {
    const projects = await loadProjects();
    const newProject = {
      id: Date.now().toString(),
      title: template.name,
      genre: "Unknown",
      notes: "Created using template",
      chapters: answers,
    };
    await saveProjects([newProject, ...projects]);
    Alert.alert("Success", "Your story has been saved!");
    navigation.navigate("ProjectList");
  };

  const current = template.steps[currentStep];

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <ScrollView>
          <Text style={styles.projectTitle}>{template.name}</Text>
          <Text style={styles.stepTitle}>{current.title}</Text>

          <Text style={styles.description}>{current.description}</Text>

          <Text style={styles.promptLabel}>Prompt:</Text>
          <Text style={styles.promptText}>{current.prompt}</Text>

          <TextInput
            style={styles.input}
            multiline
            placeholder={
              current.example
                ? `e.g., ${current.example}`
                : "Start writing here..."
            }
            value={answers[currentStep]}
            onChangeText={(text) => {
              const updated = [...answers];
              updated[currentStep] = text;
              setAnswers(updated);
            }}
          />

          <View style={styles.buttonRow}>
            {currentStep > 0 && (
              <TouchableOpacity
                style={styles.navButton}
                onPress={handlePrevious}
              >
                <Text style={styles.navButtonText}>Previous</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.navButton} onPress={handleNext}>
              <Text style={styles.navButtonText}>
                {currentStep < template.steps.length - 1 ? "Next" : "Finish"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  projectTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLOURS.primary,
    textAlign: "center",
    marginBottom: 20,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLOURS.primary,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: COLOURS.darkGray,
    marginBottom: 15,
    fontStyle: "italic",
  },
  promptLabel: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  promptText: {
    fontSize: 15,
    marginBottom: 15,
    color: COLOURS.darkGray,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    minHeight: 200,
    textAlignVertical: "top",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  navButton: {
    flex: 1,
    backgroundColor: COLOURS.primary,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  navButtonText: {
    color: COLOURS.white,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default TemplateGuidedWritingScreen;
