/**
 * FormsPH — Date Utilities
 * Handles Civil Service Commission (CSC) date standards:
 * - dd/mm/yyyy for general dates
 * - yyyy for education period of attendance & graduation
 */

/**
 * Format ISO or input date string to dd/mm/yyyy
 */
export function formatDateToDMY(val: string): string {
  if (!val) return '';
  // If already dd/mm/yyyy
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(val)) return val;
  // If yyyy-mm-dd (native input date)
  if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
    const [y, m, d] = val.split('-');
    return `${d}/${m}/${y}`;
  }
  return val;
}

/**
 * Convert dd/mm/yyyy to yyyy-mm-dd for native HTML date inputs
 */
export function formatDMYToInputDate(val: string): string {
  if (!val) return '';
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(val)) {
    const [d, m, y] = val.split('/');
    return `${y}-${m}-${d}`;
  }
  return val;
}

/**
 * Validates if string is valid dd/mm/yyyy
 */
export function isValidDMY(val: string): boolean {
  if (!val) return false;
  const match = val.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return false;
  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);
  if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900 || year > 2100) return false;
  return true;
}

/**
 * Validates if string is 4-digit year (yyyy)
 */
export function isValidYear(val: string): boolean {
  if (!val) return false;
  return /^\d{4}$/.test(val) && parseInt(val, 10) >= 1900 && parseInt(val, 10) <= 2100;
}

/**
 * Format display date for UI (e.g. "Aug 26, 2026, 11:30 AM")
 */
export function formatRelativeDateTime(isoStr: string): string {
  if (!isoStr) return '';
  try {
    const d = new Date(isoStr);
    return new Intl.DateTimeFormat('en-PH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  } catch {
    return isoStr;
  }
}
