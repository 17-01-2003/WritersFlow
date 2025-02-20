import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Screen from "../../Layout/Screen";
import { COLOURS } from "../../../UI/COLOURS";

const prompts = [
  "Write about a character who wakes up with no memory.",
  "Describe a futuristic world where emotions are illegal.",
  "Your protagonist discovers a hidden door in their home.",
  "A letter arrives in the mall, but it's addressed to somone who doesn't exsist",
];

const CreativePromptScreen = () => {
  const [prompt, setPrompt] = useState("Click below to get a random prompt!");

  const generatePrompt = () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    setPrompt(prompts[randomIndex]);
  };

  return (
    <Screen>
      <Text style={styles.input}>Creative Writing Prompts</Text>
      <Text style={styles.prompt}>{prompt}</Text>
      <TouchableOpacity style={styles.button} onPress={generatePrompt}>
        <Text style={styles.buttonText}>Get new Prompt</Text>
      </TouchableOpacity>
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
  prompt: {
    fontSize: 18,
    textAlign: "center",
    colour: COLOURS.darkGray,
    marginVertical: 20,
  },
  button: {
    backgroundColor: COLOURS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    colour: COLOURS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreativePromptScreen;
