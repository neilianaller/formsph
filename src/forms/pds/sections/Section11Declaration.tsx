import React from "react";
import { DeclarationSignatories } from "../../../types/pds";
import { DateInput } from "../../../components/common/DateInput";
import { PhotoUploader } from "../../../components/common/PhotoUploader";
import { SignaturePad } from "../../../components/common/SignaturePad";
import { ShieldCheck } from "lucide-react";

interface Section11DeclarationProps {
  data: DeclarationSignatories;
  onChange: (updated: DeclarationSignatories) => void;
}

export const Section11Declaration: React.FC<Section11DeclarationProps> = ({
  data,
  onChange,
}) => {
  const updateField = <K extends keyof DeclarationSignatories>(
    field: K,
    val: DeclarationSignatories[K],
  ) => {
    onChange({ ...data, [field]: val });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border-light dark:border-border-dark pb-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs flex items-center justify-center font-bold">
            XI
          </span>
          Declaration & Signatures (Item 42)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Attach photo, sign, and affirm that the answers given are true and
          correct.
        </p>
      </div>

      {/* Official CSC Declaration text */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-slate-100">
          <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>DECLARATION & OATH</span>
        </div>
        <p>
          I declare under oath that I have personally accomplished this Personal
          Data Sheet which is a true, correct and complete statement pursuant to
          the provisions of pertinent laws, rules and regulations of the
          Republic of the Philippines. I authorize the agency head/authorized
          representative to verify/validate the contents stated herein. I agree
          that any misrepresentation made in this document and its attachments
          shall cause the filing of administrative/criminal case/s against me.
        </p>
        <label className="flex items-center gap-2 pt-2 text-xs font-semibold text-teal-800 dark:text-teal-300 cursor-pointer">
          <input
            type="checkbox"
            checked={data.acknowledgedTerms || false}
            onChange={(e) => updateField("acknowledgedTerms", e.target.checked)}
            className="rounded text-teal-600 focus:ring-teal-500"
          />
          <span>I acknowledge and affirm the declaration above.</span>
        </label>
      </div>

      {/* Government Issued ID */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
        <h4 className="text-xs font-bold  tracking-wider text-slate-700 dark:text-slate-300">
          Government Issued ID (Passport, GSIS, SSS, PRC, Driver's License,
          PhilSys ID)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
              Government Issued ID
            </label>
            <input
              type="text"
              value={data.governmentIssuedId}
              onChange={(e) =>
                updateField("governmentIssuedId", e.target.value)
              }
              placeholder="e.g. PASSPORT / PRC ID / UMID"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 "
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
              ID / License / Passport No.
            </label>
            <input
              type="text"
              value={data.idLicensePassportNo}
              onChange={(e) =>
                updateField("idLicensePassportNo", e.target.value)
              }
              placeholder="e.g. P1234567A"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 "
            />
          </div>

          <div>
            <DateInput
              label="Date of Issuance"
              value={data.dateOfIssuance}
              onChange={(val) => updateField("dateOfIssuance", val)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Place of Issuance
            </label>
            <input
              type="text"
              value={data.placeOfIssuance}
              onChange={(e) => updateField("placeOfIssuance", e.target.value)}
              placeholder="e.g. DFA Manila"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>
        </div>
      </div>

      {/* Date Accomplished */}
      <div className="w-full sm:w-64">
        <DateInput
          label="Date Accomplished"
          value={data.dateAccomplished}
          onChange={(val) => updateField("dateAccomplished", val)}
          helpText="Date form was completed"
        />
      </div>

      {/* Attachments: Passport Photo, Signature, Right Thumbmark */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* Photo Uploader */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
          <PhotoUploader
            label="ID Photo (Passport Size)"
            photoUrl={data.idPhoto}
            onChange={(val) => updateField("idPhoto", val)}
            description="Passport size (4.5 cm x 3.5 cm) with white background taken within last 6 months"
          />
        </div>

        {/* Signature Pad */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
          <SignaturePad
            label="Signature (Sign Here)"
            value={data.signature}
            onChange={(val) => updateField("signature", val)}
            height={130}
            description="Draw your signature or upload an image"
          />
        </div>
      </div>
    </div>
  );
};
