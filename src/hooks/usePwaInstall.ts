import { useState, useEffect, useCallback } from 'react';

// Extend window interface for deferredInstallPrompt
declare global {
  interface Window {
    deferredInstallPrompt?: any;
  }
}

export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(
    typeof window !== 'undefined' ? window.deferredInstallPrompt || null : null
  );
  const [isInstallable, setIsInstallable] = useState<boolean>(
    typeof window !== 'undefined' ? Boolean(window.deferredInstallPrompt) : false
  );
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isBrave, setIsBrave] = useState<boolean>(false);

  // Check standalone mode and platform
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if already installed / standalone
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.matchMedia('(display-mode: fullscreen)').matches ||
      window.matchMedia('(display-mode: minimal-ui)').matches ||
      (window.navigator as any).standalone === true;

    setIsInstalled(isStandalone);

    // Check if iOS device
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(ua) && !(window as any).MSStream;
    setIsIOS(isIosDevice);

    // Check if Brave browser
    if ((navigator as any).brave && typeof (navigator as any).brave.isBrave === 'function') {
      (navigator as any).brave.isBrave().then((res: boolean) => setIsBrave(res));
    }

    // Check if window.deferredInstallPrompt was already set before mount
    if (window.deferredInstallPrompt && !isStandalone) {
      setDeferredPrompt(window.deferredInstallPrompt);
      setIsInstallable(true);
    }

    // Handlers
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      window.deferredInstallPrompt = e;
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const handlePromptAvailable = () => {
      if (window.deferredInstallPrompt) {
        setDeferredPrompt(window.deferredInstallPrompt);
        setIsInstallable(true);
      }
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      window.deferredInstallPrompt = null;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('pwa-prompt-available', handlePromptAvailable);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('pwa-app-installed', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('pwa-prompt-available', handlePromptAvailable);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('pwa-app-installed', handleAppInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    const promptEvent = deferredPrompt || (typeof window !== 'undefined' ? window.deferredInstallPrompt : null);
    if (!promptEvent) {
      return false;
    }

    try {
      await promptEvent.prompt();
      const choiceResult = await promptEvent.userChoice;
      
      // Prompt can only be used once
      setDeferredPrompt(null);
      if (typeof window !== 'undefined') {
        window.deferredInstallPrompt = null;
      }

      if (choiceResult && choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
        setIsInstallable(false);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error during PWA installation prompt:', err);
      return false;
    }
  }, [deferredPrompt]);

  return { isInstallable, isInstalled, isIOS, isBrave, promptInstall };
}
