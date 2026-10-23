import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { RootStackParamList } from './src/types/expense';
import { HomeScreen, AddExpenseScreen, DetailScreen } from './src/screens';
import { ExpenseProvider } from './src/context';
import { COLORS } from './src/constants';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ExpenseProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: COLORS.surface,
            },
            headerTintColor: COLORS.textPrimary,
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 18,
            },
            headerShadowVisible: true,
            contentStyle: {
              backgroundColor: COLORS.background,
            },
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Expense Tracker',
            }}
          />
          <Stack.Screen
            name="AddExpense"
            component={AddExpenseScreen}
            options={{
              title: 'Add New Expense',
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen
            name="ExpenseDetail"
            component={DetailScreen}
            options={{
              title: 'Expense Details',
              headerBackTitle: 'Back',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpenseProvider>
  );
}
