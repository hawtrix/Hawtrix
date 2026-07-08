import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export type OpportunityType = "Emploi" | "Stage" | "Bourse" | "Concours" | "Projet" | "Financement" | "Appel d'offres" | "Événement";

export const OPPORTUNITIES = [
  { id: "1", type: "Bourse" as OpportunityType, title: "Bourse d'excellence du Gouvernement Togolais 2025", org: "MESRS Togo", city: "Lomé", deadline: "15 Août 2025", description: "Le Ministère de l'Enseignement Supérieur offre 200 bourses d'excellence pour des études de Master et Doctorat dans les universités togolaises et étrangères. Domaines prioritaires : STEM, Santé, Agriculture, Droit.", requirements: "Avoir obtenu une Licence avec mention Bien ou Très Bien. Être de nationalité togolaise. Âge maximum : 30 ans.", image: "school", color: "#8B5CF6" },
  { id: "2", type: "Bourse" as OpportunityType, title: "Bourses Chinoises 2025-2026 (CSC)", org: "Ambassade de Chine au Togo", city: "Lomé", deadline: "30 Juin 2025", description: "Le gouvernement chinois offre des bourses complètes (frais d'inscription, logement, allocation mensuelle) pour des études en Chine. Niveaux : Licence, Master, Doctorat. Toutes disciplines.", requirements: "Nationalité togolaise. Moins de 35 ans (doctorat). Pas de bourse gouvernementale en cours.", image: "school", color: "#DC2626" },
  { id: "3", type: "Bourse" as OpportunityType, title: "Bourse AFD - Gouvernance & Développement durable", org: "Agence Française de Développement", city: "Paris / Lomé", deadline: "28 Fév 2026", description: "L'AFD lance son programme de bourses pour des professionnels africains souhaitant poursuivre un Master en France dans les domaines de la gouvernance, développement territorial et transition écologique.", requirements: "Bac+3 minimum. 3 ans d'expérience professionnelle. Niveau B2 en français.", image: "earth", color: "#1D4ED8" },
  { id: "4", type: "Concours" as OpportunityType, title: "Concours d'entrée à l'ENAM 2025", org: "École Nationale d'Administration et de Magistrature", city: "Lomé", deadline: "1 Septembre 2025", description: "Ouverture du concours d'entrée à l'ENAM Togo pour l'année académique 2025-2026. Filières : Administration Générale, Greffes, Impôts et Douanes, Trésor.", requirements: "Être titulaire d'une Licence dans les spécialités concernées. Être de nationalité togolaise. Âge max : 35 ans.", image: "school", color: "#F59E0B" },
  { id: "5", type: "Concours" as OpportunityType, title: "Concours Police Nationale 2025", org: "Ministère de la Sécurité - Togo", city: "National", deadline: "15 Octobre 2025", description: "Recrutement de 500 agents pour la Police Nationale togolaise. Postes : Agents de Police, Gardiens de la Paix, Agents de renseignement.", requirements: "Nationalité togolaise. Âge : 18-28 ans. Bonne condition physique. BEPC minimum.", image: "shield", color: "#0F52BA" },
  { id: "6", type: "Emploi" as OpportunityType, title: "Développeur Mobile React Native - Startups Togo", org: "Tech Hub Lomé", city: "Lomé", deadline: "Ouvert", description: "Tech Hub Lomé recherche 3 développeurs mobiles React Native pour plusieurs startups en phase de croissance. Contrat CDI. Télétravail possible.", requirements: "2+ ans d'expérience React Native. Portfolio requis. Connaissance de TypeScript.", image: "code-slash", color: "#10B981" },
  { id: "7", type: "Emploi" as OpportunityType, title: "Comptable Senior - Banque Atlantique Togo", org: "Banque Atlantique", city: "Lomé", deadline: "31 Juil 2025", description: "La Banque Atlantique Togo recherche un Comptable Senior pour son département financier. CDD de 12 mois renouvelable.", requirements: "BAC+4 en Comptabilité-Gestion. 5+ ans d'expérience. Maîtrise SYSCOHADA.", image: "business", color: "#1D4ED8" },
  { id: "8", type: "Stage" as OpportunityType, title: "Stage Communication & Marketing Digital", org: "Orange Togo", city: "Lomé", deadline: "15 Août 2025", description: "Orange Togo offre 5 stages de 6 mois dans son département Communication. Indemnisation attractive. Possibilité d'embauche.", requirements: "Étudiant Bac+3/4 en Communication, Marketing ou équivalent. Créativité et maîtrise des réseaux sociaux.", image: "megaphone", color: "#FF6B00" },
  { id: "9", type: "Financement" as OpportunityType, title: "Appel à projets - Fonds d'entrepreneuriat jeunes FAIEJ 2025", org: "FAIEJ Togo", city: "National", deadline: "30 Sept 2025", description: "Le FAIEJ lance sa 12ème édition de financement de projets entrepreneuriaux de jeunes. Financement jusqu'à 5 millions FCFA. Accompagnement inclus.", requirements: "Être togolais. Âge : 18-40 ans. Projet viable dans les secteurs prioritaires (Agriculture, Artisanat, Services, Numérique).", image: "cash", color: "#059669" },
  { id: "10", type: "Événement" as OpportunityType, title: "Forum de l'Entrepreneuriat Togolais 2025", org: "CCIT - Chambre de Commerce", city: "Lomé", deadline: "Gratuit", description: "3 jours de panels, networking, ateliers pratiques et expo-stands. Thème : 'Digitalisation des PME africaines'. Intervenants de 12 pays africains.", requirements: "Inscription gratuite. Priorité aux entrepreneurs et porteurs de projets.", image: "people", color: "#7C3AED" },
];

const TYPES: OpportunityType[] = ["Emploi", "Stage", "Bourse", "Concours", "Projet", "Financement", "Appel d'offres", "Événement"];

const TYPE_META: Record<string, { icon: string; color: string }> = {
  "Emploi": { icon: "briefcase", color: "#10B981" },
  "Stage": { icon: "school", color: "#FF6B00" },
  "Bourse": { icon: "ribbon", color: "#8B5CF6" },
  "Concours": { icon: "trophy", color: "#F59E0B" },
  "Projet": { icon: "flash", color: "#EF4444" },
  "Financement": { icon: "cash", color: "#059669" },
  "Appel d'offres": { icon: "document-text", color: "#0F52BA" },
  "Événement": { icon: "calendar", color: "#7C3AED" },
};

export default function OpportunitiesScreen() {
  const [activeType, setActiveType] = useState<string>("Tous");
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const filtered = activeType === "Tous" ? OPPORTUNITIES : OPPORTUNITIES.filter(o => o.type === activeType);

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      <LinearGradient colors={["#0A1628", "#162035"]} style={styles.header}>
        <Text style={styles.headerTitle}>Opportunités</Text>
        <Text style={styles.headerSub}>{OPPORTUNITIES.length} annonces disponibles pour vous</Text>
        <FlatList
          horizontal
          data={["Tous", ...TYPES]}
          keyExtractor={i => i}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.typeChip, activeType === item && styles.typeChipActive]}
              onPress={() => { setActiveType(item); Haptics.selectionAsync(); }}
              activeOpacity={0.8}
            >
              {item !== "Tous" && TYPE_META[item] && (
                <Ionicons name={TYPE_META[item].icon as any} size={13} color={activeType === item ? "#FFFFFF" : "#94A3B8"} />
              )}
              <Text style={[styles.typeChipText, activeType === item && styles.typeChipTextActive]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </LinearGradient>

      <FlatList
        data={filtered}
        keyExtractor={i => i.id}
        contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="briefcase-outline" size={48} color="#D1D5DB" />
            <Text style={styles.emptyText}>Aucune opportunité dans cette catégorie</Text>
          </View>
        }
        renderItem={({ item }) => {
          const meta = TYPE_META[item.type] ?? { icon: "star", color: "#FF6B00" };
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); router.push({ pathname: "/opportunities/[id]", params: { id: item.id } }); }}
              activeOpacity={0.85}
            >
              <View style={[styles.cardIcon, { backgroundColor: meta.color + "20" }]}>
                <Ionicons name={meta.icon as any} size={26} color={meta.color} />
              </View>
              <View style={styles.cardBody}>
                <View style={styles.cardTop}>
                  <View style={[styles.typeBadge, { backgroundColor: meta.color + "15" }]}>
                    <Text style={[styles.typeBadgeText, { color: meta.color }]}>{item.type}</Text>
                  </View>
                  <Text style={styles.deadline}>{item.deadline}</Text>
                </View>
                <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                <View style={styles.cardMeta}>
                  <Ionicons name="business" size={12} color="#9CA3AF" />
                  <Text style={styles.cardMetaText} numberOfLines={1}>{item.org}</Text>
                  <Ionicons name="location" size={12} color="#9CA3AF" style={{ marginLeft: 8 }} />
                  <Text style={styles.cardMetaText}>{item.city}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },
  header: { paddingHorizontal: 16, paddingBottom: 14, gap: 8 },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#FFFFFF", fontFamily: "Inter_700Bold", paddingTop: 8 },
  headerSub: { fontSize: 13, color: "#94A3B8", fontFamily: "Inter_400Regular" },
  typeChip: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.1)", borderWidth: 1, borderColor: "rgba(255,255,255,0.15)" },
  typeChipActive: { backgroundColor: "#FF6B00", borderColor: "#FF6B00" },
  typeChipText: { fontSize: 12, color: "#94A3B8", fontFamily: "Inter_500Medium" },
  typeChipTextActive: { color: "#FFFFFF" },
  card: { flexDirection: "row", backgroundColor: "#FFFFFF", borderRadius: 16, padding: 14, gap: 14, alignItems: "flex-start" },
  cardIcon: { width: 52, height: 52, borderRadius: 16, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  cardBody: { flex: 1, gap: 6 },
  cardTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  typeBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  typeBadgeText: { fontSize: 11, fontWeight: "600", fontFamily: "Inter_600SemiBold" },
  deadline: { fontSize: 11, color: "#9CA3AF", fontFamily: "Inter_400Regular" },
  cardTitle: { fontSize: 14, fontWeight: "700", color: "#0A1628", fontFamily: "Inter_700Bold", lineHeight: 20 },
  cardMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  cardMetaText: { fontSize: 12, color: "#9CA3AF", fontFamily: "Inter_400Regular" },
  empty: { alignItems: "center", paddingTop: 80, gap: 8 },
  emptyText: { fontSize: 15, color: "#9CA3AF", fontFamily: "Inter_400Regular", textAlign: "center" },
});
