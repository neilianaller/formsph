import React from 'react';
import { RefreshCw, X, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

interface UpdateBannerProps {
  show: boolean;
  onUpdate: () => void;
  onDismiss: () => void;
}

export const UpdateBanner: React.FC<UpdateBannerProps> = ({ show, onUpdate, onDismiss }) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full bg-slate-900 dark:bg-slate-800 text-white rounded-2xl p-4 shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-5 duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="p-2 rounded-lg bg-teal-500/20 text-teal-400 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Update Available</h4>
            <p className="text-xs text-slate-300 mt-0.5">
              A new version of GovFormsPH is ready with improvements. Refresh to update.
            </p>
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-white p-1 rounded-md cursor-pointer"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onDismiss} className="text-slate-300 hover:text-white">
          Later
        </Button>
        <Button
          variant="primary"
          size="sm"
          icon={<RefreshCw className="w-3.5 h-3.5" />}
          onClick={onUpdate}
        >
          Refresh & Update
        </Button>
      </div>
    </div>
  );
};
