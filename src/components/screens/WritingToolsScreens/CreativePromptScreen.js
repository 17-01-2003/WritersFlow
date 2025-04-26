import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Screen from "../../Layout/Screen";
import { COLOURS } from "../../../UI/COLOURS";

const prompts = [
  "Write about a character who wakes up with no memory.",
  "Describe a futuristic world where emotions are illegal.",
  "Your protagonist discovers a hidden door in their home.",
  "A letter arrives in the mail, but it's addressed to someone who doesn't exist.",
  "Write a story where time freezes except for one character.",
  "Describe an encounter between a lost traveler and a mythical creature.",
  "Your character finds a journal that predicts the future.",
  "In a world where dreams can be traded, someone steals yours.",
  "Write about a character who must relive the same day until they change something.",
  "A city floats above the clouds—describe life there.",
  "A mysterious voice speaks to your character through mirrors.",
  "Write about a forgotten kingdom that suddenly reappears overnight.",
  "Describe a character who accidentally switches bodies with a rival.",
  "An inventor discovers a machine that can erase regrets.",
  "Write about a love letter lost for 100 years that finally reaches its recipient.",
  "In a town where no one dreams anymore, one child has visions every night.",
  "A library where every book is a memory someone has forgotten.",
  "Your character finds a locked room in their house that wasn’t there yesterday.",
  "A world where music controls the weather.",
  "Describe a conversation between the sun and the moon.",
  "An abandoned carnival springs to life once a year — who are its visitors?",
  "Your character wakes up with a map tattooed across their back.",
  "A bridge appears connecting two worlds only at midnight.",
  "Write about a plant that grants wishes — at a terrible cost.",
  "Every time your character lies, a storm grows stronger.",
  "Your character inherits an ancient key with no known lock.",
  "A stray cat leads your character to a hidden society underground.",
  "Describe a memory your character can't tell if they lived or dreamt.",
  "The world's oceans have dried up — describe daily life now.",
  "Your character finds a portal to an alternate version of their life.",
  "In a society that has banned books, someone dares to write one.",
  "Describe the day gravity stops working for one hour.",
  "Your protagonist must protect a forbidden flower that everyone wants to steal.",
  "The ghosts of famous historical figures haunt a small café.",
  "A cursed camera shows the future instead of the present.",
  "Write a story where forgotten toys come alive at night.",
  "A thunderstorm reveals invisible creatures hidden in the rain.",
  "Every painting in a museum holds the trapped soul of an artist.",
  "An island appears off the coast — uncharted and unexplored.",
  "Your character can hear whispers from trees when the wind blows.",
  "A train station where destinations are memories instead of places.",
  "Describe a world where emotions manifest physically as colors.",
  "A clock that counts down not to death, but to a major life event.",
  "Write about a letter delivered decades too late.",
  "In a town surrounded by mist, no one is allowed to leave.",
  "Your character finds their childhood imaginary friend alive and real.",
  "Write a scene from the point of view of an old, worn-out coin.",
  "A library where each book tells how the reader's life could unfold.",
  "The stars start falling from the sky one by one — describe the world’s reaction.",
  "Your character wakes up one day with the ability to see people's true names.",
];

const CreativePromptScreen = () => {
  const [prompt, setPrompt] = useState(
    "Click below to get a creative writing prompt!"
  );
  const [userWriting, setUserWriting] = useState("");

  useEffect(() => {
    loadWriting();
  }, []);

  const generatePrompt = () => {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    setPrompt(prompts[randomIndex]);
  };

  const saveWriting = async () => {
    try {
      await AsyncStorage.setItem("@creative_prompt_writing", userWriting);
      Alert.alert("Saved", "Your writing has been saved!");
    } catch (e) {
      console.error("Failed to save writing", e);
      Alert.alert("Error", "Failed to save writing. Try again!");
    }
  };

  const loadWriting = async () => {
    try {
      const saved = await AsyncStorage.getItem("@creative_prompt_writing");
      if (saved) setUserWriting(saved);
    } catch (e) {
      console.error("Failed to load writing", e);
    }
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Creative Writing Prompts</Text>

          <View style={styles.promptBox}>
            <Text style={styles.promptText}>{prompt}</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={generatePrompt}>
            <Text style={styles.buttonText}>Get New Prompt</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Your Writing:</Text>

          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Start writing your story here..."
            value={userWriting}
            onChangeText={setUserWriting}
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.saveButton} onPress={saveWriting}>
            <Text style={styles.buttonText}>Save Writing</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLOURS.primary,
    textAlign: "center",
  },
  promptBox: {
    backgroundColor: COLOURS.lightGray,
    borderColor: COLOURS.primary,
    borderWidth: 1,
    borderRadius: 12,
    padding: 20,
    minHeight: 100,
    justifyContent: "center",
  },
  promptText: {
    fontSize: 18,
    color: COLOURS.darkGray,
    textAlign: "center",
  },
  button: {
    backgroundColor: COLOURS.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: COLOURS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  label: {
    fontSize: 18,
    color: COLOURS.primary,
    fontWeight: "bold",
  },
  textInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: COLOURS.primary,
    borderWidth: 1,
    minHeight: 200,
    padding: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
});

export default CreativePromptScreen;
