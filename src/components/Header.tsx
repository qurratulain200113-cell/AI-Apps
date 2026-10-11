import React from 'react';
import {
  Printer,
  RotateCcw,
  HelpCircle,
  Sparkles,
  Building2,
  FileCode,
} from 'lucide-react';
import { SAMPLE_PRESETS } from '../data/criteriaConfig';
import { EmployeeInfo, ScoreInputMap } from '../types/performance';
import { downloadStandaloneHtmlFile } from '../utils/exportHtml';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  onResetClick: () => void;
  onPrintClick: () => void;
  onOpenHelp: () => void;
  onOpenAndroidGuide: () => void;
  onApplyPreset: (info: EmployeeInfo, scores: ScoreInputMap) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onResetClick,
  onPrintClick,
  onOpenHelp,
  onOpenAndroidGuide,
  onApplyPreset,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-900 to-blue-950 text-white flex items-center justify-center shadow-xs">
            <Building2 className="w-5 h-5 text-blue-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight leading-tight">
                Employee Performance Calculator
              </h1>
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                HR Suite
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Weighted 100-point scoring matrix &amp; actionable development planning
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap no-print">
          {/* PWA / Android Install Button */}
          <PWAInstallButton onOpenGuide={onOpenAndroidGuide} />

          {/* Preset Selector */}
          <div className="relative group">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors border border-slate-200"
              title="Load quick testing scenarios"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Test Presets</span>
            </button>
            <div className="absolute right-0 mt-1 w-64 bg-white border border-slate-200 rounded-lg shadow-lg py-1.5 hidden group-hover:block hover:block z-50">
              <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Benchmark Testing Profiles
              </div>
              {SAMPLE_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onApplyPreset(preset.info, preset.scores)}
                  className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-blue-700 transition-colors flex items-center justify-between"
                >
                  <span className="font-medium">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Standalone HTML File Download */}
          <button
            type="button"
            onClick={downloadStandaloneHtmlFile}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-md transition-colors"
            title="Download self-contained offline HTML file"
          >
            <FileCode className="w-3.5 h-3.5 text-blue-600" />
            <span>Download .html</span>
          </button>

          {/* User Guide */}
          <button
            type="button"
            onClick={onOpenHelp}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-md transition-colors"
            title="Step-by-step user guide and testing tips"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>Instructions</span>
          </button>

          {/* Print Button */}
          <button
            type="button"
            onClick={onPrintClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-md transition-colors"
            title="Print or save as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print / PDF</span>
          </button>

          {/* Reset Button */}
          <button
            type="button"
            onClick={onResetClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-md transition-colors"
            title="Clear all fields"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};

