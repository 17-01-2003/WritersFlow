import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Screen from "../../Layout/Screen";
import { COLOURS } from "../../../UI/COLOURS";

const TemplatesScreen = () => {
  const templates = [
    {
      name: "Three-Act Structure",
      description: "A classic beginning, middle, and end format.",
    },
    {
      name: "Freytag's Pyramid",
      description: "Dramatic structure with rising action and climax.",
    },
    {
      name: "Hero's Journey",
      description: "Common story arc for adventure and transformaton.",
    },
  ];

  return (
    <Screen>
      <Text style={StyleSheet.title}>Story Templates</Text>
      {templates.map((template, index) => (
        <View key={index} style={styles.templateCard}>
          <Text style={styles.templateName}>{template.name}</Text>
          <Text style={styles.templateDescription}>{template.description}</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Use Template</Text>
          </TouchableOpacity>
        </View>
      ))}
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    colour: COLOURS.primary,
    marginBottom: 20,
  },
  templateCard: {
    backgroundColor: COLOURS.lightGray,
    padding: "15",
    borderRadius: 10,
    marginBottom: 10,
  },
  templateName: {
    fontSize: 28,
    fontWeight: "bold",
    colour: COLOURS.primary,
  },
  templateDecription: {
    fontSize: 14,
    colour: COLOURS.darkGray,
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLOURS.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: COLOURS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TemplatesScreen;
