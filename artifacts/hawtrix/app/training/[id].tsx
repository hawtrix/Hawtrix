import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { Alert, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TRAININGS } from "@/app/(tabs)/training";
import { Ionicons } from "@expo/vector-icons";

const LEVEL_COLORS: Record<string, string> = { Débutant: "#10B981", Intermédiaire: "#F59E0B", Avancé: "#EF4444" };

export default function TrainingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;

  const training = TRAININGS.find(t => t.id === id);
  if (!training) return null;

  const handleEnroll = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Inscription réussie !", `Vous êtes inscrit à "${training.title}". Bon apprentissage !`);
  };

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      <LinearGradient colors={[training.color, training.color + "BB", "#0A1628"]} style={styles.heroBanner}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.heroContent}>
          <Ionicons name={training.icon as any} size={56} color="rgba(255,255,255,0.9)" />
          <Text style={styles.heroTitle}>{training.title}</Text>
          <Text style={styles.heroInstructor}>Par {training.instructor}</Text>
          <View style={styles.heroBadges}>
            <View style={[styles.levelBadge, { backgroundColor: LEVEL_COLORS[training.level] + "30", borderColor: LEVEL_COLORS[training.level] }]}>
              <Text style={[styles.levelText, { color: LEVEL_COLORS[training.level] }]}>{training.level}</Text>
            </View>
            <View style={styles.statBadge}>
              <Ionicons name="time" size={12} color="rgba(255,255,255,0.8)" />
              <Text style={styles.statBadgeText}>{training.duration}</Text>
            </View>
            <View style={styles.statBadge}>
              <Ionicons name="play-circle" size={12} color="rgba(255,255,255,0.8)" />
              <Text style={styles.statBadgeText}>{training.lessons} leçons</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: botPad + 120 }}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>À propos de cette formation</Text>
          <Text style={styles.description}>{training.description}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ce que vous allez apprendre</Text>
          {training.modules.map((m, i) => (
            <View key={i} style={styles.moduleRow}>
              <View style={[styles.moduleNum, { backgroundColor: training.color }]}>
                <Text style={styles.moduleNumText}>{i + 1}</Text>
              </View>
              <Text style={styles.moduleText}>{m}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Inclus dans cette formation</Text>
          {[
            { icon: "videocam", text: `${training.lessons} vidéos explicatives` },
            { icon: "document-text", text: "Documents PDF téléchargeables" },
            { icon: "help-circle", text: "Quiz de validation des acquis" },
            { icon: "ribbon", text: "Certificat Hawtrix à l'issue" },
            { icon: "time", text: "Accès à vie au contenu" },
            { icon: "phone-portrait", text: "Accessible sur mobile" },
          ].map((item, i) => (
            <View key={i} style={styles.includeRow}>
              <Ionicons name={item.icon as any} size={18} color={training.color} />
              <Text style={styles.includeText}>{item.text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.certCard}>
          <LinearGradient colors={["#0A1628", "#1E293B"]} style={styles.certGrad}>
            <Ionicons name="ribbon" size={32} color="#FF6B00" />
            <View style={styles.certInfo}>
              <Text style={styles.certTitle}>Certificat Hawtrix</Text>
              <Text style={styles.certSub}>Partageable sur LinkedIn et CV</Text>
            </View>
          </LinearGradient>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { paddingBottom: botPad + 16 }]}>
        <View>
          <Text style={styles.freeLabel}>Formation incluse</Text>
          <Text style={styles.freeSub}>dans votre abonnement Hawtrix</Text>
        </View>
        <TouchableOpacity style={[styles.enrollBtn, { backgroundColor: training.color }]} onPress={handleEnroll} activeOpacity={0.85}>
          <Text style={styles.enrollBtnText}>Commencer</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },
  heroBanner: { paddingHorizontal: 16, paddingBottom: 28 },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center", marginTop: 8, marginBottom: 12 },
  heroContent: { gap: 10 },
  heroTitle: { fontSize: 24, fontWeight: "800", color: "#FFFFFF", fontFamily: "Inter_700Bold", lineHeight: 30 },
  heroInstructor: { fontSize: 14, color: "rgba(255,255,255,0.75)", fontFamily: "Inter_400Regular" },
  heroBadges: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  levelBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderWidth: 1 },
  levelText: { fontSize: 12, fontWeight: "700", fontFamily: "Inter_700Bold" },
  statBadge: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(255,255,255,0.15)", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  statBadgeText: { fontSize: 12, color: "rgba(255,255,255,0.9)", fontFamily: "Inter_500Medium" },
  scroll: { flex: 1 },
  card: { marginHorizontal: 16, marginTop: 12, backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16, gap: 12 },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#0A1628", fontFamily: "Inter_700Bold" },
  description: { fontSize: 14, color: "#374151", lineHeight: 22, fontFamily: "Inter_400Regular" },
  moduleRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  moduleNum: { width: 28, height: 28, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  moduleNumText: { fontSize: 13, fontWeight: "700", color: "#FFFFFF", fontFamily: "Inter_700Bold" },
  moduleText: { flex: 1, fontSize: 14, color: "#374151", fontFamily: "Inter_400Regular" },
  includeRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  includeText: { fontSize: 14, color: "#374151", fontFamily: "Inter_400Regular" },
  certCard: { marginHorizontal: 16, marginTop: 12, borderRadius: 16, overflow: "hidden" },
  certGrad: { flexDirection: "row", alignItems: "center", gap: 16, padding: 20 },
  certInfo: { gap: 3 },
  certTitle: { fontSize: 16, fontWeight: "700", color: "#FFFFFF", fontFamily: "Inter_700Bold" },
  certSub: { fontSize: 13, color: "#94A3B8", fontFamily: "Inter_400Regular" },
  bottomBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#FFFFFF", paddingHorizontal: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: "#F0F0F0" },
  freeLabel: { fontSize: 16, fontWeight: "700", color: "#10B981", fontFamily: "Inter_700Bold" },
  freeSub: { fontSize: 12, color: "#9CA3AF", fontFamily: "Inter_400Regular" },
  enrollBtn: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 24, paddingVertical: 14, borderRadius: 14 },
  enrollBtnText: { fontSize: 16, fontWeight: "700", color: "#FFFFFF", fontFamily: "Inter_700Bold" },
});
