import React, { useState, useRef, useEffect } from 'react';
import {
  Calculator,
  RotateCcw,
  Printer,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileCode,
} from 'lucide-react';
import { Header } from './components/Header';
import { EmployeeInfoCard } from './components/EmployeeInfoCard';
import { CriteriaScoreCard } from './components/CriteriaScoreCard';
import { ResultsDashboard } from './components/ResultsDashboard';
import { PrintReportView } from './components/PrintReportView';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { InstructionsModal } from './components/InstructionsModal';
import { AndroidInstallModal } from './components/AndroidInstallModal';
import { EmployeeInfo, ScoreInputMap, EvaluationResult } from './types/performance';
import { validateEvaluationInputs, calculatePerformance, ValidationErrors } from './utils/calculator';
import { downloadStandaloneHtmlFile } from './utils/exportHtml';

const INITIAL_EMPLOYEE_INFO: EmployeeInfo = {
  employeeName: 'Eleanor Vance',
  employeeId: 'EMP-4092',
  department: 'Financial Strategy & Planning',
  jobDesignation: 'Senior Financial Analyst',
  managerName: 'Arthur Sterling',
  reviewPeriod: 'Annual Review 2025',
  reviewDate: new Date().toISOString().split('T')[0],
};

const INITIAL_SCORES: ScoreInputMap = {
  quality: 88,
  productivity: 84,
  communication: 80,
  attendance: 95,
  problem_solving: 82,
  professionalism: 85,
};

export default function App() {
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeInfo>(INITIAL_EMPLOYEE_INFO);
  const [scores, setScores] = useState<ScoreInputMap>(INITIAL_SCORES);
  const [errors, setErrors] = useState<ValidationErrors>({ employeeInfo: {}, scores: {} });
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isInstructionsModalOpen, setIsInstructionsModalOpen] = useState(false);
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState(false);

  const resultsRef = useRef<HTMLDivElement>(null);

  // Automatically calculate on initial load so the user sees a full, functional dashboard immediately
  useEffect(() => {
    const initialEval = calculatePerformance(INITIAL_EMPLOYEE_INFO, INITIAL_SCORES);
    setResult(initialEval);
  }, []);

  const handleInfoChange = (field: keyof EmployeeInfo, value: string) => {
    setEmployeeInfo((prev) => ({ ...prev, [field]: value }));
    // Clear field-specific error if present
    if (errors.employeeInfo && errors.employeeInfo[field]) {
      setErrors((prev: ValidationErrors) => {
        const nextInfo = { ...(prev.employeeInfo || {}) };
        delete nextInfo[field];
        return {
          ...prev,
          employeeInfo: nextInfo,
        };
      });
    }
  };

  const handleScoreChange = (criterionId: string, value: number | string) => {
    setScores((prev) => ({ ...prev, [criterionId]: value }));
    // Clear criterion error if present
    if (errors.scores && errors.scores[criterionId]) {
      setErrors((prev: ValidationErrors) => {
        const nextScores = { ...(prev.scores || {}) };
        delete nextScores[criterionId];
        return {
          ...prev,
          scores: nextScores,
        };
      });
    }
  };

  const handleCalculate = () => {
    const validation = validateEvaluationInputs(employeeInfo, scores);
    if (!validation.isValid) {
      setErrors(validation.errors);
      // Scroll to the first error
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setErrors({ employeeInfo: {}, scores: {} });
    const calculatedResult = calculatePerformance(employeeInfo, scores);
    setResult(calculatedResult);

    // Smooth scroll down to results
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleResetConfirm = () => {
    setEmployeeInfo({
      employeeName: '',
      employeeId: '',
      department: '',
      jobDesignation: '',
      managerName: '',
      reviewPeriod: '',
      reviewDate: new Date().toISOString().split('T')[0],
    });
    setScores({
      quality: '',
      productivity: '',
      communication: '',
      attendance: '',
      problem_solving: '',
      professionalism: '',
    });
    setErrors({ employeeInfo: {}, scores: {} });
    setResult(null);
    setIsResetModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyPreset = (presetInfo: EmployeeInfo, presetScores: ScoreInputMap) => {
    setEmployeeInfo(presetInfo);
    setScores(presetScores);
    setErrors({ employeeInfo: {}, scores: {} });
    const res = calculatePerformance(presetInfo, presetScores);
    setResult(res);
    setTimeout(() => {
      if (resultsRef.current) {
        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handlePrint = () => {
    // If not calculated yet, calculate first if valid
    if (!result) {
      handleCalculate();
    }
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const hasAnyErrors =
    Object.values(errors.employeeInfo || {}).some(Boolean) ||
    Object.values(errors.scores || {}).some(Boolean);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Printable Executive Report Layout (Hidden on Screen, Active on Print) */}
      {result && <PrintReportView result={result} />}

      {/* Screen Interactive UI (Hidden during window.print) */}
      <div className="no-print flex-1 flex flex-col">
        {/* Top Navbar */}
        <Header
          onResetClick={() => setIsResetModalOpen(true)}
          onPrintClick={handlePrint}
          onOpenHelp={() => setIsInstructionsModalOpen(true)}
          onOpenAndroidGuide={() => setIsAndroidModalOpen(true)}
          onApplyPreset={handleApplyPreset}
        />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
          {/* Quick Testing Benchmark Bar */}
          <div className="mb-6 p-3.5 bg-white border border-slate-200 rounded-xl shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Quick Benchmark Tests:
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline">
                Test required score boundaries instantly:
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() =>
                  handleApplyPreset(employeeInfo, {
                    quality: 100,
                    productivity: 100,
                    communication: 100,
                    attendance: 100,
                    problem_solving: 100,
                    professionalism: 100,
                  })
                }
                className="px-2.5 py-1 text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors"
                title="Score: 100.00 (Excellent)"
              >
                All 100 (Excellent)
              </button>

              <button
                type="button"
                onClick={() =>
                  handleApplyPreset(employeeInfo, {
                    quality: 80,
                    productivity: 80,
                    communication: 80,
                    attendance: 80,
                    problem_solving: 80,
                    professionalism: 80,
                  })
                }
                className="px-2.5 py-1 text-xs font-medium text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors"
                title="Score: 80.00 (Very Good)"
              >
                All 80 (Very Good)
              </button>

              <button
                type="button"
                onClick={() =>
                  handleApplyPreset(employeeInfo, {
                    quality: 70,
                    productivity: 70,
                    communication: 70,
                    attendance: 70,
                    problem_solving: 70,
                    professionalism: 70,
                  })
                }
                className="px-2.5 py-1 text-xs font-medium text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-md transition-colors"
                title="Score: 70.00 (Good)"
              >
                All 70 (Good)
              </button>

              <button
                type="button"
                onClick={() =>
                  handleApplyPreset(employeeInfo, {
                    quality: 60,
                    productivity: 60,
                    communication: 60,
                    attendance: 60,
                    problem_solving: 60,
                    professionalism: 60,
                  })
                }
                className="px-2.5 py-1 text-xs font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md transition-colors"
                title="Score: 60.00 (Satisfactory)"
              >
                All 60 (Satisfactory)
              </button>

              <button
                type="button"
                onClick={() =>
                  handleApplyPreset(employeeInfo, {
                    quality: 0,
                    productivity: 0,
                    communication: 0,
                    attendance: 0,
                    problem_solving: 0,
                    professionalism: 0,
                  })
                }
                className="px-2.5 py-1 text-xs font-medium text-rose-800 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md transition-colors"
                title="Score: 0.00 (Needs Improvement)"
              >
                All 0 (Needs Improvement)
              </button>
            </div>
          </div>

          {/* Validation Error Banner */}
          {hasAnyErrors && (
            <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 flex items-start gap-3 shadow-xs">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-rose-900">
                  Please resolve the following input requirements:
                </h4>
                <ul className="text-xs text-rose-800 mt-1 list-disc list-inside space-y-0.5">
                  {Object.values(errors.employeeInfo || {}).map(
                    (err, i) => err && <li key={i}>{err}</li>
                  )}
                  {Object.values(errors.scores || {}).map(
                    (err, i) => err && <li key={i}>{err}</li>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Two-Column Form Layout: Employee Info + Criteria Scores */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Employee Information Card */}
            <div className="lg:col-span-5 space-y-6">
              <EmployeeInfoCard
                info={employeeInfo}
                onChange={handleInfoChange}
                errors={errors.employeeInfo}
              />

              {/* Formula & Weight Summary Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Weighted Mathematical Model
                </h3>
                <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                  Formula enforces rigorous corporate weighting so core deliverables carry primary importance:
                </p>
                <div className="space-y-1.5 text-xs font-mono bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-700">
                  <div className="flex justify-between">
                    <span>Quality of Work</span>
                    <strong className="text-blue-900">25% (0.25)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Productivity &amp; Targets</span>
                    <strong className="text-blue-900">25% (0.25)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Communication &amp; Teamwork</span>
                    <strong className="text-blue-900">15% (0.15)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Attendance &amp; Punctuality</span>
                    <strong className="text-blue-900">10% (0.10)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Problem-Solving &amp; Initiative</span>
                    <strong className="text-blue-900">15% (0.15)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Professionalism &amp; Accountability</span>
                    <strong className="text-blue-900">10% (0.10)</strong>
                  </div>
                  <div className="pt-1.5 border-t border-slate-300 flex justify-between font-bold text-slate-900">
                    <span>Total Formula Weight</span>
                    <span>100% (1.00)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Criteria Scores Card & Action Bar */}
            <div className="lg:col-span-7 space-y-6">
              <CriteriaScoreCard
                scores={scores}
                onChangeScore={handleScoreChange}
                errors={errors.scores}
              />

              {/* Action Buttons */}
              <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsResetModalOpen(true)}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                  <span>Reset Form</span>
                </button>

                <div className="w-full sm:w-auto flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCalculate}
                    className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-white bg-slate-900 hover:bg-blue-950 active:bg-slate-950 rounded-lg transition-all shadow-xs flex items-center justify-center gap-2"
                  >
                    <Calculator className="w-4 h-4 text-blue-300" />
                    <span>Calculate Overall Performance Score</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Dashboard Section */}
          <div ref={resultsRef} className="mt-12">
            {result ? (
              <ResultsDashboard result={result} onPrint={handlePrint} />
            ) : (
              <div className="p-12 text-center bg-white border border-dashed border-slate-300 rounded-xl">
                <Calculator className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-700">
                  Ready to Evaluate
                </h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Complete the employee details and criteria scores above, then click &quot;Calculate Overall Performance Score&quot;.
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Corporate Footer */}
        <footer className="mt-auto border-t border-slate-200 bg-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              <span className="font-semibold text-slate-700">
                Employee Performance Calculator
              </span>{' '}
              · Enterprise HR Evaluation &amp; Weighted Scoring Suite
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setIsInstructionsModalOpen(true)}
                className="hover:text-blue-900 transition-colors font-medium flex items-center gap-1"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                User Instructions
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setIsAndroidModalOpen(true)}
                className="hover:text-blue-900 transition-colors font-medium flex items-center gap-1 text-emerald-700"
              >
                📱 Install App / APK
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={downloadStandaloneHtmlFile}
                className="hover:text-blue-900 transition-colors font-medium flex items-center gap-1"
              >
                <FileCode className="w-3.5 h-3.5" />
                Download Standalone HTML
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* Confirmation & Documentation Modals */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onConfirm={handleResetConfirm}
        onCancel={() => setIsResetModalOpen(false)}
      />

      <InstructionsModal
        isOpen={isInstructionsModalOpen}
        onClose={() => setIsInstructionsModalOpen(false)}
      />

      <AndroidInstallModal
        isOpen={isAndroidModalOpen}
        onClose={() => setIsAndroidModalOpen(false)}
        appUrl={typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-2htzjiao55iiuk5agruk4c-71924399480.asia-east1.run.app'}
      />
    </div>
  );
}
