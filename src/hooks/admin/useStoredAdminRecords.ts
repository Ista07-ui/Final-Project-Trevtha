"use client";

import { useEffect, useState } from "react";

export type StoredRecord = {
  readonly id: string;
  readonly section: string;
  readonly formId: string;
  readonly mode: "new" | "edit";
  readonly values: Readonly<Record<string, string>>;
  readonly savedAt: string;
};

export const STORAGE_KEY = "trevtha_admin_crud_records";

/**
 * Membaca semua record yang tersimpan di localStorage
 */
export function readStoredAdminRecords(): StoredRecord[] {
  try {
    const rawValue = localStorage.getItem(STORAGE_KEY);
    const parsed: StoredRecord[] = rawValue ? JSON.parse(rawValue) : [];
    return parsed;
  } catch {
    return [];
  }
}

/**
 * Mencari satu record berdasarkan section dan formId
 */
export function getStoredRecordByFormId(section: string, formId: string) {
  const records = readStoredAdminRecords();
  return records.find(
    (item) => item.section === section && item.formId === formId,
  );
}

/**
 * Menyimpan atau mengupdate record (upsert pattern)
 */
export function upsertStoredAdminRecord(entry: StoredRecord) {
  const records = readStoredAdminRecords();
  const filtered = records.filter(
    (item) => !(item.section === entry.section && item.formId === entry.formId),
  );

  filtered.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

/**
 * Menghapus record tertentu dari localStorage
 */
export function deleteStoredAdminRecord(section: string, formId: string) {
  const records = readStoredAdminRecords();
  const filtered = records.filter(
    (item) => !(item.section === section && item.formId === formId),
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

/**
 * Hook untuk mengambil record yang sudah disimpan berdasarkan section
 * Secara otomatis refresh ketika section berubah
 */
/**
 * Hook untuk mengambil record yang sudah disimpan berdasarkan section
 * Secara otomatis refresh ketika section berubah
 */
export function useStoredAdminRecords(section: string) {
  const [records, setRecords] = useState<StoredRecord[]>([]);

  useEffect(() => {
    const filtered = readStoredAdminRecords().filter(
      (item) => item.section === section,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setRecords(filtered);
  }, [section]);

  return records;
}

/**
 * Helper untuk mengambil value dari stored record
 * Akan coba beberapa alias field untuk flexibility
 * @param values - Object nilai dari stored record
 * @param aliases - Daftar field name yang dicoba
 * @param fallback - Default value jika tidak ditemukan (default: "-")
 */
export function getStoredValue(
  values: Record<string, string>,
  aliases: string[],
  fallback = "-",
) {
  for (const alias of aliases) {
    const fieldValue = values[alias];
    if (fieldValue && fieldValue.trim().length > 0) {
      return fieldValue;
    }
  }

  return fallback;
}
