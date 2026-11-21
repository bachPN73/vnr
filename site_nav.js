/* Unified 2-Subject Study Navigation Bar (VNR202 & MLN131) */
(function () {
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  const VNR_PAGES = [
    { file: 'vnr202_kienthuc.html', label: '📕 Kiến thức (Đến ĐH XIV)' },
    { file: 'vnr202_kienthuc.html#quiz-tong-hop', label: '📝 Quiz Kiến thức (64 câu)' },
    { file: 'learn.html', label: '🧠 Quizlet 415 (Gom cụm)' },
    { file: 'flashcard.html', label: '🃏 Flashcard 305 (ĐH I–XIV)' }
  ];
  const MLN_PAGES = [
    { file: 'mln131_kienthuc.html', label: '📘 Kiến thức 7 Chương' },
    { file: 'mln131_kienthuc.html#quiz-tong-hop', label: '📝 Quiz Kiến thức (80 câu)' },
    { file: 'mln131.html', label: '🧠 Quizlet 432 (Gom cụm)' }
  ];

  const isVnr = VNR_PAGES.some(p => p.file.split('#')[0] === path);
  const isMln = MLN_PAGES.some(p => p.file.split('#')[0] === path);
  const isHub = !isVnr && !isMln;

  // Remember last visited page per subject & overall
  if (!isHub) {
    localStorage.setItem('hub_last_page', path);
    localStorage.setItem(isVnr ? 'hub_last_vnr' : 'hub_last_mln', path);
  }

  // Apply persisted dark mode immediately
  if (localStorage.getItem('lsd_dark') === '1') {
    document.body.classList.add('dark');
  }

  const lastVnr = localStorage.getItem('hub_last_vnr') || 'vnr202_kienthuc.html';
  const lastMln = localStorage.getItem('hub_last_mln') || 'mln131_kienthuc.html';

  const css = `
    html { overflow-x: visible !important; }
    body { overflow-x: clip; }
    .gnav-wrap {
      position: sticky;
      top: 0;
      z-index: 100;
      background: var(--card, #ffffff);
      border-bottom: 1px solid var(--border, #e2e8f0);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    }
    .gnav-top {
      max-width: 1200px;
      margin: 0 auto;
      padding: 8px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .gnav-left {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
    }
    .gnav-home {
      text-decoration: none;
      color: var(--text, #0f172a);
      font-weight: 800;
      font-size: 0.9rem;
      padding: 6px 10px;
      border-radius: 9px;
      background: var(--bg, #f8fafc);
      border: 1px solid var(--border, #e2e8f0);
      white-space: nowrap;
      transition: all 0.15s;
    }
    .gnav-home.active, .gnav-home:hover {
      border-color: #6366f1;
      color: #6366f1;
    }
    .gnav-switch {
      display: inline-flex;
      background: var(--bg, #f1f5f9);
      border: 1px solid var(--border, #e2e8f0);
      border-radius: 10px;
      padding: 3px;
      gap: 3px;
    }
    .gnav-subj {
      text-decoration: none;
      font-size: 0.84rem;
      font-weight: 700;
      padding: 5px 12px;
      border-radius: 7px;
      color: var(--muted, #475569);
      white-space: nowrap;
      transition: all 0.15s;
    }
    .gnav-subj:hover { color: var(--text, #0f172a); }
    .gnav-subj.act-vnr { background: #b91c1c; color: #fff !important; }
    .gnav-subj.act-mln { background: #0f766e; color: #fff !important; }
    .gnav-theme {
      border: 1px solid var(--border, #e2e8f0);
      background: var(--bg, #f8fafc);
      color: var(--text, #0f172a);
      border-radius: 9px;
      min-width: 36px;
      height: 36px;
      cursor: pointer;
      font-size: 0.98rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .gnav-sub {
      border-top: 1px solid var(--border, #e2e8f0);
      background: var(--bg, #f8fafc);
    }
    .gnav-sub-inner {
      max-width: 1200px;
      margin: 0 auto;
      padding: 6px 14px;
      display: flex;
      gap: 6px;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }
    .gnav-sub-inner::-webkit-scrollbar { display: none; }
    .gnav-tab {
      text-decoration: none;
      font-size: 0.83rem;
      font-weight: 700;
      padding: 6px 13px;
      border-radius: 999px;
      color: var(--muted, #475569);
      border: 1px solid transparent;
      white-space: nowrap;
      flex-shrink: 0;
      transition: all 0.15s;
    }
    .gnav-tab:hover { color: var(--text, #0f172a); background: var(--card, #fff); }
    .gnav-tab.act-vnr {
      background: var(--card, #fff);
      color: #b91c1c;
      border-color: #fca5a5;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }
    .gnav-tab.act-mln {
      background: var(--card, #fff);
      color: #0f766e;
      border-color: #5eead4;
      box-shadow: 0 1px 4px rgba(0,0,0,0.06);
    }
    body.dark .gnav-tab.act-vnr { color: #f87171; border-color: #7f1d1d; }
    body.dark .gnav-tab.act-mln { color: #2dd4bf; border-color: #115e59; }
    @media (max-width: 640px) {
      .gnav-top { padding: 7px 10px; }
      .gnav-home span.hm-txt { display: none; }
      .gnav-subj { padding: 5px 10px; font-size: 0.8rem; }
      .gnav-sub-inner { padding: 6px 10px; }
      .gnav-tab { font-size: 0.79rem; padding: 5px 11px; }
    }
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  const subPages = isVnr ? VNR_PAGES : (isMln ? MLN_PAGES : []);
  const actCls = isVnr ? 'act-vnr' : 'act-mln';

  const nav = document.createElement('nav');
  nav.className = 'gnav-wrap';
  nav.innerHTML = `
    <div class="gnav-top">
      <div class="gnav-left">
        <a class="gnav-home ${isHub ? 'active' : ''}" href="index.html" title="Trang chủ tổng hợp">🏠 <span class="hm-txt">Trang chủ</span></a>
        <div class="gnav-switch">
          <a class="gnav-subj ${isVnr ? 'act-vnr' : ''}" href="${isVnr ? path : lastVnr}">🟥 VNR202</a>
          <a class="gnav-subj ${isMln ? 'act-mln' : ''}" href="${isMln ? path : lastMln}">🟩 MLN131</a>
        </div>
      </div>
      <button id="gnavThemeBtn" class="gnav-theme" title="Chuyển chế độ Sáng / Tối">${document.body.classList.contains('dark') ? '☀️' : '🌙'}</button>
    </div>
    ${subPages.length ? `
    <div class="gnav-sub">
      <div class="gnav-sub-inner">
        ${subPages.map(p => {
          const [f, h] = p.file.split('#');
          const curHash = location.hash.replace('#', '');
          const isAct = h ? (f === path && curHash === h) : (f === path && curHash !== 'quiz-tong-hop');
          return `<a class="gnav-tab ${isAct ? actCls : ''}" data-gnav-file="${p.file}" href="${p.file}">${p.label}</a>`;
        }).join('')}
      </div>
    </div>` : ''}
  `;

  document.body.insertBefore(nav, document.body.firstChild);

  function syncActiveTabs() {
    const curHash = location.hash.replace('#', '');
    nav.querySelectorAll('.gnav-tab[data-gnav-file]').forEach(a => {
      const [f, h] = a.dataset.gnavFile.split('#');
      const isAct = h ? (f === path && curHash === h) : (f === path && curHash !== 'quiz-tong-hop');
      a.classList.toggle(actCls, isAct);
    });
  }
  window.syncGnavTabs = syncActiveTabs;
  window.addEventListener('hashchange', syncActiveTabs);

  function syncNavHeight() {
    document.documentElement.style.setProperty('--gnav-h', nav.offsetHeight + 'px');
  }
  syncNavHeight();
  window.addEventListener('resize', syncNavHeight, { passive: true });
  window.addEventListener('load', syncNavHeight, { passive: true });

  const tBtn = document.getElementById('gnavThemeBtn');
  tBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    tBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('lsd_dark', isDark ? '1' : '0');
  });
})();
