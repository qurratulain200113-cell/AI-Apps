import React from 'react';
import { RatingBracket } from '../types/performance';

interface ScoreGaugeProps {
  score: number;
  ratingBracket: RatingBracket;
  size?: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  ratingBracket,
  size = 180,
}) => {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Score percentage clamped between 0 and 100
  const normalizedScore = Math.max(0, Math.min(100, score));
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  const getColorHex = (rating: string) => {
    switch (rating) {
      case 'Excellent':
        return '#059669'; // Emerald
      case 'Very Good':
        return '#2563eb'; // Blue
      case 'Good':
        return '#0d9488'; // Teal
      case 'Satisfactory':
        return '#d97706'; // Amber
      default:
        return '#e11d48'; // Rose
    }
  };

  const activeColor = getColorHex(ratingBracket.rating);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90 w-full h-full"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap="round"
          />

          {/* Calibrated Threshold Markers */}
          {/* 60 threshold */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#cbd5e1"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`2 ${circumference}`}
            strokeDashoffset={circumference - 0.6 * circumference}
          />

          {/* 70 threshold */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#cbd5e1"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`2 ${circumference}`}
            strokeDashoffset={circumference - 0.7 * circumference}
          />

          {/* 80 threshold */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#cbd5e1"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`2 ${circumference}`}
            strokeDashoffset={circumference - 0.8 * circumference}
          />

          {/* 90 threshold */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#cbd5e1"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`2 ${circumference}`}
            strokeDashoffset={circumference - 0.9 * circumference}
          />

          {/* Filled Progress Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={activeColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Score Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Overall Score
          </span>
          <span
            className="text-4xl font-extrabold tracking-tight font-mono-numbers"
            style={{ color: activeColor }}
          >
            {score.toFixed(2)}
          </span>
          <span className="text-xs font-semibold text-slate-400">
            out of 100.00
          </span>
        </div>
      </div>

      {/* Threshold Legend Bar */}
      <div className="w-full mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-slate-400 px-2 font-mono-numbers">
        <span>0</span>
        <span className="text-rose-500">60</span>
        <span className="text-amber-500">70</span>
        <span className="text-teal-600">80</span>
        <span className="text-blue-600">90</span>
        <span className="text-emerald-600">100</span>
      </div>
    </div>
  );
};
