import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import { loadGoals, saveGoals } from "../../../utils/storage";
import { COLOURS } from "../../../UI/COLOURS";
import Screen from "../../Layout/Screen";

const GoalTrackerScreen = () => {
  const route = useRoute();
  const { goal: selectedGoal } = route.params;
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    loadGoals().then(setGoals);
  }, []);

  const markComplete = (id) => {
    const updated = goals.map((g) =>
      g.id === id ? { ...g, progress: g.total, completed: true } : g
    );
    setGoals(updated);
    saveGoals(updated);
  };

  const deleteGoal = (id) => {
    Alert.alert("Delete Goal", "Are you sure you want to delete this goal?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updated = goals.filter((g) => g.id !== id);
          setGoals(updated);
          saveGoals(updated);
        },
      },
    ]);
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Goal Progress</Text>

        {goals
          .filter((g) => g.id === selectedGoal.id)
          .map((goal) => {
            const progress = (goal.progress / goal.total) * 100;
            const isLate =
              new Date(goal.deadline) < new Date() && !goal.completed;

            return (
              <View key={goal.id} style={styles.goalCard}>
                <Text style={styles.goalTitle}>{goal.title}</Text>
                <Text style={styles.status}>
                  {goal.completed
                    ? "Completed"
                    : isLate
                    ? "Incomplete"
                    : "In Progress"}{" "}
                  • {goal.progress}/{goal.total} ({progress.toFixed(0)}%)
                </Text>

                <Progress.Bar
                  progress={goal.progress / goal.total}
                  width={null}
                  color={COLOURS.primary}
                  style={styles.progressBar}
                />

                {goal.completed ? (
                  <Text style={styles.complete}>✅ Completed</Text>
                ) : (
                  <TouchableOpacity onPress={() => markComplete(goal.id)}>
                    <Text style={styles.mark}>Mark as Complete</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={() => deleteGoal(goal.id)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteText}>🗑 Delete Goal</Text>
                </TouchableOpacity>
              </View>
            );
          })}
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
  goalCard: {
    backgroundColor: COLOURS.white,
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: COLOURS.primary,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  goalTitle: {
    fontSize: 18,
    color: COLOURS.primary,
    fontWeight: "bold",
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: COLOURS.darkGray,
    marginBottom: 10,
  },
  progressBar: {
    marginVertical: 10,
    borderRadius: 5,
  },
  complete: {
    color: "green",
    fontWeight: "bold",
    marginTop: 8,
  },
  mark: {
    color: COLOURS.primary,
    marginTop: 10,
    fontWeight: "500",
  },
  deleteButton: {
    marginTop: 10,
    alignItems: "center",
  },
  deleteText: {
    color: "red",
    fontWeight: "600",
  },
});

export default GoalTrackerScreen;
