import Dexie, { Table } from 'dexie';
import { PdsRecord, AppSettings } from '../types/pds';

export class FormsPHDatabase extends Dexie {
  pdsRecords!: Table<PdsRecord, number>;
  settings!: Table<AppSettings, number>;

  constructor() {
    super('FormsPHDatabase');

    // Schema version 1
    this.version(1).stores({
      pdsRecords: '++id, updatedAt, [meta.createdAt+meta.updatedAt]',
      settings: '++id',
    });

    // Version 2 migration if new indexes are needed
    this.version(2).stores({
      pdsRecords: '++id, meta.updatedAt, meta.createdAt',
      settings: '++id',
    });
  }
}

export const db = new FormsPHDatabase();

/**
 * Initialize default settings if none exist
 */
export async function initializeSettings(): Promise<AppSettings> {
  const count = await db.settings.count();
  if (count === 0) {
    const defaultSettings: AppSettings = {
      theme: 'light',
      hasSeenTour: false,
      autoSaveInterval: 800,
    };
    const id = await db.settings.add(defaultSettings);
    return { ...defaultSettings, id };
  }
  const first = await db.settings.toCollection().first();
  return first!;
}
