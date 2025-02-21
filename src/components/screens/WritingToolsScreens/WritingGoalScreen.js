import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Screen from "../../components/Screen";
import { COLOURS } from "../../../UI/COLOURS";

const WritingGoalsScreen = () => {
  const [goal, setGoal] = useState("");
  const [progress, setProgress] = useState(0);

  const handleUpdateProgress = () => {
    const newProgress = Math.min(progress + 10, 100);
    setProgress(newProgress);
  };

  return (
    <Screen>
      <TextInput
        style={StyleSheet.input}
        placeholder="Enter word goal (e.g 1000 words)"
        value={goal}
        onChangeText={setGoal}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateProgress}>
        <Text style={styles.buttonText}>Update Progress</Text>
      </TouchableOpacity>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Progress: {progress}%`</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>
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
  input: {
    width: "100%",
    height: 50,
    borderColor: COLOURS.primary,
    borderWidth: 1,
    borderRadius: 10,
    PaddinhHorisizontal: 15,
    marginBottom: 15,
    backgroundColour: COLOURS.lightGray,
  },
  button: {
    width: "100%",
    backgroundColour: COLOURS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    colour: COLOURS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  progressContainer: {
    marginTop: 20,
    width: "100%",
  },
  progressText: {
    fontSize: 16,
    marginBottom: 5,
    colour: COLOURS.darkGray,
  },
  progressBar: {
    height: 10,
    width: "100%",
    backgroundColour: COLOURS.lightGray,
    borderRadius: 5,
  },
  progressFill: {
    height: "100%",
    backgroundColour: COLOURS.primary,
    borderRadius: 5,
  },
});

export default WritingGoalsScreen;
