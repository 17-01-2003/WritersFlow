import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Screen from "../../Layout/Screen";
import { COLOURS } from "../../../UI/COLOURS";

const TemplateDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { template } = route.params;

  const handleUseTemplate = () => {
    navigation.navigate("CreateProject", { template });
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{template.title}</Text>
        <Text style={styles.description}>{template.description}</Text>

        {template.steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDetail}>{step.detail}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={handleUseTemplate}>
          <Text style={styles.buttonText}>
            Start Project with this Template
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLOURS.primary,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: COLOURS.darkGray,
  },
  stepContainer: {
    backgroundColor: COLOURS.lightGray,
    borderRadius: 10,
    padding: 15,
  },
  stepTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  stepDetail: {
    fontSize: 15,
    color: COLOURS.darkGray,
  },
  button: {
    backgroundColor: COLOURS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: COLOURS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TemplateDetailScreen;
