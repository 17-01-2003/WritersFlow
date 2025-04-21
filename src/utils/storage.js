import AsyncStorage from "@react-native-async-storage/async-storage";

const GOAL_KEY = "@writing_goals";

export const saveGoals = async (goals) => {
  try {
    const jsonValue = JSON.stringify(goals);
    await AsyncStorage.setItem(GOAL_KEY, jsonValue);
  } catch (e) {
    console.error("Failed to save goals", e);
  }
};

export const loadGoals = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(GOAL_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Failed to load goals", e);
    return [];
  }
};
