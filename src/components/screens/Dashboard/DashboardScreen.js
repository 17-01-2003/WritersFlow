import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../Layout/Screen";
import { COLOURS } from "../../../UI/COLOURS";

const DashboardScreen = ({ setUser }) => {
  const navigation = useNavigation();

  return (
    <Screen>
      <Text style={StyleSheet.titles}>Dashboard</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ProjectList")}
      >
        <Text style={styles.buttonText}>View Projects</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CreateProject")}
      >
        <Text style={styles.buttonText}>Create New Project</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => setUser(null)}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOURS.white,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLOURS.primary,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    backgroundColor: COLOURS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: { color: COLOURS.white, fontSize: 18, fontWeight: "bold" },
  logoutButton: {
    width: "100%",
    backgroundColor: COLOURS.secondary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  linkText: { color: COLOURS.white, fontSize: 18, fontWeight: "bold" },
});

export default DashboardScreen;
