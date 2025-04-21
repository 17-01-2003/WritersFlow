import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import { COLOURS } from "../../../UI/COLOURS";
import Screen from "../../Layout/Screen";

const templates = [
  {
    title: "Three-Act Structure",
    description: "A classic beginning, middle, and end format.",
    content: "• Act I: Setup\n• Act II: Confrontation\n• Act III: Resolution",
  },
  {
    title: "Freytag's Pyramid",
    description: "Dramatic structure with rising action and climax.",
    content:
      "• Exposition\n• Inciting Incident\n• Rising Action\n• Climax\n• Falling Action\n• Resolution",
  },
  {
    title: "Hero's Journey",
    description: "Common story arc for adventure and transformation.",
    content:
      "• Call to Adventure\n• Trials & Allies\n• Supreme Ordeal\n• Return Changed",
  },
  {
    title: "Save the Cat",
    description: "Hollywood-style structure focused on emotional beats.",
    content:
      "• Opening Image\n• Theme Stated\n• Catalyst\n• Break into Two\n• Dark Night of the Soul\n• Finale",
  },
];

const StoryTemplatesScreen = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Story Templates</Text>

        {templates.map((template, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{template.title}</Text>
            <Text style={styles.cardDesc}>{template.description}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setSelectedTemplate(template)}
            >
              <Text style={styles.buttonText}>Use Template</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Modal Preview */}
        <Modal
          visible={!!selectedTemplate}
          transparent
          animationType="fade"
          onRequestClose={() => setSelectedTemplate(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>{selectedTemplate?.title}</Text>
              <ScrollView style={styles.modalContentBox}>
                <Text style={styles.modalContent}>
                  {selectedTemplate?.content}
                </Text>
              </ScrollView>
              <Pressable
                style={styles.closeButton}
                onPress={() => setSelectedTemplate(null)}
              >
                <Text style={styles.buttonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLOURS.primary,
    textAlign: "center",
    marginBottom: 10,
  },
  card: {
    backgroundColor: COLOURS.white,
    padding: 15,
    borderRadius: 10,
    borderColor: COLOURS.primary,
    borderWidth: 1,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLOURS.primary,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: COLOURS.darkGray,
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLOURS.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: COLOURS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    width: "100%",
    backgroundColor: COLOURS.white,
    borderRadius: 12,
    padding: 20,
    maxHeight: "80%",
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLOURS.primary,
    marginBottom: 12,
    textAlign: "center",
  },
  modalContentBox: {
    marginBottom: 20,
  },
  modalContent: {
    fontSize: 16,
    color: COLOURS.darkGray,
    lineHeight: 24,
  },
  closeButton: {
    backgroundColor: COLOURS.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
});

export default StoryTemplatesScreen;
