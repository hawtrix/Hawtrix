import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { useRef, useState } from "react";
import { Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useApp } from "@/context/AppContext";
import { Ionicons } from "@expo/vector-icons";

const CODE = "123456";

export default function VerifyScreen() {
  const params = useLocalSearchParams<{ phone: string; name: string; surname: string; profession: string; neighborhood: string; referrerId: string }>();
  const { createUser } = useApp();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const refs = useRef<Array<TextInput | null>>([]);
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const botPad = Platform.OS === "web" ? 34 : insets.bottom;

  const handleChange = (val: string, idx: number) => {
    const clean = val.replace(/[^0-9]/g, "").slice(-1);
    const next = [...otp];
    next[idx] = clean;
    setOtp(next);
    if (clean && idx < 5) refs.current[idx + 1]?.focus();
    if (!clean && idx > 0) refs.current[idx - 1]?.focus();
  };

  const handleVerify = async () => {
    const entered = otp.join("");
    if (entered.length < 6) {
      Alert.alert("Erreur", "Entrez le code à 6 chiffres reçu par SMS.");
      return;
    }
    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await new Promise(r => setTimeout(r, 1000));
    if (entered !== CODE) {
      setLoading(false);
      Alert.alert("Code incorrect", "Le code entré est invalide. Vérifiez votre SMS.\n\n(Demo: utilisez 123456)");
      return;
    }
    await createUser({
      name: params.name ?? "",
      surname: params.surname ?? "",
      profession: params.profession ?? "",
      neighborhood: params.neighborhood ?? "",
      phone: params.phone ?? "",
      referrerId: params.referrerId || null,
    });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.replace("/tutorial");
  };

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      <LinearGradient colors={["#0A1628", "#162035"]} style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vérification SMS</Text>
        <View style={{ width: 40 }} />
      </LinearGradient>

      <View style={[styles.body, { paddingBottom: botPad + 24 }]}>
        <View style={styles.iconWrap}>
          <LinearGradient colors={["#FF6B00", "#E55A00"]} style={styles.iconGrad}>
            <Ionicons name="chatbubble-ellipses" size={40} color="#FFFFFF" />
          </LinearGradient>
        </View>
        <Text style={styles.title}>Entrez le code SMS</Text>
        <Text style={styles.subtitle}>Un code de vérification à 6 chiffres a été envoyé au{"\n"}<Text style={styles.phone}>{params.phone}</Text></Text>
        <Text style={styles.demoHint}>(Mode démo : utilisez le code 1 2 3 4 5 6)</Text>

        <View style={styles.otpRow}>
          {otp.map((digit, i) => (
            <TextInput
              key={i}
              ref={r => { refs.current[i] = r; }}
              style={[styles.otpBox, digit && styles.otpBoxFilled]}
              value={digit}
              onChangeText={v => handleChange(v, i)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              selectTextOnFocus
            />
          ))}
        </View>

        <TouchableOpacity style={[styles.verifyBtn, loading && styles.verifyBtnLoading]} onPress={handleVerify} disabled={loading} activeOpacity={0.85}>
          <Text style={styles.verifyBtnText}>{loading ? "Vérification..." : "Confirmer"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendBtn} onPress={() => Alert.alert("SMS envoyé", "Un nouveau code a été envoyé à votre numéro.")}>
          <Text style={styles.resendText}>Je n'ai pas reçu le code · <Text style={styles.resendLink}>Renvoyer</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 16 },
  backBtn: { width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 17, fontWeight: "700", color: "#FFFFFF", fontFamily: "Inter_700Bold" },
  body: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24, gap: 16 },
  iconWrap: { marginBottom: 8 },
  iconGrad: { width: 88, height: 88, borderRadius: 28, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "800", color: "#0A1628", fontFamily: "Inter_700Bold", textAlign: "center" },
  subtitle: { fontSize: 15, color: "#6B7280", fontFamily: "Inter_400Regular", textAlign: "center", lineHeight: 22 },
  phone: { fontWeight: "700", color: "#0A1628", fontFamily: "Inter_700Bold" },
  demoHint: { fontSize: 12, color: "#FF6B00", fontFamily: "Inter_400Regular", textAlign: "center", marginTop: -8 },
  otpRow: { flexDirection: "row", gap: 10, marginVertical: 8 },
  otpBox: { width: 48, height: 58, backgroundColor: "#FFFFFF", borderRadius: 14, borderWidth: 2, borderColor: "#E5E7EB", fontSize: 24, fontWeight: "700", color: "#0A1628", fontFamily: "Inter_700Bold" },
  otpBoxFilled: { borderColor: "#FF6B00", backgroundColor: "#FFF8F5" },
  verifyBtn: { width: "100%", backgroundColor: "#FF6B00", borderRadius: 16, paddingVertical: 18, alignItems: "center" },
  verifyBtnLoading: { backgroundColor: "#FDA96A" },
  verifyBtnText: { fontSize: 17, fontWeight: "700", color: "#FFFFFF", fontFamily: "Inter_700Bold" },
  resendBtn: { marginTop: 8 },
  resendText: { fontSize: 14, color: "#6B7280", fontFamily: "Inter_400Regular" },
  resendLink: { color: "#FF6B00", fontWeight: "600", fontFamily: "Inter_600SemiBold" },
});
