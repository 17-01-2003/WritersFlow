import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLOURS } from "../../../UI/COLOURS";
import Screen from "../../Layout/Screen";

const templates = [
  {
    title: "Three-Act Structure",
    description: "A classic beginning, middle, and end format.",
    steps: [
      {
        title: "Act I: Setup",
        detail: "Introduce characters, setting, and conflict.",
      },
      {
        title: "Act II: Confrontation",
        detail: "Develop conflict and stakes.",
      },
      {
        title: "Act III: Resolution",
        detail: "Resolve the conflict and show the aftermath.",
      },
    ],
  },
  {
    title: "Freytag's Pyramid",
    description: "Dramatic structure with rising action and climax.",
    steps: [
      {
        title: "Exposition",
        detail: "Introduce background, characters, and setting.",
      },
      { title: "Rising Action", detail: "Events that increase tension." },
      { title: "Climax", detail: "Turning point with highest tension." },
      { title: "Falling Action", detail: "Consequences unfold." },
      { title: "Denouement", detail: "Final resolution and wrap-up." },
    ],
  },
];

const StoryTemplatesScreen = () => {
  const navigation = useNavigation();

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Story Templates</Text>

        {templates.map((template, index) => (
          <View key={index} style={styles.templateCard}>
            <Text style={styles.templateTitle}>{template.title}</Text>
            <Text style={styles.templateDescription}>
              {template.description}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("TemplateDetail", { template })
              }
            >
              <Text style={styles.buttonText}>Use Template</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLOURS.primary,
    textAlign: "center",
    marginBottom: 20,
  },
  templateCard: {
    backgroundColor: COLOURS.white,
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: COLOURS.primary,
    marginBottom: 20,
  },
  templateTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLOURS.primary,
    marginBottom: 8,
  },
  templateDescription: {
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
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default StoryTemplatesScreen;
