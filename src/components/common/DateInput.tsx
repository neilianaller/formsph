import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { formatDateToDMY, formatDMYToInputDate, isValidDMY, isValidYear } from '../../utils/dateUtils';

interface DateInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  mode?: 'dmy' | 'year';
  helpText?: string;
  disabled?: boolean;
  className?: string;
}

export const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  mode = 'dmy',
  helpText,
  disabled = false,
  className = '',
}) => {
  const [internalVal, setInternalVal] = useState(value || '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setInternalVal(value || '');
  }, [value]);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    if (mode === 'year') {
      // Numbers only, max 4 chars
      val = val.replace(/\D/g, '').slice(0, 4);
      setInternalVal(val);
      onChange(val);

      if (val.length === 4 && !isValidYear(val)) {
        setError('Please enter a valid year (1900-2100)');
      } else {
        setError(null);
      }
      return;
    }

    // mode === 'dmy'
    // Auto format slash as user types: DD/MM/YYYY
    let cleaned = val.replace(/\D/g, '').slice(0, 8);
    let formatted = cleaned;
    if (cleaned.length >= 3 && cleaned.length <= 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    } else if (cleaned.length > 4) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4)}`;
    }

    setInternalVal(formatted);
    onChange(formatted);

    if (formatted.length === 10) {
      if (!isValidDMY(formatted)) {
        setError('Format must be DD/MM/YYYY with valid date');
      } else {
        setError(null);
      }
    } else if (formatted.length > 0 && formatted.length < 10) {
      setError('Enter complete date DD/MM/YYYY');
    } else {
      setError(null);
    }
  };

  const handleNativePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawPickerDate = e.target.value; // yyyy-mm-dd
    if (rawPickerDate) {
      const dmy = formatDateToDMY(rawPickerDate);
      setInternalVal(dmy);
      onChange(dmy);
      setError(null);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative rounded-lg shadow-sm flex items-center">
        <input
          type="text"
          disabled={disabled}
          value={internalVal}
          onChange={handleTextChange}
          placeholder={placeholder || (mode === 'year' ? 'YYYY (e.g. 2024)' : 'DD/MM/YYYY')}
          maxLength={mode === 'year' ? 4 : 10}
          className={`w-full rounded-lg border px-3 py-2 text-sm transition-colors duration-150 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 ${
            error
              ? 'border-rose-400 dark:border-rose-600 focus:border-rose-500'
              : 'border-slate-300 dark:border-slate-700 focus:border-teal-500'
          } ${mode === 'dmy' ? 'pr-10' : ''}`}
        />

        {mode === 'dmy' && !disabled && (
          <div className="absolute right-2.5 flex items-center">
            {/* Hidden native date input triggered by calendar icon */}
            <input
              type="date"
              tabIndex={-1}
              value={formatDMYToInputDate(internalVal)}
              onChange={handleNativePickerChange}
              className="absolute inset-0 opacity-0 cursor-pointer w-6 h-6 z-10"
              title="Pick date"
            />
            <Calendar className="w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        )}
      </div>

      {error ? (
        <p className="text-[11px] text-rose-500 mt-1 font-medium">{error}</p>
      ) : helpText ? (
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">{helpText}</p>
      ) : null}
    </div>
  );
};
