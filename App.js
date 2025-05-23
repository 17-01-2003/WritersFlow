import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import DashboardScreen from "./src/components/screens/Dashboard/DashboardScreen";

import WritingGoalsScreen from "./src/components/screens/WritingToolsScreens/WritingGoalScreen";
import CreativePromptsScreen from "./src/components/screens/WritingToolsScreens/CreativePromptScreen";
import StoryTemplatesScreen from "./src/components/screens/WritingToolsScreens/StoryTemplatesScreen";
import GoalTrackerScreen from "./src/components/screens/WritingToolsScreens/GoalTrackerScreen";
import TemplateDetailScreen from "./src/components/screens/WritingToolsScreens/TemplateDetailScreen";
import TemplateGuidedWritingScreen from "./src/components/screens/WritingToolsScreens/TemplateGuidedWritingScreen";

import ProjectListScreen from "./src/components/screens/ProjectManagementScreens/ProjectListScreen";
import ProjectDetailScreen from "./src/components/screens/ProjectManagementScreens/ProjectDetailScreen";
import EditProjectScreen from "./src/components/screens/ProjectManagementScreens/EditProjectScreen";
import ProjectCreateScreen from "./src/components/screens/ProjectManagementScreens/ProjectCreateScreen";
import WritingEditorScreen from "./src/components/screens/ProjectManagementScreens/WritingEditorScreen";

const WritingToolsStack = createNativeStackNavigator();
const ProjectsStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const WritingToolsNavigator = () => (
  <WritingToolsStack.Navigator screenOptions={{ headerShown: true }}>
    <WritingToolsStack.Screen
      name="WritingGoals"
      component={WritingGoalsScreen}
      options={{ title: "Writing Goals" }}
    />
    <WritingToolsStack.Screen
      name="GoalTracker"
      component={GoalTrackerScreen}
      options={{ title: "Goal Tracker" }}
    />
    <WritingToolsStack.Screen
      name="StoryTemplates"
      component={StoryTemplatesScreen}
      options={{ title: "Story Templates" }}
    />
    <WritingToolsStack.Screen
      name="TemplateDetail"
      component={TemplateDetailScreen}
      options={{ title: "Template Detail" }}
    />
    <WritingToolsStack.Screen
      name="TemplateGuidedWriting"
      component={TemplateGuidedWritingScreen}
      options={{ title: "Template Guide" }}
    />
    <WritingToolsStack.Screen
      name="CreativePrompts"
      component={CreativePromptsScreen}
      options={{ title: "Creative Prompts" }}
    />
  </WritingToolsStack.Navigator>
);

const ProjectsNavigator = () => (
  <ProjectsStack.Navigator screenOptions={{ headerShown: true }}>
    <ProjectsStack.Screen
      name="ProjectList"
      component={ProjectListScreen}
      options={{ title: "Your Projects" }}
    />
    <ProjectsStack.Screen
      name="ProjectDetail"
      component={ProjectDetailScreen}
      options={{ title: "Project Details" }}
    />
    <ProjectsStack.Screen
      name="EditProject"
      component={EditProjectScreen}
      options={{ title: "Edit Project" }}
    />
    <ProjectsStack.Screen
      name="CreateProject"
      component={ProjectCreateScreen}
      options={{ title: "Create New Project" }}
    />
    <ProjectsStack.Screen
      name="WritingEditor"
      component={WritingEditorScreen}
      options={{ title: "Writing Editor" }}
    />
  </ProjectsStack.Navigator>
);

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Dashboard"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === "Dashboard") iconName = "home";
              else if (route.name === "WritingTools") iconName = "create";
              else if (route.name === "Projects") iconName = "book";
              else if (route.name === "NewProject") iconName = "add-circle"; // ➕ New Project
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#007BFF",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
          })}
        >
          <Tab.Screen name="Dashboard" component={DashboardScreen} />
          <Tab.Screen
            name="WritingTools"
            component={WritingToolsNavigator}
            options={{ title: "Writing Tools" }}
          />
          <Tab.Screen name="Projects" component={ProjectsNavigator} />
          <Tab.Screen
            name="NewProject"
            component={ProjectCreateScreen}
            options={{ title: "New Project" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
