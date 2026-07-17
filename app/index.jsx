import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Pressable } from "react-native";
import { Link } from "expo-router";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";

import ThemedView from "../components/ThemedView";
import ThemedLogo from "../components/ThemedLogo";
import ThemedText from "../components/ThemedText";

export default function Index() {
  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={["#EEF2F6", "#E0E7FF", "#F5F3FF", "#FCE7F3"]}
        style={StyleSheet.absoluteFillObject}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.orb1} />
      <View style={styles.orb2} />
      <View style={styles.orb3} />

      <View style={styles.header}>
        <ThemedLogo />
        <ThemedText style={styles.title}>Shelfie 📚</ThemedText>
        <ThemedText style={styles.subtitle}>
          Your personal digital library
        </ThemedText>
      </View>

      <BlurView intensity={70} tint="light" style={styles.glassCard}>
        <View style={styles.cardInner}>
          <View>
            <ThemedText style={styles.welcome}>Welcome back 👋</ThemedText>
            <ThemedText style={styles.description}>
              Manage your books, track reading progress, and discover new stories.
            </ThemedText>
          </View>

          <View style={styles.infoTile}>
            <View style={styles.iconContainer}>
              <ThemedText style={styles.icon}>📖</ThemedText>
            </View>
            <View style={styles.infoTextBlock}>
              <ThemedText style={styles.infoTitle}>My Library</ThemedText>
              <ThemedText style={styles.infoDesc}>
                Keep all your favorites together
              </ThemedText>
            </View>
            <ThemedText style={styles.arrowIcon}>→</ThemedText>
          </View>

          {/* ——— Horizontal Button Row ——— */}
          <View style={styles.buttonRow}>
            <Link href="/login" asChild>
              <Pressable
                style={({ pressed }) => [
                  styles.loginBtn,
                  pressed && styles.btnPressed,
                ]}
              >
                <ThemedText style={styles.loginText}>Login</ThemedText>
              </Pressable>
            </Link>

            <Link href="/register" asChild>
              <Pressable
                style={({ pressed }) => [
                  styles.registerBtn,
                  pressed && styles.btnPressed,
                ]}
              >
                <ThemedText style={styles.registerText}>Create Account</ThemedText>
              </Pressable>
            </Link>
          </View>

          <Link href="/profile" style={styles.profileLink}>
            <ThemedText style={styles.profileText}>Go to Profile →</ThemedText>
          </Link>
        </View>
      </BlurView>

      <StatusBar style="dark" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    overflow: "hidden",
  },

  orb1: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(99, 102, 241, 0.18)",
    top: -80,
    right: -60,
  },
  orb2: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(168, 85, 247, 0.15)",
    bottom: -100,
    left: -60,
  },
  orb3: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(244, 63, 94, 0.08)",
    top: "35%",
    right: -80,
  },

  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    marginTop: 12,
    fontSize: 40,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -1,
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#475569",
    fontWeight: "500",
  },

  glassCard: {
    borderRadius: 32,
    padding: 24,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.7)",
    shadowColor: "#0F172A",
    shadowOpacity: 0.06,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 16 },
    elevation: 8,
  },
  cardInner: {},

  welcome: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#475569",
    marginBottom: 24,
  },

  infoTile: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginBottom: 24,
    shadowColor: "#0F172A",
    shadowOpacity: 0.02,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  icon: {
    fontSize: 22,
  },
  infoTextBlock: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },
  infoDesc: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 2,
  },
  arrowIcon: {
    fontSize: 16,
    color: "#94A3B8",
    fontWeight: "600",
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 24,
  },
  loginBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4F46E5",
    shadowColor: "#4F46E5",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  loginText: {
    color: "#58B531",
    fontSize: 15,
    fontWeight: "600",
  },
  registerBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  registerText: {
    color: "#4F46E5",
    fontSize: 15,
    fontWeight: "600",
  },

  profileLink: {
    alignSelf: "center",
    marginTop: 4,
  },
  profileText: {
    color: "#64748B",
    fontSize: 14,
    fontWeight: "600",
  },

  btnPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});