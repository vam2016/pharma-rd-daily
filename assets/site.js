const browser = document.querySelector('.archive-browser');
if (browser) {
  const cards = [...browser.querySelectorAll('.brief-card')];
  const search = browser.querySelector('#search');
  const filters = [...browser.querySelectorAll('.topic-filter')];
  const allowedTopics = new Set(filters.map(button => button.dataset.topic));
  const params = new URLSearchParams(location.search);
  let selected = allowedTopics.has(params.get('topic')) ? params.get('topic') : '';
  if (search) search.value = params.get('q') || '';
  function filterBriefs(syncUrl = false) {
    const query = (search?.value || '').trim();
    const terms = query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
    let count = 0;
    for (const card of cards) {
      const text = (card.dataset.search || '').toLocaleLowerCase();
      const visible = terms.every(term => text.includes(term)) && (!selected || (card.dataset.topics || '').includes(`|${selected}|`));
      card.hidden = !visible;
      if (visible) count++;
    }
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.topic === selected)));
    const upcoming = browser.querySelector('.upcoming-topics');
    if (selected && upcoming?.querySelector(`[data-topic="${selected}"]`)) upcoming.open = true;
    const empty = browser.querySelector('#no-results');
    if (empty) empty.hidden = count > 0;
    const counter = browser.querySelector('#search-count');
    if (counter) counter.textContent = query || selected ? `找到 ${count} 篇` : `共 ${cards.length} 篇`;
    const reset = browser.querySelector('#reset-filters');
    if (reset) reset.hidden = !query && !selected;
    if (syncUrl) {
      const url = new URL(location.href);
      selected ? url.searchParams.set('topic', selected) : url.searchParams.delete('topic');
      query ? url.searchParams.set('q', query) : url.searchParams.delete('q');
      history.replaceState(null, '', url);
    }
  }
  browser.querySelector('form')?.addEventListener('submit', event => { event.preventDefault(); filterBriefs(true); });
  search?.addEventListener('input', () => filterBriefs(true));
  filters.forEach(button => button.addEventListener('click', () => { selected = button.dataset.topic; filterBriefs(true); }));
  browser.querySelector('#reset-filters')?.addEventListener('click', () => {
    selected = ''; if (search) search.value = ''; filterBriefs(true); search?.focus();
  });
  window.addEventListener('popstate', () => {
    const restored = new URLSearchParams(location.search);
    selected = allowedTopics.has(restored.get('topic')) ? restored.get('topic') : '';
    if (search) search.value = restored.get('q') || '';
    filterBriefs();
  });
  filterBriefs();
}
const toc = document.querySelector('#toc');
const headings = [...document.querySelectorAll('#report h2, #report h3')];
if (toc) headings.forEach((heading, index) => {
  if (!heading.id) heading.id = `section-${index + 1}`;
  const link = document.createElement('a');
  link.href = `#${heading.id}`;
  link.textContent = heading.dataset.tocLabel || heading.textContent;
  if (heading.tagName === 'H3') link.className = 'toc-subsection';
  toc.append(link);
});
const disclosure = document.querySelector('#toc-disclosure');
if (disclosure && window.matchMedia) {
  const mobile = window.matchMedia('(max-width: 800px)');
  disclosure.open = !mobile.matches;
  mobile.addEventListener('change', event => { disclosure.open = !event.matches; });
}

const status = document.querySelector('#action-status');
document.querySelector('#copy-link')?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(location.href);
    status.textContent = '链接已复制';
  } catch {
    status.textContent = '请从浏览器地址栏复制文章链接。';
  }
});
document.querySelector('#print-report')?.addEventListener('click', () => window.print());
document.querySelectorAll('#report a[href]').forEach(link => {
  try {
    const url = new URL(link.getAttribute('href'), location.href);
    if (url.origin !== location.origin && ['https:', 'http:'].includes(url.protocol)) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.title = `${link.textContent.trim()}（在新标签页打开）`;
    }
  } catch { /* Leave malformed links visibly unchanged. */ }
});
if (toc && 'IntersectionObserver' in window) {
  const links = [...toc.querySelectorAll('a')];
  const observer = new IntersectionObserver(entries => {
    const current = entries.filter(entry => entry.isIntersecting)[0];
    if (!current) return;
    links.forEach(link => {
      const active = link.hash === `#${current.target.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, {rootMargin: '-10% 0px -65% 0px'});
  headings.forEach(heading => observer.observe(heading));
}
document.querySelectorAll('#report table, #report pre').forEach(element => {
  element.tabIndex = 0;
  element.setAttribute('aria-label', element.tagName === 'TABLE' ? '数据表格，可横向滚动' : '代码，可横向滚动');
});
let closedForPrint = [];
window.addEventListener('beforeprint', () => {
  closedForPrint = [...document.querySelectorAll('#report details:not([open]), .revision-note:not([open])')];
  closedForPrint.forEach(element => { element.open = true; });
});
window.addEventListener('afterprint', () => {
  closedForPrint.forEach(element => { element.open = false; });
  closedForPrint = [];
});
