import React from 'react';
import { User, Briefcase, Calendar, Building, ShieldCheck, Hash } from 'lucide-react';
import { EmployeeInfo } from '../types/performance';

interface EmployeeInfoCardProps {
  info: EmployeeInfo;
  onChange: (field: keyof EmployeeInfo, value: string) => void;
  errors?: Partial<Record<keyof EmployeeInfo, string>>;
}

const REVIEW_PERIOD_OPTIONS = [
  'Annual Review 2026',
  'Annual Review 2025',
  'Q1 2026',
  'Q2 2026',
  'Q3 2026',
  'Q4 2026',
  'Mid-Year Review 2026',
  'Probationary 90-Day Review',
  'Custom Period',
];

export const EmployeeInfoCard: React.FC<EmployeeInfoCardProps> = ({
  info,
  onChange,
  errors = {},
}) => {
  const isCustomPeriod =
    !REVIEW_PERIOD_OPTIONS.includes(info.reviewPeriod) && info.reviewPeriod !== '';

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <User className="w-4 h-4 text-blue-900" />
            Employee Information
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Essential record details for identification and organizational audit trails
          </p>
        </div>
        <span className="text-[11px] font-medium text-slate-400 bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
          Step 1 of 2
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Employee Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Employee Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={info.employeeName}
              onChange={(e) => onChange('employeeName', e.target.value)}
              placeholder="e.g. Eleanor Vance"
              className={`w-full text-sm px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${
                errors.employeeName
                  ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500'
                  : 'border-slate-300 focus:border-blue-600'
              }`}
            />
          </div>
          {errors.employeeName && (
            <p className="text-[11px] text-rose-600 mt-1 font-medium">
              {errors.employeeName}
            </p>
          )}
        </div>

        {/* Employee ID */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Employee ID <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={info.employeeId}
              onChange={(e) => onChange('employeeId', e.target.value)}
              placeholder="e.g. EMP-4092"
              className={`w-full text-sm px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${
                errors.employeeId
                  ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500'
                  : 'border-slate-300 focus:border-blue-600'
              }`}
            />
          </div>
          {errors.employeeId && (
            <p className="text-[11px] text-rose-600 mt-1 font-medium">
              {errors.employeeId}
            </p>
          )}
        </div>

        {/* Department */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Department <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={info.department}
              onChange={(e) => onChange('department', e.target.value)}
              placeholder="e.g. Engineering & Technology"
              className={`w-full text-sm px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${
                errors.department
                  ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500'
                  : 'border-slate-300 focus:border-blue-600'
              }`}
            />
          </div>
          {errors.department && (
            <p className="text-[11px] text-rose-600 mt-1 font-medium">
              {errors.department}
            </p>
          )}
        </div>

        {/* Job Designation */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Job Designation / Title <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={info.jobDesignation}
              onChange={(e) => onChange('jobDesignation', e.target.value)}
              placeholder="e.g. Lead Systems Architect"
              className={`w-full text-sm px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${
                errors.jobDesignation
                  ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500'
                  : 'border-slate-300 focus:border-blue-600'
              }`}
            />
          </div>
          {errors.jobDesignation && (
            <p className="text-[11px] text-rose-600 mt-1 font-medium">
              {errors.jobDesignation}
            </p>
          )}
        </div>

        {/* Manager Name */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Evaluating Manager / Reviewer Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={info.managerName}
              onChange={(e) => onChange('managerName', e.target.value)}
              placeholder="e.g. David Vance (Engineering Director)"
              className={`w-full text-sm px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${
                errors.managerName
                  ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500'
                  : 'border-slate-300 focus:border-blue-600'
              }`}
            />
          </div>
          {errors.managerName && (
            <p className="text-[11px] text-rose-600 mt-1 font-medium">
              {errors.managerName}
            </p>
          )}
        </div>

        {/* Review Period */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Performance Review Period <span className="text-rose-500">*</span>
          </label>
          <div className="space-y-2">
            <select
              value={isCustomPeriod ? 'Custom Period' : info.reviewPeriod}
              onChange={(e) => {
                if (e.target.value === 'Custom Period') {
                  onChange('reviewPeriod', '');
                } else {
                  onChange('reviewPeriod', e.target.value);
                }
              }}
              className={`w-full text-sm px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${
                errors.reviewPeriod
                  ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500'
                  : 'border-slate-300 focus:border-blue-600'
              }`}
            >
              <option value="">Select Review Period...</option>
              {REVIEW_PERIOD_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            {isCustomPeriod && (
              <input
                type="text"
                value={info.reviewPeriod}
                onChange={(e) => onChange('reviewPeriod', e.target.value)}
                placeholder="Enter custom period (e.g. H1 2026 or Special Project)"
                className="w-full text-sm px-3.5 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-900 focus:outline-none focus:border-blue-600"
              />
            )}
          </div>
          {errors.reviewPeriod && (
            <p className="text-[11px] text-rose-600 mt-1 font-medium">
              {errors.reviewPeriod}
            </p>
          )}
        </div>

        {/* Review Date */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Review Date <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="date"
              value={info.reviewDate}
              onChange={(e) => onChange('reviewDate', e.target.value)}
              className={`w-full text-sm px-3.5 py-2.5 rounded-lg border bg-white text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600/20 ${
                errors.reviewDate
                  ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500'
                  : 'border-slate-300 focus:border-blue-600'
              }`}
            />
          </div>
          {errors.reviewDate && (
            <p className="text-[11px] text-rose-600 mt-1 font-medium">
              {errors.reviewDate}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
