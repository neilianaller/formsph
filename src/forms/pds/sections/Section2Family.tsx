import React from 'react';
import { FamilyBackground, ChildItem } from '../../../types/pds';
import { createEmptyChild } from '../../../db/defaultPdsData';
import { DateInput } from '../../../components/common/DateInput';
import { Button } from '../../../components/common/Button';
import { Plus, Trash2 } from 'lucide-react';

interface Section2FamilyProps {
  data: FamilyBackground;
  onChange: (updated: FamilyBackground) => void;
}

export const Section2Family: React.FC<Section2FamilyProps> = ({ data, onChange }) => {
  const updateSpouse = (field: keyof FamilyBackground['spouse'], val: string) => {
    onChange({
      ...data,
      spouse: { ...data.spouse, [field]: val },
    });
  };

  const updateFather = (field: keyof FamilyBackground['father'], val: string) => {
    onChange({
      ...data,
      father: { ...data.father, [field]: val },
    });
  };

  const updateMother = (field: keyof FamilyBackground['mother'], val: string) => {
    onChange({
      ...data,
      mother: { ...data.mother, [field]: val },
    });
  };

  const addChild = () => {
    onChange({
      ...data,
      children: [...data.children, createEmptyChild()],
    });
  };

  const removeChild = (index: number) => {
    const updated = [...data.children];
    updated.splice(index, 1);
    onChange({ ...data, children: updated });
  };

  const updateChild = (index: number, field: keyof ChildItem, val: string) => {
    const updated = [...data.children];
    updated[index] = { ...updated[index], [field]: val };
    onChange({ ...data, children: updated });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border-light dark:border-border-dark pb-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs flex items-center justify-center font-bold">
            II
          </span>
          Family Background (Items 22 – 25)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Provide complete details of your spouse, children, and parents.
        </p>
      </div>

      {/* Spouse Information (Item 22) */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-4">
        <h4 className="text-xs font-bold  tracking-wider text-slate-700 dark:text-slate-300">
          22. Spouse's Information (If Applicable)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Spouse's Surname
            </label>
            <input
              type="text"
              value={data.spouse.surname}
              onChange={(e) => updateSpouse('surname', e.target.value)}
              placeholder="e.g. DELA CRUZ (or N/A)"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 "
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              First Name
            </label>
            <input
              type="text"
              value={data.spouse.firstName}
              onChange={(e) => updateSpouse('firstName', e.target.value)}
              placeholder="e.g. MARIA"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 "
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Middle Name
            </label>
            <input
              type="text"
              value={data.spouse.middleName}
              onChange={(e) => updateSpouse('middleName', e.target.value)}
              placeholder="e.g. REYES"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 "
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Name Extension
            </label>
            <input
              type="text"
              value={data.spouse.nameExtension}
              onChange={(e) => updateSpouse('nameExtension', e.target.value)}
              placeholder="e.g. JR., III"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 "
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Occupation
            </label>
            <input
              type="text"
              value={data.spouse.occupation}
              onChange={(e) => updateSpouse('occupation', e.target.value)}
              placeholder="e.g. Accountant"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Employer / Business Name
            </label>
            <input
              type="text"
              value={data.spouse.employerBusinessName}
              onChange={(e) => updateSpouse('employerBusinessName', e.target.value)}
              placeholder="e.g. Department of Finance"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Business Address
            </label>
            <input
              type="text"
              value={data.spouse.businessAddress}
              onChange={(e) => updateSpouse('businessAddress', e.target.value)}
              placeholder="e.g. Roxas Blvd., Manila"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Telephone No.
            </label>
            <input
              type="text"
              value={data.spouse.telephoneNo}
              onChange={(e) => updateSpouse('telephoneNo', e.target.value)}
              placeholder="e.g. (02) 8523-0000"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>
        </div>
      </div>

      {/* Children List (Item 23 - Dynamic Repeatable Array) */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold  tracking-wider text-slate-700 dark:text-slate-300">
              23. Name of Children (Write Full Name and Date of Birth)
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Include all children, biological, legal, or adopted.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            icon={<Plus className="w-3.5 h-3.5" />}
            onClick={addChild}
          >
            Add Child
          </Button>
        </div>

        {data.children.length === 0 ? (
          <p className="text-xs text-slate-500 dark:text-slate-400 py-3 text-center italic bg-white dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
            No children listed. Click "Add Child" if you have dependents.
          </p>
        ) : (
          <div className="space-y-2">
            {data.children.map((child, idx) => (
              <div
                key={child.id || idx}
                className="flex flex-col sm:flex-row items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="flex-1 w-full">
                  <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">
                    Child #{idx + 1} Full Name
                  </label>
                  <input
                    type="text"
                    value={child.fullName}
                    onChange={(e) => updateChild(idx, 'fullName', e.target.value)}
                    placeholder="e.g. JUAN DELA CRUZ JR."
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 "
                  />
                </div>

                <div className="w-full sm:w-48">
                  <DateInput
                    label="Date of Birth"
                    value={child.dateOfBirth}
                    onChange={(val) => updateChild(idx, 'dateOfBirth', val)}
                  />
                </div>

                <div className="self-end sm:self-center mt-2 sm:mt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    icon={<Trash2 className="w-4 h-4 text-rose-500" />}
                    onClick={() => removeChild(idx)}
                    title="Remove child"
                  >
                    <span className="sm:hidden text-xs text-rose-500">Remove</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Parents (Items 24-25) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Father's Info (Item 24) */}
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
          <h4 className="text-xs font-bold  tracking-wider text-slate-700 dark:text-slate-300">
            24. Father's Surname & Name
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">Surname</label>
              <input
                type="text"
                value={data.father.surname}
                onChange={(e) => updateFather('surname', e.target.value)}
                placeholder="e.g. DELA CRUZ"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 "
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">First Name</label>
              <input
                type="text"
                value={data.father.firstName}
                onChange={(e) => updateFather('firstName', e.target.value)}
                placeholder="e.g. PEDRO"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 "
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">Middle Name</label>
              <input
                type="text"
                value={data.father.middleName}
                onChange={(e) => updateFather('middleName', e.target.value)}
                placeholder="e.g. GARCIA"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 "
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">Name Extension</label>
              <input
                type="text"
                value={data.father.nameExtension || ''}
                onChange={(e) => updateFather('nameExtension', e.target.value)}
                placeholder="e.g. SR."
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 "
              />
            </div>
          </div>
        </div>

        {/* Mother's Info (Item 25) */}
        <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
          <h4 className="text-xs font-bold  tracking-wider text-slate-700 dark:text-slate-300">
            25. Mother's Maiden Name
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">
                Maiden Surname
              </label>
              <input
                type="text"
                value={data.mother.maidenSurname || data.mother.surname}
                onChange={(e) => updateMother('maidenSurname', e.target.value)}
                placeholder="e.g. SANTOS"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 "
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">First Name</label>
              <input
                type="text"
                value={data.mother.firstName}
                onChange={(e) => updateMother('firstName', e.target.value)}
                placeholder="e.g. JUANA"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 "
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">Middle Name</label>
              <input
                type="text"
                value={data.mother.middleName}
                onChange={(e) => updateMother('middleName', e.target.value)}
                placeholder="e.g. LOPEZ"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
