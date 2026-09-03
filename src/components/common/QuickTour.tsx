import React, { useState, useEffect } from 'react';
import { ShieldCheck, HardDrive, Download, Smartphone, CheckCircle, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { Button } from './Button';
import { db } from '../../db/db';

interface TourStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  tip?: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: 'Welcome to GovFormsPH',
    description: 'GovFormsPH is an offline-first, 100% private government form filler designed for Philippine public servants. It starts with the Personal Data Sheet (CS Form No. 212 Revised 2026).',
    icon: <ShieldCheck className="w-8 h-8 text-teal-600 dark:text-teal-400" />,
    tip: 'No backend servers, no cloud tracking, zero accounts needed.',
  },
  {
    title: '100% Local Storage (IndexedDB)',
    description: 'Every keystroke and draft is stored directly in your browser’s IndexedDB database via Dexie.js. Your personal information never leaves this device unless you choose to export it.',
    icon: <HardDrive className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
    tip: 'Your drafts are automatically saved in real-time as you type.',
  },
  {
    title: 'Backup, Export & Import',
    description: 'Because there is no cloud server, the Export & Import page is how you backup your data or move your forms between computers or phones. You can even encrypt your backups with a password.',
    icon: <Download className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
    tip: 'We recommend creating a backup at least once every 30 days.',
  },
  {
    title: 'Install as an Offline App',
    description: 'GovFormsPH is a Progressive Web App (PWA). You can install it to your home screen or desktop. Once installed, it works completely without internet access.',
    icon: <Smartphone className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
    tip: 'Installed PWAs have higher storage priority against automatic browser cleanup.',
  },
  {
    title: 'Official CS Form 212 Output',
    description: 'Fill each section with smart validation, then generate and print the authentic 4-page CS Form No. 212 (Revised 2026) layout ready for CSC submission.',
    icon: <CheckCircle className="w-8 h-8 text-teal-600 dark:text-teal-400" />,
    tip: 'You can preview and print directly to PDF anytime.',
  },
];

interface QuickTourProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

export const QuickTour: React.FC<QuickTourProps> = ({ forceOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (forceOpen) {
      setCurrentStep(0);
      setIsOpen(true);
      return;
    }

    // Check if user has seen tour
    const localTourSeen = localStorage.getItem('GovFormsPH_tour_seen');
    if (!localTourSeen) {
      db.settings.toCollection().first().then((settings) => {
        if (!settings?.hasSeenTour) {
          setIsOpen(true);
        }
      });
    }
  }, [forceOpen]);

  const handleFinish = async () => {
    setIsOpen(false);
    localStorage.setItem('GovFormsPH_tour_seen', 'true');
    const settings = await db.settings.toCollection().first();
    if (settings && settings.id) {
      await db.settings.update(settings.id, { hasSeenTour: true });
    }
    if (onClose) onClose();
  };

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  if (!isOpen) return null;

  const step = TOUR_STEPS[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
        {/* Header with progress & close */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1.5">
            {TOUR_STEPS.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep
                    ? 'w-7 bg-teal-600 dark:bg-teal-400'
                    : idx < currentStep
                    ? 'w-2 bg-teal-300 dark:bg-teal-700'
                    : 'w-2 bg-slate-200 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
          <button
            onClick={handleFinish}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Skip tour"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Content */}
        <div className="flex flex-col items-center text-center">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-4 shadow-sm">
            {step.icon}
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            {step.title}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            {step.description}
          </p>

          {step.tip && (
            <div className="w-full bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200/70 dark:border-teal-800/40 rounded-xl p-3 text-xs text-teal-800 dark:text-teal-300 text-left mb-6 flex items-start gap-2">
              
              <span>{step.tip}</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleFinish}
            className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium cursor-pointer"
          >
            Skip Tour
          </button>

          <div className="flex items-center gap-2">
            {currentStep > 0 && (
              <Button
                variant="outline"
                size="sm"
                icon={<ChevronLeft className="w-4 h-4" />}
                onClick={handlePrev}
              >
                Back
              </Button>
            )}
            <Button
              variant="primary"
              size="sm"
              icon={currentStep === TOUR_STEPS.length - 1 ? undefined : <ChevronRight className="w-4 h-4" />}
              iconPosition="right"
              onClick={handleNext}
            >
              {currentStep === TOUR_STEPS.length - 1 ? 'Get Started' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
