import React, { useState, useRef } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';
import { PdsRecord } from '../types/pds';
import { exportAllData, parseImportFile, restoreRecords, triggerDownload } from '../utils/exportImport';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import {
  Download,
  Upload,
  ShieldCheck,
  Lock,
  CheckCircle2
} from 'lucide-react';

interface ExportImportPageProps {
  onImportComplete?: () => void;
}

export const ExportImportPage: React.FC<ExportImportPageProps> = ({ onImportComplete }) => {
  const records = useLiveQuery(() => db.pdsRecords.toArray(), []);

  // Export State
  const [exportPassphrase, setExportPassphrase] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Import State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importFileContent, setImportFileContent] = useState<string | null>(null);
  const [importFileName, setImportFileName] = useState<string>('');
  const [importPassphrase, setImportPassphrase] = useState('');
  const [importPreview, setImportPreview] = useState<{
    success?: boolean;
    records: PdsRecord[];
    isEncrypted: boolean;
    requiresPassword?: boolean;
    error?: string;
  } | null>(null);
  const [importMode, setImportMode] = useState<'merge' | 'replace'>('merge');
  const [isImporting, setIsImporting] = useState(false);
  const [importSuccessMessage, setImportSuccessMessage] = useState<string | null>(null);

  const handleExport = async () => {
    setIsExporting(true);
    setExportSuccess(false);
    try {
      const { fileName, blob } = await exportAllData(exportPassphrase);
      triggerDownload(fileName, blob);
      setExportSuccess(true);
      setExportPassphrase('');
    } catch (err) {
      console.error('Export failed', err);
      alert('Failed to export backup. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImportFileName(file.name);
      const text = await file.text();
      setImportFileContent(text);
      setImportSuccessMessage(null);

      const parsed = await parseImportFile(text, importPassphrase);
      setImportPreview(parsed);
    }
  };

  const handleDecryptAttempt = async () => {
    if (!importFileContent) return;
    const parsed = await parseImportFile(importFileContent, importPassphrase);
    setImportPreview(parsed);
  };

  const handleExecuteImport = async () => {
    if (!importPreview || !importPreview.records || importPreview.records.length === 0) return;

    setIsImporting(true);
    try {
      const count = await restoreRecords(importPreview.records, importMode);
      setImportSuccessMessage(`Successfully imported ${count} form record(s)!`);
      setImportPreview(null);
      setImportFileContent(null);
      setImportPassphrase('');
      if (onImportComplete) onImportComplete();
    } catch (err) {
      console.error('Import execution failed', err);
      alert('Error restoring records to database.');
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Download className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          Export & Import Data
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
          GovFormsPH has no central server or cloud tracking. Moving your forms to a new computer, phone, or browser is done through exporting a backup file and importing it.
        </p>
      </div>

      {/* Grid: Export Card + Import Card */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* ================= EXPORT SECTION ================= */}
        <Card className="space-y-5">
          <div className="flex items-center justify-between border-b border-border-light dark:border-border-dark pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Export Backup
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Bundle all {records ? records.length : 0} saved forms into a single file
                </p>
              </div>
            </div>
            <Badge variant="success" size="sm">Portable</Badge>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Download your data as a clean JSON file, or optionally protect it with AES-GCM 256-bit encryption using a master passphrase.
          </p>

          {/* Optional Password Protection */}
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 space-y-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              Optional: Passphrase Protection (Encrypted Vault)
            </label>
            <input
              type="password"
              value={exportPassphrase}
              onChange={(e) => setExportPassphrase(e.target.value)}
              placeholder="Leave empty for plain JSON backup"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 font-mono"
            />
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              {exportPassphrase
                ? 'Your file will be encrypted using browser-native Web Crypto AES-256 before download.'
                : 'Will generate a standard human-readable JSON backup file (.GovFormsPH.json).'}
            </p>
          </div>

          {exportSuccess && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Backup file downloaded successfully! Store it safely.</span>
            </div>
          )}

          <Button
            variant="primary"
            size="md"
            icon={<Download className="w-4 h-4" />}
            onClick={handleExport}
            loading={isExporting}
            className="w-full"
            disabled={!records || records.length === 0}
          >
            {exportPassphrase ? 'Download Encrypted Vault' : 'Download JSON Backup'}
          </Button>

          {records && records.length === 0 && (
            <p className="text-[11px] text-amber-600 dark:text-amber-400 text-center italic">
              No saved forms to export yet. Create a form first.
            </p>
          )}
        </Card>

        {/* ================= IMPORT SECTION ================= */}
        <Card className="space-y-5">
          <div className="flex items-center justify-between border-b border-border-light dark:border-border-dark pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                  Import & Restore
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Restore forms from a previously exported backup file
                </p>
              </div>
            </div>
            <Badge variant="info" size="sm">Restore</Badge>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Select a <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">.json</code> or <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">.vault</code> file created by GovFormsPH.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.vault,application/json"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center cursor-pointer hover:border-teal-500/60 dark:hover:border-teal-400/60 transition-colors bg-slate-50 dark:bg-slate-900/30"
          >
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {importFileName || 'Click to select backup file'}
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">
              Supports .GovFormsPH.json, .vault, or individual form JSON exports
            </p>
          </div>

          {/* Password Prompt if Encrypted */}
          {importPreview?.requiresPassword && (
            <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200">
                <Lock className="w-4 h-4 text-amber-600" />
                <span>Password Required</span>
              </div>
              <p className="text-xs text-amber-800 dark:text-amber-300">
                {importPreview.error || 'This file is encrypted. Enter passphrase to decrypt:'}
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="password"
                  value={importPassphrase}
                  onChange={(e) => setImportPassphrase(e.target.value)}
                  placeholder="Enter passphrase..."
                  className="flex-1 rounded-lg border border-amber-300 dark:border-amber-700 bg-white dark:bg-slate-950 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 font-mono"
                />
                <Button variant="primary" size="sm" onClick={handleDecryptAttempt}>
                  Unlock
                </Button>
              </div>
            </div>
          )}

          {/* Import Preview Ready */}
          {importPreview?.success && (
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Found {importPreview.records.length} Form(s)
                </span>
                <span className="text-slate-400 font-mono text-[10px]">{importFileName}</span>
              </div>

              {/* Mode Selection */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  Import Action:
                </label>
                <div className="flex items-center gap-4 text-xs">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="importMode"
                      checked={importMode === 'merge'}
                      onChange={() => setImportMode('merge')}
                      className="text-teal-600 focus:ring-teal-500"
                    />
                    <span>Merge (Keep existing forms)</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-rose-600 dark:text-rose-400">
                    <input
                      type="radio"
                      name="importMode"
                      checked={importMode === 'replace'}
                      onChange={() => setImportMode('replace')}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                    <span>Replace (Overwrite all)</span>
                  </label>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={handleExecuteImport}
                loading={isImporting}
                className="w-full mt-2"
              >
                Confirm & Restore {importPreview.records.length} Form(s)
              </Button>
            </div>
          )}

          {importSuccessMessage && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{importSuccessMessage}</span>
            </div>
          )}
        </Card>
      </div>

      {/* Guide: Moving data without a cloud */}
      <Card className="bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 mb-2">
          <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          Why Export / Import Replaces the Cloud
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
          Traditional web apps upload your sensitive government information (such as PhilSys PCN, UMID, TIN, personal family details, and compensation) to third-party databases. <strong>GovFormsPH has no remote database</strong>. You remain the sole owner and custodian of your data at all times.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
          <div>
            <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">1. Export to USB or Email</strong>
            Export your JSON or Encrypted Vault to your flash drive or email it to yourself.
          </div>
          <div>
            <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">2. Open on Any Device</strong>
            Open GovFormsPH on your office PC or phone, go to Export / Import, and select the file.
          </div>
          <div>
            <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">3. 100% Offline Restoration</strong>
            All drafts are restored locally in milliseconds with zero network requests.
          </div>
        </div>
      </Card>
    </div>
  );
};
