'use client';

import { ThemeProvider } from "@/components/theme-provider";
import { useEffect } from "react";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('dark');
    root.style.setProperty('color-scheme', 'dark');
  }, []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}