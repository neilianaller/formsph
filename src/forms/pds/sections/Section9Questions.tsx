import React from 'react';
import { BackgroundQuestions, TriStateQuestion } from '../../../types/pds';
import { HelpCircle } from 'lucide-react';
import { DateInput } from '../../../components/common/DateInput';

interface Section9QuestionsProps {
  data: BackgroundQuestions;
  onChange: (updated: BackgroundQuestions) => void;
}

export const Section9Questions: React.FC<Section9QuestionsProps> = ({ data, onChange }) => {
  const updateQuestion = <K extends keyof BackgroundQuestions>(
    field: K,
    updatedObj: BackgroundQuestions[K]
  ) => {
    onChange({ ...data, [field]: updatedObj });
  };

  const renderRadioTriState = (
    qKey: keyof BackgroundQuestions,
    questionObj: TriStateQuestion,
    labelNo: string,
    questionText: string,
    detailPrompt?: string,
    extraFields?: React.ReactNode
  ) => {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <span className="text-xs font-bold text-teal-700 dark:text-teal-400 block mb-1">
              Item {labelNo}
            </span>
            <p className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {questionText}
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0 bg-slate-50 dark:bg-slate-950 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
              <input
                type="radio"
                name={`q_${qKey}`}
                checked={questionObj.answer === true}
                onChange={() => updateQuestion(qKey, { ...questionObj, answer: true })}
                className="text-teal-600 focus:ring-teal-500"
              />
              <span>YES</span>
            </label>

            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
              <input
                type="radio"
                name={`q_${qKey}`}
                checked={questionObj.answer === false}
                onChange={() => updateQuestion(qKey, { ...questionObj, answer: false })}
                className="text-teal-600 focus:ring-teal-500"
              />
              <span>NO</span>
            </label>
          </div>
        </div>

        {questionObj.answer === null && (
          <p className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1 italic">
            <HelpCircle className="w-3.5 h-3.5" /> Unanswered (Please select YES or NO)
          </p>
        )}

        {questionObj.answer === true && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2 animate-in fade-in duration-150">
            {detailPrompt && (
              <div>
                <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {detailPrompt} <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={questionObj.details || ''}
                  onChange={(e) => updateQuestion(qKey, { ...questionObj, details: e.target.value })}
                  placeholder="Provide full details..."
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
                />
              </div>
            )}
            {extraFields}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-border-light dark:border-border-dark pb-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 text-xs flex items-center justify-center font-bold">
            IX
          </span>
          Background Questions (Items 34 – 40)
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Answer all questions truthfully. Tri-state logic ensures no required question is left unanswered.
        </p>
      </div>

      <div className="space-y-4">
        {/* 34a */}
        {renderRadioTriState(
          'relatedWithinThirdDegree',
          data.relatedWithinThirdDegree,
          '34.a',
          'Are you related by consanguinity or affinity to the appointing or recommending authority, or to the chief of bureau or office or to the person who has immediate supervision over you in the Office/Bureau/Department where you will be appointed, within the third degree?',
          'If YES, give details:'
        )}

        {/* 34b */}
        {renderRadioTriState(
          'relatedWithinFourthDegreeLGU',
          data.relatedWithinFourthDegreeLGU,
          '34.b',
          'Are you related by consanguinity or affinity to the appointing or recommending authority, or to the chief of bureau or office or to the person who has immediate supervision over you within the fourth degree (for Local Government Unit appointees)?',
          'If YES, give details:'
        )}

        {/* 35a */}
        {renderRadioTriState(
          'foundGuiltyOfAdminOffense',
          data.foundGuiltyOfAdminOffense,
          '35.a',
          'Have you ever been found guilty of any administrative offense?',
          'If YES, give details:'
        )}

        {/* 35b */}
        {renderRadioTriState(
          'criminallyChargedInCourt',
          data.criminallyChargedInCourt,
          '35.b',
          'Have you been criminally charged before any court?',
          'If YES, give details:',
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <div>
              <DateInput
                label="Date Filed"
                value={data.criminallyChargedInCourt.dateFiled || ''}
                onChange={(val) =>
                  updateQuestion('criminallyChargedInCourt', {
                    ...data.criminallyChargedInCourt,
                    dateFiled: val,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
                Status of Case
              </label>
              <input
                type="text"
                value={data.criminallyChargedInCourt.statusOfCase || ''}
                onChange={(e) =>
                  updateQuestion('criminallyChargedInCourt', {
                    ...data.criminallyChargedInCourt,
                    statusOfCase: e.target.value,
                  })
                }
                placeholder="e.g. Pending / Dismissed"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              />
            </div>
          </div>
        )}

        {/* 36 */}
        {renderRadioTriState(
          'convictedOfCrimeOrViolation',
          data.convictedOfCrimeOrViolation,
          '36',
          'Have you ever been convicted of any crime or violation of any law, decree, ordinance or regulation by any court or tribunal?',
          'If YES, give details:'
        )}

        {/* 37 */}
        {renderRadioTriState(
          'separatedFromService',
          data.separatedFromService,
          '37',
          'Have you ever been separated from the service in any of the following modes: resignation, retirement, dropped from the rolls, dismissal, termination, end of contract, finished contract, or phased out (abolition) in the public or private sector?',
          'If YES, give details:'
        )}

        {/* 38a */}
        {renderRadioTriState(
          'candidateInNationalLocalElection',
          data.candidateInNationalLocalElection,
          '38.a',
          'Have you ever been a candidate in a national or local election (except Barangay election)?',
          'If YES, give details:'
        )}

        {/* 38b */}
        {renderRadioTriState(
          'resignedToCampaignForCandidate',
          data.resignedToCampaignForCandidate,
          '38.b',
          'Have you resigned from the government service during the three (3)-month period before the last election to promote/actively campaign for a candidate?',
          'If YES, give details:'
        )}

        {/* 39 */}
        {renderRadioTriState(
          'immigrantOrPermanentResidentAbroad',
          data.immigrantOrPermanentResidentAbroad,
          '39',
          'Have you acquired the status of an immigrant or permanent resident of another country?',
          undefined,
          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
              If YES, give details (country): <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={data.immigrantOrPermanentResidentAbroad.country || ''}
              onChange={(e) =>
                updateQuestion('immigrantOrPermanentResidentAbroad', {
                  ...data.immigrantOrPermanentResidentAbroad,
                  country: e.target.value,
                })
              }
              placeholder="e.g. USA, Canada, Australia"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>
        )}

        {/* 40a */}
        {renderRadioTriState(
          'indigenousGroupMember',
          data.indigenousGroupMember,
          '40.a',
          'Pursuant to: (a) Indigenous People\'s Act (RA 8371), are you a member of any indigenous group?',
          undefined,
          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
              If YES, please specify: <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={data.indigenousGroupMember.specify || ''}
              onChange={(e) =>
                updateQuestion('indigenousGroupMember', {
                  ...data.indigenousGroupMember,
                  specify: e.target.value,
                })
              }
              placeholder="e.g. Igorot / Lumad / Mangyan / etc."
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>
        )}

        {/* 40b */}
        {renderRadioTriState(
          'personWithDisability',
          data.personWithDisability,
          '40.b',
          'Pursuant to: (b) Magna Carta for Disabled Persons (RA 7277, as amended), are you a person with disability?',
          undefined,
          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
              If YES, please specify PWD ID No: <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={data.personWithDisability.pwdIdNo || ''}
              onChange={(e) =>
                updateQuestion('personWithDisability', {
                  ...data.personWithDisability,
                  pwdIdNo: e.target.value,
                })
              }
              placeholder="e.g. PWD-1234-5678"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>
        )}

        {/* 40c */}
        {renderRadioTriState(
          'soloParent',
          data.soloParent,
          '40.c',
          'Pursuant to: (c) Solo Parents\' Welfare Act of 2000 (RA 8972), are you a solo parent?',
          undefined,
          <div>
            <label className="block text-[11px] font-medium text-slate-700 dark:text-slate-300 mb-1">
              If YES, please specify Solo Parent ID No: <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={data.soloParent.soloParentIdNo || ''}
              onChange={(e) =>
                updateQuestion('soloParent', {
                  ...data.soloParent,
                  soloParentIdNo: e.target.value,
                })
              }
              placeholder="e.g. SP-9876-5432"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            />
          </div>
        )}
      </div>
    </div>
  );
};
