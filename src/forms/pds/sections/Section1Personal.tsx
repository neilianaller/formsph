import React from 'react';
import { PersonalInfo } from '../../../types/pds';
import { DateInput } from '../../../components/common/DateInput';

interface Section1PersonalProps {
  data: PersonalInfo;
  onChange: (updated: PersonalInfo) => void;
}

export const Section1Personal: React.FC<Section1PersonalProps> = ({ data, onChange }) => {
  const updateField = <K extends keyof PersonalInfo>(field: K, val: PersonalInfo[K]) => {
    onChange({ ...data, [field]: val });
  };

  const updateResidentialAddress = (field: keyof PersonalInfo['residentialAddress'], val: string) => {
    const updatedRes = { ...data.residentialAddress, [field]: val };
    const updatedData = { ...data, residentialAddress: updatedRes };
    if (data.sameAsResidentialAddress) {
      updatedData.permanentAddress = { ...updatedRes };
    }
    onChange(updatedData);
  };

  const updatePermanentAddress = (field: keyof PersonalInfo['permanentAddress'], val: string) => {
    onChange({
      ...data,
      permanentAddress: { ...data.permanentAddress, [field]: val },
    });
  };

  const toggleSameAddress = (checked: boolean) => {
    onChange({
      ...data,
      sameAsResidentialAddress: checked,
      permanentAddress: checked ? { ...data.residentialAddress } : data.permanentAddress,
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border-light dark:border-border-dark pb-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs flex items-center justify-center font-bold">
            I
          </span>
          Personal Information (Items 1 – 21)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          CS Form No. 212 (Revised 2026) verified schema. All fields stay locally in your browser.
        </p>
      </div>

      {/* Name Fields (Items 1-4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            1. Surname <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={data.surname}
            onChange={(e) => updateField('surname', e.target.value)}
            placeholder="e.g. DELA CRUZ"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 "
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            2. First Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => updateField('firstName', e.target.value)}
            placeholder="e.g. JUAN"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 "
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            3. Middle Name
          </label>
          <input
            type="text"
            value={data.middleName}
            onChange={(e) => updateField('middleName', e.target.value)}
            placeholder="e.g. SANTOS (or N/A)"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 "
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            4. Name Extension
          </label>
          <input
            type="text"
            value={data.nameExtension}
            onChange={(e) => updateField('nameExtension', e.target.value)}
            placeholder="e.g. JR., SR., III (or NONE)"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 "
          />
        </div>
      </div>

      {/* Date of Birth, Place of Birth, Sex at Birth, Civil Status (Items 5-8) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <DateInput
            label="5. Date of Birth"
            required
            value={data.dateOfBirth}
            onChange={(val) => updateField('dateOfBirth', val)}
            helpText="Standard CSC format: DD/MM/YYYY"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            6. Place of Birth <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={data.placeOfBirth}
            onChange={(e) => updateField('placeOfBirth', e.target.value)}
            placeholder="e.g. Quezon City, Metro Manila"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            7. Sex at Birth <span className="text-rose-500">*</span>
          </label>
          <select
            value={data.sexAtBirth}
            onChange={(e) => updateField('sexAtBirth', e.target.value as any)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 cursor-pointer"
          >
            <option value="">Select Sex</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            8. Civil Status <span className="text-rose-500">*</span>
          </label>
          <select
            value={data.civilStatus}
            onChange={(e) => updateField('civilStatus', e.target.value as any)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 cursor-pointer"
          >
            <option value="">Select Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Widow/er">Widow/er</option>
            <option value="Separated">Separated</option>
            <option value="Solo Parent">Solo Parent</option>
            <option value="Others">Others</option>
          </select>
          {data.civilStatus === 'Others' && (
            <input
              type="text"
              value={data.civilStatusOthersSpecify}
              onChange={(e) => updateField('civilStatusOthersSpecify', e.target.value)}
              placeholder="Please specify civil status"
              className="w-full mt-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          )}
        </div>
      </div>

      {/* Height, Weight, Blood Type (Items 9-11) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            9. Height (m)
          </label>
          <input
            type="text"
            value={data.height}
            onChange={(e) => updateField('height', e.target.value)}
            placeholder="e.g. 1.70"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            10. Weight (kg)
          </label>
          <input
            type="text"
            value={data.weight}
            onChange={(e) => updateField('weight', e.target.value)}
            placeholder="e.g. 68"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            11. Blood Type
          </label>
          <input
            type="text"
            value={data.bloodType}
            onChange={(e) => updateField('bloodType', e.target.value.toUpperCase())}
            placeholder="e.g. O+, A+, B+, AB-"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50 "
          />
        </div>
      </div>

      {/* Official Gov IDs (Items 10-15 Revised 2026 schema: UMID, Pag-IBIG, PhilHealth, PhilSys PCN, TIN, Agency No) */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
        <h4 className="text-xs font-bold  tracking-wider text-slate-700 dark:text-slate-300 mb-3">
          Government Identification Numbers (2026 Revision)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              10. UMID ID No.
            </label>
            <input
              type="text"
              value={data.umidIdNo}
              onChange={(e) => updateField('umidIdNo', e.target.value)}
              placeholder="e.g. 0000-0000000-0"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              11. Pag-IBIG ID No.
            </label>
            <input
              type="text"
              value={data.pagIbigIdNo}
              onChange={(e) => updateField('pagIbigIdNo', e.target.value)}
              placeholder="e.g. 1210-0000-0000"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              12. PhilHealth No.
            </label>
            <input
              type="text"
              value={data.philhealthNo}
              onChange={(e) => updateField('philhealthNo', e.target.value)}
              placeholder="e.g. 00-000000000-0"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              13. PhilSys Card Number (PCN)
            </label>
            <input
              type="text"
              value={data.philSysCardNumber}
              onChange={(e) => updateField('philSysCardNumber', e.target.value)}
              placeholder="e.g. 1234-5678-9012-3456"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              14. TIN No.
            </label>
            <input
              type="text"
              value={data.tinNo}
              onChange={(e) => updateField('tinNo', e.target.value)}
              placeholder="e.g. 000-000-000-000"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              15. Agency Employee No.
            </label>
            <input
              type="text"
              value={data.agencyEmployeeNo}
              onChange={(e) => updateField('agencyEmployeeNo', e.target.value)}
              placeholder="e.g. EMP-2026-001"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>
        </div>
      </div>

      {/* Citizenship (Item 16) */}
      <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
        <label className="block text-xs font-bold  tracking-wider text-slate-700 dark:text-slate-300 mb-2">
          16. Citizenship
        </label>
        <div className="flex flex-wrap items-center gap-6 mb-3">
          <label className="flex items-center gap-2 text-sm text-slate-800 dark:text-slate-200 cursor-pointer">
            <input
              type="radio"
              name="citizenship"
              checked={data.citizenship === 'Filipino'}
              onChange={() => onChange({ ...data, citizenship: 'Filipino', dualCitizenshipMode: '', dualCitizenshipCountry: '' })}
              className="text-teal-600 focus:ring-teal-500"
            />
            <span>Filipino</span>
          </label>

          <label className="flex items-center gap-2 text-sm text-slate-800 dark:text-slate-200 cursor-pointer">
            <input
              type="radio"
              name="citizenship"
              checked={data.citizenship === 'Dual Citizenship'}
              onChange={() => onChange({ ...data, citizenship: 'Dual Citizenship' })}
              className="text-teal-600 focus:ring-teal-500"
            />
            <span>Dual Citizenship</span>
          </label>
        </div>

        {data.citizenship === 'Dual Citizenship' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Dual Citizenship Mode
              </label>
              <select
                value={data.dualCitizenshipMode}
                onChange={(e) => updateField('dualCitizenshipMode', e.target.value as any)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              >
                <option value="">Select Mode</option>
                <option value="by birth">By Birth</option>
                <option value="by naturalization">By Naturalization</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Country
              </label>
              <input
                type="text"
                value={data.dualCitizenshipCountry}
                onChange={(e) => updateField('dualCitizenshipCountry', e.target.value)}
                placeholder="e.g. United States, Canada"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
            </div>
          </div>
        )}
      </div>

      {/* Residential Address (Item 17) */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold  tracking-wider text-slate-700 dark:text-slate-300">
          17. Residential Address
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">House/Block/Lot No.</label>
            <input
              type="text"
              value={data.residentialAddress.houseBlockLot}
              onChange={(e) => updateResidentialAddress('houseBlockLot', e.target.value)}
              placeholder="e.g. Lot 4 Block 2"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>
          <div>
            <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">Street</label>
            <input
              type="text"
              value={data.residentialAddress.street}
              onChange={(e) => updateResidentialAddress('street', e.target.value)}
              placeholder="e.g. Rizal Avenue"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>
          <div>
            <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">Subdivision/Village</label>
            <input
              type="text"
              value={data.residentialAddress.subdivisionVillage}
              onChange={(e) => updateResidentialAddress('subdivisionVillage', e.target.value)}
              placeholder="e.g. Green Meadows"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>
          <div>
            <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">Barangay</label>
            <input
              type="text"
              value={data.residentialAddress.barangay}
              onChange={(e) => updateResidentialAddress('barangay', e.target.value)}
              placeholder="e.g. Brgy. San Antonio"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>
          <div>
            <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">City / Municipality</label>
            <input
              type="text"
              value={data.residentialAddress.cityMunicipality}
              onChange={(e) => updateResidentialAddress('cityMunicipality', e.target.value)}
              placeholder="e.g. Pasig City"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">Province</label>
              <input
                type="text"
                value={data.residentialAddress.province}
                onChange={(e) => updateResidentialAddress('province', e.target.value)}
                placeholder="e.g. Metro Manila"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">ZIP Code</label>
              <input
                type="text"
                value={data.residentialAddress.zipCode}
                onChange={(e) => updateResidentialAddress('zipCode', e.target.value)}
                placeholder="e.g. 1600"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Permanent Address (Item 18) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold  tracking-wider text-slate-700 dark:text-slate-300">
            18. Permanent Address
          </h4>
          <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={data.sameAsResidentialAddress || false}
              onChange={(e) => toggleSameAddress(e.target.checked)}
              className="rounded text-teal-600 focus:ring-teal-500"
            />
            <span>Same as Residential Address</span>
          </label>
        </div>

        {!data.sameAsResidentialAddress && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">House/Block/Lot No.</label>
              <input
                type="text"
                value={data.permanentAddress.houseBlockLot}
                onChange={(e) => updatePermanentAddress('houseBlockLot', e.target.value)}
                placeholder="e.g. Lot 4 Block 2"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">Street</label>
              <input
                type="text"
                value={data.permanentAddress.street}
                onChange={(e) => updatePermanentAddress('street', e.target.value)}
                placeholder="e.g. Rizal Avenue"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">Subdivision/Village</label>
              <input
                type="text"
                value={data.permanentAddress.subdivisionVillage}
                onChange={(e) => updatePermanentAddress('subdivisionVillage', e.target.value)}
                placeholder="e.g. Green Meadows"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">Barangay</label>
              <input
                type="text"
                value={data.permanentAddress.barangay}
                onChange={(e) => updatePermanentAddress('barangay', e.target.value)}
                placeholder="e.g. Brgy. San Antonio"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
            </div>
            <div>
              <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">City / Municipality</label>
              <input
                type="text"
                value={data.permanentAddress.cityMunicipality}
                onChange={(e) => updatePermanentAddress('cityMunicipality', e.target.value)}
                placeholder="e.g. Pasig City"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">Province</label>
                <input
                  type="text"
                  value={data.permanentAddress.province}
                  onChange={(e) => updatePermanentAddress('province', e.target.value)}
                  placeholder="e.g. Metro Manila"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-600 dark:text-slate-400 mb-0.5">ZIP Code</label>
                <input
                  type="text"
                  value={data.permanentAddress.zipCode}
                  onChange={(e) => updatePermanentAddress('zipCode', e.target.value)}
                  placeholder="e.g. 1600"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Info (Items 19-21) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            19. Telephone No.
          </label>
          <input
            type="text"
            value={data.telephoneNo}
            onChange={(e) => updateField('telephoneNo', e.target.value)}
            placeholder="e.g. (02) 8123-4567"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            20. Mobile No. <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            value={data.mobileNo}
            onChange={(e) => updateField('mobileNo', e.target.value)}
            placeholder="e.g. 09171234567"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            21. Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            value={data.emailAddress}
            onChange={(e) => updateField('emailAddress', e.target.value)}
            placeholder="e.g. juan.delacruz@gov.ph"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
          />
        </div>
      </div>
    </div>
  );
};
