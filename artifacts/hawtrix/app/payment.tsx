import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { Alert, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "@/context/AppContext";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";

type Method = "tmoney" | "flooz";

export default function PaymentScreen() {
  const { setPaymentDone } = useApp();
  const [method, setMethod] = useState<Method>("tmoney");
  const [phone, setPhone] = useState("");
  const [txId, setTxId] = useState("");
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handlePay = async () => {
    if (!phone || phone.length < 8) {
      Alert.alert("Erreur", "Veuillez entrer un numéro de téléphone valide.");
      return;
    }
    if (!txId) {
      Alert.alert("Erreur", "Veuillez entrer votre numéro de référence de transaction.");
      return;
    }
    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    await setPaymentDone(true);
    router.replace("/register");
  };

  const METHODS = [
    { id: "tmoney" as Method, label: "TMoney", sub: "Togocom", color: "#E53E3E", icon: "phone-portrait" as const },
    { id: "flooz" as Method, label: "Flooz", sub: "Moov Africa", color: "#2563EB", icon: "phone-portrait" as const },
  ];

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      <LinearGradient colors={["#0A1628", "#162035"]} style={styles.header}>
        <View style={styles.headerInner}>
          <Text style={styles.headerTitle}>Activation du compte</Text>
          <Text style={styles.headerSub}>Paiement unique d'inscription</Text>
        </View>
      </LinearGradient>

      <KeyboardAwareScrollViewCompat style={styles.scroll} bottomOffset={120}>
        <View style={styles.amountCard}>
          <LinearGradient colors={["#FF6B00", "#E55A00"]} style={styles.amountGrad}>
            <Text style={styles.amountLabel}>Montant à payer</Text>
            <Text style={styles.amountValue}>2 000 FCFA</Text>
            <Text style={styles.amountNote}>Accès à vie à toute la plateforme</Text>
          </LinearGradient>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Choisissez votre opérateur</Text>
          <View style={styles.methodsRow}>
            {METHODS.map(m => (
              <TouchableOpacity
                key={m.id}
                style={[styles.methodCard, method === m.id && styles.methodCardActive, method === m.id && { borderColor: m.color }]}
                onPress={() => { setMethod(m.id); Haptics.selectionAsync(); }}
                activeOpacity={0.8}
              >
                <View style={[styles.methodIcon, { backgroundColor: m.color + "20" }]}>
                  <Ionicons name={m.icon} size={26} color={m.color} />
                </View>
                <Text style={[styles.methodLabel, method === m.id && { color: m.color }]}>{m.label}</Text>
                <Text style={styles.methodSub}>{m.sub}</Text>
                {method === m.id && <View style={[styles.methodCheck, { backgroundColor: m.color }]}><Ionicons name="checkmark" size={12} color="#fff" /></View>}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Instructions de paiement</Text>
          <View style={styles.instructions}>
            {method === "tmoney" ? (
              <>
                <Text style={styles.instrStep}>1. Composez <Text style={styles.instrHighlight}>*145#</Text> sur votre téléphone</Text>
                <Text style={styles.instrStep}>2. Sélectionnez "Paiement marchand"</Text>
                <Text style={styles.instrStep}>3. Entrez le numéro marchand : <Text style={styles.instrHighlight}>HAWTRIX</Text></Text>
                <Text style={styles.instrStep}>4. Montant : <Text style={styles.instrHighlight}>2000 FCFA</Text></Text>
                <Text style={styles.instrStep}>5. Notez le numéro de référence reçu</Text>
              </>
            ) : (
              <>
                <Text style={styles.instrStep}>1. Composez <Text style={styles.instrHighlight}>*155#</Text> sur votre téléphone</Text>
                <Text style={styles.instrStep}>2. Sélectionnez "Paiement de facture"</Text>
                <Text style={styles.instrStep}>3. Entrez le code marchand : <Text style={styles.instrHighlight}>HAWTRIX2024</Text></Text>
                <Text style={styles.instrStep}>4. Montant : <Text style={styles.instrHighlight}>2000 FCFA</Text></Text>
                <Text style={styles.instrStep}>5. Notez le numéro de référence reçu</Text>
              </>
            )}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Confirmer votre paiement</Text>
          <Text style={styles.inputLabel}>Numéro de téléphone utilisé</Text>
          <TextInput
            style={styles.input}
            placeholder="+228 XX XX XX XX"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholderTextColor="#9CA3AF"
          />
          <Text style={styles.inputLabel}>Numéro de référence de transaction</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: TXN-12345678"
            value={txId}
            onChangeText={setTxId}
            autoCapitalize="characters"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        <View style={{ paddingHorizontal: 16, paddingBottom: botPad + 24 }}>
          <TouchableOpacity style={[styles.payBtn, loading && styles.payBtnLoading]} onPress={handlePay} disabled={loading} activeOpacity={0.85}>
            <Text style={styles.payBtnText}>{loading ? "Vérification en cours..." : "Valider le paiement"}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollViewCompat>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },
  header: { paddingHorizontal: 20, paddingVertical: 20 },
  headerInner: { gap: 4 },
  headerTitle: { fontSize: 22, fontWeight: "800", color: "#FFFFFF", fontFamily: "Inter_700Bold" },
  headerSub: { fontSize: 14, color: "#94A3B8", fontFamily: "Inter_400Regular" },
  scroll: { flex: 1 },
  amountCard: { margin: 16, borderRadius: 20, overflow: "hidden" },
  amountGrad: { padding: 24, alignItems: "center" },
  amountLabel: { fontSize: 14, color: "rgba(255,255,255,0.8)", fontFamily: "Inter_500Medium" },
  amountValue: { fontSize: 42, fontWeight: "800", color: "#FFFFFF", fontFamily: "Inter_700Bold", marginVertical: 4 },
  amountNote: { fontSize: 13, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_400Regular" },
  card: { marginHorizontal: 16, marginBottom: 12, backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16 },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#0A1628", fontFamily: "Inter_700Bold", marginBottom: 14 },
  methodsRow: { flexDirection: "row", gap: 12 },
  methodCard: { flex: 1, borderRadius: 14, borderWidth: 2, borderColor: "#E5E7EB", padding: 14, alignItems: "center", gap: 6, position: "relative" },
  methodCardActive: { backgroundColor: "#FFF8F5" },
  methodIcon: { width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  methodLabel: { fontSize: 15, fontWeight: "700", color: "#0A1628", fontFamily: "Inter_700Bold" },
  methodSub: { fontSize: 11, color: "#6B7280", fontFamily: "Inter_400Regular" },
  methodCheck: { position: "absolute", top: 8, right: 8, width: 20, height: 20, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  instructions: { gap: 10 },
  instrStep: { fontSize: 14, color: "#374151", lineHeight: 20, fontFamily: "Inter_400Regular" },
  instrHighlight: { fontWeight: "700", color: "#FF6B00", fontFamily: "Inter_700Bold" },
  inputLabel: { fontSize: 13, fontWeight: "600", color: "#374151", fontFamily: "Inter_600SemiBold", marginBottom: 6, marginTop: 4 },
  input: { backgroundColor: "#F5F6FA", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: "#0A1628", borderWidth: 1, borderColor: "#E5E7EB", marginBottom: 12, fontFamily: "Inter_400Regular" },
  payBtn: { backgroundColor: "#FF6B00", borderRadius: 16, paddingVertical: 18, alignItems: "center" },
  payBtnLoading: { backgroundColor: "#FDA96A" },
  payBtnText: { fontSize: 17, fontWeight: "700", color: "#FFFFFF", fontFamily: "Inter_700Bold" },
});
