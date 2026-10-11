import { EvaluationResult } from '../types/performance';

/**
 * Generates the complete, standalone, self-contained HTML application
 * containing all HTML, CSS, and JavaScript in a single file without external dependencies.
 */
export function generateStandaloneAppHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Employee Performance Calculator</title>
  <style>
    :root {
      --navy-950: #0a1128;
      --navy-900: #0f172a;
      --navy-800: #1e293b;
      --navy-700: #334155;
      --blue-600: #2563eb;
      --blue-700: #1d4ed8;
      --slate-50: #f8fafc;
      --slate-100: #f1f5f9;
      --slate-200: #e2e8f0;
      --slate-300: #cbd5e1;
      --slate-400: #94a3b8;
      --slate-500: #64748b;
      --slate-600: #475569;
      --slate-700: #334155;
      --emerald-600: #059669;
      --emerald-50: #ecfdf5;
      --emerald-700: #047857;
      --amber-600: #d97706;
      --amber-50: #fffbeb;
      --amber-700: #b45309;
      --rose-600: #e11d48;
      --rose-50: #fff1f2;
      --rose-700: #be123c;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background-color: var(--slate-50);
      color: var(--navy-900);
      line-height: 1.5;
      padding: 0;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px 20px 60px 20px;
    }
    header {
      background-color: #ffffff;
      border-bottom: 1px solid var(--slate-200);
      padding: 18px 24px;
      position: sticky;
      top: 0;
      z-index: 30;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .header-inner {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }
    .logo-area {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .logo-icon {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #1e3a8a, #0f172a);
      color: #ffffff;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 18px;
      letter-spacing: -0.5px;
    }
    .logo-text h1 {
      font-size: 18px;
      font-weight: 700;
      color: var(--navy-900);
      letter-spacing: -0.3px;
    }
    .logo-text p {
      font-size: 12px;
      color: var(--slate-500);
    }
    .header-actions {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
    }
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 9px 16px;
      font-size: 13px;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.15s ease;
      text-decoration: none;
      border: 1px solid transparent;
      user-select: none;
    }
    .btn-primary {
      background-color: var(--navy-900);
      color: #ffffff;
    }
    .btn-primary:hover {
      background-color: #1e293b;
    }
    .btn-outline {
      background-color: #ffffff;
      border-color: var(--slate-300);
      color: var(--slate-700);
    }
    .btn-outline:hover {
      background-color: var(--slate-100);
      color: var(--navy-900);
    }
    .btn-danger {
      background-color: #ffffff;
      border-color: #fecdd3;
      color: #be123c;
    }
    .btn-danger:hover {
      background-color: #fff1f2;
    }
    .btn-sm {
      padding: 6px 12px;
      font-size: 12px;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-top: 24px;
    }
    @media (max-width: 900px) {
      .grid-2 { grid-template-columns: 1fr; }
    }
    .card {
      background: #ffffff;
      border: 1px solid var(--slate-200);
      border-radius: 8px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    }
    .card-header {
      padding-bottom: 16px;
      margin-bottom: 20px;
      border-bottom: 1px solid var(--slate-100);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .card-title {
      font-size: 16px;
      font-weight: 700;
      color: var(--navy-900);
      letter-spacing: -0.2px;
    }
    .card-subtitle {
      font-size: 12px;
      color: var(--slate-500);
      margin-top: 2px;
    }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    @media (max-width: 600px) {
      .form-grid { grid-template-columns: 1fr; }
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .form-group.full-width {
      grid-column: 1 / -1;
    }
    label {
      font-size: 12px;
      font-weight: 600;
      color: var(--slate-700);
      display: flex;
      justify-content: space-between;
    }
    label .req {
      color: #e11d48;
    }
    input[type="text"], input[type="date"], select, input[type="number"] {
      padding: 9px 12px;
      border: 1px solid var(--slate-300);
      border-radius: 6px;
      font-size: 13px;
      color: var(--navy-900);
      background-color: #ffffff;
      outline: none;
      transition: border-color 0.15s, box-shadow 0.15s;
      width: 100%;
    }
    input:focus, select:focus {
      border-color: var(--blue-600);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
    }
    .error-msg {
      font-size: 11px;
      color: #e11d48;
      display: none;
      margin-top: 2px;
    }
    .has-error input, .has-error select {
      border-color: #e11d48;
      background-color: #fff1f2;
    }
    .has-error .error-msg {
      display: block;
    }
    .criterion-item {
      padding: 16px;
      border: 1px solid var(--slate-200);
      border-radius: 6px;
      margin-bottom: 14px;
      background: #fafbfc;
      transition: border-color 0.15s;
    }
    .criterion-item:focus-within {
      border-color: var(--blue-600);
      background: #ffffff;
    }
    .criterion-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 8px;
      gap: 12px;
    }
    .criterion-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--navy-900);
    }
    .criterion-weight {
      font-size: 12px;
      font-weight: 700;
      color: #1e3a8a;
      background: #eff6ff;
      padding: 2px 8px;
      border-radius: 4px;
      border: 1px solid #dbeafe;
      white-space: nowrap;
    }
    .criterion-desc {
      font-size: 12px;
      color: var(--slate-500);
      margin-bottom: 12px;
      line-height: 1.4;
    }
    .score-controls {
      display: grid;
      grid-template-columns: 1fr 100px;
      gap: 16px;
      align-items: center;
    }
    input[type="range"] {
      width: 100%;
      accent-color: #1e3a8a;
      cursor: pointer;
    }
    .score-input-box {
      position: relative;
    }
    .score-input-box input {
      padding-right: 30px;
      font-weight: 700;
      text-align: right;
    }
    .score-input-box span {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 11px;
      color: var(--slate-400);
      font-weight: 600;
      pointer-events: none;
    }
    .preset-bar {
      margin-top: 16px;
      padding: 12px 16px;
      background: #ffffff;
      border: 1px solid var(--slate-200);
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .preset-label {
      font-size: 12px;
      font-weight: 700;
      color: var(--slate-700);
      white-space: nowrap;
    }
    .preset-btn {
      background: var(--slate-100);
      border: 1px solid var(--slate-300);
      padding: 4px 10px;
      font-size: 11px;
      font-weight: 600;
      color: var(--slate-700);
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.1s;
    }
    .preset-btn:hover {
      background: var(--navy-900);
      color: #ffffff;
      border-color: var(--navy-900);
    }
    /* Results Dashboard */
    #resultsSection {
      display: none;
      margin-top: 28px;
    }
    .results-hero {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      color: #ffffff;
      border-radius: 8px;
      padding: 32px;
      margin-bottom: 24px;
      display: grid;
      grid-template-columns: 280px 1fr;
      gap: 32px;
      align-items: center;
    }
    @media (max-width: 800px) {
      .results-hero { grid-template-columns: 1fr; text-align: center; }
    }
    .score-circle-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      padding: 24px 20px;
    }
    .score-large {
      font-size: 54px;
      font-weight: 800;
      line-height: 1;
      letter-spacing: -1.5px;
      font-variant-numeric: tabular-nums;
    }
    .score-sub {
      font-size: 13px;
      color: var(--slate-300);
      margin-top: 6px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .rating-badge {
      display: inline-block;
      margin-top: 14px;
      padding: 6px 16px;
      border-radius: 4px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .rating-badge.excellent { background: #059669; color: #ffffff; }
    .rating-badge.very-good { background: #2563eb; color: #ffffff; }
    .rating-badge.good { background: #0d9488; color: #ffffff; }
    .rating-badge.satisfactory { background: #d97706; color: #ffffff; }
    .rating-badge.needs-improvement { background: #e11d48; color: #ffffff; }

    .summary-details h2 {
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 6px;
    }
    .summary-meta {
      font-size: 13px;
      color: var(--slate-300);
      margin-bottom: 16px;
    }
    .summary-desc {
      font-size: 14px;
      color: var(--slate-200);
      line-height: 1.6;
      max-width: 700px;
    }
    .guidance-box {
      margin-top: 14px;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.08);
      border-left: 3px solid #60a5fa;
      border-radius: 4px;
      font-size: 13px;
      color: #e2e8f0;
    }
    /* Breakdown Table */
    .table-container {
      overflow-x: auto;
      margin-top: 12px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
      text-align: left;
    }
    th {
      background: var(--slate-100);
      padding: 10px 14px;
      font-weight: 700;
      color: var(--slate-700);
      border-bottom: 1px solid var(--slate-200);
    }
    td {
      padding: 12px 14px;
      border-bottom: 1px solid var(--slate-100);
      color: var(--slate-700);
    }
    tr:last-child td {
      border-bottom: none;
    }
    .score-cell {
      font-weight: 700;
      color: var(--navy-900);
    }
    .contrib-cell {
      font-weight: 700;
      color: #1e3a8a;
      font-family: monospace;
      font-size: 13px;
    }
    .status-tag {
      font-size: 11px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 4px;
      display: inline-block;
    }
    .status-strong { background: #ecfdf5; color: #047857; }
    .status-sat { background: #f1f5f9; color: #475569; }
    .status-growth { background: #fff1f2; color: #be123c; }

    .action-step-card {
      border: 1px solid var(--slate-200);
      border-radius: 6px;
      padding: 16px;
      margin-bottom: 12px;
      background: #fafbfc;
    }
    .action-step-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    .action-step-num {
      font-size: 11px;
      font-weight: 800;
      color: #1e3a8a;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .action-step-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--navy-900);
    }
    .action-step-timeline {
      font-size: 11px;
      font-weight: 600;
      color: var(--slate-500);
      background: #ffffff;
      padding: 2px 8px;
      border-radius: 4px;
      border: 1px solid var(--slate-200);
    }
    .action-step-body {
      font-size: 13px;
      color: var(--slate-600);
      margin-top: 4px;
    }
    .disclaimer-box {
      margin-top: 32px;
      padding: 16px 20px;
      background: #f8fafc;
      border: 1px solid var(--slate-200);
      border-radius: 6px;
      font-size: 12px;
      color: var(--slate-500);
      line-height: 1.6;
    }

    /* Print Stylesheet */
    @media print {
      body { background: #ffffff !important; color: #000000 !important; }
      header, .no-print, .preset-bar, #calculateBtn, #resetBtn { display: none !important; }
      #resultsSection { display: block !important; margin-top: 0 !important; }
      .container { max-width: 100% !important; padding: 0 !important; }
      .card { border: 1px solid #ccc !important; box-shadow: none !important; margin-bottom: 16px !important; }
      .results-hero { background: #0f172a !important; color: #ffffff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>

  <header>
    <div class="header-inner">
      <div class="logo-area">
        <div class="logo-icon">EP</div>
        <div class="logo-text">
          <h1>Employee Performance Calculator</h1>
          <p>HR Evaluation, Weighted Scoring & Actionable Development</p>
        </div>
      </div>
      <div class="header-actions no-print">
        <button type="button" class="btn btn-outline btn-sm" onclick="window.print()">
          🖨️ Print / Save PDF
        </button>
        <button type="button" class="btn btn-danger btn-sm" onclick="confirmReset()">
          🔄 Reset Form
        </button>
        <button type="button" class="btn btn-primary" onclick="handleCalculate()">
          ✓ Calculate Performance
        </button>
      </div>
    </div>
  </header>

  <div class="container">
    
    <!-- Quick Testing Bar -->
    <div class="preset-bar no-print">
      <span class="preset-label">Quick Test Presets:</span>
      <button type="button" class="preset-btn" onclick="applyPreset(100)">All 100 (Excellent)</button>
      <button type="button" class="preset-btn" onclick="applyPreset(80)">All 80 (Very Good)</button>
      <button type="button" class="preset-btn" onclick="applyPreset(70)">All 70 (Good)</button>
      <button type="button" class="preset-btn" onclick="applyPreset(60)">All 60 (Satisfactory)</button>
      <button type="button" class="preset-btn" onclick="applyPreset(0)">All 0 (Needs Improvement)</button>
      <button type="button" class="preset-btn" onclick="loadSampleReview()">Realistic Sample</button>
    </div>

    <form id="evalForm" onsubmit="event.preventDefault(); handleCalculate();">
      <div class="grid-2">
        <!-- Employee Info Card -->
        <div class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">Employee Information</h2>
              <p class="card-subtitle">Essential details for official HR records</p>
            </div>
          </div>
          <div class="form-grid">
            <div class="form-group" id="group_name">
              <label for="empName">Employee Name <span class="req">*</span></label>
              <input type="text" id="empName" placeholder="e.g. Jane Doe" required>
              <span class="error-msg">Employee name is required.</span>
            </div>

            <div class="form-group" id="group_id">
              <label for="empId">Employee ID <span class="req">*</span></label>
              <input type="text" id="empId" placeholder="e.g. EMP-2041" required>
              <span class="error-msg">Employee ID is required.</span>
            </div>

            <div class="form-group" id="group_dept">
              <label for="empDept">Department <span class="req">*</span></label>
              <input type="text" id="empDept" placeholder="e.g. Product Engineering" required>
              <span class="error-msg">Department is required.</span>
            </div>

            <div class="form-group" id="group_desig">
              <label for="empDesig">Job Designation <span class="req">*</span></label>
              <input type="text" id="empDesig" placeholder="e.g. Senior Software Engineer" required>
              <span class="error-msg">Job designation is required.</span>
            </div>

            <div class="form-group full-width" id="group_mgr">
              <label for="mgrName">Manager / Evaluator Name <span class="req">*</span></label>
              <input type="text" id="mgrName" placeholder="e.g. Sarah Connor" required>
              <span class="error-msg">Manager name is required.</span>
            </div>

            <div class="form-group" id="group_period">
              <label for="reviewPeriod">Review Period <span class="req">*</span></label>
              <select id="reviewPeriod" required>
                <option value="">Select Period...</option>
                <option value="Annual Review 2026">Annual Review 2026</option>
                <option value="Annual Review 2025">Annual Review 2025</option>
                <option value="Q1 2026">Q1 2026</option>
                <option value="Q2 2026">Q2 2026</option>
                <option value="Q3 2026">Q3 2026</option>
                <option value="Q4 2026">Q4 2026</option>
                <option value="Mid-Year Review 2026">Mid-Year Review 2026</option>
                <option value="Probationary 90-Day Review">Probationary 90-Day Review</option>
              </select>
              <span class="error-msg">Review period is required.</span>
            </div>

            <div class="form-group" id="group_date">
              <label for="reviewDate">Review Date <span class="req">*</span></label>
              <input type="date" id="reviewDate" required>
              <span class="error-msg">Review date is required.</span>
            </div>
          </div>
        </div>

        <!-- Performance Criteria Scores Card -->
        <div class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">Performance Evaluation Criteria</h2>
              <p class="card-subtitle">Six core criteria (Scores: 0 to 100, Weights total: 100%)</p>
            </div>
          </div>

          <!-- Criterion 1 -->
          <div class="criterion-item" id="crit_quality">
            <div class="criterion-top">
              <span class="criterion-title">1. Quality of Work</span>
              <span class="criterion-weight">Weight: 25%</span>
            </div>
            <div class="criterion-desc">Accuracy, thoroughness, standard compliance, and consistency of work deliverables.</div>
            <div class="score-controls">
              <input type="range" id="range_quality" min="0" max="100" value="85" oninput="syncScore('quality', this.value)">
              <div class="score-input-box">
                <input type="number" id="score_quality" min="0" max="100" value="85" oninput="syncRange('quality', this.value)">
                <span>/100</span>
              </div>
            </div>
            <span class="error-msg" id="err_quality">Enter a valid score between 0 and 100.</span>
          </div>

          <!-- Criterion 2 -->
          <div class="criterion-item" id="crit_productivity">
            <div class="criterion-top">
              <span class="criterion-title">2. Productivity & Target Achievement</span>
              <span class="criterion-weight">Weight: 25%</span>
            </div>
            <div class="criterion-desc">Volume of output, adherence to deadlines, goal completion, and efficient execution.</div>
            <div class="score-controls">
              <input type="range" id="range_productivity" min="0" max="100" value="80" oninput="syncScore('productivity', this.value)">
              <div class="score-input-box">
                <input type="number" id="score_productivity" min="0" max="100" value="80" oninput="syncRange('productivity', this.value)">
                <span>/100</span>
              </div>
            </div>
            <span class="error-msg" id="err_productivity">Enter a valid score between 0 and 100.</span>
          </div>

          <!-- Criterion 3 -->
          <div class="criterion-item" id="crit_communication">
            <div class="criterion-top">
              <span class="criterion-title">3. Communication & Teamwork</span>
              <span class="criterion-weight">Weight: 15%</span>
            </div>
            <div class="criterion-desc">Interpersonal collaboration, clarity in verbal and written exchanges, and active team contribution.</div>
            <div class="score-controls">
              <input type="range" id="range_communication" min="0" max="100" value="85" oninput="syncScore('communication', this.value)">
              <div class="score-input-box">
                <input type="number" id="score_communication" min="0" max="100" value="85" oninput="syncRange('communication', this.value)">
                <span>/100</span>
              </div>
            </div>
            <span class="error-msg" id="err_communication">Enter a valid score between 0 and 100.</span>
          </div>

          <!-- Criterion 4 -->
          <div class="criterion-item" id="crit_attendance">
            <div class="criterion-top">
              <span class="criterion-title">4. Attendance & Punctuality</span>
              <span class="criterion-weight">Weight: 10%</span>
            </div>
            <div class="criterion-desc">Reliability of attendance, meeting timeliness, and respect for scheduled work commitments.</div>
            <div class="score-controls">
              <input type="range" id="range_attendance" min="0" max="100" value="90" oninput="syncScore('attendance', this.value)">
              <div class="score-input-box">
                <input type="number" id="score_attendance" min="0" max="100" value="90" oninput="syncRange('attendance', this.value)">
                <span>/100</span>
              </div>
            </div>
            <span class="error-msg" id="err_attendance">Enter a valid score between 0 and 100.</span>
          </div>

          <!-- Criterion 5 -->
          <div class="criterion-item" id="crit_problem_solving">
            <div class="criterion-top">
              <span class="criterion-title">5. Problem-Solving & Initiative</span>
              <span class="criterion-weight">Weight: 15%</span>
            </div>
            <div class="criterion-desc">Critical thinking, proactive identification of issues, resourcefulness, and independent problem resolution.</div>
            <div class="score-controls">
              <input type="range" id="range_problem_solving" min="0" max="100" value="80" oninput="syncScore('problem_solving', this.value)">
              <div class="score-input-box">
                <input type="number" id="score_problem_solving" min="0" max="100" value="80" oninput="syncRange('problem_solving', this.value)">
                <span>/100</span>
              </div>
            </div>
            <span class="error-msg" id="err_problem_solving">Enter a valid score between 0 and 100.</span>
          </div>

          <!-- Criterion 6 -->
          <div class="criterion-item" id="crit_professionalism">
            <div class="criterion-top">
              <span class="criterion-title">6. Professionalism & Accountability</span>
              <span class="criterion-weight">Weight: 10%</span>
            </div>
            <div class="criterion-desc">Ownership of responsibilities, workplace ethics, receptiveness to constructive feedback, and conduct.</div>
            <div class="score-controls">
              <input type="range" id="range_professionalism" min="0" max="100" value="85" oninput="syncScore('professionalism', this.value)">
              <div class="score-input-box">
                <input type="number" id="score_professionalism" min="0" max="100" value="85" oninput="syncRange('professionalism', this.value)">
                <span>/100</span>
              </div>
            </div>
            <span class="error-msg" id="err_professionalism">Enter a valid score between 0 and 100.</span>
          </div>

          <div style="margin-top: 18px;" class="no-print">
            <button type="submit" id="calculateBtn" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 15px;">
              Calculate Overall Performance Score
            </button>
          </div>
        </div>
      </div>
    </form>

    <!-- Results Section -->
    <section id="resultsSection">
      <!-- Hero Card -->
      <div class="results-hero">
        <div class="score-circle-box">
          <div class="score-large" id="resOverallScore">0.00</div>
          <div class="score-sub">Overall Score / 100</div>
          <div class="rating-badge" id="resRatingBadge">RATING</div>
        </div>
        <div class="summary-details">
          <h2 id="resEmployeeHeadline">Performance Evaluation Summary</h2>
          <div class="summary-meta" id="resMetaText">Period: Q1 2026 · Evaluated on Oct 11, 2026</div>
          <p class="summary-desc" id="resRatingSummary">Performance assessment description will appear here.</p>
          <div class="guidance-box" id="resRatingGuidance">Organizational guidance details.</div>
        </div>
      </div>

      <!-- Breakdown Table & Action Plan -->
      <div class="grid-2">
        <!-- Criteria Breakdown Table -->
        <div class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">Score & Weight Breakdown</h2>
              <p class="card-subtitle">Contribution = Raw Score × Weight (Total: 100%)</p>
            </div>
          </div>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Performance Criterion</th>
                  <th style="text-align: right;">Weight</th>
                  <th style="text-align: right;">Score</th>
                  <th style="text-align: right;">Contribution</th>
                  <th style="text-align: center;">Status</th>
                </tr>
              </thead>
              <tbody id="breakdownTbody">
                <!-- Injected via JavaScript -->
              </tbody>
              <tfoot>
                <tr style="background: var(--slate-100); font-weight: 700;">
                  <td>Overall Weighted Total</td>
                  <td style="text-align: right;">100%</td>
                  <td style="text-align: right;">-</td>
                  <td style="text-align: right; color: #1e3a8a;" id="tableTotalContrib">0.00 pts</td>
                  <td style="text-align: center;" id="tableRatingLabel">RATING</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <!-- Strengths & Recommendations -->
        <div class="card">
          <div class="card-header">
            <div>
              <h2 class="card-title">Prioritized Action Plan</h2>
              <p class="card-subtitle">Transparent improvement recommendations based on individual scores</p>
            </div>
          </div>
          <div id="actionsContainer">
            <!-- Injected via JavaScript -->
          </div>
        </div>
      </div>

      <!-- Disclaimer & Sign-off -->
      <div class="disclaimer-box">
        <strong>Decision-Support Notice:</strong> This performance score is an objective decision-support tool calculated using established weighting criteria. It is designed to guide structured development conversations and should not replace managerial discretion, qualitative peer feedback, or formal organizational HR policies.
      </div>
    </section>

  </div>

  <script>
    // Initialize review date to today
    document.getElementById('reviewDate').value = new Date().toISOString().split('T')[0];

    const CRITERIA_CONFIG = [
      { id: 'quality', name: 'Quality of Work', weight: 0.25, pct: 25 },
      { id: 'productivity', name: 'Productivity & Target Achievement', weight: 0.25, pct: 25 },
      { id: 'communication', name: 'Communication & Teamwork', weight: 0.15, pct: 15 },
      { id: 'attendance', name: 'Attendance & Punctuality', weight: 0.10, pct: 10 },
      { id: 'problem_solving', name: 'Problem-Solving & Initiative', weight: 0.15, pct: 15 },
      { id: 'professionalism', name: 'Professionalism & Accountability', weight: 0.10, pct: 10 }
    ];

    const FEEDBACK_RULES = {
      quality: {
        strong: 'Consistently delivers high-precision, defect-free work deliverables.',
        mod: 'Maintains acceptable standard of work with occasional revisions.',
        low: 'Frequent errors or rework identified; requires supervisor checkpoints.',
        title: 'Quality Assurance & Defect Reduction',
        rec: 'Implement pre-submission checklists, conduct peer reviews on major deliverables, and root-cause recurrent quality defects.',
        timeline: '30 Days'
      },
      productivity: {
        strong: 'Exceeds target output volume and consistently meets critical milestones.',
        mod: 'Maintains steady output volume within scheduled expectations.',
        low: 'Backlog volume or missed milestone commitments observed.',
        title: 'Workflow Prioritization & Throughput',
        rec: 'Conduct a weekly capacity audit, block time for deep focus work, and align daily tasks with primary team deliverables.',
        timeline: '45 Days'
      },
      communication: {
        strong: 'Proactive collaborator who communicates transparently with peers and stakeholders.',
        mod: 'Communicates effectively in day-to-day work tasks.',
        low: 'Information delays or team collaboration friction observed.',
        title: 'Structured Communication & Teamwork',
        rec: 'Adopt standard asynchronous project updates, practice active listening, and sync bi-weekly with key project collaborators.',
        timeline: '30 Days'
      },
      attendance: {
        strong: 'Exemplary punctuality and dependable presence across all commitments.',
        mod: 'Attendance meets standard organizational expectations.',
        low: 'Patterns of tardiness or unannounced schedule deviations noted.',
        title: 'Schedule Adherence & Reliability',
        rec: 'Review scheduling barriers fairly; institute proactive 24-hour advance communication for any unavoidable schedule shifts.',
        timeline: 'Immediate'
      },
      problem_solving: {
        strong: 'Demonstrates outstanding initiative, critical thinking, and autonomy in troubleshooting.',
        mod: 'Solves routine challenges and seeks guidance for novel problems.',
        low: 'Relies heavily on manager guidance for routine issues; hesitates to take initiative.',
        title: 'Structured Problem-Solving & Initiative',
        rec: 'Apply structured 5-Whys root cause analysis before escalating; propose at least two viable solutions with every flagged roadblock.',
        timeline: '60 Days'
      },
      professionalism: {
        strong: 'Models personal accountability, high ethical standards, and embraces constructive feedback.',
        mod: 'Maintains professional workplace conduct and respects feedback.',
        low: 'Lapses in accountability, delayed ownership, or defensive response to critique.',
        title: 'Ownership & Feedback Integration',
        rec: 'Establish clear milestone accountability logs and document agreed action steps following performance 1-on-1s.',
        timeline: '30 Days'
      }
    };

    function syncScore(id, val) {
      document.getElementById('score_' + id).value = val;
      clearCriterionError(id);
    }

    function syncRange(id, val) {
      let num = parseFloat(val);
      if (!isNaN(num) && num >= 0 && num <= 100) {
        document.getElementById('range_' + id).value = num;
        clearCriterionError(id);
      }
    }

    function clearCriterionError(id) {
      const err = document.getElementById('err_' + id);
      if (err) err.style.display = 'none';
      const item = document.getElementById('crit_' + id);
      if (item) item.style.borderColor = 'var(--slate-200)';
    }

    function applyPreset(score) {
      CRITERIA_CONFIG.forEach(c => {
        document.getElementById('score_' + c.id).value = score;
        document.getElementById('range_' + c.id).value = score;
        clearCriterionError(c.id);
      });
      if (!document.getElementById('empName').value) {
        document.getElementById('empName').value = 'Jordan Lee';
        document.getElementById('empId').value = 'EMP-9021';
        document.getElementById('empDept').value = 'Operations';
        document.getElementById('empDesig').value = 'Operations Analyst';
        document.getElementById('mgrName').value = 'Elena Rostova';
        document.getElementById('reviewPeriod').value = 'Q1 2026';
      }
      handleCalculate();
    }

    function loadSampleReview() {
      document.getElementById('empName').value = 'Sarah Jenkins';
      document.getElementById('empId').value = 'EMP-1042';
      document.getElementById('empDept').value = 'Engineering & Technology';
      document.getElementById('empDesig').value = 'Lead Software Architect';
      document.getElementById('mgrName').value = 'David Vance';
      document.getElementById('reviewPeriod').value = 'Annual Review 2025';
      
      const sample = { quality: 92, productivity: 88, communication: 78, attendance: 95, problem_solving: 84, professionalism: 80 };
      Object.keys(sample).forEach(k => {
        document.getElementById('score_' + k).value = sample[k];
        document.getElementById('range_' + k).value = sample[k];
        clearCriterionError(k);
      });
      handleCalculate();
    }

    function validate() {
      let isValid = true;
      const requiredFields = [
        { id: 'empName', group: 'group_name' },
        { id: 'empId', group: 'group_id' },
        { id: 'empDept', group: 'group_dept' },
        { id: 'empDesig', group: 'group_desig' },
        { id: 'mgrName', group: 'group_mgr' },
        { id: 'reviewPeriod', group: 'group_period' },
        { id: 'reviewDate', group: 'group_date' }
      ];

      requiredFields.forEach(f => {
        const el = document.getElementById(f.id);
        const grp = document.getElementById(f.group);
        if (!el.value || el.value.trim() === '') {
          grp.classList.add('has-error');
          isValid = false;
        } else {
          grp.classList.remove('has-error');
        }
      });

      CRITERIA_CONFIG.forEach(c => {
        const val = document.getElementById('score_' + c.id).value;
        const num = parseFloat(val);
        const err = document.getElementById('err_' + c.id);
        const item = document.getElementById('crit_' + c.id);
        if (val === '' || isNaN(num) || num < 0 || num > 100) {
          err.style.display = 'block';
          item.style.borderColor = '#e11d48';
          isValid = false;
        } else {
          err.style.display = 'none';
          item.style.borderColor = 'var(--slate-200)';
        }
      });

      return isValid;
    }

    function getRating(score) {
      const rounded = Math.round(score * 100) / 100;
      if (rounded >= 90.0) {
        return {
          rating: 'Excellent',
          badgeClass: 'excellent',
          summary: 'Consistently surpasses role standards with exemplary quality, autonomy, and positive organizational impact.',
          guidance: 'Eligible for leadership pipelines, special innovation initiatives, peer mentorship roles, and top-tier merit consideration.'
        };
      } else if (rounded >= 80.0) {
        return {
          rating: 'Very Good',
          badgeClass: 'very-good',
          summary: 'Regularly exceeds standard requirements, exhibits strong dependable performance, and requires minimal supervision.',
          guidance: 'Ready for expanded domain responsibilities, stretch assignments, and targeted advancement preparation.'
        };
      } else if (rounded >= 70.0) {
        return {
          rating: 'Good',
          badgeClass: 'good',
          summary: 'Consistently meets core role competencies and target outcomes in a reliable manner with occasional areas for refinement.',
          guidance: 'Maintain stable performance while focusing on prioritized improvement actions to progress toward Very Good.'
        };
      } else if (rounded >= 60.0) {
        return {
          rating: 'Satisfactory',
          badgeClass: 'satisfactory',
          summary: 'Meets minimum job baselines but demonstrates noticeable inconsistencies across key deliverables or core competencies.',
          guidance: 'Requires focused developmental coaching, bi-weekly check-ins, and targeted skill reinforcement in lower-scoring criteria.'
        };
      } else {
        return {
          rating: 'Needs Improvement',
          badgeClass: 'needs-improvement',
          summary: 'Fails to consistently satisfy essential job expectations and key performance benchmarks. Requires formal intervention.',
          guidance: 'Immediate establishment of a structured Performance Improvement Plan (PIP) with clearly defined 30/60-day milestones and manager support.'
        };
      }
    }

    function handleCalculate() {
      if (!validate()) {
        const firstError = document.querySelector('.has-error, [style*="#e11d48"]');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      let totalScore = 0;
      const criterionResults = CRITERIA_CONFIG.map(c => {
        const raw = parseFloat(document.getElementById('score_' + c.id).value) || 0;
        const contrib = raw * c.weight;
        totalScore += contrib;
        
        let status = 'Satisfactory';
        let statusClass = 'status-sat';
        let obs = FEEDBACK_RULES[c.id].mod;
        if (raw >= 85) {
          status = 'Strong';
          statusClass = 'status-strong';
          obs = FEEDBACK_RULES[c.id].strong;
        } else if (raw < 70) {
          status = 'Growth Area';
          statusClass = 'status-growth';
          obs = FEEDBACK_RULES[c.id].low;
        }

        return {
          id: c.id,
          name: c.name,
          weightPct: c.pct,
          rawScore: raw,
          contrib: contrib,
          status: status,
          statusClass: statusClass,
          obs: obs,
          rule: FEEDBACK_RULES[c.id]
        };
      });

      const finalScore = Math.round(totalScore * 100) / 100;
      const ratingInfo = getRating(finalScore);

      // Display Hero
      document.getElementById('resOverallScore').innerText = finalScore.toFixed(2);
      const badge = document.getElementById('resRatingBadge');
      badge.innerText = ratingInfo.rating;
      badge.className = 'rating-badge ' + ratingInfo.badgeClass;

      const empName = document.getElementById('empName').value;
      const empDesig = document.getElementById('empDesig').value;
      const period = document.getElementById('reviewPeriod').value;
      const date = document.getElementById('reviewDate').value;
      
      document.getElementById('resEmployeeHeadline').innerText = empName + ' — ' + empDesig;
      document.getElementById('resMetaText').innerText = 'Period: ' + period + ' · Review Date: ' + date;
      document.getElementById('resRatingSummary').innerText = ratingInfo.summary;
      document.getElementById('resRatingGuidance').innerText = 'HR Guidance: ' + ratingInfo.guidance;

      // Populate Table
      const tbody = document.getElementById('breakdownTbody');
      tbody.innerHTML = '';
      criterionResults.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = \`
          <td>
            <strong>\${item.name}</strong>
            <div style="font-size: 11px; color: var(--slate-500); margin-top: 2px;">\${item.obs}</div>
          </td>
          <td style="text-align: right;">\${item.weightPct}%</td>
          <td style="text-align: right;" class="score-cell">\${item.rawScore.toFixed(1)}</td>
          <td style="text-align: right;" class="contrib-cell">+\${item.contrib.toFixed(2)} pts</td>
          <td style="text-align: center;"><span class="status-tag \${item.statusClass}">\${item.status}</span></td>
        \`;
        tbody.appendChild(tr);
      });

      document.getElementById('tableTotalContrib').innerText = finalScore.toFixed(2) + ' pts';
      document.getElementById('tableRatingLabel').innerText = ratingInfo.rating;

      // Generate Prioritized Action Plan (3 lowest criteria)
      const sortedByAsc = [...criterionResults].sort((a, b) => a.rawScore - b.rawScore);
      const actionsContainer = document.getElementById('actionsContainer');
      actionsContainer.innerHTML = '';
      
      sortedByAsc.slice(0, 3).forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = 'action-step-card';
        div.innerHTML = \`
          <div class="action-step-header">
            <span class="action-step-num">Priority #\${idx + 1} — \${item.name} (Score: \${item.rawScore})</span>
            <span class="action-step-timeline">\${item.rule.timeline}</span>
          </div>
          <div class="action-step-title">\${item.rule.title}</div>
          <div class="action-step-body">\${item.rule.rec}</div>
        \`;
        actionsContainer.appendChild(div);
      });

      // Show Results
      const resSection = document.getElementById('resultsSection');
      resSection.style.display = 'block';
      resSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function confirmReset() {
      if (confirm('Are you sure you want to reset the entire form and clear all scores and calculated results?')) {
        document.getElementById('evalForm').reset();
        document.getElementById('reviewDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('resultsSection').style.display = 'none';
        CRITERIA_CONFIG.forEach(c => {
          document.getElementById('score_' + c.id).value = 75;
          document.getElementById('range_' + c.id).value = 75;
          clearCriterionError(c.id);
        });
        document.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  </script>
</body>
</html>`;
}

/**
 * Triggers a direct browser download of the self-contained standalone HTML application.
 */
export function downloadStandaloneHtmlFile() {
  const content = generateStandaloneAppHtml();
  const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'employee-performance-calculator.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Exports evaluation results as a formatted CSV spreadsheet.
 */
export function downloadEvaluationCsv(result: EvaluationResult) {
  const { employeeInfo, criterionResults, overallScore, rating } = result;

  const rows = [
    ['EMPLOYEE PERFORMANCE EVALUATION REPORT'],
    ['Generated On', result.calculatedAt],
    [''],
    ['EMPLOYEE INFORMATION'],
    ['Employee Name', `"${employeeInfo.employeeName}"`],
    ['Employee ID', `"${employeeInfo.employeeId}"`],
    ['Department', `"${employeeInfo.department}"`],
    ['Job Designation', `"${employeeInfo.jobDesignation}"`],
    ['Manager Name', `"${employeeInfo.managerName}"`],
    ['Review Period', `"${employeeInfo.reviewPeriod}"`],
    ['Review Date', `"${employeeInfo.reviewDate}"`],
    [''],
    ['PERFORMANCE CRITERIA BREAKDOWN'],
    ['Criterion Name', 'Weight (%)', 'Raw Score (0-100)', 'Weighted Contribution (pts)', 'Status', 'Observation'],
    ...criterionResults.map((c) => [
      `"${c.name}"`,
      `${c.weightPercentage}%`,
      c.rawScore.toFixed(2),
      c.weightedContribution.toFixed(2),
      `"${c.status}"`,
      `"${c.observation.replace(/"/g, '""')}"`,
    ]),
    [''],
    ['OVERALL EVALUATION SUMMARY'],
    ['Total Overall Score', `${overallScore.toFixed(2)} / 100`],
    ['Assigned Rating', `"${rating}"`],
    ['Rating Band Description', `"${result.ratingBracket.summary}"`],
    ['HR Guidance', `"${result.ratingBracket.guidance}"`],
    [''],
    ['PRIORITIZED IMPROVEMENT ACTIONS'],
    ['Priority', 'Target Criterion', 'Current Score', 'Action Title', 'Recommendation', 'Timeline'],
    ...result.prioritizedActions.map((a) => [
      a.priority,
      `"${a.criterionName}"`,
      a.currentScore,
      `"${a.actionTitle}"`,
      `"${a.recommendation.replace(/"/g, '""')}"`,
      `"${a.timeline}"`,
    ]),
  ];

  const csvContent = rows.map((r) => r.join(',')).join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Performance_Report_${employeeInfo.employeeId || 'EMP'}_${employeeInfo.employeeName.replace(/\s+/g, '_')}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
