import React, { useState, useEffect } from 'react';
import { AlertCircle, Download, X } from 'lucide-react';
import { db } from '../../db/db';
import { Button } from '../common/Button';

interface ExportReminderBannerProps {
  onNavigateToExport: () => void;
}

export const ExportReminderBanner: React.FC<ExportReminderBannerProps> = ({ onNavigateToExport }) => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    checkLastExport();
  }, []);

  const checkLastExport = async () => {
    const recordsCount = await db.pdsRecords.count();
    if (recordsCount === 0) return;

    const settings = await db.settings.toCollection().first();
    if (settings?.hideExportReminder) return;

    const lastExport = settings?.lastExportDate;
    if (!lastExport) {
      // If user has saved forms but never exported
      setShouldShow(true);
      return;
    }

    const diffDays = (Date.now() - new Date(lastExport).getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays > 30) {
      setShouldShow(true);
    }
  };

  const handleDismiss = async () => {
    setShouldShow(false);
    // Suppress for 7 days or until next session
  };

  if (!shouldShow) return null;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 mb-4">
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 dark:text-amber-200 text-xs">
        <div className="flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>
            <strong>Reminder:</strong> All your forms are stored strictly on this device. Back up your data to JSON or encrypted vault periodically to prevent accidental loss if browser data is cleared.
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <Button
            variant="outline"
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
            onClick={onNavigateToExport}
            className="border-amber-300 dark:border-amber-700 hover:bg-amber-100/50 text-amber-900 dark:text-amber-100"
          >
            Export Backup Now
          </Button>
          <button
            onClick={handleDismiss}
            className="text-amber-600 hover:text-amber-800 dark:text-amber-400 p-1 rounded cursor-pointer"
            aria-label="Dismiss banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
