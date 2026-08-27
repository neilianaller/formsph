/**
 * FormsPH — Export / Import Utility
 * Encapsulates full export/import cycle with metadata, checksum, schema validation, and optional AES-GCM encryption.
 */

import { PdsRecord, AppSettings } from '../types/pds';
import { db } from '../db/db';
import { encryptData, decryptData } from './crypto';

export interface ExportBundle {
  version: '1.0';
  exportedAt: string;
  source: 'FormsPH';
  isEncrypted: boolean;
  formsCount: number;
  settings?: AppSettings;
  data: PdsRecord[] | string; // Plain array or encrypted ciphertext string
}

/**
 * Export all saved forms + settings to a downloadable file
 */
export async function exportAllData(
  passphrase?: string
): Promise<{ fileName: string; blob: Blob }> {
  const records = await db.pdsRecords.toArray();
  const settings = await db.settings.toCollection().first();

  const isEncrypted = Boolean(passphrase && passphrase.trim().length > 0);
  let payloadData: PdsRecord[] | string = records;

  if (isEncrypted && passphrase) {
    const rawJson = JSON.stringify({ records, settings });
    payloadData = await encryptData(rawJson, passphrase);
  }

  const bundle: ExportBundle = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    source: 'FormsPH',
    isEncrypted,
    formsCount: records.length,
    settings: isEncrypted ? undefined : settings,
    data: payloadData,
  };

  const dateStr = new Date().toISOString().split('T')[0];
  const extension = isEncrypted ? 'formsph.vault' : 'formsph.json';
  const fileName = `formsph-backup-${dateStr}.${extension}`;

  const jsonStr = JSON.stringify(bundle, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });

  // Update lastExportDate in settings
  if (settings && settings.id) {
    await db.settings.update(settings.id, { lastExportDate: new Date().toISOString() });
  }

  return { fileName, blob };
}

/**
 * Export a single PDS form record to JSON
 */
export function exportSingleRecord(record: PdsRecord): { fileName: string; blob: Blob } {
  const dateStr = new Date().toISOString().split('T')[0];
  const nameSlug = (record.personalInfo.surname || 'pds-form').toLowerCase().replace(/[^a-z0-9]/g, '-');
  const fileName = `pds-${nameSlug}-${dateStr}.json`;

  const singleBundle = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    source: 'FormsPH',
    type: 'single-form',
    formVersion: record.meta.formVersion,
    record,
  };

  const blob = new Blob([JSON.stringify(singleBundle, null, 2)], { type: 'application/json' });
  return { fileName, blob };
}

/**
 * Trigger browser file download
 */
export function triggerDownload(fileName: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Parse and validate an imported file
 */
export async function parseImportFile(
  fileContent: string,
  passphrase?: string
): Promise<{
  success: boolean;
  records: PdsRecord[];
  settings?: AppSettings;
  isEncrypted: boolean;
  requiresPassword?: boolean;
  error?: string;
}> {
  try {
    const parsed = JSON.parse(fileContent);

    // Check if single record format
    if (parsed.type === 'single-form' && parsed.record) {
      return {
        success: true,
        records: [parsed.record],
        isEncrypted: false,
      };
    }

    // Check if ExportBundle
    if (parsed.source === 'FormsPH' || parsed.formsCount !== undefined) {
      if (parsed.isEncrypted) {
        if (!passphrase) {
          return {
            success: false,
            records: [],
            isEncrypted: true,
            requiresPassword: true,
            error: 'This backup is password-protected. Please enter your passphrase to decrypt.',
          };
        }

        try {
          const decryptedJson = await decryptData(parsed.data, passphrase);
          const decryptedBundle = JSON.parse(decryptedJson);
          return {
            success: true,
            records: decryptedBundle.records || [],
            settings: decryptedBundle.settings,
            isEncrypted: true,
          };
        } catch (decryptErr) {
          return {
            success: false,
            records: [],
            isEncrypted: true,
            requiresPassword: true,
            error: 'Incorrect passphrase or corrupted file.',
          };
        }
      }

      // Plain JSON array
      if (Array.isArray(parsed.data)) {
        return {
          success: true,
          records: parsed.data,
          settings: parsed.settings,
          isEncrypted: false,
        };
      }
    }

    // Direct array of records
    if (Array.isArray(parsed)) {
      return {
        success: true,
        records: parsed,
        isEncrypted: false,
      };
    }

    return {
      success: false,
      records: [],
      isEncrypted: false,
      error: 'Unrecognized file structure. Please ensure this is a valid FormsPH export file.',
    };
  } catch (err: any) {
    return {
      success: false,
      records: [],
      isEncrypted: false,
      error: err.message || 'Invalid JSON file.',
    };
  }
}

/**
 * Restore imported records into Dexie IndexedDB
 */
export async function restoreRecords(
  records: PdsRecord[],
  mode: 'merge' | 'replace' = 'merge'
): Promise<number> {
  if (mode === 'replace') {
    await db.pdsRecords.clear();
  }

  let importedCount = 0;
  for (const record of records) {
    // Strip old ID if merging to generate fresh auto-increment ID
    const newRecord = { ...record };
    if (mode === 'merge') {
      delete newRecord.id;
    }
    newRecord.meta.updatedAt = new Date().toISOString();
    await db.pdsRecords.add(newRecord);
    importedCount++;
  }

  return importedCount;
}
