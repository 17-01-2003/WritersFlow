import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLOURS } from "../../../UI/COLOURS";
import Screen from "../../Layout/Screen";

const TemplateDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { template } = route.params;

  const startGuidedWriting = () => {
    navigation.navigate("TemplateGuidedWriting", { template });
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{template.name}</Text>

        {template.steps.map((step, index) => (
          <View key={index} style={styles.stepCard}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDescription}>{step.description}</Text>
            <Text style={styles.stepPromptLabel}>Prompt:</Text>
            <Text style={styles.stepPrompt}>{step.prompt}</Text>
            {step.example && (
              <>
                <Text style={styles.stepExampleLabel}>Example:</Text>
                <Text style={styles.stepExample}>{step.example}</Text>
              </>
            )}
          </View>
        ))}

        <TouchableOpacity
          style={styles.startButton}
          onPress={startGuidedWriting}
        >
          <Text style={styles.startButtonText}>Start Guided Writing</Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    gap: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLOURS.primary,
    textAlign: "center",
    marginBottom: 20,
  },
  stepCard: {
    backgroundColor: COLOURS.lightGray,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLOURS.primary,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLOURS.primary,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: COLOURS.darkGray,
    marginBottom: 12,
  },
  stepPromptLabel: {
    fontWeight: "bold",
    marginBottom: 4,
    color: COLOURS.primary,
  },
  stepPrompt: {
    fontSize: 15,
    color: COLOURS.darkGray,
    marginBottom: 8,
  },
  stepExampleLabel: {
    fontWeight: "bold",
    color: COLOURS.primary,
    marginBottom: 4,
  },
  stepExample: {
    fontSize: 15,
    fontStyle: "italic",
    color: COLOURS.darkGray,
  },
  startButton: {
    marginTop: 20,
    backgroundColor: COLOURS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  startButtonText: {
    color: COLOURS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TemplateDetailScreen;
