import React from 'react';
import { OtherInfo } from '../../../types/pds';
import { Button } from '../../../components/common/Button';
import { Plus, Trash2, Sparkles, Trophy, Users } from 'lucide-react';

interface Section8OtherInfoProps {
  data: OtherInfo;
  onChange: (updated: OtherInfo) => void;
}

export const Section8OtherInfo: React.FC<Section8OtherInfoProps> = ({ data, onChange }) => {
  const addItem = (category: keyof OtherInfo) => {
    onChange({
      ...data,
      [category]: [...data[category], ''],
    });
  };

  const removeItem = (category: keyof OtherInfo, index: number) => {
    const list = [...data[category]];
    list.splice(index, 1);
    onChange({ ...data, [category]: list });
  };

  const updateItem = (category: keyof OtherInfo, index: number, val: string) => {
    const list = [...data[category]];
    list[index] = val;
    onChange({ ...data, [category]: list });
  };

  const renderDynamicList = (
    title: string,
    itemNumber: string,
    category: keyof OtherInfo,
    placeholder: string,
    icon: React.ReactNode
  ) => (
    <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold  tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          {icon}
          {itemNumber}. {title}
        </h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          icon={<Plus className="w-3.5 h-3.5" />}
          onClick={() => addItem(category)}
        >
          Add Item
        </Button>
      </div>

      <div className="space-y-2">
        {data[category].map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              type="text"
              value={item}
              onChange={(e) => updateItem(category, idx, e.target.value)}
              placeholder={placeholder}
              className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
            {data[category].length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(category, idx)}
                className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1.5 rounded transition-colors cursor-pointer"
                title="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-border-light dark:border-border-dark pb-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs flex items-center justify-center font-bold">
            VIII
          </span>
          Other Information (Items 31 – 33)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Special skills, non-academic distinctions, and organization memberships.
        </p>
      </div>

      {renderDynamicList(
        'Special Skills and Hobbies',
        '31',
        'specialSkillsHobbies',
        'e.g. Software Development, Photography, Technical Writing',
        <Sparkles className="w-4 h-4 text-amber-500" />
      )}

      {renderDynamicList(
        'Non-Academic Distinctions / Recognition',
        '32',
        'nonAcademicDistinctions',
        'e.g. Most Outstanding Employee of the Year (2025)',
        <Trophy className="w-4 h-4 text-emerald-500" />
      )}

      {renderDynamicList(
        'Membership in Association / Organization',
        '33',
        'membershipInAssociations',
        'e.g. Philippine Computer Society (Member), Toastmasters International',
        <Users className="w-4 h-4 text-indigo-500" />
      )}
    </div>
  );
};
