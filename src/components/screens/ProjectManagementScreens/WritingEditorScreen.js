import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLOURS } from "../../../UI/COLOURS";
import { loadProjects, saveProjects } from "../../../utils/storage";
import Screen from "../../Layout/Screen";

const WritingEditorScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { project } = params;

  const scrollRef = useRef(null);

  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(project);
  const [chapters, setChapters] = useState([""]);
  const [selectedChapter, setSelectedChapter] = useState(0);
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProjects().then((data) => {
      setProjects(data);
      const loaded = data.find((p) => p.id === project.id);
      const loadedChapters = loaded?.chapters?.length ? loaded.chapters : [""];
      setCurrentProject(loaded || project);
      setChapters(loadedChapters);
      setSelectedChapter(0);
      setText(loadedChapters[0] || "");
      setWordCount(
        (loadedChapters[0] || "").trim().split(/\s+/).filter(Boolean).length
      );
    });
  }, [project.id]);

  const saveAll = async () => {
    setSaving(true);

    const updatedProjects = projects.map((p) => {
      if (p.id === currentProject.id) {
        const newChapters = [...chapters];
        newChapters[selectedChapter] = text;
        return { ...p, chapters: newChapters };
      }
      return p;
    });

    setProjects(updatedProjects);
    await saveProjects(updatedProjects);
    setTimeout(() => setSaving(false), 800);
  };

  const addChapter = () => {
    const updatedChapters = [...chapters];
    updatedChapters[selectedChapter] = text;
    updatedChapters.push("");

    setChapters(updatedChapters);
    setSelectedChapter(updatedChapters.length - 1);
    setText("");
    setWordCount(0);

    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const confirmDeleteChapter = (index) => {
    Alert.alert(
      "Delete Chapter",
      `Are you sure you want to delete Chapter ${index + 1}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteChapter(index),
        },
      ]
    );
  };

  const deleteChapter = (index) => {
    const updatedChapters = [...chapters];
    updatedChapters.splice(index, 1);

    if (updatedChapters.length === 0) {
      updatedChapters.push("");
    }

    setChapters(updatedChapters);
    const newIndex = Math.min(index, updatedChapters.length - 1);
    setSelectedChapter(newIndex);
    setText(updatedChapters[newIndex] || "");
    setWordCount(
      (updatedChapters[newIndex] || "").trim().split(/\s+/).filter(Boolean)
        .length
    );
  };

  const goToDashboard = () => {
    saveAll();
    navigation.navigate("Dashboard");
  };

  return (
    <Screen>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.container}
        >
          <Text style={styles.projectTitle}>{currentProject.title}</Text>

          <View style={styles.saveStatus}>
            {saving ? (
              <ActivityIndicator size="small" color={COLOURS.primary} />
            ) : (
              <Text style={styles.saved}>Saved</Text>
            )}
          </View>

          <TouchableOpacity onPress={goToDashboard}>
            <Text style={styles.backButton}>← Back to Dashboard</Text>
          </TouchableOpacity>

          <View style={styles.chapterContainer}>
            <Text style={styles.arrow}>←</Text>

            <ScrollView
              horizontal
              ref={scrollRef}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chapterList}
            >
              {chapters.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    const updated = [...chapters];
                    updated[selectedChapter] = text;
                    setChapters(updated);
                    setSelectedChapter(index);
                    setText(updated[index]);
                    setWordCount(
                      updated[index].trim().split(/\s+/).filter(Boolean).length
                    );
                  }}
                  onLongPress={() => confirmDeleteChapter(index)}
                  style={[
                    styles.chapterTab,
                    selectedChapter === index && styles.activeChapterTab,
                  ]}
                >
                  <Text
                    style={
                      selectedChapter === index
                        ? styles.activeChapterText
                        : styles.chapterText
                    }
                  >
                    Chapter {index + 1}
                  </Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity onPress={addChapter}>
                <Text style={styles.addChapter}>+ Add</Text>
              </TouchableOpacity>
            </ScrollView>

            <Text style={styles.arrow}>→</Text>
          </View>

          <View style={styles.editorWrapper}>
            <TextInput
              style={styles.editor}
              multiline
              value={text}
              onChangeText={(val) => {
                setText(val);
                setWordCount(val.trim().split(/\s+/).filter(Boolean).length);
              }}
              placeholder="Start writing your story..."
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={saveAll}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>

          <Text style={styles.wordCount}>
            Chapter {selectedChapter + 1} • {wordCount} words
          </Text>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  projectTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLOURS.primary,
  },
  saveStatus: {
    marginTop: 5,
    marginBottom: 5,
  },
  saved: {
    color: COLOURS.darkGray,
    fontSize: 14,
  },
  backButton: {
    color: COLOURS.primary,
    fontWeight: "bold",
    marginVertical: 10,
  },
  chapterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  chapterList: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  chapterTab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: COLOURS.lightGray,
    marginRight: 8,
  },
  activeChapterTab: {
    backgroundColor: COLOURS.primary,
  },
  chapterText: {
    color: COLOURS.darkGray,
  },
  activeChapterText: {
    color: COLOURS.white,
    fontWeight: "bold",
  },
  addChapter: {
    color: COLOURS.primary,
    fontWeight: "bold",
    paddingHorizontal: 10,
  },
  arrow: {
    fontSize: 20,
    paddingHorizontal: 5,
    color: COLOURS.primary,
  },
  editorWrapper: {
    flex: 1,
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  editor: {
    flex: 1,
    fontSize: 16,
    padding: 10,
  },
  saveButton: {
    backgroundColor: COLOURS.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  wordCount: {
    textAlign: "right",
    fontSize: 14,
    color: COLOURS.darkGray,
    marginTop: 8,
  },
});

export default WritingEditorScreen;
