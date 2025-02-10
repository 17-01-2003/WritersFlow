import React, { useState } from 'react';
import { View, Button, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/components/screens/AuthorisationScreens/LoginScreen';
import RegistrationScreen from './src/components/screens/AuthorisationScreens/RegistrationScreen';
import DashboardScreen from './src/components/screens/Dashboard/DashboardScreen';
import ProjectCreateScreen from './src/components/screens/ProjectManagementScreens/ProjectCreateScreen';
import ProjectDetailScreen from './src/components/screens/ProjectManagementScreens/ProjectDetailScreen';
import ProjectListScreen from './src/components/screens/ProjectManagementScreens/ProjectListScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null); // Simulated authentication state
  const [loading, setLoading] = useState(false); // No Firebase, so no need to check auth state

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // If user is logged in, show the dashboard and project screens
          <>
            <Stack.Screen 
              name="Dashboard" 
              component={DashboardScreen} 
              options={{ 
                headerRight: () => <Button title="Logout" onPress={() => setUser(null)} /> 
              }} 
            />
            <Stack.Screen name="ProjectList" component={ProjectListScreen} />
            <Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} />
            <Stack.Screen name="CreateProject" component={ProjectCreateScreen} />
          </>
        ) : (
          // If user is NOT logged in, show authentication screens
          <>
            <Stack.Screen name="Login">
              {props => <LoginScreen {...props} setUser={setUser} />}
            </Stack.Screen>
            <Stack.Screen name="Register">
              {props => <RegistrationScreen {...props} setUser={setUser} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}