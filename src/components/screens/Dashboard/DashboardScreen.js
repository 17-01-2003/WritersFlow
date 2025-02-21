import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../Layout/Screen";
import { COLOURS } from "../../../UI/COLOURS";

const DashboardScreen = ({ setUser }) => {
  const navigation = useNavigation();

  return (
    <Screen>
      <Text style={styles.title}>Welcome to Your Writing Dashboard</Text>
      <Text style={styles.subtitle}>What would you like to do today?</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Writing tools</Text>
        <View style={styles.cardContainer}>
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
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Project Management</Text>
        <View style={styles.cardContainer}>
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
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => setUser(null)}
      >
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    colour: COLOURS.primary,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    colour: COLOURS.darkGray,
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    colour: COLOURS.secondary,
    marginBottom: 10,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColour: COLOURS.primary,
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  cardText: {
    colour: COLOURS.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColour: COLOURS.secondary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    colour: COLOURS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default DashboardScreen;
