import React from 'react';
import {
  Award,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Target,
  Clock,
  Printer,
  Download,
  FileSpreadsheet,
  FileCode,
  ShieldAlert,
  Calendar,
  User,
  Briefcase,
  Building,
} from 'lucide-react';
import { EvaluationResult } from '../types/performance';
import { ScoreGauge } from './ScoreGauge';
import { downloadEvaluationCsv, downloadStandaloneHtmlFile } from '../utils/exportHtml';

interface ResultsDashboardProps {
  result: EvaluationResult;
  onPrint: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  result,
  onPrint,
}) => {
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
    <section id="results-dashboard" className="space-y-6 pt-2">
      {/* Executive Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Gauge Column */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-xs">
            <ScoreGauge score={overallScore} ratingBracket={ratingBracket} size={190} />

            <div className="mt-4 text-center">
              <span
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider ${ratingBracket.badgeColor}`}
              >
                <Award className="w-4 h-4" />
                Rating: {rating}
              </span>
              <p className="text-[11px] text-slate-300 mt-2">
                Score Band: {ratingBracket.label}
              </p>
            </div>
          </div>

          {/* Employee & Evaluation Summary Column */}
          <div className="lg:col-span-8 space-y-4">
            <div className="border-b border-white/10 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                  Official Evaluation Record
                </span>
                <span className="text-xs text-slate-300 font-mono-numbers">
                  Calculated: {calculatedAt}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
                {employeeInfo.employeeName}
              </h2>
              <p className="text-sm text-slate-300 font-medium">
                {employeeInfo.jobDesignation} · {employeeInfo.department} (ID: {employeeInfo.employeeId})
              </p>
            </div>

            {/* Assessment Summary */}
            <div className="space-y-3">
              <div>
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Performance Assessment
                </h3>
                <p className="text-sm text-slate-100 leading-relaxed mt-1">
                  {ratingBracket.summary}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-white/5 border-l-4 border-blue-400 text-xs text-slate-200">
                <span className="font-bold text-white block mb-0.5">
                  HR Guidance & Organizational Impact:
                </span>
                {ratingBracket.guidance}
              </div>
            </div>

            {/* Quick Metadata Chips */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-300">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Review Period
                </span>
                <span className="font-medium text-white">{employeeInfo.reviewPeriod}</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Review Date
                </span>
                <span className="font-medium text-white">{employeeInfo.reviewDate}</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Evaluating Manager
                </span>
                <span className="font-medium text-white">{employeeInfo.managerName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action bar inside banner */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 no-print">
          <div className="text-xs text-slate-300">
            Export evaluation summary or generate clean executive reports for printing.
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={onPrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-slate-700" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              type="button"
              onClick={() => downloadEvaluationCsv(result)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-blue-300" />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={downloadStandaloneHtmlFile}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-xs"
            >
              <FileCode className="w-3.5 h-3.5 text-white" />
              <span>Download Offline HTML App</span>
            </button>
          </div>
        </div>
      </div>

      {/* Breakdown Matrix Table */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Criteria Evaluation Breakdown Matrix
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Numerical formula: Weighted Contribution = Raw Score × Weight (Sum of weights = 100%)
            </p>
          </div>
          <span className="text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-md border border-blue-200 font-mono-numbers">
            Final: {overallScore.toFixed(2)} / 100
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                <th className="py-3 px-4">Evaluation Criterion</th>
                <th className="py-3 px-3 text-right">Weight</th>
                <th className="py-3 px-3 text-right">Score (0–100)</th>
                <th className="py-3 px-4 text-right">Weighted Pts</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-4">Performance Observation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {criterionResults.map((item, index) => {
                const isStrong = item.status === 'Strong';
                const isGrowth = item.status === 'Growth Area';

                return (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">
                        {index + 1}. {item.name}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                        {item.description}
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-right font-medium text-slate-600 font-mono-numbers">
                      {item.weightPercentage}%
                    </td>
                    <td className="py-3.5 px-3 text-right font-bold text-slate-900 font-mono-numbers">
                      {item.rawScore.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-blue-900 font-mono-numbers">
                      +{item.weightedContribution.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded ${
                          isStrong
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : isGrowth
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600 leading-relaxed">
                      {item.observation}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 border-t-2 border-slate-300 font-bold text-slate-900">
                <td className="py-3.5 px-4">
                  Overall Weighted Calculation
                </td>
                <td className="py-3.5 px-3 text-right font-mono-numbers">100%</td>
                <td className="py-3.5 px-3 text-right font-mono-numbers">-</td>
                <td className="py-3.5 px-4 text-right text-base text-blue-950 font-mono-numbers">
                  {overallScore.toFixed(2)} pts
                </td>
                <td className="py-3.5 px-3 text-center">
                  <span
                    className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded text-white ${ratingBracket.badgeColor}`}
                  >
                    {rating}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-xs text-slate-500 font-normal">
                  Calculated precisely via weighted 6-criteria formula
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Strengths & Growth Areas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strongest Areas */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Strongest Competencies & Key Assets
              </h3>
              <p className="text-xs text-slate-500">
                Top-performing criteria demonstrating consistent excellence
              </p>
            </div>
          </div>

          <div className="space-y-3.5 flex-1">
            {strengths.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-lg border border-emerald-100 bg-emerald-50/30"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    {item.name}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 font-mono-numbers bg-emerald-100/60 px-2 py-0.5 rounded">
                    Score: {item.rawScore.toFixed(0)}/100
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {item.observation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Growth & Developmental Focus */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-100">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Developmental Focus & Growth Gaps
              </h3>
              <p className="text-xs text-slate-500">
                Opportunities with greatest upside for performance elevation
              </p>
            </div>
          </div>

          <div className="space-y-3.5 flex-1">
            {growthAreas.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-lg border border-amber-100 bg-amber-50/30"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    {item.name}
                  </span>
                  <span className="text-xs font-bold text-amber-800 font-mono-numbers bg-amber-100/60 px-2 py-0.5 rounded">
                    Score: {item.rawScore.toFixed(0)}/100
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {item.observation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prioritized 3-Step Action Plan */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center">
              <Target className="w-4 h-4 text-blue-900" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Recommended 3-Step Action Plan
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Targeted, objective improvements prioritized by individual criteria scores
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Review Milestones
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {prioritizedActions.map((action) => (
            <div
              key={action.priority}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-extrabold text-blue-900 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Priority #{action.priority}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {action.timeline}
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-500 mb-1">
                  Focus: {action.criterionName} (Current: {action.currentScore}/100)
                </div>

                <h4 className="text-sm font-bold text-slate-900 mb-2">
                  {action.actionTitle}
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {action.recommendation}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Target Outcome:</span>{' '}
                {action.expectedOutcome}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decision-Support Policy Disclaimer */}
      <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
        <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-800">Decision-Support Notice:</strong> This performance calculation is an objective decision-support tool configured to assist managers during structured review dialogues. Final employment decisions, merit adjustments, promotions, or performance improvement actions should reflect holistic managerial appraisal, peer feedback, and formal organizational HR guidelines.
        </p>
      </div>
    </section>
  );
};
