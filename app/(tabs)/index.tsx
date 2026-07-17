import { StyleSheet, Text, View, Pressable } from "react-native";
export default function HomeScreen() {
  return (
<View style={styles.container}>
<Text style={styles.title}>WRNC</Text>
<Text style={styles.subtitle}>Mission Control</Text>
<View style={styles.card}>
<Text style={styles.cardTitle}>🚗 My Garage</Text>
<Text style={styles.cardValue}>0 Vehicles</Text>
</View>
<View style={styles.card}>
<Text style={styles.cardTitle}>🔧 Maintenance</Text>
<Text style={styles.cardValue}>Nothing Due</Text>
</View>
<View style={styles.card}>
<Text style={styles.cardTitle}>🤖 AI Assistant</Text>
<Text style={styles.cardValue}>Ready</Text>
</View>
<Pressable style={styles.button}>
<Text style={styles.buttonText}>+ Add Your First Vehicle</Text>
</Pressable>
</View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 24,
    paddingTop: 70,
  },
  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "800",
  },
  subtitle: {
    color: "#94A3B8",
    fontSize: 18,
    marginBottom: 30,
  },
  card: {
    backgroundColor: "#1E293B",
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  cardValue: {
    color: "#CBD5E1",
    fontSize: 16,
    marginTop: 8,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 18,
    borderRadius: 16,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});


