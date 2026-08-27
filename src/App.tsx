import { useState, useEffect } from 'react';
import { db, initializeSettings } from './db/db';
import { PdsRecord } from './types/pds';
import { createNewPdsRecord } from './db/defaultPdsData';
import { useTheme } from './hooks/useTheme';
import { Layout } from './components/layout/Layout';
import { UpdateBanner } from './components/layout/UpdateBanner';
import { QuickTour } from './components/common/QuickTour';
import { DashboardPage } from './pages/DashboardPage';
import { PdsFormEditor } from './forms/pds/PdsFormEditor';
import { ExportImportPage } from './pages/ExportImportPage';
import { InstallPage } from './pages/InstallPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { AboutPage } from './pages/AboutPage';

export function App() {
  const { isDark, toggleTheme } = useTheme();
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [activeRecord, setActiveRecord] = useState<PdsRecord | null>(null);
  const [tourForceOpen, setTourForceOpen] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  // Initialize DB settings on mount
  useEffect(() => {
    initializeSettings();
  }, []);

  // Handle Service Worker update notifications
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (!reg) return;

        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                setHasUpdate(true);
                setWaitingWorker(newWorker);
              }
            });
          }
        });
      });
    }
  }, []);

  const handleApplyUpdate = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
    window.location.reload();
  };

  const handleCreateNewForm = async () => {
    const newRecord = createNewPdsRecord();
    const newId = await db.pdsRecords.add(newRecord);
    newRecord.id = newId;
    setActiveRecord(newRecord);
    setCurrentTab('editor');
  };

  const handleSelectRecord = (record: PdsRecord) => {
    setActiveRecord(record);
    setCurrentTab('editor');
  };

  const handleDuplicateRecord = async (record: PdsRecord) => {
    const duplicate: PdsRecord = {
      ...record,
      meta: {
        ...record.meta,
        title: `${record.meta.title || 'PDS Form'} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    };
    delete duplicate.id;
    const newId = await db.pdsRecords.add(duplicate);
    duplicate.id = newId;
    setActiveRecord(duplicate);
    setCurrentTab('editor');
  };

  const handleNavigate = (tab: string) => {
    if (tab === 'editor' && !activeRecord) {
      handleCreateNewForm();
      return;
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout
      currentTab={currentTab}
      onNavigate={handleNavigate}
      onNewForm={handleCreateNewForm}
      onReplayTour={() => setTourForceOpen(true)}
      isDark={isDark}
      onToggleTheme={toggleTheme}
    >
      {/* Quick Tour Component */}
      <QuickTour forceOpen={tourForceOpen} onClose={() => setTourForceOpen(false)} />

      {/* PWA Update Banner */}
      <UpdateBanner
        show={hasUpdate}
        onUpdate={handleApplyUpdate}
        onDismiss={() => setHasUpdate(false)}
      />

      {/* Tab Routing */}
      {currentTab === 'dashboard' && (
        <DashboardPage
          onSelectRecord={handleSelectRecord}
          onNewForm={handleCreateNewForm}
          onNavigateToExport={() => handleNavigate('export-import')}
        />
      )}

      {currentTab === 'editor' && activeRecord && (
        <PdsFormEditor
          initialRecord={activeRecord}
          onBackToDashboard={() => setCurrentTab('dashboard')}
          onDuplicateForm={handleDuplicateRecord}
        />
      )}

      {currentTab === 'export-import' && (
        <ExportImportPage onImportComplete={() => setCurrentTab('dashboard')} />
      )}

      {currentTab === 'install' && <InstallPage />}

      {currentTab === 'privacy' && <PrivacyPage />}

      {currentTab === 'about' && (
        <AboutPage onReplayTour={() => setTourForceOpen(true)} />
      )}
    </Layout>
  );
}

export default App;
