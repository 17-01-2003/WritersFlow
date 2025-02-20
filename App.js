import React, { useState } from "react";
import { View, Button, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/components/screens/AuthorisationScreens/LoginScreen";
import RegistrationScreen from "./src/components/screens/AuthorisationScreens/RegistrationScreen";
import DashboardScreen from "./src/components/screens/Dashboard/DashboardScreen";
import ProjectCreateScreen from "./src/components/screens/ProjectManagementScreens/ProjectCreateScreen";
import ProjectDetailScreen from "./src/components/screens/ProjectManagementScreens/ProjectDetailScreen";
import ProjectListScreen from "./src/components/screens/ProjectManagementScreens/ProjectListScreen";

import WritingGoalsScreen from "./src/components/screens/WritingToolsScreens/WritingGoalScreen";
import TemplatesScreen from "./src/components/screens/WritingToolsScreens/TemplatesScreen";
import CreativePromptsScreen from "./src/components/screens/WritingToolsScreens/CreativePromptScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null); // Simulated authentication state
  const [loading, setLoading] = useState(false); // No Firebase, so no need to check auth state

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // Authenticated Routes
          <>
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{
                headerRight: () => (
                  <Button title="Logout" onPress={() => setUser(null)} />
                ),
              }}
            />
            {/* Writing Features */}
            <Stack.Screen
              name="WritingGoals"
              component={WritingGoalsScreen}
              options={{ title: "Writing Goals" }}
            />
            <Stack.Screen
              name="Templates"
              component={TemplatesScreen}
              options={{ title: "Story Templates" }}
            />
            <Stack.Screen
              name="CreativePrompts"
              component={CreativePromptsScreen}
              options={{ title: "Creative Prompts" }}
            />

            {/* Project Management Screens */}
            <Stack.Screen
              name="ProjectList"
              component={ProjectListScreen}
              options={{ title: "Your Projects" }}
            />
            <Stack.Screen
              name="ProjectDetail"
              component={ProjectDetailScreen}
              options={{ title: "Project Details" }}
            />
            <Stack.Screen
              name="CreateProject"
              component={ProjectCreateScreen}
              options={{ title: "Create New Project" }}
            />
          </>
        ) : (
          // Unauthenticated Routes
          <>
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {(props) => <LoginScreen {...props} setUser={setUser} />}
            </Stack.Screen>
            <Stack.Screen name="Register" options={{ headerShown: false }}>
              {(props) => <RegistrationScreen {...props} setUser={setUser} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
