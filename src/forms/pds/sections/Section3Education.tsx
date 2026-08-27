import React from 'react';
import { EducationalBackground, EducationEntry } from '../../../types/pds';
import { createEmptyEducationEntry } from '../../../db/defaultPdsData';
import { DateInput } from '../../../components/common/DateInput';
import { Button } from '../../../components/common/Button';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

interface Section3EducationProps {
  data: EducationalBackground;
  onChange: (updated: EducationalBackground) => void;
}

export const Section3Education: React.FC<Section3EducationProps> = ({ data, onChange }) => {
  const updateElementary = (field: keyof EducationEntry, val: string) => {
    onChange({
      ...data,
      elementary: { ...data.elementary, [field]: val },
    });
  };

  const updateSecondary = (field: keyof EducationEntry, val: string) => {
    onChange({
      ...data,
      secondary: { ...data.secondary, [field]: val },
    });
  };

  const updateEntryList = (
    category: 'vocationalTrade' | 'college' | 'graduateStudies',
    index: number,
    field: keyof EducationEntry,
    val: string
  ) => {
    const list = [...data[category]];
    list[index] = { ...list[index], [field]: val };
    onChange({ ...data, [category]: list });
  };

  const addEntry = (category: 'vocationalTrade' | 'college' | 'graduateStudies') => {
    onChange({
      ...data,
      [category]: [...data[category], createEmptyEducationEntry()],
    });
  };

  const removeEntry = (category: 'vocationalTrade' | 'college' | 'graduateStudies', index: number) => {
    const list = [...data[category]];
    list.splice(index, 1);
    onChange({ ...data, [category]: list });
  };

  const renderSingleCard = (
    title: string,
    entry: EducationEntry,
    onFieldChange: (field: keyof EducationEntry, val: string) => void,
    courseLabel: string = 'Basic Education / Degree / Course'
  ) => (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
        <GraduationCap className="w-4 h-4 text-teal-600 dark:text-teal-400" />
        {title}
      </h5>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
            Name of School (Write in full)
          </label>
          <input
            type="text"
            value={entry.nameOfSchool}
            onChange={(e) => onFieldChange('nameOfSchool', e.target.value)}
            placeholder="e.g. University of the Philippines Diliman"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 uppercase"
          />
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
            {courseLabel}
          </label>
          <input
            type="text"
            value={entry.degreeCourse}
            onChange={(e) => onFieldChange('degreeCourse', e.target.value)}
            placeholder="e.g. Bachelor of Science in Public Administration"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 uppercase"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div>
          <DateInput
            mode="year"
            label="Period From (Year)"
            value={entry.periodFromYear}
            onChange={(val) => onFieldChange('periodFromYear', val)}
            placeholder="YYYY"
          />
        </div>
        <div>
          <DateInput
            mode="year"
            label="Period To (Year)"
            value={entry.periodToYear}
            onChange={(val) => onFieldChange('periodToYear', val)}
            placeholder="YYYY"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Highest Units Earned
          </label>
          <input
            type="text"
            value={entry.highestLevelUnitsEarned}
            onChange={(e) => onFieldChange('highestLevelUnitsEarned', e.target.value)}
            placeholder="e.g. Graduated / 120 units"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
          />
        </div>
        <div>
          <DateInput
            mode="year"
            label="Year Graduated"
            value={entry.yearGraduated}
            onChange={(val) => onFieldChange('yearGraduated', val)}
            placeholder="YYYY"
          />
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
          Scholarship / Academic Honors Received
        </label>
        <input
          type="text"
          value={entry.scholarshipAcademicHonors}
          onChange={(e) => onFieldChange('scholarshipAcademicHonors', e.target.value)}
          placeholder="e.g. Cum Laude, DOST Scholar (or NONE)"
          className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
        />
      </div>
    </div>
  );

  const renderRepeatableSection = (
    title: string,
    category: 'vocationalTrade' | 'college' | 'graduateStudies',
    courseLabel: string
  ) => (
    <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          {title}
        </h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          icon={<Plus className="w-3.5 h-3.5" />}
          onClick={() => addEntry(category)}
        >
          Add {title.split(' ')[0]}
        </Button>
      </div>

      {data[category].map((entry, idx) => (
        <div key={entry.id || idx} className="relative">
          {renderSingleCard(
            `${title} #${idx + 1}`,
            entry,
            (field, val) => updateEntryList(category, idx, field, val),
            courseLabel
          )}
          {data[category].length > 1 && (
            <div className="mt-2 flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                icon={<Trash2 className="w-3.5 h-3.5 text-rose-500" />}
                onClick={() => removeEntry(category, idx)}
              >
                <span className="text-xs text-rose-500">Remove Row</span>
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="border-b border-border-light dark:border-border-dark pb-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs flex items-center justify-center font-bold">
            III
          </span>
          Educational Background (Item 26)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          <strong>Notice (2026 Revision):</strong> Period of attendance requires <strong>Year only (YYYY)</strong>. Write full names of schools and degree programs.
        </p>
      </div>

      {/* Elementary */}
      {renderSingleCard(
        'Elementary Education',
        data.elementary,
        updateElementary,
        'Basic Education / Primary'
      )}

      {/* Secondary */}
      {renderSingleCard(
        'Secondary / High School Education',
        data.secondary,
        updateSecondary,
        'Junior / Senior High School'
      )}

      {/* Vocational / Trade Course */}
      {renderRepeatableSection(
        'Vocational / Trade Course',
        'vocationalTrade',
        'Vocational / Technical Course'
      )}

      {/* College / Higher Education */}
      {renderRepeatableSection('College', 'college', 'Degree / Course (e.g. BS Computer Science)')}

      {/* Graduate Studies */}
      {renderRepeatableSection(
        'Graduate Studies',
        'graduateStudies',
        'Post-Graduate Degree (e.g. Master in Public Admin / PhD)'
      )}
    </div>
  );
};
