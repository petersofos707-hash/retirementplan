import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

import { demoPasswords, sampleData } from "../constants/sampleData";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { AppUser, UserRole } from "../types";

type DataMode = "supabase" | "local_demo";

type AuthContextValue = {
  currentUser: AppUser | null;
  dataMode: DataMode;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (input: { fullName: string; email: string; password: string; role: UserRole }) => Promise<void>;
  demoLogin: (role: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
};

const STORAGE_KEY = "verified_staffing_current_user";
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function routeForRole(role: UserRole) {
  if (role === "organisation") return "/(organisation)";
  if (role === "trainer") return "/(trainer)";
  return "/(admin)";
}

function demoUserForRole(role: UserRole) {
  const user = sampleData.users.find((item) => item.role === role);
  if (!user) throw new Error(`Missing demo user for ${role}`);
  return user;
}

function demoUserForEmail(email: string) {
  return sampleData.users.find((item) => item.email.toLowerCase() === email.toLowerCase());
}

async function persistLocalUser(user: AppUser | null) {
  if (user) await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  else await AsyncStorage.removeItem(STORAGE_KEY);
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dataMode: DataMode = isSupabaseConfigured ? "supabase" : "local_demo";

  useEffect(() => {
    async function hydrate() {
      try {
        if (!isSupabaseConfigured) {
          const stored = await AsyncStorage.getItem(STORAGE_KEY);
          if (stored) setCurrentUser(JSON.parse(stored));
        }
      } finally {
        setLoading(false);
      }
    }
    hydrate();
  }, []);

  async function signIn(email: string, password: string) {
    setError(null);
    if (isSupabaseConfigured && supabase) {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) return setError(signInError.message);
      const authUser = data.user;
      const fallbackUser = demoUserForEmail(email);
      const user: AppUser = fallbackUser ?? { id: authUser.id, email: authUser.email ?? email, fullName: authUser.user_metadata?.full_name ?? email, role: (authUser.user_metadata?.role as UserRole) ?? "trainer", createdAt: authUser.created_at };
      setCurrentUser(user);
      router.replace(routeForRole(user.role));
      return;
    }
    const demoUser = demoUserForEmail(email);
    if (!demoUser || demoPasswords[email.toLowerCase()] !== password) return setError("Use a demo account or add Supabase environment variables for real auth.");
    setCurrentUser(demoUser);
    await persistLocalUser(demoUser);
    router.replace(routeForRole(demoUser.role));
  }

  async function signUp(input: { fullName: string; email: string; password: string; role: UserRole }) {
    setError(null);
    if (isSupabaseConfigured && supabase) {
      const { data, error: signUpError } = await supabase.auth.signUp({ email: input.email, password: input.password, options: { data: { full_name: input.fullName, role: input.role } } });
      if (signUpError || !data.user) return setError(signUpError?.message ?? "Could not create account.");
      await supabase.from("profiles").upsert({ id: data.user.id, full_name: input.fullName, role: input.role });
      const user: AppUser = { id: data.user.id, email: input.email, fullName: input.fullName, role: input.role, createdAt: data.user.created_at };
      setCurrentUser(user);
      router.replace(routeForRole(user.role));
      return;
    }
    const user: AppUser = { id: `local-${Date.now()}`, email: input.email, fullName: input.fullName, role: input.role, createdAt: new Date().toISOString() };
    setCurrentUser(user);
    await persistLocalUser(user);
    router.replace(routeForRole(user.role));
  }

  async function demoLogin(role: UserRole) {
    setError(null);
    const user = demoUserForRole(role);
    if (isSupabaseConfigured && supabase) {
      const { error: demoError } = await supabase.auth.signInWithPassword({ email: user.email, password: demoPasswords[user.email] });
      if (demoError) return setError(`Demo Supabase login failed: ${demoError.message}`);
    } else {
      await persistLocalUser(user);
    }
    setCurrentUser(user);
    router.replace(routeForRole(user.role));
  }

  async function signOut() {
    if (isSupabaseConfigured && supabase) await supabase.auth.signOut();
    setCurrentUser(null);
    await persistLocalUser(null);
    router.replace("/(auth)/welcome");
  }

  const value = useMemo(() => ({ currentUser, dataMode, loading, error, signIn, signUp, demoLogin, signOut }), [currentUser, dataMode, loading, error]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
