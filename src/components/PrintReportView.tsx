import React from 'react';
import { EvaluationResult } from '../types/performance';

interface PrintReportViewProps {
  result: EvaluationResult;
}

export const PrintReportView: React.FC<PrintReportViewProps> = ({ result }) => {
  const {
    employeeInfo,
    criterionResults,
    overallScore,
    rating,
    ratingBracket,
    strengths,
    growthAreas,
    prioritizedActions,
    calculatedAt,
  } = result;

  return (
    <div className="print-only p-4 bg-white text-slate-900 font-sans text-xs">
      {/* Official Header */}
      <div className="border-b-2 border-slate-900 pb-3 mb-4 flex justify-between items-end">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            CONFIDENTIAL · HUMAN RESOURCES PERFORMANCE RECORD
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Employee Performance Evaluation Report
          </h1>
          <div className="text-[11px] text-slate-600 mt-0.5">
            Weighted Performance Model · Formal Assessment Summary
          </div>
        </div>
        <div className="text-right">
          <div className="text-[11px] font-bold text-slate-700">Evaluation Date</div>
          <div className="text-xs font-mono">{calculatedAt}</div>
        </div>
      </div>

      {/* Employee Details Card */}
      <div className="border border-slate-300 rounded p-3 mb-4 bg-slate-50/50 page-break-inside-avoid">
        <div className="text-[10px] font-bold uppercase text-slate-500 mb-2 border-b border-slate-200 pb-1">
          Employee & Review Context
        </div>
        <div className="grid grid-cols-4 gap-3 text-xs">
          <div>
            <div className="text-slate-500 text-[10px]">Employee Full Name</div>
            <div className="font-bold text-slate-900">{employeeInfo.employeeName}</div>
          </div>
          <div>
            <div className="text-slate-500 text-[10px]">Employee ID</div>
            <div className="font-semibold text-slate-900">{employeeInfo.employeeId}</div>
          </div>
          <div>
            <div className="text-slate-500 text-[10px]">Department</div>
            <div className="font-semibold text-slate-900">{employeeInfo.department}</div>
          </div>
          <div>
            <div className="text-slate-500 text-[10px]">Job Designation</div>
            <div className="font-semibold text-slate-900">{employeeInfo.jobDesignation}</div>
          </div>
          <div>
            <div className="text-slate-500 text-[10px]">Evaluating Manager</div>
            <div className="font-semibold text-slate-900">{employeeInfo.managerName}</div>
          </div>
          <div>
            <div className="text-slate-500 text-[10px]">Review Period</div>
            <div className="font-semibold text-slate-900">{employeeInfo.reviewPeriod}</div>
          </div>
          <div>
            <div className="text-slate-500 text-[10px]">Review Date</div>
            <div className="font-semibold text-slate-900">{employeeInfo.reviewDate}</div>
          </div>
          <div>
            <div className="text-slate-500 text-[10px]">Overall Status</div>
            <div className="font-bold text-blue-900">{rating}</div>
          </div>
        </div>
      </div>

      {/* Criteria Breakdown Table */}
      <div className="mb-4 page-break-inside-avoid">
        <div className="text-[10px] font-bold uppercase text-slate-500 mb-1.5">
          Criteria Scoring & Weighted Contribution Breakdown
        </div>
        <table className="w-full border-collapse border border-slate-300 text-xs">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
              <th className="p-1.5 text-left border-r border-slate-300">#</th>
              <th className="p-1.5 text-left border-r border-slate-300">Criterion Name</th>
              <th className="p-1.5 text-right border-r border-slate-300">Weight</th>
              <th className="p-1.5 text-right border-r border-slate-300">Raw Score</th>
              <th className="p-1.5 text-right border-r border-slate-300">Contribution</th>
              <th className="p-1.5 text-center border-r border-slate-300">Status</th>
              <th className="p-1.5 text-left">Key Observation</th>
            </tr>
          </thead>
          <tbody>
            {criterionResults.map((item, i) => (
              <tr key={item.id} className="border-b border-slate-200">
                <td className="p-1.5 border-r border-slate-200 text-slate-500 font-mono">{i + 1}</td>
                <td className="p-1.5 border-r border-slate-200 font-bold">{item.name}</td>
                <td className="p-1.5 border-r border-slate-200 text-right">{item.weightPercentage}%</td>
                <td className="p-1.5 border-r border-slate-200 text-right font-bold">{item.rawScore.toFixed(1)}</td>
                <td className="p-1.5 border-r border-slate-200 text-right font-mono font-bold text-blue-900">
                  +{item.weightedContribution.toFixed(2)}
                </td>
                <td className="p-1.5 border-r border-slate-200 text-center font-medium">{item.status}</td>
                <td className="p-1.5 text-[11px] text-slate-600">{item.observation}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-100 font-bold text-slate-900 border-t-2 border-slate-400">
              <td colSpan={2} className="p-2 border-r border-slate-300">TOTAL WEIGHTED CALCULATION</td>
              <td className="p-2 text-right border-r border-slate-300">100%</td>
              <td className="p-2 text-right border-r border-slate-300">-</td>
              <td className="p-2 text-right border-r border-slate-300 text-blue-950 font-bold text-sm">
                {overallScore.toFixed(2)} pts
              </td>
              <td className="p-2 text-center border-r border-slate-300 uppercase">{rating}</td>
              <td className="p-2 text-[10px] text-slate-500 font-normal">
                {ratingBracket.summary}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Summary Rating Banner */}
      <div className="border-2 border-slate-900 rounded p-3 mb-4 flex justify-between items-center bg-slate-50 page-break-inside-avoid">
        <div>
          <div className="text-[10px] uppercase font-bold text-slate-500">Official Assigned Rating</div>
          <div className="text-xl font-extrabold text-slate-900">{rating} ({overallScore.toFixed(2)} / 100)</div>
          <div className="text-[11px] text-slate-600 mt-0.5">{ratingBracket.label}</div>
        </div>
        <div className="max-w-md text-right text-[11px] text-slate-600">
          <strong>Organizational Guidance:</strong> {ratingBracket.guidance}
        </div>
      </div>

      {/* Strengths & Action Plan */}
      <div className="grid grid-cols-2 gap-4 mb-4 page-break-inside-avoid">
        {/* Strengths */}
        <div className="border border-slate-300 rounded p-2.5">
          <div className="text-[10px] font-bold uppercase text-slate-600 mb-1 border-b border-slate-200 pb-1">
            Top Strengths
          </div>
          <div className="space-y-1.5 text-[11px]">
            {strengths.map((s) => (
              <div key={s.id}>
                <strong>{s.name} ({s.rawScore}/100):</strong> {s.observation}
              </div>
            ))}
          </div>
        </div>

        {/* Growth Focus */}
        <div className="border border-slate-300 rounded p-2.5">
          <div className="text-[10px] font-bold uppercase text-slate-600 mb-1 border-b border-slate-200 pb-1">
            Primary Improvement Areas
          </div>
          <div className="space-y-1.5 text-[11px]">
            {growthAreas.map((g) => (
              <div key={g.id}>
                <strong>{g.name} ({g.rawScore}/100):</strong> {g.observation}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3 Prioritized Actions */}
      <div className="border border-slate-300 rounded p-2.5 mb-4 page-break-inside-avoid">
        <div className="text-[10px] font-bold uppercase text-slate-600 mb-2 border-b border-slate-200 pb-1">
          Prioritized Action Plan (3-Step Development Goals)
        </div>
        <div className="grid grid-cols-3 gap-3 text-[11px]">
          {prioritizedActions.map((a) => (
            <div key={a.priority} className="border border-slate-200 rounded p-2 bg-slate-50">
              <div className="font-bold text-slate-900">
                Priority #{a.priority}: {a.actionTitle}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Target: {a.criterionName} · {a.timeline}
              </div>
              <p className="mt-1 text-slate-700 leading-snug">{a.recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Formal Sign-off Section */}
      <div className="border border-slate-300 rounded p-3 mb-3 page-break-inside-avoid">
        <div className="text-[10px] font-bold uppercase text-slate-500 mb-4 border-b border-slate-200 pb-1">
          Review Acknowledgement & Formal Signatures
        </div>
        <div className="grid grid-cols-2 gap-8 pt-4">
          <div>
            <div className="border-b border-slate-400 mb-1.5 h-8"></div>
            <div className="flex justify-between text-[10px] text-slate-600 font-semibold">
              <span>Evaluating Manager Signature</span>
              <span>Date</span>
            </div>
            <div className="text-[11px] font-medium text-slate-900 mt-1">
              {employeeInfo.managerName}
            </div>
          </div>
          <div>
            <div className="border-b border-slate-400 mb-1.5 h-8"></div>
            <div className="flex justify-between text-[10px] text-slate-600 font-semibold">
              <span>Employee Signature (Acknowledgement)</span>
              <span>Date</span>
            </div>
            <div className="text-[11px] font-medium text-slate-900 mt-1">
              {employeeInfo.employeeName}
            </div>
          </div>
        </div>
      </div>

      {/* Legal & Policy Disclaimer */}
      <div className="text-[9px] text-slate-400 text-center leading-tight">
        This document represents an objective, weighted performance assessment intended to guide developmental review conversations. It does not replace company HR governance or discretionary executive review.
      </div>
    </div>
  );
};
