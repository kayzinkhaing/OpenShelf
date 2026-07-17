import { StyleSheet, View, Text, Pressable, ScrollView } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

import { useUser } from "../../hooks/useUser";

const Profile = () => {
  const { logout, user } = useUser();

  const username = user?.email?.split("@")[0] || "Reader";

  return (
    <LinearGradient
      colors={["#0F172A", "#1E3A8A", "#38BDF8"]}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}

        <View style={styles.header}>
          <Text style={styles.title}>My Profile 👋</Text>

          <Text style={styles.subtitle}>Your reading journey</Text>
        </View>

        {/* Profile Glass Card */}

        <BlurView intensity={80} tint="light" style={styles.profileCard}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={55} color="#ffffff" />
          </View>

          <Text style={styles.name}>{username}</Text>

          <Text style={styles.email}>{user?.email}</Text>

          <View style={styles.badge}>
            <Ionicons name="book" size={16} color="#2563EB" />

            <Text style={styles.badgeText}>Book Lover</Text>
          </View>
        </BlurView>

        {/* Statistics */}

        <View style={styles.statsRow}>
          <StatCard icon="book" value="24" title="Books" color="#2563EB" />

          <StatCard icon="heart" value="8" title="Favorite" color="#EC4899" />
        </View>

        <View style={styles.statsRow}>
          <StatCard
            icon="book-outline"
            value="5"
            title="Reading"
            color="#F97316"
          />

          <StatCard icon="trophy" value="11" title="Finished" color="#22C55E" />
        </View>

        {/* Reading Progress */}

        <BlurView intensity={60} tint="light" style={styles.card}>
          <Text style={styles.cardTitle}>📖 Currently Reading</Text>

          <Text style={styles.bookName}>Atomic Habits</Text>

          <Text style={styles.author}>James Clear</Text>

          <View style={styles.progressBackground}>
            <View style={styles.progress} />
          </View>

          <Text style={styles.progressText}>70% completed</Text>
        </BlurView>

        {/* Achievement */}

        <BlurView intensity={60} tint="light" style={styles.card}>
          <Text style={styles.cardTitle}>🏆 Achievement</Text>

          <Text style={styles.achievement}>"Reading Explorer"</Text>

          <Text style={styles.smallText}>You have finished 10+ books</Text>
        </BlurView>

        {/* Menu */}

        <BlurView intensity={60} tint="light" style={styles.card}>
          <MenuItem icon="settings-outline" title="Settings" />

          <MenuItem icon="moon-outline" title="Dark Mode" />

          <MenuItem icon="information-circle-outline" title="About Shelfie" />
        </BlurView>

        {/* Logout */}

        <Pressable onPress={logout} style={styles.logout}>
          <Ionicons name="log-out-outline" size={22} color="white" />

          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
};

function StatCard({ icon, value, title, color }) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon} size={28} color={color} />

      <Text style={styles.statValue}>{value}</Text>

      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

function MenuItem({ icon, title }) {
  return (
    <Pressable style={styles.menuItem}>
      <Ionicons name={icon} size={24} color="#2563EB" />

      <Text style={styles.menuText}>{title}</Text>

      <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
    </Pressable>
  );
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingHorizontal: 20,

    paddingTop: 50,
  },

  header: {
    marginBottom: 25,
  },

  title: {
    fontSize: 32,

    fontWeight: "900",

    color: "#fff",
  },

  subtitle: {
    marginTop: 6,

    fontSize: 16,

    color: "#E2E8F0",
  },

  profileCard: {
    borderRadius: 30,

    padding: 30,

    alignItems: "center",

    overflow: "hidden",

    backgroundColor: "rgba(255,255,255,0.25)",
  },

  avatar: {
    width: 100,

    height: 100,

    borderRadius: 50,

    backgroundColor: "#2563EB",

    justifyContent: "center",

    alignItems: "center",
  },

  name: {
    fontSize: 26,

    fontWeight: "900",

    marginTop: 15,

    color: "#0F172A",
  },

  email: {
    marginTop: 5,

    color: "#475569",
  },

  badge: {
    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#DBEAFE",

    paddingHorizontal: 15,

    paddingVertical: 7,

    borderRadius: 20,

    marginTop: 15,
  },

  badgeText: {
    marginLeft: 5,

    color: "#2563EB",

    fontWeight: "700",
  },

  statsRow: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: 18,
  },

  statCard: {
    width: "48%",

    padding: 22,

    borderRadius: 25,

    backgroundColor: "rgba(255,255,255,0.9)",
  },

  statValue: {
    fontSize: 30,

    fontWeight: "900",

    marginTop: 10,
  },

  statTitle: {
    color: "#64748B",

    marginTop: 5,
  },

  card: {
    marginTop: 20,

    padding: 22,

    borderRadius: 25,

    overflow: "hidden",

    backgroundColor: "rgba(255,255,255,0.85)",
  },

  cardTitle: {
    fontSize: 18,

    fontWeight: "800",

    color: "#0F172A",
  },

  bookName: {
    fontSize: 24,

    fontWeight: "900",

    marginTop: 15,
  },

  author: {
    color: "#64748B",

    marginTop: 5,
  },

  progressBackground: {
    height: 12,

    backgroundColor: "#E2E8F0",

    borderRadius: 20,

    marginTop: 20,
  },

  progress: {
    width: "70%",

    height: "100%",

    backgroundColor: "#2563EB",

    borderRadius: 20,
  },

  progressText: {
    marginTop: 10,

    color: "#475569",
  },

  achievement: {
    fontSize: 22,

    fontWeight: "900",

    marginTop: 12,
  },

  smallText: {
    marginTop: 5,

    color: "#64748B",
  },

  menuItem: {
    flexDirection: "row",

    alignItems: "center",

    paddingVertical: 15,
  },

  menuText: {
    flex: 1,

    marginLeft: 15,

    fontSize: 16,

    fontWeight: "700",

    color: "#0F172A",
  },

  logout: {
    marginTop: 25,

    marginBottom: 40,

    height: 55,

    borderRadius: 20,

    backgroundColor: "#EF4444",

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",
  },

  logoutText: {
    color: "#fff",

    fontSize: 17,

    fontWeight: "800",

    marginLeft: 10,
  },
});
