import React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../Layout/Screen";
import { COLOURS } from "../../../UI/COLOURS";

const DashboardScreen = () => {
  const navigation = useNavigation();

  return (
    <Screen scrollable>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Welcome to Your Writing Dashboard</Text>
        <Text style={styles.subtitle}>What would you like to do today?</Text>

        <View style={styles.cardGroup}>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("WritingTools", { screen: "WritingGoals" })
            }
          >
            <Text style={styles.cardText}>📊 Writing Goals</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("WritingTools", { screen: "StoryTemplates" })
            }
          >
            <Text style={styles.cardText}>📚 Story Templates</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("WritingTools", { screen: "CreativePrompts" })
            }
          >
            <Text style={styles.cardText}>✍️ Creative Prompts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Projects", { screen: "ProjectList" })
            }
          >
            <Text style={styles.cardText}>📂 View Projects</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Projects", { screen: "CreateProject" })
            }
          >
            <Text style={styles.cardText}>➕ Create New Project</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: COLOURS.primary,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLOURS.darkGray,
    textAlign: "center",
    marginBottom: 25,
  },
  cardGroup: {
    width: "100%",
    gap: 15,
    marginBottom: 20,
  },
  card: {
    backgroundColor: COLOURS.primary,
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  cardText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default DashboardScreen;
