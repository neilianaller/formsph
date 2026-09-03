import { useState, useEffect } from 'react';
import { db } from '../db/db';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // 1. Initial load from local storage or Dexie
    const local = localStorage.getItem('GovFormsPH_theme');
    if (local === 'dark' || local === 'light') {
      setTheme(local);
      applyTheme(local);
    } else {
      // Light mode is default per guidelines
      setTheme('light');
      applyTheme('light');
    }

    // Check Dexie settings
    db.settings.toCollection().first().then((settings) => {
      if (settings?.theme && (settings.theme === 'dark' || settings.theme === 'light')) {
        setTheme(settings.theme);
        applyTheme(settings.theme);
      }
    });
  }, []);

  const applyTheme = (t: 'light' | 'dark') => {
    if (t === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = async () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    applyTheme(nextTheme);
    localStorage.setItem('GovFormsPH_theme', nextTheme);

    const settings = await db.settings.toCollection().first();
    if (settings && settings.id) {
      await db.settings.update(settings.id, { theme: nextTheme });
    }
  };

  return { theme, toggleTheme, isDark: theme === 'dark' };
}
