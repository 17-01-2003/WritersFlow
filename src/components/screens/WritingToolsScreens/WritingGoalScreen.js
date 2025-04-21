import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { COLOURS } from "../../../UI/COLOURS";
import Screen from "../../Layout/Screen";
import { saveGoals, loadGoals } from "../../../utils/storage";

const WritingGoalsScreen = () => {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [goals, setGoals] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadGoals().then(setGoals);
    }
  }, [isFocused]);

  const addGoal = async () => {
    if (!title) return alert("Please enter a goal title.");
    const newGoal = {
      id: Date.now().toString(),
      title,
      deadline,
      completed: false,
      total: 100,
      progress: 0,
    };
    const updated = [newGoal, ...goals];
    setGoals(updated);
    await saveGoals(updated);
    setTitle("");
  };

  const deleteGoal = async (id) => {
    const updated = goals.filter((goal) => goal.id !== id);
    setGoals(updated);
    await saveGoals(updated);
  };

  const goToTracker = (goal) => {
    navigation.navigate("GoalTracker", { goal });
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Set a Writing Goal</Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. Finish backstory for Aubury Smith"
          placeholderTextColor={COLOURS.darkGray}
          value={title}
          onChangeText={setTitle}
        />

        <TouchableOpacity
          style={styles.datePickerContainer}
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.dateLabel}>Select Deadline</Text>
          <Text style={styles.dateText}>
            {`${deadline.toLocaleDateString()} ${deadline.toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            )}`}
          </Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            value={deadline}
            mode="datetime"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) setDeadline(selectedDate);
            }}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={addGoal}>
          <Text style={styles.buttonText}>Add Goal</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Your Goals</Text>
        {goals.length === 0 ? (
          <Text style={styles.emptyText}>No goals added yet.</Text>
        ) : (
          goals.map((goal) => (
            <View key={goal.id} style={styles.goalCard}>
              <TouchableOpacity onPress={() => goToTracker(goal)}>
                <Text style={styles.goalTitle}>{goal.title}</Text>
                <Text style={styles.goalDeadline}>
                  Due: {new Date(goal.deadline).toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Delete Goal",
                    "Are you sure you want to delete this goal?",
                    [
                      { text: "Cancel", style: "cancel" },
                      {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => deleteGoal(goal.id),
                      },
                    ]
                  );
                }}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
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
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    backgroundColor: COLOURS.white,
    borderColor: COLOURS.primary,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    height: 50,
  },
  datePickerContainer: {
    backgroundColor: COLOURS.lightGray,
    padding: 12,
    borderRadius: 10,
    borderColor: COLOURS.primary,
    borderWidth: 1,
  },
  dateLabel: {
    fontSize: 14,
    color: COLOURS.primary,
    fontWeight: "600",
  },
  dateText: {
    fontSize: 16,
    color: COLOURS.darkGray,
    marginTop: 4,
  },
  button: {
    backgroundColor: COLOURS.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: COLOURS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: COLOURS.primary,
  },
  goalCard: {
    backgroundColor: COLOURS.white,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLOURS.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: COLOURS.primary,
  },
  goalDeadline: {
    fontSize: 14,
    color: COLOURS.darkGray,
  },
  emptyText: {
    fontSize: 16,
    color: COLOURS.darkGray,
    marginTop: 10,
    textAlign: "center",
  },
  deleteText: {
    color: COLOURS.secondary,
    marginTop: 8,
    textAlign: "right",
    fontWeight: "bold",
  },
});

export default WritingGoalsScreen;
