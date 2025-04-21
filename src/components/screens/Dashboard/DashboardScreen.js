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

const DashboardScreen = ({ setUser }) => {
  const navigation = useNavigation();

  return (
    <Screen scrollable>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Welcome to Your Writing Dashboard</Text>
        <Text style={styles.subtitle}>What would you like to do today?</Text>

        <View style={styles.cardGroup}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("WritingGoals")}
          >
            <Text style={styles.cardText}>📊 Writing Goals</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Templates")}
          >
            <Text style={styles.cardText}>📚 Story Templates</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("CreativePrompts")}
          >
            <Text style={styles.cardText}>✍️ Creative Prompts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("ProjectList")}
          >
            <Text style={styles.cardText}>📂 View Projects</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("CreateProject")}
          >
            <Text style={styles.cardText}>➕ Create New Project</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => setUser(null)}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
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
    color: COLOURS.white,
    fontSize: 18,
    fontWeight: "600",
  },
  logoutButton: {
    marginTop: 10,
    backgroundColor: COLOURS.secondary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  logoutText: {
    color: COLOURS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DashboardScreen;
