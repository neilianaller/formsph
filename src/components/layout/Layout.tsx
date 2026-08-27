import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ExportReminderBanner } from './ExportReminderBanner';

interface LayoutProps {
  children: React.ReactNode;
  currentTab: string;
  onNavigate: (tab: string) => void;
  onNewForm?: () => void;
  onReplayTour: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  currentTab,
  onNavigate,
  onNewForm,
  onReplayTour,
  isDark,
  onToggleTheme,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <Navbar
        currentTab={currentTab}
        onNavigate={onNavigate}
        onNewForm={onNewForm}
        onReplayTour={onReplayTour}
        isDark={isDark}
        onToggleTheme={onToggleTheme}
      />

      {currentTab !== 'export-import' && (
        <ExportReminderBanner onNavigateToExport={() => onNavigate('export-import')} />
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6">
        {children}
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
