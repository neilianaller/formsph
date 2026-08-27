import React from 'react';
import { PdsRecord } from '../../types/pds';
import { Printer, X, Download } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { exportSingleRecord, triggerDownload } from '../../utils/exportImport';

interface PdsPrintPreviewProps {
  record: PdsRecord;
  onClose: () => void;
}

export const PdsPrintPreview: React.FC<PdsPrintPreviewProps> = ({ record, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleExportJson = () => {
    const { fileName, blob } = exportSingleRecord(record);
    triggerDownload(fileName, blob);
  };

  const p = record.personalInfo;
  const f = record.familyBackground;
  const e = record.education;
  const q = record.backgroundQuestions;
  const d = record.declaration;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm p-2 sm:p-6 print:p-0 print:bg-white">
      {/* Top Bar for Web View (hidden when printing) */}
      <div className="sticky top-0 z-20 max-w-5xl mx-auto bg-slate-900 text-white rounded-xl p-3 mb-4 shadow-xl flex items-center justify-between print:hidden border border-slate-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-teal-500 animate-pulse" />
          <span className="text-sm font-semibold">
            CS Form No. 212 (Revised 2026) — Print & PDF Preview
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<Download className="w-4 h-4" />}
            onClick={handleExportJson}
            className="text-white border-slate-600 hover:bg-slate-800"
          >
            Export JSON
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={<Printer className="w-4 h-4" />}
            onClick={handlePrint}
          >
            Print / Save to PDF
          </Button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Printable Sheet (4-Page Official Standard Structure) */}
      <div className="max-w-5xl mx-auto bg-white text-black p-6 sm:p-10 shadow-2xl rounded-xl print:shadow-none print:p-0 print:rounded-none font-sans text-[11px] leading-tight space-y-8">
        
        {/* ================= PAGE 1 ================= */}
        <div className="page-section space-y-3">
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-black pb-2">
            <div>
              <p className="italic font-serif text-[10px]">CS Form No. 212</p>
              <p className="font-bold text-[10px]">Revised 2026</p>
            </div>
            <div className="text-center">
              <h1 className="font-black text-lg tracking-wider uppercase">Personal Data Sheet</h1>
              <p className="text-[9px] italic text-slate-700 max-w-lg">
                WARNING: Any misrepresentation made in the Personal Data Sheet and the Work Experience Sheet shall cause the filing of administrative/criminal case/s against the person concerned.
              </p>
            </div>
            <div className="text-right">
              <p className="text-[9px]">1. CS ID No.</p>
              <div className="border border-black w-28 h-6 flex items-center justify-center text-[10px] font-mono">
                {record.meta.formVersion}
              </div>
            </div>
          </div>

          {/* Section I Header */}
          <div className="bg-slate-200 text-black font-bold px-2 py-1 uppercase text-xs border border-black">
            I. Personal Information
          </div>

          {/* Table: Personal Information */}
          <table className="w-full border-collapse border border-black text-left">
            <tbody>
              {/* Row 1: Surname */}
              <tr className="border-b border-black">
                <td className="w-1/4 bg-slate-100 p-1.5 font-bold border-r border-black">2. SURNAME</td>
                <td colSpan={3} className="p-1.5 font-bold uppercase">{p.surname || '—'}</td>
              </tr>
              {/* Row 2: First Name & Extension */}
              <tr className="border-b border-black">
                <td className="bg-slate-100 p-1.5 font-bold border-r border-black">FIRST NAME</td>
                <td className="p-1.5 font-bold uppercase border-r border-black">{p.firstName || '—'}</td>
                <td className="w-32 bg-slate-100 p-1.5 font-bold border-r border-black text-[10px]">NAME EXTENSION (JR., SR)</td>
                <td className="w-24 p-1.5 font-bold uppercase">{p.nameExtension || 'NONE'}</td>
              </tr>
              {/* Row 3: Middle Name */}
              <tr className="border-b border-black">
                <td className="bg-slate-100 p-1.5 font-bold border-r border-black">MIDDLE NAME</td>
                <td colSpan={3} className="p-1.5 font-bold uppercase">{p.middleName || 'N/A'}</td>
              </tr>
              {/* Row 4: DOB & Citizenship */}
              <tr className="border-b border-black">
                <td className="bg-slate-100 p-1.5 font-bold border-r border-black">3. DATE OF BIRTH (dd/mm/yyyy)</td>
                <td className="p-1.5 border-r border-black font-mono">{p.dateOfBirth || '—'}</td>
                <td className="bg-slate-100 p-1.5 font-bold border-r border-black">16. CITIZENSHIP</td>
                <td className="p-1.5">
                  {p.citizenship} {p.dualCitizenshipMode ? `(${p.dualCitizenshipMode})` : ''} {p.dualCitizenshipCountry ? `- ${p.dualCitizenshipCountry}` : ''}
                </td>
              </tr>
              {/* Row 5: Place of Birth */}
              <tr className="border-b border-black">
                <td className="bg-slate-100 p-1.5 font-bold border-r border-black">4. PLACE OF BIRTH</td>
                <td className="p-1.5 border-r border-black">{p.placeOfBirth || '—'}</td>
                <td rowSpan={3} className="bg-slate-100 p-1.5 font-bold border-r border-black align-top">
                  17. RESIDENTIAL ADDRESS
                </td>
                <td rowSpan={3} className="p-1.5 align-top">
                  {[
                    p.residentialAddress.houseBlockLot,
                    p.residentialAddress.street,
                    p.residentialAddress.subdivisionVillage,
                    p.residentialAddress.barangay,
                    p.residentialAddress.cityMunicipality,
                    p.residentialAddress.province,
                    p.residentialAddress.zipCode ? `ZIP: ${p.residentialAddress.zipCode}` : '',
                  ].filter(Boolean).join(', ') || '—'}
                </td>
              </tr>
              {/* Row 6: Sex at Birth & Civil Status */}
              <tr className="border-b border-black">
                <td className="bg-slate-100 p-1.5 font-bold border-r border-black">5. SEX AT BIRTH</td>
                <td className="p-1.5 border-r border-black">{p.sexAtBirth || '—'}</td>
              </tr>
              <tr className="border-b border-black">
                <td className="bg-slate-100 p-1.5 font-bold border-r border-black">6. CIVIL STATUS</td>
                <td className="p-1.5 border-r border-black">
                  {p.civilStatus} {p.civilStatusOthersSpecify ? `(${p.civilStatusOthersSpecify})` : ''}
                </td>
              </tr>
              {/* Row 7: Height, Weight, Blood Type */}
              <tr className="border-b border-black">
                <td className="bg-slate-100 p-1.5 font-bold border-r border-black">7. HEIGHT (m) / 8. WEIGHT (kg)</td>
                <td className="p-1.5 border-r border-black">{p.height || '—'} m / {p.weight || '—'} kg (Blood: {p.bloodType || '—'})</td>
                <td rowSpan={3} className="bg-slate-100 p-1.5 font-bold border-r border-black align-top">
                  18. PERMANENT ADDRESS
                </td>
                <td rowSpan={3} className="p-1.5 align-top">
                  {p.sameAsResidentialAddress
                    ? 'SAME AS RESIDENTIAL ADDRESS'
                    : [
                        p.permanentAddress.houseBlockLot,
                        p.permanentAddress.street,
                        p.permanentAddress.subdivisionVillage,
                        p.permanentAddress.barangay,
                        p.permanentAddress.cityMunicipality,
                        p.permanentAddress.province,
                        p.permanentAddress.zipCode ? `ZIP: ${p.permanentAddress.zipCode}` : '',
                      ].filter(Boolean).join(', ') || '—'}
                </td>
              </tr>
              {/* Row 8: UMID & Pag-IBIG */}
              <tr className="border-b border-black">
                <td className="bg-slate-100 p-1.5 font-bold border-r border-black">10. UMID ID NO.</td>
                <td className="p-1.5 border-r border-black font-mono">{p.umidIdNo || '—'}</td>
              </tr>
              <tr className="border-b border-black">
                <td className="bg-slate-100 p-1.5 font-bold border-r border-black">11. PAG-IBIG ID NO.</td>
                <td className="p-1.5 border-r border-black font-mono">{p.pagIbigIdNo || '—'}</td>
              </tr>
              {/* Row 9: PhilHealth & PhilSys PCN */}
              <tr className="border-b border-black">
                <td className="bg-slate-100 p-1.5 font-bold border-r border-black">12. PHILHEALTH NO.</td>
                <td className="p-1.5 border-r border-black font-mono">{p.philhealthNo || '—'}</td>
                <td className="bg-slate-100 p-1.5 font-bold border-r border-black">19. TELEPHONE NO.</td>
                <td className="p-1.5">{p.telephoneNo || '—'}</td>
              </tr>
              <tr className="border-b border-black">
                <td className="bg-slate-100 p-1.5 font-bold border-r border-black">13. PHILSYS CARD NO. (PCN)</td>
                <td className="p-1.5 border-r border-black font-mono">{p.philSysCardNumber || '—'}</td>
                <td className="bg-slate-100 p-1.5 font-bold border-r border-black">20. MOBILE NO.</td>
                <td className="p-1.5 font-mono">{p.mobileNo || '—'}</td>
              </tr>
              {/* Row 10: TIN & Agency No */}
              <tr className="border-b border-black">
                <td className="bg-slate-100 p-1.5 font-bold border-r border-black">14. TIN NO. / 15. AGENCY EMP NO.</td>
                <td className="p-1.5 border-r border-black font-mono">{p.tinNo || '—'} / {p.agencyEmployeeNo || '—'}</td>
                <td className="bg-slate-100 p-1.5 font-bold border-r border-black">21. E-MAIL ADDRESS</td>
                <td className="p-1.5 lowercase">{p.emailAddress || '—'}</td>
              </tr>
            </tbody>
          </table>

          {/* Section II: Family Background */}
          <div className="bg-slate-200 text-black font-bold px-2 py-1 uppercase text-xs border border-black mt-4">
            II. Family Background
          </div>

          <div className="grid grid-cols-2 border border-black">
            <div className="border-r border-black p-2 space-y-1">
              <p><strong>22. SPOUSE'S SURNAME:</strong> {f.spouse.surname || 'N/A'}</p>
              <p><strong>FIRST NAME:</strong> {f.spouse.firstName} {f.spouse.nameExtension}</p>
              <p><strong>MIDDLE NAME:</strong> {f.spouse.middleName}</p>
              <p><strong>OCCUPATION:</strong> {f.spouse.occupation || 'N/A'}</p>
              <p><strong>EMPLOYER / BUSINESS:</strong> {f.spouse.employerBusinessName || 'N/A'}</p>
              <p><strong>BUSINESS ADDRESS:</strong> {f.spouse.businessAddress || 'N/A'}</p>
              <p><strong>TEL NO:</strong> {f.spouse.telephoneNo || 'N/A'}</p>
              <hr className="my-1 border-black" />
              <p><strong>24. FATHER'S SURNAME:</strong> {f.father.surname || '—'}</p>
              <p><strong>FIRST / MIDDLE / EXT:</strong> {f.father.firstName} {f.father.middleName} {f.father.nameExtension}</p>
              <hr className="my-1 border-black" />
              <p><strong>25. MOTHER'S MAIDEN SURNAME:</strong> {f.mother.maidenSurname || f.mother.surname || '—'}</p>
              <p><strong>FIRST / MIDDLE:</strong> {f.mother.firstName} {f.mother.middleName}</p>
            </div>

            <div className="p-2">
              <p className="font-bold mb-1 border-b border-black pb-1">
                23. NAME of CHILDREN (Write full name and date of birth)
              </p>
              {f.children.length === 0 || !f.children[0]?.fullName ? (
                <p className="italic text-slate-500">N/A</p>
              ) : (
                <table className="w-full text-[10px]">
                  <tbody>
                    {f.children.map((c, idx) => (
                      <tr key={idx} className="border-b border-slate-200">
                        <td className="py-0.5">{c.fullName}</td>
                        <td className="py-0.5 text-right font-mono">{c.dateOfBirth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Section III: Educational Background */}
          <div className="bg-slate-200 text-black font-bold px-2 py-1 uppercase text-xs border border-black mt-4">
            III. Educational Background (Item 26) — Period of Attendance: Year Only (YYYY)
          </div>

          <table className="w-full border-collapse border border-black text-center text-[10px]">
            <thead>
              <tr className="bg-slate-100 border-b border-black">
                <th className="border-r border-black p-1">LEVEL</th>
                <th className="border-r border-black p-1">NAME OF SCHOOL</th>
                <th className="border-r border-black p-1">DEGREE / COURSE</th>
                <th className="border-r border-black p-1">ATTENDANCE (FROM - TO)</th>
                <th className="border-r border-black p-1">HIGHEST LEVEL / UNITS</th>
                <th className="border-r border-black p-1">YEAR GRAD</th>
                <th className="p-1">HONORS / SCHOLARSHIP</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-black">
                <td className="border-r border-black font-bold p-1 bg-slate-50">ELEMENTARY</td>
                <td className="border-r border-black p-1">{e.elementary.nameOfSchool || 'N/A'}</td>
                <td className="border-r border-black p-1">{e.elementary.degreeCourse || 'PRIMARY'}</td>
                <td className="border-r border-black p-1 font-mono">{e.elementary.periodFromYear} - {e.elementary.periodToYear}</td>
                <td className="border-r border-black p-1">{e.elementary.highestLevelUnitsEarned || 'GRADUATED'}</td>
                <td className="border-r border-black p-1 font-mono">{e.elementary.yearGraduated}</td>
                <td className="p-1">{e.elementary.scholarshipAcademicHonors || 'NONE'}</td>
              </tr>
              <tr className="border-b border-black">
                <td className="border-r border-black font-bold p-1 bg-slate-50">SECONDARY</td>
                <td className="border-r border-black p-1">{e.secondary.nameOfSchool || 'N/A'}</td>
                <td className="border-r border-black p-1">{e.secondary.degreeCourse || 'HIGH SCHOOL'}</td>
                <td className="border-r border-black p-1 font-mono">{e.secondary.periodFromYear} - {e.secondary.periodToYear}</td>
                <td className="border-r border-black p-1">{e.secondary.highestLevelUnitsEarned || 'GRADUATED'}</td>
                <td className="border-r border-black p-1 font-mono">{e.secondary.yearGraduated}</td>
                <td className="p-1">{e.secondary.scholarshipAcademicHonors || 'NONE'}</td>
              </tr>
              {e.college.map((c, i) => (
                <tr key={i} className="border-b border-black">
                  <td className="border-r border-black font-bold p-1 bg-slate-50">COLLEGE {e.college.length > 1 ? `#${i+1}` : ''}</td>
                  <td className="border-r border-black p-1">{c.nameOfSchool || 'N/A'}</td>
                  <td className="border-r border-black p-1">{c.degreeCourse || 'N/A'}</td>
                  <td className="border-r border-black p-1 font-mono">{c.periodFromYear} - {c.periodToYear}</td>
                  <td className="border-r border-black p-1">{c.highestLevelUnitsEarned || 'GRADUATED'}</td>
                  <td className="border-r border-black p-1 font-mono">{c.yearGraduated}</td>
                  <td className="p-1">{c.scholarshipAcademicHonors || 'NONE'}</td>
                </tr>
              ))}
              {e.graduateStudies.map((g, i) => (
                <tr key={i} className="border-b border-black">
                  <td className="border-r border-black font-bold p-1 bg-slate-50">GRADUATE STUDIES {e.graduateStudies.length > 1 ? `#${i+1}` : ''}</td>
                  <td className="border-r border-black p-1">{g.nameOfSchool || 'N/A'}</td>
                  <td className="border-r border-black p-1">{g.degreeCourse || 'N/A'}</td>
                  <td className="border-r border-black p-1 font-mono">{g.periodFromYear} - {g.periodToYear}</td>
                  <td className="border-r border-black p-1">{g.highestLevelUnitsEarned || 'UNITS'}</td>
                  <td className="border-r border-black p-1 font-mono">{g.yearGraduated}</td>
                  <td className="p-1">{g.scholarshipAcademicHonors || 'NONE'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between text-[9px] pt-1 text-slate-500">
            <span>CS FORM 212 (Revised 2026), Page 1 of 4</span>
            <span>Signatures on Page 4</span>
          </div>
        </div>

        {/* ================= PAGE 2 ================= */}
        <div className="page-section space-y-4 pt-6 border-t-2 border-black print:break-before-page">
          <div className="bg-slate-200 text-black font-bold px-2 py-1 uppercase text-xs border border-black">
            IV. Civil Service Eligibility (Item 27)
          </div>

          <table className="w-full border-collapse border border-black text-center text-[10px]">
            <thead>
              <tr className="bg-slate-100 border-b border-black">
                <th className="border-r border-black p-1 w-1/3">27. CAREER SERVICE / RA 1080 / SPECIAL LAW</th>
                <th className="border-r border-black p-1">RATING</th>
                <th className="border-r border-black p-1">EXAM DATE</th>
                <th className="border-r border-black p-1">EXAM PLACE</th>
                <th className="border-r border-black p-1">LICENSE NUMBER</th>
                <th className="p-1">VALIDITY DATE</th>
              </tr>
            </thead>
            <tbody>
              {record.eligibility.length === 0 || !record.eligibility[0]?.careerServiceRA1080OrSpecialLaw ? (
                <tr className="border-b border-black">
                  <td colSpan={6} className="p-2 italic text-slate-500">N/A</td>
                </tr>
              ) : (
                record.eligibility.map((el, idx) => (
                  <tr key={idx} className="border-b border-black">
                    <td className="border-r border-black p-1.5 text-left font-medium">{el.careerServiceRA1080OrSpecialLaw}</td>
                    <td className="border-r border-black p-1.5">{el.rating || 'N/A'}</td>
                    <td className="border-r border-black p-1.5 font-mono">{el.dateOfExamConferment}</td>
                    <td className="border-r border-black p-1.5">{el.placeOfExamConferment}</td>
                    <td className="border-r border-black p-1.5 font-mono">{el.licenseNumber || 'N/A'}</td>
                    <td className="p-1.5 font-mono">{el.licenseValidityDate || 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="bg-slate-200 text-black font-bold px-2 py-1 uppercase text-xs border border-black mt-4">
            V. Work Experience (Item 28)
          </div>

          <table className="w-full border-collapse border border-black text-center text-[10px]">
            <thead>
              <tr className="bg-slate-100 border-b border-black">
                <th className="border-r border-black p-1">INCLUSIVE DATES (FROM - TO)</th>
                <th className="border-r border-black p-1">POSITION TITLE</th>
                <th className="border-r border-black p-1">DEPARTMENT / AGENCY / OFFICE / COMPANY</th>
                <th className="border-r border-black p-1">MONTHLY SALARY</th>
                <th className="border-r border-black p-1">PAY GRADE / STEP</th>
                <th className="border-r border-black p-1">STATUS OF APPT</th>
                <th className="p-1">GOV'T SERVICE</th>
              </tr>
            </thead>
            <tbody>
              {record.workExperience.length === 0 || !record.workExperience[0]?.positionTitle ? (
                <tr className="border-b border-black">
                  <td colSpan={7} className="p-2 italic text-slate-500">N/A</td>
                </tr>
              ) : (
                record.workExperience.map((w, idx) => (
                  <tr key={idx} className="border-b border-black">
                    <td className="border-r border-black p-1.5 font-mono">{w.inclusiveDatesFrom} - {w.inclusiveDatesTo}</td>
                    <td className="border-r border-black p-1.5 text-left font-medium">{w.positionTitle}</td>
                    <td className="border-r border-black p-1.5 text-left">{w.departmentAgencyOfficeCompany}</td>
                    <td className="border-r border-black p-1.5">{w.monthlySalary ? `₱${w.monthlySalary}` : '—'}</td>
                    <td className="border-r border-black p-1.5 font-mono">{w.salaryJobPayGradeStepIncrement || '—'}</td>
                    <td className="border-r border-black p-1.5">{w.statusOfAppointment}</td>
                    <td className="p-1.5">{w.isGovernmentService ? 'Y' : 'N'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="flex justify-between text-[9px] pt-1 text-slate-500">
            <span>CS FORM 212 (Revised 2026), Page 2 of 4</span>
            <span>Signatures on Page 4</span>
          </div>
        </div>

        {/* ================= PAGE 3 ================= */}
        <div className="page-section space-y-4 pt-6 border-t-2 border-black print:break-before-page">
          <div className="bg-slate-200 text-black font-bold px-2 py-1 uppercase text-xs border border-black">
            VI. Learning and Development (L&D) Interventions / Training Programs (Item 29)
          </div>

          <table className="w-full border-collapse border border-black text-center text-[10px]">
            <thead>
              <tr className="bg-slate-100 border-b border-black">
                <th className="border-r border-black p-1 w-1/3">29. TITLE OF TRAINING PROGRAM</th>
                <th className="border-r border-black p-1">INCLUSIVE DATES (FROM - TO)</th>
                <th className="border-r border-black p-1">HOURS</th>
                <th className="border-r border-black p-1">TYPE OF LD</th>
                <th className="p-1">CONDUCTED / SPONSORED BY</th>
              </tr>
            </thead>
            <tbody>
              {record.trainings.length === 0 || !record.trainings[0]?.title ? (
                <tr className="border-b border-black">
                  <td colSpan={5} className="p-2 italic text-slate-500">N/A</td>
                </tr>
              ) : (
                record.trainings.map((t, idx) => (
                  <tr key={idx} className="border-b border-black">
                    <td className="border-r border-black p-1.5 text-left font-medium">{t.title}</td>
                    <td className="border-r border-black p-1.5 font-mono">{t.inclusiveDatesFrom} - {t.inclusiveDatesTo}</td>
                    <td className="border-r border-black p-1.5">{t.numberOfHours}</td>
                    <td className="border-r border-black p-1.5">{t.typeOfLD}</td>
                    <td className="p-1.5 text-left">{t.conductedSponsoredBy}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="bg-slate-200 text-black font-bold px-2 py-1 uppercase text-xs border border-black mt-4">
            VII. Voluntary Work or Involvement in Civic / NGO / PO / CSO (Item 30)
          </div>

          <table className="w-full border-collapse border border-black text-center text-[10px]">
            <thead>
              <tr className="bg-slate-100 border-b border-black">
                <th className="border-r border-black p-1 w-1/2">30. NAME & ADDRESS OF ORGANIZATION</th>
                <th className="border-r border-black p-1">INCLUSIVE DATES (FROM - TO)</th>
                <th className="border-r border-black p-1">HOURS</th>
                <th className="p-1">POSITION / NATURE OF WORK</th>
              </tr>
            </thead>
            <tbody>
              {record.voluntaryWork.length === 0 || !record.voluntaryWork[0]?.organizationNameAddress ? (
                <tr className="border-b border-black">
                  <td colSpan={4} className="p-2 italic text-slate-500">N/A</td>
                </tr>
              ) : (
                record.voluntaryWork.map((v, idx) => (
                  <tr key={idx} className="border-b border-black">
                    <td className="border-r border-black p-1.5 text-left font-medium">{v.organizationNameAddress}</td>
                    <td className="border-r border-black p-1.5 font-mono">{v.inclusiveDatesFrom} - {v.inclusiveDatesTo}</td>
                    <td className="border-r border-black p-1.5">{v.numberOfHours}</td>
                    <td className="p-1.5 text-left">{v.positionNatureOfWork}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="bg-slate-200 text-black font-bold px-2 py-1 uppercase text-xs border border-black mt-4">
            VIII. Other Information (Items 31 – 33)
          </div>

          <table className="w-full border-collapse border border-black text-left text-[10px]">
            <thead>
              <tr className="bg-slate-100 border-b border-black">
                <th className="border-r border-black p-1 w-1/3">31. SPECIAL SKILLS & HOBBIES</th>
                <th className="border-r border-black p-1 w-1/3">32. NON-ACADEMIC DISTINCTIONS</th>
                <th className="p-1 w-1/3">33. MEMBERSHIP IN ASSOCIATIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-r border-black p-2 align-top">
                  <ul className="list-disc list-inside space-y-0.5">
                    {record.otherInfo.specialSkillsHobbies.filter(Boolean).map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </td>
                <td className="border-r border-black p-2 align-top">
                  <ul className="list-disc list-inside space-y-0.5">
                    {record.otherInfo.nonAcademicDistinctions.filter(Boolean).map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </td>
                <td className="p-2 align-top">
                  <ul className="list-disc list-inside space-y-0.5">
                    {record.otherInfo.membershipInAssociations.filter(Boolean).map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-between text-[9px] pt-1 text-slate-500">
            <span>CS FORM 212 (Revised 2026), Page 3 of 4</span>
            <span>Signatures on Page 4</span>
          </div>
        </div>

        {/* ================= PAGE 4 ================= */}
        <div className="page-section space-y-3 pt-6 border-t-2 border-black print:break-before-page">
          <div className="bg-slate-200 text-black font-bold px-2 py-1 uppercase text-xs border border-black">
            IX. Background Questions (Items 34 – 40)
          </div>

          <div className="border border-black p-2 space-y-1.5 text-[10px]">
            <p><strong>34.a</strong> Related within third degree: <strong>{q.relatedWithinThirdDegree.answer === true ? 'YES' : 'NO'}</strong> {q.relatedWithinThirdDegree.details ? `(${q.relatedWithinThirdDegree.details})` : ''}</p>
            <p><strong>34.b</strong> Related within fourth degree (LGU): <strong>{q.relatedWithinFourthDegreeLGU.answer === true ? 'YES' : 'NO'}</strong> {q.relatedWithinFourthDegreeLGU.details ? `(${q.relatedWithinFourthDegreeLGU.details})` : ''}</p>
            <p><strong>35.a</strong> Administrative offense guilty: <strong>{q.foundGuiltyOfAdminOffense.answer === true ? 'YES' : 'NO'}</strong> {q.foundGuiltyOfAdminOffense.details ? `(${q.foundGuiltyOfAdminOffense.details})` : ''}</p>
            <p><strong>35.b</strong> Criminally charged in court: <strong>{q.criminallyChargedInCourt.answer === true ? 'YES' : 'NO'}</strong> {q.criminallyChargedInCourt.details ? `(${q.criminallyChargedInCourt.details})` : ''}</p>
            <p><strong>36.</strong> Convicted of crime/violation: <strong>{q.convictedOfCrimeOrViolation.answer === true ? 'YES' : 'NO'}</strong> {q.convictedOfCrimeOrViolation.details ? `(${q.convictedOfCrimeOrViolation.details})` : ''}</p>
            <p><strong>37.</strong> Separated from service: <strong>{q.separatedFromService.answer === true ? 'YES' : 'NO'}</strong> {q.separatedFromService.details ? `(${q.separatedFromService.details})` : ''}</p>
            <p><strong>38.a</strong> Candidate in election: <strong>{q.candidateInNationalLocalElection.answer === true ? 'YES' : 'NO'}</strong> {q.candidateInNationalLocalElection.details ? `(${q.candidateInNationalLocalElection.details})` : ''}</p>
            <p><strong>38.b</strong> Resigned to campaign: <strong>{q.resignedToCampaignForCandidate.answer === true ? 'YES' : 'NO'}</strong> {q.resignedToCampaignForCandidate.details ? `(${q.resignedToCampaignForCandidate.details})` : ''}</p>
            <p><strong>39.</strong> Immigrant/permanent resident abroad: <strong>{q.immigrantOrPermanentResidentAbroad.answer === true ? 'YES' : 'NO'}</strong> {q.immigrantOrPermanentResidentAbroad.country ? `(${q.immigrantOrPermanentResidentAbroad.country})` : ''}</p>
            <p><strong>40.a</strong> Indigenous group member: <strong>{q.indigenousGroupMember.answer === true ? 'YES' : 'NO'}</strong> {q.indigenousGroupMember.specify ? `(${q.indigenousGroupMember.specify})` : ''}</p>
            <p><strong>40.b</strong> Person with disability (PWD): <strong>{q.personWithDisability.answer === true ? 'YES' : 'NO'}</strong> {q.personWithDisability.pwdIdNo ? `(${q.personWithDisability.pwdIdNo})` : ''}</p>
            <p><strong>40.c</strong> Solo parent: <strong>{q.soloParent.answer === true ? 'YES' : 'NO'}</strong> {q.soloParent.soloParentIdNo ? `(${q.soloParent.soloParentIdNo})` : ''}</p>
          </div>

          <div className="bg-slate-200 text-black font-bold px-2 py-1 uppercase text-xs border border-black mt-2">
            41. References (Persons not related by consanguinity or affinity)
          </div>

          <table className="w-full border-collapse border border-black text-left text-[10px]">
            <thead>
              <tr className="bg-slate-100 border-b border-black">
                <th className="border-r border-black p-1 w-1/3">NAME</th>
                <th className="border-r border-black p-1 w-1/3">ADDRESS</th>
                <th className="p-1 w-1/3">TEL. NO. / EMAIL</th>
              </tr>
            </thead>
            <tbody>
              {record.references.map((r, i) => (
                <tr key={i} className="border-b border-black">
                  <td className="border-r border-black p-1 font-medium uppercase">{r.name || '—'}</td>
                  <td className="border-r border-black p-1">{r.officeResidentialAddress || '—'}</td>
                  <td className="p-1">{r.contactNoOrEmail || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Declaration and Signature Block (Item 42) */}
          <div className="border border-black p-3 space-y-3 mt-2">
            <p className="text-[9px] text-justify">
              <strong>42. DECLARATION:</strong> I declare under oath that I have personally accomplished this Personal Data Sheet which is a true, correct and complete statement pursuant to the provisions of pertinent laws, rules and regulations of the Republic of the Philippines. I authorize the agency head/authorized representative to verify/validate the contents stated herein. I agree that any misrepresentation made in this document and its attachments shall cause the filing of administrative/criminal case/s against me.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-2">
              {/* Left: ID Details */}
              <div className="space-y-1 text-[10px] border border-black p-2">
                <p className="font-bold border-b border-black pb-1">GOVERNMENT ISSUED ID</p>
                <p><strong>ID Type:</strong> {d.governmentIssuedId || '—'}</p>
                <p><strong>ID/Passport No:</strong> {d.idLicensePassportNo || '—'}</p>
                <p><strong>Date of Issuance:</strong> {d.dateOfIssuance || '—'}</p>
                <p><strong>Place of Issuance:</strong> {d.placeOfIssuance || '—'}</p>
                <p className="pt-2"><strong>Date Accomplished:</strong> {d.dateAccomplished || '—'}</p>
              </div>

              {/* Middle: Signature & Thumbmark */}
              <div className="flex flex-col items-center justify-between border border-black p-2 text-center">
                <div className="w-full flex-1 flex flex-col items-center justify-center">
                  {d.signature ? (
                    <img src={d.signature} alt="Signature" className="max-h-16 object-contain" />
                  ) : (
                    <div className="h-14 flex items-center justify-center text-slate-400 italic">
                      Affix Signature
                    </div>
                  )}
                  <div className="w-full border-t border-black pt-1 font-bold text-[9px] uppercase">
                    Signature (Sign inside the box)
                  </div>
                </div>

                <div className="w-full mt-2 pt-2 border-t border-dashed border-slate-300">
                  <div className="text-[8px] text-slate-500">RIGHT THUMBMARK</div>
                  {d.rightThumbmark ? (
                    <img src={d.rightThumbmark} alt="Thumbmark" className="h-10 mx-auto object-contain" />
                  ) : (
                    <div className="w-16 h-10 border border-slate-300 mx-auto my-1 flex items-center justify-center text-[7px] text-slate-400">
                      Thumbmark
                    </div>
                  )}
                </div>
              </div>

              {/* Right: ID Photo Box */}
              <div className="border border-black p-2 flex flex-col items-center justify-center text-center">
                {d.idPhoto ? (
                  <img src={d.idPhoto} alt="Passport ID" className="w-24 h-32 object-cover border border-black shadow-sm" />
                ) : (
                  <div className="w-24 h-32 border-2 border-dashed border-black flex flex-col items-center justify-center p-1 text-[8px] text-slate-500">
                    <span>ID PHOTO</span>
                    <span>(3.5 cm x 4.5 cm)</span>
                    <span className="text-[7px] mt-1">White background</span>
                  </div>
                )}
                <span className="text-[8px] mt-1 text-slate-500">Passport size photo</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between text-[9px] pt-1 text-slate-500">
            <span>CS FORM 212 (Revised 2026), Page 4 of 4</span>
            <span>Generated offline via FormsPH</span>
          </div>
        </div>

      </div>
    </div>
  );
};
