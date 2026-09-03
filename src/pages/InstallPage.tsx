import React from 'react';
import { usePwaInstall } from '../hooks/usePwaInstall';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import {
  Smartphone,
  WifiOff,
  Zap,
  HardDrive,
  ShieldCheck,
  Download,
  Share,
  PlusSquare,
  CheckCircle,
  Laptop,
  Shield,
  HelpCircle
} from 'lucide-react';

export const InstallPage: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, isBrave, promptInstall } = usePwaInstall();

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Smartphone className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          Install GovFormsPH App
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Install GovFormsPH directly to your phone, tablet, or desktop. No app store account required, no download bloat.
        </p>
      </div>

      {/* Main Action Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold">
            {isInstalled ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" /> Running as Installed Standalone App
              </>
            ) : (
              <>
                <Zap className="w-3.5 h-3.5" /> Progressive Web App (PWA)
              </>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold">
            {isInstalled ? 'GovFormsPH is Ready Offline on this Device' : 'Add GovFormsPH to Your Home Screen or Desktop'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Enjoy full offline capability, faster startup, zero browser toolbars, and resilient local storage.
          </p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          {!isInstalled && isInstallable && (
            <Button
              variant="primary"
              size="lg"
              icon={<Download className="w-5 h-5" />}
              onClick={promptInstall}
              className="shadow-lg hover:shadow-teal-500/20"
            >
              Install App Now
            </Button>
          )}

          {isInstalled && (
            <div className="px-5 py-2.5 rounded-xl bg-teal-500/20 border border-teal-500/30 text-teal-300 text-sm font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> App Installed
            </div>
          )}

          {!isInstalled && !isInstallable && (
            <div className="flex flex-col items-center md:items-end gap-1">
              <Button
                variant="outline"
                size="md"
                icon={<Download className="w-4 h-4" />}
                onClick={promptInstall}
                className="text-slate-200 border-slate-700 hover:bg-slate-800"
              >
                Trigger Install Prompt
              </Button>
              <span className="text-[11px] text-slate-400">
                {isIOS
                  ? 'Use Safari "Add to Home Screen" below'
                  : 'Or click the install icon (⊕) in the browser address bar'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Brave / Browser Note */}
      {isBrave && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-200">
          <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-amber-300 block">Brave Browser Detected</strong>
            <p>
              Brave supports full PWA installation. If the automated popup doesn't appear, you can click the install icon located inside the right side of the address bar, or select <strong>Menu (3 lines) &gt; Install GovFormsPH</strong>.
            </p>
          </div>
        </div>
      )}

      {/* 5 Core Reasons Why Install */}
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4">
          Why Install GovFormsPH?
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="space-y-2">
            <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 w-fit">
              <WifiOff className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              1. 100% Offline Work
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Once installed, the service worker caches the complete application shell. You can create, edit, and print forms without internet access in remote or field locations.
            </p>
          </Card>

          <Card className="space-y-2">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 w-fit">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              2. Faster Instant Load
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Launches instantly in a clean, standalone window without URL bars or cluttered browser tabs, mimicking a native desktop or mobile application.
            </p>
          </Card>

          <Card className="space-y-2">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 w-fit">
              <HardDrive className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              3. Resilient Storage Persistence
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Modern browsers prioritize storage quotas and prevent automated cache clearing for installed Progressive Web Apps.
            </p>
          </Card>

          <Card className="space-y-2">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 w-fit">
              <Smartphone className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              4. Home Screen & Dock Icon
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Pin GovFormsPH directly to your macOS Dock, Windows Taskbar, Android Home Screen, or iOS App Library.
            </p>
          </Card>

          <Card className="space-y-2">
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              5. Zero App Store Bloat
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              No 200MB download, no app store tracking, no invasive permissions. Installed via standard open web technology.
            </p>
          </Card>
        </div>
      </div>

      {/* Installation Guides by Platform */}
      <div className="space-y-4 pt-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          How to Install by Platform
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chrome / Brave / Edge (Desktop) */}
          <Card className="space-y-3">
            <div className="flex items-center gap-2">
              <Laptop className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Chrome / Brave / Edge (Desktop)</h4>
            </div>
            <ol className="space-y-2 text-xs text-slate-600 dark:text-slate-300 list-decimal list-inside">
              <li>Click the <strong>Install App Now</strong> button above.</li>
              <li>Or click the <strong>Install icon (⊕)</strong> on the right side of the address bar.</li>
              <li>Or open the browser menu &gt; select <strong>Install GovFormsPH</strong>.</li>
              <li>GovFormsPH opens in a dedicated, distraction-free desktop window.</li>
            </ol>
          </Card>

          {/* Android (Chrome / Brave / Samsung Internet) */}
          <Card className="space-y-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Android (Chrome / Brave)</h4>
            </div>
            <ol className="space-y-2 text-xs text-slate-600 dark:text-slate-300 list-decimal list-inside">
              <li>Tap the <strong>Install App Now</strong> button above.</li>
              <li>Or tap the <strong>Menu (3 dots)</strong> in the top right.</li>
              <li>Select <strong>Install app</strong> or <strong>Add to Home screen</strong>.</li>
              <li>Confirm to add GovFormsPH to your app drawer and home screen.</li>
            </ol>
          </Card>

          {/* iOS Safari */}
          <Card className="space-y-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">iPhone / iPad (Safari)</h4>
            </div>
            <ol className="space-y-2 text-xs text-slate-600 dark:text-slate-300 list-decimal list-inside">
              <li>Open this site in <strong>Safari</strong>.</li>
              <li>Tap the <Share className="w-3.5 h-3.5 inline mx-1 text-sky-500" /> <strong>Share</strong> button at the bottom.</li>
              <li>Scroll down and select <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-slate-500" /> <strong>Add to Home Screen</strong>.</li>
              <li>Tap <strong>Add</strong> in the top-right corner.</li>
            </ol>
          </Card>
        </div>
      </div>

      {/* Troubleshooting Tips */}
      <Card className="bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-800 dark:text-slate-200">
          <HelpCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>Troubleshooting & Installability Tips</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-400">
          <div>
            <strong className="text-slate-700 dark:text-slate-300 block mb-0.5">Prompt Dismissed Previously?</strong>
            Chromium browsers suppress the automated popup if dismissed recently. You can test in an Incognito / Private window or click the address bar install icon.
          </div>
          <div>
            <strong className="text-slate-700 dark:text-slate-300 block mb-0.5">HTTPS & Security</strong>
            PWAs require a secure HTTPS context or localhost. GovFormsPH automatically leverages HTTPS when hosted.
          </div>
        </div>
      </Card>
    </div>
  );
};
