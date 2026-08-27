import { useState, useEffect } from 'react';

export function useStoragePersistence() {
  const [isPersisted, setIsPersisted] = useState<boolean | null>(null);
  const [quota, setQuota] = useState<{ usage: number; quota: number; percentUsed: number } | null>(null);
  const [isSupported, setIsSupported] = useState<boolean>(true);

  const checkStatus = async () => {
    if (typeof navigator !== 'undefined' && 'storage' in navigator && 'persisted' in navigator.storage) {
      try {
        const persisted = await navigator.storage.persisted();
        setIsPersisted(persisted);

        if ('estimate' in navigator.storage) {
          const estimate = await navigator.storage.estimate();
          const usage = estimate.usage || 0;
          const totalQuota = estimate.quota || 1;
          setQuota({
            usage,
            quota: totalQuota,
            percentUsed: (usage / totalQuota) * 100,
          });
        }
      } catch (err) {
        console.error('Storage persistence check failed', err);
        setIsSupported(false);
      }
    } else {
      setIsSupported(false);
    }
  };

  useEffect(() => {
    checkStatus();
  }, []);

  const requestPersistence = async (): Promise<boolean> => {
    if (typeof navigator !== 'undefined' && 'storage' in navigator && 'persist' in navigator.storage) {
      try {
        const granted = await navigator.storage.persist();
        setIsPersisted(granted);
        await checkStatus();
        return granted;
      } catch (err) {
        console.error('Request persistence failed', err);
        return false;
      }
    }
    return false;
  };

  return { isPersisted, quota, isSupported, requestPersistence, checkStatus };
}
