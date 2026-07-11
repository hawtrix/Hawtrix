import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TRAININGS } from "@/app/(tabs)/training";
import { Ionicons } from "@expo/vector-icons";

const LEVEL_COLORS: Record<string, string> = { Débutant: "#10B981", Intermédiaire: "#F59E0B", Avancé: "#EF4444" };

// Génère les leçons détaillées à partir des modules
function generateLessons(modules: string[], trainingTitle: string) {
  const lessonTypes = [
    { type: "Cours théorique", icon: "book" as const, tag: "Théorie", duration: "10-15 min" },
    { type: "Vidéo explicative", icon: "videocam" as const, tag: "Vidéo", duration: "2 min" },
    { type: "Exercices pratiques", icon: "construct" as const, tag: "Pratique", duration: "15-20 min" },
    { type: "Quiz de validation", icon: "help-circle" as const, tag: "Quiz", duration: "5 min" },
  ];

  const lessons: Array<{
    num: number;
    moduleTitle: string;
    title: string;
    type: string;
    icon: "book" | "videocam" | "construct" | "help-circle";
    tag: string;
    duration: string;
    done: boolean;
  }> = [];

  let num = 1;
  modules.forEach((mod, modIdx) => {
    // Pour chaque module: 1 cours théorique + 1 vidéo 2min + 1 exercice pratique
    const lessonSets = [
      { type: "Cours théorique", icon: "book" as const, tag: "Théorie", duration: "10-15 min", title: mod },
      { type: "Vidéo démonstrative", icon: "videocam" as const, tag: "Vidéo · 2 min", duration: "2 min", title: `Démonstration : ${mod}` },
      { type: "Exercices pratiques", icon: "construct" as const, tag: "Pratique", duration: "15-20 min", title: `Mise en pratique : ${mod}` },
    ];
    lessonSets.forEach(ls => {
      lessons.push({ num, moduleTitle: mod, ...ls, done: false });
      num++;
    });
  });

  // Ajouter quiz final
  lessons.push({
    num,
    moduleTitle: "Évaluation finale",
    title: `Quiz final : ${trainingTitle}`,
    type: "Quiz de validation",
    icon: "help-circle",
    tag: "Quiz final",
    duration: "10-15 min",
    done: false,
  });

  return lessons;
}

type LessonStatus = Record<number, boolean>;

export default function TrainingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;
  const [activeTab, setActiveTab] = useState<"contenu" | "lecons" | "inclus">("lecons");
  const [lessonStatus, setLessonStatus] = useState<LessonStatus>({});

  const training = TRAININGS.find(t => t.id === id);
  if (!training) return null;

  const lessons = generateLessons(training.modules, training.title);
  const completedCount = Object.values(lessonStatus).filter(Boolean).length;
  const progressPct = Math.round((completedCount / lessons.length) * 100);

  const handleLessonPress = (lesson: typeof lessons[0]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (lesson.tag.includes("Vidéo")) {
      Alert.alert(
        `📹 ${lesson.title}`,
        `Leçon ${lesson.num} · Durée : ${lesson.duration}\n\nLa vidéo de démonstration se lance dans l'application complète.\n\n(Contenu disponible après inscription)`,
        [
          { text: "Marquer comme vue", onPress: () => setLessonStatus(s => ({ ...s, [lesson.num]: true })) },
          { text: "Fermer", style: "cancel" },
        ]
      );
    } else if (lesson.tag.includes("Quiz")) {
      Alert.alert(
        `📝 ${lesson.title}`,
        `Validez vos acquis avec ${lesson.tag === "Quiz final" ? "le quiz final" : "un quiz"}.\n\n(Disponible après avoir complété les leçons précédentes)`,
        [{ text: "OK" }]
      );
    } else {
      Alert.alert(
        `📚 ${lesson.title}`,
        `Leçon ${lesson.num} · ${lesson.type}\nDurée : ${lesson.duration}\n\nContenu théorique disponible après inscription.`,
        [
          { text: "Marquer comme lu", onPress: () => setLessonStatus(s => ({ ...s, [lesson.num]: true })) },
          { text: "Fermer", style: "cancel" },
        ]
      );
    }
  };

  const handleEnroll = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Inscription réussie !", `Vous êtes inscrit à "${training.title}".\n\n${lessons.length} leçons vous attendent. Bon apprentissage ! 🎓`);
  };

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      <LinearGradient colors={[training.color, training.color + "BB", "#0A1628"]} style={styles.heroBanner}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.heroContent}>
          <Ionicons name={training.icon as any} size={48} color="rgba(255,255,255,0.9)" />
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
              <Text style={styles.statBadgeText}>{lessons.length} leçons</Text>
            </View>
          </View>
        </View>

        {/* Barre de progression */}
        {completedCount > 0 && (
          <View style={styles.progressWrap}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progressPct}%` as any }]} />
            </View>
            <Text style={styles.progressText}>{progressPct}% complété</Text>
          </View>
        )}
      </LinearGradient>

      {/* Onglets */}
      <View style={styles.tabs}>
        {(["lecons", "contenu", "inclus"] as const).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && { borderBottomColor: training.color, borderBottomWidth: 2 }]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, activeTab === tab && { color: training.color, fontWeight: "700" }]}>
              {tab === "lecons" ? "Leçons" : tab === "contenu" ? "Contenu" : "Inclus"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: botPad + 120 }}>

        {activeTab === "lecons" && (
          <View style={{ paddingTop: 8 }}>
            <View style={styles.lessonHeader}>
              <Text style={styles.lessonCount}>{lessons.length} leçons · {training.duration}</Text>
              <Text style={styles.lessonCompleted}>{completedCount} / {lessons.length} vues</Text>
            </View>

            {/* Grouper par module */}
            {training.modules.map((mod, modIdx) => {
              const modLessons = lessons.filter(l => l.moduleTitle === mod);
              return (
                <View key={modIdx} style={styles.moduleGroup}>
                  <View style={[styles.moduleGroupHeader, { backgroundColor: training.color + "15" }]}>
                    <View style={[styles.moduleNumBadge, { backgroundColor: training.color }]}>
                      <Text style={styles.moduleNumText}>{modIdx + 1}</Text>
                    </View>
                    <Text style={[styles.moduleGroupTitle, { color: training.color }]}>{mod}</Text>
                  </View>
                  {modLessons.map(lesson => (
                    <TouchableOpacity
                      key={lesson.num}
                      style={[styles.lessonRow, lessonStatus[lesson.num] && styles.lessonRowDone]}
                      onPress={() => handleLessonPress(lesson)}
                      activeOpacity={0.8}
                    >
                      <View style={[styles.lessonIconWrap, {
                        backgroundColor: lesson.tag.includes("Vidéo") ? "#EF4444" + "20" :
                          lesson.tag.includes("Quiz") ? "#8B5CF6" + "20" :
                          lesson.tag.includes("Pratique") ? "#10B981" + "20" : training.color + "15"
                      }]}>
                        <Ionicons
                          name={lesson.icon}
                          size={18}
                          color={lesson.tag.includes("Vidéo") ? "#EF4444" :
                            lesson.tag.includes("Quiz") ? "#8B5CF6" :
                            lesson.tag.includes("Pratique") ? "#10B981" : training.color}
                        />
                      </View>
                      <View style={styles.lessonInfo}>
                        <View style={styles.lessonTitleRow}>
                          <Text style={[styles.lessonNum, { color: training.color }]}>Leçon {lesson.num}</Text>
                          <View style={[styles.lessonTag, {
                            backgroundColor: lesson.tag.includes("Vidéo") ? "#EF4444" + "15" :
                              lesson.tag.includes("Quiz") ? "#8B5CF6" + "15" :
                              lesson.tag.includes("Pratique") ? "#10B981" + "15" : training.color + "15"
                          }]}>
                            <Text style={[styles.lessonTagText, {
                              color: lesson.tag.includes("Vidéo") ? "#EF4444" :
                                lesson.tag.includes("Quiz") ? "#8B5CF6" :
                                lesson.tag.includes("Pratique") ? "#10B981" : training.color
                            }]}>{lesson.tag}</Text>
                          </View>
                        </View>
                        <Text style={styles.lessonTitle} numberOfLines={2}>{lesson.title}</Text>
                        <Text style={styles.lessonDuration}>⏱ {lesson.duration}</Text>
                      </View>
                      <View style={styles.lessonRight}>
                        {lessonStatus[lesson.num]
                          ? <Ionicons name="checkmark-circle" size={22} color="#10B981" />
                          : lesson.tag.includes("Vidéo")
                          ? <View style={[styles.playBtn, { backgroundColor: training.color }]}><Ionicons name="play" size={14} color="#FFFFFF" /></View>
                          : <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
                        }
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              );
            })}

            {/* Quiz final */}
            {(() => {
              const quiz = lessons.find(l => l.tag === "Quiz final");
              if (!quiz) return null;
              return (
                <TouchableOpacity style={[styles.quizFinalCard]} onPress={() => handleLessonPress(quiz)} activeOpacity={0.85}>
                  <LinearGradient colors={["#0A1628", "#1E293B"]} style={styles.quizFinalGrad}>
                    <Ionicons name="ribbon" size={28} color="#FF6B00" />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.quizFinalTitle}>Leçon {quiz.num} · Quiz Final</Text>
                      <Text style={styles.quizFinalSub}>Validez vos acquis · Obtenez votre certificat</Text>
                    </View>
                    <Ionicons name="arrow-forward" size={20} color="#FF6B00" />
                  </LinearGradient>
                </TouchableOpacity>
              );
            })()}
          </View>
        )}

        {activeTab === "contenu" && (
          <>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>À propos de cette formation</Text>
              <Text style={styles.description}>{training.description}</Text>
            </View>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Modules du programme</Text>
              {training.modules.map((m, i) => (
                <View key={i} style={styles.moduleRow}>
                  <View style={[styles.moduleNum, { backgroundColor: training.color }]}>
                    <Text style={styles.moduleNumTxt}>{i + 1}</Text>
                  </View>
                  <Text style={styles.moduleText}>{m}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        {activeTab === "inclus" && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Inclus dans cette formation</Text>
            {[
              { icon: "book", text: `${training.modules.length * 3} cours théoriques complets`, color: training.color },
              { icon: "videocam", text: `${training.modules.length} vidéos démonstratives (2 min chacune)`, color: "#EF4444" },
              { icon: "construct", text: `${training.modules.length} exercices pratiques guidés`, color: "#10B981" },
              { icon: "help-circle", text: "Quiz de validation par module", color: "#8B5CF6" },
              { icon: "document-text", text: "Documents PDF téléchargeables", color: "#F59E0B" },
              { icon: "ribbon", text: "Certificat Hawtrix à l'issue", color: "#FF6B00" },
              { icon: "time", text: "Accès à vie au contenu", color: "#0F52BA" },
              { icon: "phone-portrait", text: "Accessible sur mobile hors connexion", color: "#6B7280" },
            ].map((item, i) => (
              <View key={i} style={styles.includeRow}>
                <View style={[styles.includeIconWrap, { backgroundColor: item.color + "20" }]}>
                  <Ionicons name={item.icon as any} size={18} color={item.color} />
                </View>
                <Text style={styles.includeText}>{item.text}</Text>
              </View>
            ))}
          </View>
        )}
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
  heroBanner: { paddingHorizontal: 16, paddingBottom: 20 },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center", marginTop: 8, marginBottom: 8 },
  heroContent: { gap: 8 },
  heroTitle: { fontSize: 22, fontWeight: "800", color: "#FFFFFF", fontFamily: "Inter_700Bold", lineHeight: 28 },
  heroInstructor: { fontSize: 13, color: "rgba(255,255,255,0.75)", fontFamily: "Inter_400Regular" },
  heroBadges: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  levelBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderWidth: 1 },
  levelText: { fontSize: 12, fontWeight: "700", fontFamily: "Inter_700Bold" },
  statBadge: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(255,255,255,0.15)", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  statBadgeText: { fontSize: 12, color: "rgba(255,255,255,0.9)", fontFamily: "Inter_500Medium" },
  progressWrap: { marginTop: 12, gap: 6 },
  progressBarBg: { height: 6, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 3, overflow: "hidden" },
  progressBarFill: { height: "100%", backgroundColor: "#FFFFFF", borderRadius: 3 },
  progressText: { fontSize: 12, color: "rgba(255,255,255,0.8)", fontFamily: "Inter_400Regular" },
  tabs: { flexDirection: "row", backgroundColor: "#FFFFFF", borderBottomWidth: 1, borderBottomColor: "#F0F0F0" },
  tab: { flex: 1, paddingVertical: 14, alignItems: "center", borderBottomWidth: 2, borderBottomColor: "transparent" },
  tabText: { fontSize: 14, color: "#6B7280", fontFamily: "Inter_500Medium" },
  scroll: { flex: 1 },
  lessonHeader: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 10 },
  lessonCount: { fontSize: 13, color: "#6B7280", fontFamily: "Inter_400Regular" },
  lessonCompleted: { fontSize: 13, color: "#10B981", fontWeight: "600", fontFamily: "Inter_600SemiBold" },
  moduleGroup: { marginBottom: 4 },
  moduleGroupHeader: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 16, paddingVertical: 12 },
  moduleNumBadge: { width: 24, height: 24, borderRadius: 7, alignItems: "center", justifyContent: "center" },
  moduleNumText: { fontSize: 12, fontWeight: "700", color: "#FFFFFF", fontFamily: "Inter_700Bold" },
  moduleGroupTitle: { flex: 1, fontSize: 14, fontWeight: "700", fontFamily: "Inter_700Bold" },
  lessonRow: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#FFFFFF", paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#F5F6FA" },
  lessonRowDone: { backgroundColor: "#F0FDF4" },
  lessonIconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  lessonInfo: { flex: 1, gap: 4 },
  lessonTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  lessonNum: { fontSize: 11, fontWeight: "700", fontFamily: "Inter_700Bold" },
  lessonTag: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 6 },
  lessonTagText: { fontSize: 10, fontWeight: "700", fontFamily: "Inter_700Bold" },
  lessonTitle: { fontSize: 14, fontWeight: "600", color: "#0A1628", fontFamily: "Inter_600SemiBold", lineHeight: 19 },
  lessonDuration: { fontSize: 11, color: "#9CA3AF", fontFamily: "Inter_400Regular" },
  lessonRight: { width: 32, alignItems: "center", justifyContent: "center" },
  playBtn: { width: 32, height: 32, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  quizFinalCard: { marginHorizontal: 16, marginTop: 8, marginBottom: 4, borderRadius: 16, overflow: "hidden" },
  quizFinalGrad: { flexDirection: "row", alignItems: "center", gap: 14, padding: 18 },
  quizFinalTitle: { fontSize: 15, fontWeight: "700", color: "#FFFFFF", fontFamily: "Inter_700Bold" },
  quizFinalSub: { fontSize: 12, color: "#94A3B8", fontFamily: "Inter_400Regular", marginTop: 2 },
  card: { marginHorizontal: 16, marginTop: 12, backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16, gap: 12 },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#0A1628", fontFamily: "Inter_700Bold" },
  description: { fontSize: 14, color: "#374151", lineHeight: 22, fontFamily: "Inter_400Regular" },
  moduleRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  moduleNum: { width: 28, height: 28, borderRadius: 8, alignItems: "center", justifyContent: "center" },
  moduleNumTxt: { fontSize: 13, fontWeight: "700", color: "#FFFFFF", fontFamily: "Inter_700Bold" },
  moduleText: { flex: 1, fontSize: 14, color: "#374151", fontFamily: "Inter_400Regular" },
  includeRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  includeIconWrap: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  includeText: { flex: 1, fontSize: 14, color: "#374151", fontFamily: "Inter_400Regular" },
  bottomBar: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#FFFFFF", paddingHorizontal: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: "#F0F0F0" },
  freeLabel: { fontSize: 15, fontWeight: "700", color: "#10B981", fontFamily: "Inter_700Bold" },
  freeSub: { fontSize: 11, color: "#9CA3AF", fontFamily: "Inter_400Regular" },
  enrollBtn: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 24, paddingVertical: 14, borderRadius: 14 },
  enrollBtnText: { fontSize: 15, fontWeight: "700", color: "#FFFFFF", fontFamily: "Inter_700Bold" },
});
