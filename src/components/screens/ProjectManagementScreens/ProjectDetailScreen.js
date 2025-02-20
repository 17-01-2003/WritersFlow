import React from "react";
import { Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../Layout/Screen";

const ProjectDetailScreeen = () => {
  const navigation = useNavigation();

  return (
    <Screen>
      <Text style={StyleSheet.title}>Project Details</Text>
      <Button
        title="Edit Project"
        onPress={() => console.log("Edit Project")}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

