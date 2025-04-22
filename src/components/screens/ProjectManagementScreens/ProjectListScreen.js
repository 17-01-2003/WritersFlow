import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../../Layout/Screen";
import { COLOURS } from "../../../UI/COLOURS";
import { loadProjects } from "../../../utils/storage";

const ProjectListScreen = () => {
  const navigation = useNavigation();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const stored = await loadProjects();
      setProjects(stored);
    };
    const unsubscribe = navigation.addListener("focus", fetchProjects);
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.projectCard}
      onPress={() => navigation.navigate("ProjectDetail", { project: item })}
    >
      <Text style={styles.projectTitle}>{item.title}</Text>
      <Text style={styles.projectGenre}>{item.genre}</Text>
    </TouchableOpacity>
  );

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.header}>Your Writing Projects</Text>
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ gap: 12, paddingBottom: 20 }}
        />
      </View>
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
    marginBottom: 20,
    textAlign: "center",
  },
  projectCard: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLOURS.primary,
    backgroundColor: COLOURS.white,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLOURS.primary,
  },
  projectGenre: {
    fontSize: 14,
    color: COLOURS.darkGray,
    marginTop: 4,
  },
});

export default ProjectListScreen;
