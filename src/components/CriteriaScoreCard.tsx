import React from 'react';
import { Sliders, Award, AlertCircle, CheckCircle2 } from 'lucide-react';
import { EVALUATION_CRITERIA } from '../data/criteriaConfig';
import { ScoreInputMap } from '../types/performance';

interface CriteriaScoreCardProps {
  scores: ScoreInputMap;
  onChangeScore: (criterionId: string, value: number | string) => void;
  errors?: Record<string, string | undefined>;
}

const QUICK_SCORES = [60, 70, 80, 90, 100];

export const CriteriaScoreCard: React.FC<CriteriaScoreCardProps> = ({
  scores,
  onChangeScore,
  errors = {},
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-900" />
            Performance Evaluation Criteria
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Enter numerical scores from 0 to 100 (Weights total exactly 100%)
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-blue-900 bg-blue-50 px-2.5 py-1 rounded border border-blue-200">
            Total Weight: 100%
          </span>
          <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
            Step 2 of 2
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {EVALUATION_CRITERIA.map((criterion, index) => {
          const rawValue = scores[criterion.id];
          const numValue = Number(rawValue);
          const hasError = Boolean(errors[criterion.id]);
          const isValidNumber =
            rawValue !== '' && !isNaN(numValue) && numValue >= 0 && numValue <= 100;
          const weightedContribution = isValidNumber
            ? (numValue * criterion.weight).toFixed(2)
            : '0.00';

          return (
            <div
              key={criterion.id}
              className={`p-4 rounded-xl border transition-all ${
                hasError
                  ? 'border-rose-300 bg-rose-50/20'
                  : 'border-slate-200 hover:border-slate-300 bg-slate-50/40 hover:bg-white'
              }`}
            >
              {/* Header row */}
              <div className="flex items-start justify-between gap-3 mb-1.5">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-slate-400">
                      #{index + 1}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">
                      {criterion.name}
                    </h3>
                    <span className="text-[11px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      Weight: {criterion.weightPercentage}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {criterion.description}
                  </p>
                </div>

                {/* Weighted contribution badge */}
                <div className="text-right shrink-0">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Contribution
                  </div>
                  <div className="text-xs font-bold text-blue-900 font-mono-numbers">
                    +{weightedContribution} pts
                  </div>
                </div>
              </div>

              {/* Slider & Numeric Input Controls */}
              <div className="mt-3.5 pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row items-center gap-4">
                {/* Range slider */}
                <div className="w-full flex-1 flex items-center gap-2">
                  <span className="text-[11px] font-medium text-slate-400 w-6 text-right">
                    0
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={isValidNumber ? numValue : 0}
                    onChange={(e) => onChangeScore(criterion.id, Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900 focus:outline-none"
                  />
                  <span className="text-[11px] font-medium text-slate-400 w-7">
                    100
                  </span>
                </div>

                {/* Score Input Box with quick set buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="relative w-24">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="1"
                      value={rawValue !== undefined ? rawValue : ''}
                      onChange={(e) => onChangeScore(criterion.id, e.target.value)}
                      placeholder="0–100"
                      className={`w-full text-right font-bold text-sm pr-7 pl-2 py-1.5 rounded-lg border font-mono-numbers transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${
                        hasError
                          ? 'border-rose-400 bg-rose-50 text-rose-900 focus:border-rose-500'
                          : 'border-slate-300 bg-white text-slate-900 focus:border-blue-600'
                      }`}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 pointer-events-none">
                      /100
                    </span>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="hidden lg:flex items-center gap-1">
                    {QUICK_SCORES.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => onChangeScore(criterion.id, q)}
                        className={`text-[10px] font-semibold px-1.5 py-1 rounded transition-colors ${
                          numValue === q
                            ? 'bg-blue-900 text-white'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                        title={`Set score to ${q}`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Error message */}
              {hasError && (
                <div className="flex items-center gap-1.5 mt-2 text-rose-600 text-xs font-medium">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors[criterion.id]}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
