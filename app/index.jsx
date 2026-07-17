import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

import ThemedView from "../components/ThemedView";
import ThemedLogo from "../components/ThemedLogo";
import ThemedText from "../components/ThemedText";
import Spacer from "../components/Spacer";

export default function Index() {
  return (
    <ThemedView style={styles.container}>
      <ThemedLogo />
      <Spacer height={20} />
      <ThemedText style={styles.title}>Hello, I'm NyxK! 🚀</ThemedText>
      <Spacer height={10} />
      <ThemedText>Reading List App</ThemedText>
      <Spacer />

      <View style={styles.card}>
        <ThemedText style={styles.cardText}>
          Welcome to your modern dashboard.
        </ThemedText>

        <Link href="/login" style={styles.link}>
          <ThemedText>Login Page →</ThemedText>
        </Link>

        <Link href="/register" style={styles.link}>
          <ThemedText>Register Page →</ThemedText>
        </Link>
      </View>

      <StatusBar style="dark" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1E293B",
  },

  subtitle: {
    fontSize: 16,
    color: "#64748B",
    marginBottom: 40,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    borderRadius: 20,
    width: "100%",
    maxWidth: 350,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,

    elevation: 5,
  },

  cardText: {
    fontSize: 16,
    marginBottom: 15,
    color: "#334155",
  }
});
