import { createContext, useContext, useEffect, useState } from "react";

export interface Theme {
  id: string;
  name: string;
  page: string;
  card: string;
  nav: string;
  fg: string;
  muted: string;
  dim: string;
  line: string;
}

const themes: Theme[] = [
  {
    id: "dark",
    name: "Dark",
    page: "#1e2129",
    card: "#2a2d36",
    nav: "#1e2129",
    fg: "#ffffff",
    muted: "#9ca3af",
    dim: "#6b7280",
    line: "rgba(255,255,255,0.1)",
  },
  {
    id: "light",
    name: "Light",
    page: "#f3f4f6",
    card: "#ffffff",
    nav: "#ffffff",
    fg: "#111827",
    muted: "#6b7280",
    dim: "#9ca3af",
    line: "rgba(0,0,0,0.1)",
  },
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (id: string) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return themes[0];
    const saved = localStorage.getItem("app-theme");
    return themes.find((t) => t.id === saved) || themes[0];
  });

  const setTheme = (id: string) => {
    const t = themes.find((th) => th.id === id);
    if (t) {
      setCurrentTheme(t);
      localStorage.setItem("app-theme", id);
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--_page", currentTheme.page);
    root.style.setProperty("--_card", currentTheme.card);
    root.style.setProperty("--_nav", currentTheme.nav);
    root.style.setProperty("--_fg", currentTheme.fg);
    root.style.setProperty("--_muted", currentTheme.muted);
    root.style.setProperty("--_dim", currentTheme.dim);
    root.style.setProperty("--_line", currentTheme.line);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
