import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Grade =
  | "membre"
  | "pionier"
  | "saphir"
  | "rubis"
  | "emeraude"
  | "magnat"
  | "icone"
  | "directeur"
  | "directeur2"
  | "directeur5"
  | "president";

export interface NetworkMember {
  id: string;
  name: string;
  grade: Grade;
  joinedAt: string;
  referrerId: string;
  referralCode: string;
}

export interface User {
  id: string;
  name: string;
  surname: string;
  profession: string;
  neighborhood: string;
  phone: string;
  referralCode: string;
  referrerId: string | null;
  grade: Grade;
  joinedAt: string;
  totalEarnings: number;
  networkCount: number;
  branches: Record<string, string[]>;
  tutorialSeen: boolean;
  avatar?: string;
  bio?: string;
  skills?: string[];
  inviteLimit?: number | null;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  lastMessage: string;
  lastTimestamp: string;
  unread: number;
  messages: Message[];
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: "mlm" | "training" | "opportunity" | "message" | "system";
  timestamp: string;
  read: boolean;
}

interface AppContextType {
  user: User | null;
  termsAccepted: boolean;
  paymentDone: boolean;
  conversations: Conversation[];
  notifications: Notification[];
  isLoading: boolean;
  setTermsAccepted: (v: boolean) => void;
  setPaymentDone: (v: boolean) => void;
  createUser: (data: Omit<User, "id" | "referralCode" | "grade" | "joinedAt" | "totalEarnings" | "networkCount" | "branches" | "tutorialSeen">) => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  markTutorialSeen: () => Promise<void>;
  addNotification: (n: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markNotificationRead: (id: string) => void;
  sendMessage: (conversationId: string, text: string) => void;
  getOrCreateConversation: (participantId: string, participantName: string) => string;
  markConversationRead: (id: string) => void;
  logout: () => Promise<void>;
  isSpecialPhone: (phone: string) => boolean;
}

const AppContext = createContext<AppContextType | null>(null);

function generateCode(length = 8): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "HWT-";
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

// Comptes spéciaux pré-créés
const SPECIAL_ACCOUNTS: Record<string, User> = {
  "+22890496651": {
    id: "president-001",
    name: "Fondateur",
    surname: "Hawtrix",
    profession: "Président Fondateur",
    neighborhood: "Lomé, Togo",
    phone: "+22890496651",
    referralCode: "HWT-PRESIDENT",
    referrerId: null,
    grade: "president",
    joinedAt: "2025-01-01T00:00:00.000Z",
    totalEarnings: 0,
    networkCount: 0,
    branches: {},
    tutorialSeen: true,
    inviteLimit: 2,
  },
  "+22892525577": {
    id: "admin-002",
    name: "Admin",
    surname: "Hawtrix",
    profession: "Directeur Général",
    neighborhood: "Lomé, Togo",
    phone: "+22892525577",
    referralCode: "HWT-ADMIN001",
    referrerId: "HWT-PRESIDENT",
    grade: "directeur",
    joinedAt: "2025-01-01T00:00:00.000Z",
    totalEarnings: 0,
    networkCount: 0,
    branches: {},
    tutorialSeen: true,
    inviteLimit: null,
  },
};

function calculateGrade(networkCount: number, branches: Record<string, string[]>): Grade {
  const branchCount = Object.keys(branches).length;

  // Directeur 5★ : 1 000 000 personnes + 2 directeurs 2★ sur 2 branches différentes
  if (networkCount >= 1000000 && branchCount >= 2) return "directeur5";

  // Directeur 2★ : 100 000 personnes + 4 directeurs sur 4 branches différentes
  if (networkCount >= 100000 && branchCount >= 4) return "directeur2";

  // Directeur simple : 10 000 personnes
  if (networkCount >= 10000) return "directeur";

  if (networkCount >= 1000) return "icone";
  if (networkCount >= 500) return "magnat";
  if (networkCount >= 250) return "emeraude";
  if (networkCount >= 100) return "rubis";
  if (networkCount >= 35) return "saphir";
  if (networkCount >= 10) return "pionier";
  return "membre";
}

export const GRADE_INFO: Record<Grade, { label: string; color: string; minCount: number; dividendPct: number; cardLevel: number }> = {
  membre:     { label: "Membre",             color: "#6B7280", minCount: 0,        dividendPct: 0,   cardLevel: 0 },
  pionier:    { label: "Pionier",            color: "#CD7F32", minCount: 10,       dividendPct: 0,   cardLevel: 1 },
  saphir:     { label: "Saphir",             color: "#0F52BA", minCount: 35,       dividendPct: 0,   cardLevel: 2 },
  rubis:      { label: "Rubis",              color: "#9B111E", minCount: 100,      dividendPct: 0,   cardLevel: 3 },
  emeraude:   { label: "Emeraude",           color: "#50C878", minCount: 250,      dividendPct: 0,   cardLevel: 4 },
  magnat:     { label: "Magnat",             color: "#B8860B", minCount: 500,      dividendPct: 4,   cardLevel: 5 },
  icone:      { label: "Icone",              color: "#8B008B", minCount: 1000,     dividendPct: 8,   cardLevel: 6 },
  directeur:  { label: "Directeur",          color: "#FF6B00", minCount: 10000,    dividendPct: 6,   cardLevel: 7 },
  directeur2: { label: "Directeur ⭐⭐",     color: "#E8B800", minCount: 100000,   dividendPct: 14,  cardLevel: 8 },
  directeur5: { label: "Directeur ⭐⭐⭐⭐⭐", color: "#C0A020", minCount: 1000000, dividendPct: 30,  cardLevel: 9 },
  president:  { label: "Président Fondateur",color: "#FFD700", minCount: 9999999,  dividendPct: 40,  cardLevel: 10 },
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [termsAccepted, setTermsAcceptedState] = useState(false);
  const [paymentDone, setPaymentDoneState] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [termsRaw, paymentRaw, userRaw, convsRaw, notifsRaw] = await Promise.all([
        AsyncStorage.getItem("hawtrix_terms"),
        AsyncStorage.getItem("hawtrix_payment"),
        AsyncStorage.getItem("hawtrix_user"),
        AsyncStorage.getItem("hawtrix_conversations"),
        AsyncStorage.getItem("hawtrix_notifications"),
      ]);
      if (termsRaw) setTermsAcceptedState(JSON.parse(termsRaw));
      if (paymentRaw) setPaymentDoneState(JSON.parse(paymentRaw));
      if (userRaw) setUser(JSON.parse(userRaw));
      if (convsRaw) setConversations(JSON.parse(convsRaw));
      if (notifsRaw) setNotifications(JSON.parse(notifsRaw));
    } finally {
      setIsLoading(false);
    }
  };

  const isSpecialPhone = useCallback((phone: string): boolean => {
    const clean = phone.replace(/\s/g, "");
    return clean in SPECIAL_ACCOUNTS;
  }, []);

  const setTermsAccepted = useCallback(async (v: boolean) => {
    setTermsAcceptedState(v);
    await AsyncStorage.setItem("hawtrix_terms", JSON.stringify(v));
  }, []);

  const setPaymentDone = useCallback(async (v: boolean) => {
    setPaymentDoneState(v);
    await AsyncStorage.setItem("hawtrix_payment", JSON.stringify(v));
  }, []);

  const createUser = useCallback(async (data: Omit<User, "id" | "referralCode" | "grade" | "joinedAt" | "totalEarnings" | "networkCount" | "branches" | "tutorialSeen">) => {
    // Vérifier si c'est un compte spécial pré-créé
    const cleanPhone = (data.phone ?? "").replace(/\s/g, "");
    const seeded = SPECIAL_ACCOUNTS[cleanPhone];

    const newUser: User = seeded ? { ...seeded } : {
      ...data,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 6),
      referralCode: generateCode(),
      grade: "membre",
      joinedAt: new Date().toISOString(),
      totalEarnings: 0,
      networkCount: 0,
      branches: {},
      tutorialSeen: false,
    };

    setUser(newUser);
    await AsyncStorage.setItem("hawtrix_user", JSON.stringify(newUser));

    // Comptes spéciaux : paiement déjà effectué
    if (seeded) {
      await setPaymentDone(true);
      await setTermsAccepted(true);
    }

    addNotification({ title: "Bienvenue sur Hawtrix!", body: "Votre compte a été créé avec succès.", type: "system" });
  }, []);

  const updateUser = useCallback(async (data: Partial<User>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...data };
      // Ne pas recalculer le grade pour les comptes spéciaux (président)
      if (updated.phone && !SPECIAL_ACCOUNTS[updated.phone.replace(/\s/g, "")]) {
        updated.grade = calculateGrade(updated.networkCount, updated.branches);
      }
      AsyncStorage.setItem("hawtrix_user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const markTutorialSeen = useCallback(async () => {
    await updateUser({ tutorialSeen: true });
  }, [updateUser]);

  const addNotification = useCallback((n: Omit<Notification, "id" | "timestamp" | "read">) => {
    const notif: Notification = {
      ...n,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => {
      const updated = [notif, ...prev].slice(0, 50);
      AsyncStorage.setItem("hawtrix_notifications", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
      AsyncStorage.setItem("hawtrix_notifications", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const getOrCreateConversation = useCallback((participantId: string, participantName: string): string => {
    const existing = conversations.find(c => c.participantId === participantId);
    if (existing) return existing.id;
    const newConv: Conversation = {
      id: Date.now().toString(),
      participantId,
      participantName,
      lastMessage: "",
      lastTimestamp: new Date().toISOString(),
      unread: 0,
      messages: [],
    };
    setConversations(prev => {
      const updated = [newConv, ...prev];
      AsyncStorage.setItem("hawtrix_conversations", JSON.stringify(updated));
      return updated;
    });
    return newConv.id;
  }, [conversations]);

  const sendMessage = useCallback((conversationId: string, text: string) => {
    const msg: Message = {
      id: Date.now().toString(),
      senderId: user?.id ?? "me",
      text,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setConversations(prev => {
      const updated = prev.map(c => {
        if (c.id !== conversationId) return c;
        return { ...c, lastMessage: text, lastTimestamp: msg.timestamp, messages: [...c.messages, msg] };
      });
      AsyncStorage.setItem("hawtrix_conversations", JSON.stringify(updated));
      return updated;
    });
  }, [user]);

  const markConversationRead = useCallback((id: string) => {
    setConversations(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, unread: 0, messages: c.messages.map(m => ({ ...m, read: true })) } : c);
      AsyncStorage.setItem("hawtrix_conversations", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.multiRemove(["hawtrix_terms", "hawtrix_payment", "hawtrix_user"]);
    setUser(null);
    setTermsAcceptedState(false);
    setPaymentDoneState(false);
  }, []);

  return (
    <AppContext.Provider value={{
      user, termsAccepted, paymentDone, conversations, notifications, isLoading,
      setTermsAccepted, setPaymentDone, createUser, updateUser, markTutorialSeen,
      addNotification, markNotificationRead, sendMessage, getOrCreateConversation,
      markConversationRead, logout, isSpecialPhone,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
