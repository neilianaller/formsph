import React, { useState, useEffect, useRef } from 'react';
import { PdsRecord } from '../../types/pds';
import { db } from '../../db/db';
import { Button } from '../../components/common/Button';
import { PdsPrintPreview } from './PdsPrintPreview';
import { Section1Personal } from './sections/Section1Personal';
import { Section2Family } from './sections/Section2Family';
import { Section3Education } from './sections/Section3Education';
import { Section4Eligibility } from './sections/Section4Eligibility';
import { Section5WorkExperience } from './sections/Section5WorkExperience';
import { Section6Training } from './sections/Section6Training';
import { Section7Voluntary } from './sections/Section7Voluntary';
import { Section8OtherInfo } from './sections/Section8OtherInfo';
import { Section9Questions } from './sections/Section9Questions';
import { Section10References } from './sections/Section10References';
import { Section11Declaration } from './sections/Section11Declaration';
import {
  Printer,
  Save,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Copy,
  ArrowLeft,
  User,
  Users,
  GraduationCap,
  Award,
  Briefcase,
  BookOpen,
  HeartHandshake,
  Sparkles,
  HelpCircle,
  UserCheck,
  ShieldCheck,
  Edit3
} from 'lucide-react';
import { exportSingleRecord, triggerDownload } from '../../utils/exportImport';

interface PdsFormEditorProps {
  initialRecord: PdsRecord;
  onBackToDashboard: () => void;
  onDuplicateForm?: (record: PdsRecord) => void;
}

const SECTIONS = [
  { id: 1, name: 'Personal Info', label: 'I. Personal Info', icon: <User className="w-4 h-4" /> },
  { id: 2, name: 'Family', label: 'II. Family', icon: <Users className="w-4 h-4" /> },
  { id: 3, name: 'Education', label: 'III. Education', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 4, name: 'Eligibility', label: 'IV. Eligibility', icon: <Award className="w-4 h-4" /> },
  { id: 5, name: 'Work Exp', label: 'V. Work Experience', icon: <Briefcase className="w-4 h-4" /> },
  { id: 6, name: 'L&D / Training', label: 'VI. L&D / Training', icon: <BookOpen className="w-4 h-4" /> },
  { id: 7, name: 'Voluntary', label: 'VII. Voluntary Work', icon: <HeartHandshake className="w-4 h-4" /> },
  { id: 8, name: 'Other Info', label: 'VIII. Other Info', icon: <Sparkles className="w-4 h-4" /> },
  { id: 9, name: 'Questions', label: 'IX. Questions', icon: <HelpCircle className="w-4 h-4" /> },
  { id: 10, name: 'References', label: 'X. References', icon: <UserCheck className="w-4 h-4" /> },
  { id: 11, name: 'Declaration', label: 'XI. Declaration', icon: <ShieldCheck className="w-4 h-4" /> },
];

export const PdsFormEditor: React.FC<PdsFormEditorProps> = ({
  initialRecord,
  onBackToDashboard,
  onDuplicateForm,
}) => {
  const [record, setRecord] = useState<PdsRecord>(initialRecord);
  const [activeSection, setActiveSection] = useState(1);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'idle'>('saved');
  const [lastSavedTime, setLastSavedTime] = useState<string>('Just now');
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced Autosave to IndexedDB
  const handleRecordChange = (updated: PdsRecord) => {
    setRecord(updated);
    setSaveStatus('saving');

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        const now = new Date().toISOString();
        const recordToSave = {
          ...updated,
          meta: {
            ...updated.meta,
            updatedAt: now,
          },
        };

        if (recordToSave.id) {
          await db.pdsRecords.put(recordToSave);
        } else {
          const newId = await db.pdsRecords.add(recordToSave);
          recordToSave.id = newId;
          setRecord(recordToSave);
        }

        setSaveStatus('saved');
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setLastSavedTime(timeStr);
      } catch (err) {
        console.error('Failed to autosave record to IndexedDB', err);
        setSaveStatus('idle');
      }
    }, 600);
  };

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, []);

  // Calculate Form Completion Percentage
  const calculateProgress = (): number => {
    let score = 0;
    let total = 11;

    if (record.personalInfo.surname && record.personalInfo.firstName && record.personalInfo.dateOfBirth) score++;
    if (record.familyBackground.father.surname || record.familyBackground.mother.surname) score++;
    if (record.education.elementary.nameOfSchool || record.education.secondary.nameOfSchool || record.education.college[0]?.nameOfSchool) score++;
    if (record.eligibility.length > 0 && record.eligibility[0]?.careerServiceRA1080OrSpecialLaw) score++;
    if (record.workExperience.length > 0 && record.workExperience[0]?.positionTitle) score++;
    if (record.trainings.length > 0 && record.trainings[0]?.title) score++;
    if (record.voluntaryWork.length > 0 && record.voluntaryWork[0]?.organizationNameAddress) score++;
    if (record.otherInfo.specialSkillsHobbies.some(Boolean)) score++;
    // Questions: check if answered
    const qAnswered = Object.values(record.backgroundQuestions).every((q) => q.answer !== null);
    if (qAnswered) score++;
    if (record.references.length >= 3 && record.references[0]?.name) score++;
    if (record.declaration.acknowledgedTerms) score++;

    return Math.round((score / total) * 100);
  };

  const progress = calculateProgress();

  const handleExportJson = () => {
    const { fileName, blob } = exportSingleRecord(record);
    triggerDownload(fileName, blob);
  };

  const handleNextSection = () => {
    if (activeSection < SECTIONS.length) {
      setActiveSection((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevSection = () => {
    if (activeSection > 1) {
      setActiveSection((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header Controls */}
      <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl p-4 sm:p-5 shadow-sm transition-colors">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Back & Title */}
          <div className="flex items-start gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={<ArrowLeft className="w-4 h-4" />}
              onClick={onBackToDashboard}
              title="Return to Dashboard"
            >
              Dashboard
            </Button>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                {isEditingTitle ? (
                  <input
                    type="text"
                    autoFocus
                    value={record.meta.title || ''}
                    onChange={(e) =>
                      handleRecordChange({
                        ...record,
                        meta: { ...record.meta, title: e.target.value },
                      })
                    }
                    onBlur={() => setIsEditingTitle(false)}
                    onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                    className="text-base font-bold text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 rounded px-2 py-0.5 border border-teal-500 focus:outline-none"
                  />
                ) : (
                  <div
                    onClick={() => setIsEditingTitle(true)}
                    className="flex items-center gap-1.5 cursor-pointer group"
                    title="Click to rename form title"
                  >
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {record.meta.title || 'Personal Data Sheet (CS Form 212)'}
                    </h2>
                    <Edit3 className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}

                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                  {record.meta.formVersion}
                </span>
              </div>

              {/* Autosave Status Indicator */}
              <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 dark:text-slate-400">
                {saveStatus === 'saving' ? (
                  <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                    <Save className="w-3.5 h-3.5 animate-pulse" /> Autosaving to IndexedDB...
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Saved locally ({lastSavedTime})
                  </span>
                )}
                <span>•</span>
                <span>{record.personalInfo.surname ? `${record.personalInfo.surname}, ${record.personalInfo.firstName}` : 'Draft'}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {onDuplicateForm && (
              <Button
                variant="outline"
                size="sm"
                icon={<Copy className="w-4 h-4" />}
                onClick={() => onDuplicateForm(record)}
              >
                Duplicate
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              icon={<Download className="w-4 h-4" />}
              onClick={handleExportJson}
            >
              Export JSON
            </Button>

            <Button
              variant="primary"
              size="sm"
              icon={<Printer className="w-4 h-4" />}
              onClick={() => setShowPrintModal(true)}
            >
              Print / PDF
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 pt-3 border-t border-border-light dark:border-border-dark">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Form Completion: {progress}%
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              Section {activeSection} of {SECTIONS.length}
            </span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Form Work Area: Section Tabs + Active Section Form */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Sidebar: Section Navigation */}
        <div className="lg:col-span-1 space-y-1">
          <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl p-2.5 shadow-sm sticky top-20 transition-colors">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-3 py-2">
              Form Sections
            </p>
            <div className="space-y-0.5">
              {SECTIONS.map((sec) => {
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setActiveSection(sec.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left ${
                      isActive
                        ? 'bg-teal-600 text-white font-semibold shadow-sm'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className={isActive ? 'text-white' : 'text-slate-400'}>{sec.icon}</span>
                      <span className="truncate">{sec.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Area: Form Section Content */}
        <div className="lg:col-span-3">
          <div className="bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl p-5 sm:p-7 shadow-sm transition-colors">
            {activeSection === 1 && (
              <Section1Personal
                data={record.personalInfo}
                onChange={(personalInfo) => handleRecordChange({ ...record, personalInfo })}
              />
            )}
            {activeSection === 2 && (
              <Section2Family
                data={record.familyBackground}
                onChange={(familyBackground) => handleRecordChange({ ...record, familyBackground })}
              />
            )}
            {activeSection === 3 && (
              <Section3Education
                data={record.education}
                onChange={(education) => handleRecordChange({ ...record, education })}
              />
            )}
            {activeSection === 4 && (
              <Section4Eligibility
                data={record.eligibility}
                onChange={(eligibility) => handleRecordChange({ ...record, eligibility })}
              />
            )}
            {activeSection === 5 && (
              <Section5WorkExperience
                data={record.workExperience}
                onChange={(workExperience) => handleRecordChange({ ...record, workExperience })}
              />
            )}
            {activeSection === 6 && (
              <Section6Training
                data={record.trainings}
                onChange={(trainings) => handleRecordChange({ ...record, trainings })}
              />
            )}
            {activeSection === 7 && (
              <Section7Voluntary
                data={record.voluntaryWork}
                onChange={(voluntaryWork) => handleRecordChange({ ...record, voluntaryWork })}
              />
            )}
            {activeSection === 8 && (
              <Section8OtherInfo
                data={record.otherInfo}
                onChange={(otherInfo) => handleRecordChange({ ...record, otherInfo })}
              />
            )}
            {activeSection === 9 && (
              <Section9Questions
                data={record.backgroundQuestions}
                onChange={(backgroundQuestions) => handleRecordChange({ ...record, backgroundQuestions })}
              />
            )}
            {activeSection === 10 && (
              <Section10References
                data={record.references}
                onChange={(references) => handleRecordChange({ ...record, references })}
              />
            )}
            {activeSection === 11 && (
              <Section11Declaration
                data={record.declaration}
                onChange={(declaration) => handleRecordChange({ ...record, declaration })}
              />
            )}

            {/* Bottom Wizard Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 mt-8 border-t border-border-light dark:border-border-dark">
              {activeSection > 1 ? (
                <Button
                  variant="outline"
                  size="md"
                  icon={<ChevronLeft className="w-4 h-4" />}
                  onClick={handlePrevSection}
                >
                  Previous Section
                </Button>
              ) : (
                <div />
              )}

              {activeSection < SECTIONS.length ? (
                <Button
                  variant="primary"
                  size="md"
                  icon={<ChevronRight className="w-4 h-4" />}
                  iconPosition="right"
                  onClick={handleNextSection}
                >
                  Next Section
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  icon={<Printer className="w-4 h-4" />}
                  onClick={() => setShowPrintModal(true)}
                >
                  Preview & Print Official PDS
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Official Print Preview Modal */}
      {showPrintModal && (
        <PdsPrintPreview record={record} onClose={() => setShowPrintModal(false)} />
      )}
    </div>
  );
};
