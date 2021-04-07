import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as AuthProvider } from "./src/providers/AuthContext";
import { Provider as TeachItProvider } from "./src/providers/TeachItContext";
import { ThemeProvider } from "react-native-elements";
import Navigation from "./src/components/navigation";
import LongTimers from "./src/utils/LongTimers";
import theme from "./src/theme";

export default function App() {
  LongTimers();

  return (
    <AuthProvider>
      <TeachItProvider>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            <Navigation />
          </SafeAreaProvider>
        </ThemeProvider>
      </TeachItProvider>
    </AuthProvider>
  );
};