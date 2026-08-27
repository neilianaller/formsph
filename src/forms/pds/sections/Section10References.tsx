import React from 'react';
import { ReferenceItem } from '../../../types/pds';
import { createEmptyReference } from '../../../db/defaultPdsData';
import { Button } from '../../../components/common/Button';
import { Plus, Trash2, UserCheck } from 'lucide-react';

interface Section10ReferencesProps {
  data: ReferenceItem[];
  onChange: (updated: ReferenceItem[]) => void;
}

export const Section10References: React.FC<Section10ReferencesProps> = ({ data, onChange }) => {
  const addRow = () => {
    onChange([...data, createEmptyReference()]);
  };

  const removeRow = (index: number) => {
    const list = [...data];
    list.splice(index, 1);
    onChange(list);
  };

  const updateRow = (index: number, field: keyof ReferenceItem, val: string) => {
    const list = [...data];
    list[index] = { ...list[index], [field]: val };
    onChange(list);
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border-light dark:border-border-dark pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs flex items-center justify-center font-bold">
              X
            </span>
            References (Item 41)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Person not related by consanguinity or affinity to applicant / appointee (Minimum 3 references).
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          icon={<Plus className="w-3.5 h-3.5" />}
          onClick={addRow}
        >
          Add Reference
        </Button>
      </div>

      <div className="space-y-4">
        {data.map((item, idx) => (
          <div
            key={item.id || idx}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-700 dark:text-teal-400 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                Reference #{idx + 1} {idx < 3 && <span className="text-rose-500">*</span>}
              </span>
              {data.length > 3 && (
                <button
                  type="button"
                  onClick={() => removeRow(idx)}
                  className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1 rounded transition-colors cursor-pointer"
                  title="Remove reference"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateRow(idx, 'name', e.target.value)}
                  placeholder="e.g. ATTY. MARIA SANTOS"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 uppercase"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Office / Residential Address
                </label>
                <input
                  type="text"
                  value={item.officeResidentialAddress}
                  onChange={(e) => updateRow(idx, 'officeResidentialAddress', e.target.value)}
                  placeholder="e.g. Diliman, Quezon City"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Contact No. / Email
                </label>
                <input
                  type="text"
                  value={item.contactNoOrEmail}
                  onChange={(e) => updateRow(idx, 'contactNoOrEmail', e.target.value)}
                  placeholder="e.g. 09181234567 / maria@example.com"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
