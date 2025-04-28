import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLOURS } from "../../../UI/COLOURS";
import { storyTemplates } from "../../../data/storyTemplates";
import Screen from "../../Layout/Screen";

const StoryTemplatesScreen = () => {
  const navigation = useNavigation();

  const handleSelectTemplate = (template) => {
    navigation.navigate("TemplateDetail", { template });
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Choose a Story Template</Text>

        {storyTemplates.map((template, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => handleSelectTemplate(template)}
          >
            <Text style={styles.cardTitle}>{template.name}</Text>
            <Text style={styles.cardSubtitle}>
              {template.steps.length} Steps
            </Text>
          </TouchableOpacity>
        ))}
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
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    backgroundColor: COLOURS.lightGray,
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: COLOURS.primary,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLOURS.primary,
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLOURS.darkGray,
  },
});

export default StoryTemplatesScreen;
