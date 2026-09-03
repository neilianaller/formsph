import React from 'react';
import { useStoragePersistence } from '../hooks/useStoragePersistence';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import {
  ShieldCheck,
  Lock,
  HardDrive,
  CheckCircle2,
  AlertCircle,
  EyeOff,
  ServerOff,
  Code,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const { isPersisted, quota, isSupported, requestPersistence } = useStoragePersistence();

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          Privacy & Data Sovereignty
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Our core promise: <strong>"Your data never leaves your device unless you choose to export it."</strong>
        </p>
      </div>

      {/* Core Privacy Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="space-y-3">
          <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 w-fit">
            <ServerOff className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            1. Zero Remote Servers
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            There is no backend API, no database endpoint, and no cloud server. Everything you type into your Personal Data Sheet lives solely inside your browser's IndexedDB.
          </p>
        </Card>

        <Card className="space-y-3">
          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 w-fit">
            <EyeOff className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            2. Privacy-Friendly Metrics Only
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Zero personally identifiable information (PII), form input, or sensitive documents are ever tracked or transmitted. Only cookieless, privacy-preserving aggregate page views (via Vercel Analytics) are enabled to monitor app availability.
          </p>
        </Card>

        <Card className="space-y-3">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 w-fit">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            3. Client-Side Encryption
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            When exporting sensitive backups, you can protect them with 256-bit AES-GCM encryption derived from your own master password via the native browser Web Crypto API.
          </p>
        </Card>
      </div>

      {/* Storage Persistence Diagnostics & Control */}
      <Card className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-light dark:border-border-dark pb-3">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Storage Persistence Status
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Browser Storage Management API diagnostics
              </p>
            </div>
          </div>

          <div>
            {isPersisted ? (
              <Badge variant="success" size="md">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Storage Persistence: Granted
              </Badge>
            ) : isPersisted === false ? (
              <Badge variant="warning" size="md">
                <AlertCircle className="w-3.5 h-3.5 mr-1" /> Storage Persistence: Standard
              </Badge>
            ) : (
              <Badge variant="default" size="md">Checking...</Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              When persistent storage is granted, the browser promises not to evict or wipe your IndexedDB form database during automatic background disk cleanup routines.
            </p>

            {!isPersisted && isSupported && (
              <Button
                variant="primary"
                size="sm"
                icon={<Sparkles className="w-4 h-4" />}
                onClick={requestPersistence}
              >
                Request Persistent Storage Permission
              </Button>
            )}
          </div>

          {/* Storage Quota Usage */}
          {quota && (
            <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                <span>Storage Quota Utilization</span>
                <span className="font-mono">{quota.percentUsed.toFixed(3)}%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full"
                  style={{ width: `${Math.max(quota.percentUsed, 1)}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>Used: {formatBytes(quota.usage)}</span>
                <span>Available: {formatBytes(quota.quota)}</span>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Open Source Verification */}
      <Card className="bg-slate-900 text-white border-slate-800 space-y-4">
        <div className="flex items-center gap-2">
          <Code className="w-5 h-5 text-teal-400" />
          <h3 className="text-base font-bold text-white">
            Audit the Source Code Yourself
          </h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          GovFormsPH is open source under the MIT License. You do not need to blindly trust our claims. Any developer or security researcher can inspect the complete source code, review every network call in the Network Inspector, and verify that all data operations occur strictly within the client device.
        </p>
        <div className="pt-2">
          <a
            href="https://github.com/neilianaller/govformsph"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-teal-300 hover:text-teal-200 font-semibold"
          >
            <span>View Source on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </Card>
    </div>
  );
};
