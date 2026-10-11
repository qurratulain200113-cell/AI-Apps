import React from 'react';
import { X, BookOpen, CheckCircle, Calculator, FileCode, Printer, Shield } from 'lucide-react';
import { EVALUATION_CRITERIA, RATING_BRACKETS } from '../data/criteriaConfig';
import { downloadStandaloneHtmlFile } from '../utils/exportHtml';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs no-print">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-blue-900" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                User Guide & System Documentation
              </h2>
              <p className="text-xs text-slate-500">
                Complete instructions for HR managers & performance evaluators
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-6 text-xs text-slate-600 leading-relaxed">
          {/* Quick Start Steps */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              1. How to Use the Application
            </h3>
            <ol className="list-decimal list-inside space-y-1.5 pl-1 text-slate-700">
              <li>
                <strong>Enter Employee Information:</strong> Fill in the Employee Name, ID, Department, Job Designation, Manager Name, Review Period, and Review Date.
              </li>
              <li>
                <strong>Evaluate the 6 Criteria:</strong> Rate each criterion from <strong>0 to 100</strong> using either the intuitive slider or typing the exact number directly into the box.
              </li>
              <li>
                <strong>Click &quot;Calculate Performance&quot;:</strong> The system validates all fields and computes the exact weighted overall score out of 100.
              </li>
              <li>
                <strong>Review Results &amp; Action Plan:</strong> Examine the assigned rating category, criteria matrix, strengths, growth areas, and the 3-step prioritized development plan.
              </li>
              <li>
                <strong>Print or Export:</strong> Click &quot;Print / PDF&quot; to print or generate an executive PDF report, or click &quot;Export CSV&quot; for spreadsheets.
              </li>
            </ol>
          </div>

          {/* Mathematical Formula */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-blue-900" />
              2. Weighted Scoring Formula (100% Total)
            </h3>
            <p className="text-slate-600 mb-2">
              The overall performance score is calculated through a strictly weighted mathematical formula rather than a simple average:
            </p>
            <div className="p-3 rounded-lg bg-white border border-slate-200 font-mono text-[11px] text-slate-800 space-y-1">
              <div><strong>Overall Score</strong> = </div>
              <div className="pl-4 text-blue-900">• (Quality of Work × 0.25) [25%]</div>
              <div className="pl-4 text-blue-900">• (Productivity &amp; Targets × 0.25) [25%]</div>
              <div className="pl-4 text-blue-900">• (Communication &amp; Teamwork × 0.15) [15%]</div>
              <div className="pl-4 text-blue-900">• (Attendance &amp; Punctuality × 0.10) [10%]</div>
              <div className="pl-4 text-blue-900">• (Problem-Solving &amp; Initiative × 0.15) [15%]</div>
              <div className="pl-4 text-blue-900">• (Professionalism &amp; Accountability × 0.10) [10%]</div>
            </div>
            <p className="mt-2 text-[11px] text-slate-500">
              Weights total exactly <strong>100%</strong>. The final score is bounded between 0.00 and 100.00 and presented to two decimal places.
            </p>
          </div>

          {/* Rating Scale Table */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-2">
              3. Performance Rating Categories
            </h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="p-2">Score Range</th>
                    <th className="p-2">Rating Category</th>
                    <th className="p-2">Organizational Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {RATING_BRACKETS.map((b) => (
                    <tr key={b.rating}>
                      <td className="p-2 font-mono font-semibold text-slate-800">
                        {b.label.split(':')[0]}
                      </td>
                      <td className="p-2 font-bold text-slate-900">{b.rating}</td>
                      <td className="p-2 text-slate-600">{b.summary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Standalone HTML File Instructions */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200">
            <h3 className="text-sm font-bold text-blue-950 mb-1.5 flex items-center gap-1.5">
              <FileCode className="w-4 h-4 text-blue-700" />
              4. How to Use &amp; Run the Standalone HTML File (Zero Coding Setup)
            </h3>
            <p className="text-blue-900 mb-2">
              You can run this application entirely offline without any server, Node.js, or programming tools:
            </p>
            <ol className="list-decimal list-inside space-y-1.5 pl-1 text-blue-950">
              <li>
                Click the <strong>&quot;Download Standalone .html&quot;</strong> button in the header (or below).
              </li>
              <li>
                A file named <code className="bg-white px-1.5 py-0.5 rounded border border-blue-200 font-mono text-[11px]">employee-performance-calculator.html</code> will save to your Downloads folder.
              </li>
              <li>
                <strong>Double-click</strong> this file to open it in Google Chrome, Microsoft Edge, Safari, or Mozilla Firefox.
              </li>
              <li>
                It runs locally on your computer with 100% offline privacy—no employee data leaves your computer.
              </li>
              <li>
                To edit criterion weights or text in the future, right-click the file and select <em>&quot;Open With &gt; Notepad&quot;</em> (or TextEdit) and modify the values in the configuration section.
              </li>
            </ol>
            <div className="mt-3">
              <button
                type="button"
                onClick={downloadStandaloneHtmlFile}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-xs"
              >
                <FileCode className="w-3.5 h-3.5" />
                Download Standalone HTML File Now
              </button>
            </div>
          </div>

          {/* Data Privacy & Support Notice */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-100 text-slate-600 text-[11px]">
            <Shield className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
            <p>
              <strong>Data Privacy Guarantee:</strong> All calculations, employee names, and records are processed 100% in your local browser memory. No employee data is transmitted to external servers or cloud databases.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
