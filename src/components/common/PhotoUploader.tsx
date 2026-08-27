import React, { useRef, useState } from 'react';
import { Upload, Trash2, Camera } from 'lucide-react';
import { Button } from './Button';

interface PhotoUploaderProps {
  label?: string;
  photoUrl: string | null;
  onChange: (dataUrl: string | null) => void;
  aspectRatio?: 'passport' | 'square';
  description?: string;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  label = 'ID Photo',
  photoUrl,
  onChange,
  aspectRatio = 'passport',
  description = 'Passport size (4.5 cm x 3.5 cm) with white background',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, WebP)');
      return;
    }
    // Resize image using browser canvas to keep storage light and fast
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          onChange(compressedDataUrl);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full">
      {label && <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">{label}</p>}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors overflow-hidden bg-slate-50 dark:bg-slate-900 ${
            aspectRatio === 'passport' ? 'w-36 h-44' : 'w-36 h-36'
          } ${
            dragActive
              ? 'border-teal-500 bg-teal-50/20'
              : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Uploaded ID Photo"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center p-3 text-center">
              <Camera className="w-8 h-8 text-slate-400 mb-2" />
              <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400">
                Click or Drop photo
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1">3.5 x 4.5 cm</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 text-center sm:text-left">
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs">{description}</p>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <Button
              type="button"
              variant="outline"
              size="sm"
              icon={<Upload className="w-3.5 h-3.5" />}
              onClick={() => fileInputRef.current?.click()}
            >
              {photoUrl ? 'Change Photo' : 'Upload Photo'}
            </Button>
            {photoUrl && (
              <Button
                type="button"
                variant="danger"
                size="sm"
                icon={<Trash2 className="w-3.5 h-3.5" />}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(null);
                }}
              >
                Remove
              </Button>
            )}
          </div>
          <p className="text-[10px] text-slate-400 dark:text-slate-500">
            Stored locally in IndexedDB. Never uploaded.
          </p>
        </div>
      </div>
    </div>
  );
};
