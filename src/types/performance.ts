export interface EmployeeInfo {
  employeeName: string;
  employeeId: string;
  department: string;
  jobDesignation: string;
  managerName: string;
  reviewPeriod: string;
  reviewDate: string;
}

export interface ScoreInputMap {
  [key: string]: number | string;
}

export interface CriterionDefinition {
  id: string;
  name: string;
  weight: number; // e.g. 0.25
  weightPercentage: number; // 25
  description: string;
  highThreshold: number; // 85
  lowThreshold: number; // 70
}

export interface CriterionScoreResult {
  id: string;
  name: string;
  weight: number;
  weightPercentage: number;
  rawScore: number;
  weightedContribution: number;
  description: string;
  status: 'Strong' | 'Satisfactory' | 'Growth Area';
  observation: string;
}

export type PerformanceRating =
  | 'Excellent'
  | 'Very Good'
  | 'Good'
  | 'Satisfactory'
  | 'Needs Improvement';

export interface RatingBracket {
  rating: PerformanceRating;
  minScore: number;
  maxScore: number;
  label: string;
  badgeColor: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
  summary: string;
  guidance: string;
}

export interface ImprovementAction {
  priority: number;
  criterionName: string;
  currentScore: number;
  actionTitle: string;
  recommendation: string;
  timeline: string;
  expectedOutcome: string;
}

export interface EvaluationResult {
  employeeInfo: EmployeeInfo;
  criterionResults: CriterionScoreResult[];
  overallScore: number;
  rating: PerformanceRating;
  ratingBracket: RatingBracket;
  strengths: CriterionScoreResult[];
  growthAreas: CriterionScoreResult[];
  prioritizedActions: ImprovementAction[];
  calculatedAt: string;
}
