import {
  EmployeeInfo,
  EvaluationResult,
  CriterionScoreResult,
  PerformanceRating,
  RatingBracket,
  ImprovementAction,
  ScoreInputMap,
} from '../types/performance';
import {
  EVALUATION_CRITERIA,
  RATING_BRACKETS,
  FEEDBACK_RULES,
} from '../data/criteriaConfig';

export interface ValidationErrors {
  employeeInfo?: Partial<Record<keyof EmployeeInfo, string>>;
  scores?: Record<string, string | undefined>;
  general?: string;
}

export function validateEvaluationInputs(
  info: EmployeeInfo,
  rawScores: ScoreInputMap
): { isValid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {
    employeeInfo: {},
    scores: {},
  };
  let isValid = true;

  // Validate employee info
  if (!info.employeeName || info.employeeName.trim() === '') {
    errors.employeeInfo!.employeeName = 'Employee name is required.';
    isValid = false;
  }
  if (!info.employeeId || info.employeeId.trim() === '') {
    errors.employeeInfo!.employeeId = 'Employee ID is required.';
    isValid = false;
  }
  if (!info.department || info.department.trim() === '') {
    errors.employeeInfo!.department = 'Department is required.';
    isValid = false;
  }
  if (!info.jobDesignation || info.jobDesignation.trim() === '') {
    errors.employeeInfo!.jobDesignation = 'Job designation is required.';
    isValid = false;
  }
  if (!info.managerName || info.managerName.trim() === '') {
    errors.employeeInfo!.managerName = 'Manager / Evaluator name is required.';
    isValid = false;
  }
  if (!info.reviewPeriod || info.reviewPeriod.trim() === '') {
    errors.employeeInfo!.reviewPeriod = 'Review period is required.';
    isValid = false;
  }
  if (!info.reviewDate || info.reviewDate.trim() === '') {
    errors.employeeInfo!.reviewDate = 'Review date is required.';
    isValid = false;
  }

  // Validate all 6 criteria scores
  EVALUATION_CRITERIA.forEach((criterion) => {
    const rawVal = rawScores[criterion.id];
    if (rawVal === undefined || rawVal === null || rawVal === '') {
      errors.scores![criterion.id] = `${criterion.name} score is required (0–100).`;
      isValid = false;
      return;
    }

    const numVal = Number(rawVal);
    if (isNaN(numVal)) {
      errors.scores![criterion.id] = 'Score must be a valid numeric number.';
      isValid = false;
    } else if (numVal < 0) {
      errors.scores![criterion.id] = 'Score cannot be negative (min 0).';
      isValid = false;
    } else if (numVal > 100) {
      errors.scores![criterion.id] = 'Score cannot exceed 100 (max 100).';
      isValid = false;
    }
  });

  return { isValid, errors };
}

export function getRatingBracket(score: number): RatingBracket {
  // Clamp score cleanly between 0 and 100
  const clampedScore = Math.max(0, Math.min(100, score));

  // Precision tolerance for float comparisons (e.g. 89.9999999)
  const rounded = Number(clampedScore.toFixed(2));

  if (rounded >= 90.0) {
    return RATING_BRACKETS.find((b) => b.rating === 'Excellent')!;
  } else if (rounded >= 80.0) {
    return RATING_BRACKETS.find((b) => b.rating === 'Very Good')!;
  } else if (rounded >= 70.0) {
    return RATING_BRACKETS.find((b) => b.rating === 'Good')!;
  } else if (rounded >= 60.0) {
    return RATING_BRACKETS.find((b) => b.rating === 'Satisfactory')!;
  } else {
    return RATING_BRACKETS.find((b) => b.rating === 'Needs Improvement')!;
  }
}

export function calculatePerformance(
  info: EmployeeInfo,
  rawScores: ScoreInputMap
): EvaluationResult {
  let overallScoreRaw = 0;

  const criterionResults: CriterionScoreResult[] = EVALUATION_CRITERIA.map(
    (crit) => {
      const scoreVal = Math.max(
        0,
        Math.min(100, Number(rawScores[crit.id]) || 0)
      );
      const weightedContrib = scoreVal * crit.weight;
      overallScoreRaw += weightedContrib;

      const rule = FEEDBACK_RULES[crit.id] || {
        highObservation: 'High performance demonstrated.',
        moderateObservation: 'Consistent solid performance.',
        lowObservation: 'Improvement required.',
        actionTitle: 'Performance Enhancement',
        recommendation: 'Targeted skill coaching and goal alignment.',
        timeline: '30 Days',
        expectedOutcome: 'Measurable metric improvement.',
      };

      let status: 'Strong' | 'Satisfactory' | 'Growth Area';
      let observation: string;

      if (scoreVal >= crit.highThreshold) {
        status = 'Strong';
        observation = rule.highObservation;
      } else if (scoreVal < crit.lowThreshold) {
        status = 'Growth Area';
        observation = rule.lowObservation;
      } else {
        status = 'Satisfactory';
        observation = rule.moderateObservation;
      }

      return {
        id: crit.id,
        name: crit.name,
        weight: crit.weight,
        weightPercentage: crit.weightPercentage,
        rawScore: scoreVal,
        weightedContribution: Number(weightedContrib.toFixed(2)),
        description: crit.description,
        status,
        observation,
      };
    }
  );

  // Round overall score to 2 decimal places
  const overallScore = Number(overallScoreRaw.toFixed(2));
  const ratingBracket = getRatingBracket(overallScore);
  const rating: PerformanceRating = ratingBracket.rating;

  // Strengths: sort descending by raw score
  // If scores are all equal, rank by highest weight
  const sortedByScoreDesc = [...criterionResults].sort((a, b) => {
    if (b.rawScore !== a.rawScore) return b.rawScore - a.rawScore;
    return b.weight - a.weight;
  });

  // Strengths: top criteria (score >= 75 or top 2 highest)
  const strongList = sortedByScoreDesc.filter((c) => c.rawScore >= 75);
  const strengths = strongList.length > 0 ? strongList.slice(0, 3) : [sortedByScoreDesc[0]];

  // Growth areas: sort ascending by raw score
  const sortedByScoreAsc = [...criterionResults].sort((a, b) => {
    if (a.rawScore !== b.rawScore) return a.rawScore - b.rawScore;
    return b.weight - a.weight; // higher weight should take priority for improvement
  });

  // Areas with score < 80 or the lowest 3
  const lowList = sortedByScoreAsc.filter((c) => c.rawScore < 80);
  const growthAreas = lowList.length > 0 ? lowList.slice(0, 3) : [sortedByScoreAsc[0]];

  // Generate 3 prioritized improvement actions based on the lowest scoring criteria
  const prioritizedActions: ImprovementAction[] = sortedByScoreAsc
    .slice(0, 3)
    .map((crit, idx) => {
      const rule = FEEDBACK_RULES[crit.id] || {
        actionTitle: `Strengthen ${crit.name}`,
        recommendation: `Develop targeted competencies in ${crit.name.toLowerCase()} with manager check-ins.`,
        timeline: '30 Days',
        expectedOutcome: 'Measurable improvement in quarterly outcomes.',
      };

      // Tailor recommendation context if score is already 100 (for excellence continuous learning)
      let customRec = rule.recommendation;
      let customTitle = rule.actionTitle;
      if (crit.rawScore >= 95) {
        customTitle = `Mastery & Mentorship in ${crit.name}`;
        customRec = `Leverage mastery in this area to mentor peers, formalize internal best practices, and lead organizational initiatives.`;
      } else if (crit.rawScore >= 80) {
        customTitle = `Advanced Optimization in ${crit.name}`;
        customRec = `Fine-tune performance from high-competency to standout excellence through strategic stretch goals and peer knowledge exchange.`;
      }

      return {
        priority: idx + 1,
        criterionName: crit.name,
        currentScore: crit.rawScore,
        actionTitle: customTitle,
        recommendation: customRec,
        timeline: rule.timeline,
        expectedOutcome: rule.expectedOutcome,
      };
    });

  return {
    employeeInfo: { ...info },
    criterionResults,
    overallScore,
    rating,
    ratingBracket,
    strengths,
    growthAreas,
    prioritizedActions,
    calculatedAt: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
  };
}
