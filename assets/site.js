const cards = [...document.querySelectorAll('.brief-card')];
const search = document.querySelector('#search');
const topic = document.querySelector('#topic');
function filterBriefs() {
  const terms = (search?.value || '').trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const selected = topic?.value || '';
  let count = 0;
  for (const card of cards) {
    const text = card.dataset.search.toLocaleLowerCase();
    const tags = card.dataset.tags.split('|');
    const visible = terms.every(term => text.includes(term)) && (!selected || tags.includes(selected));
    card.hidden = !visible;
    if (visible) count++;
  }
  const empty = document.querySelector('#no-results');
  if (empty) empty.hidden = count > 0;
  const counter = document.querySelector('#search-count');
  if (counter) counter.textContent = terms.length || selected ? `找到 ${count} 期简报` : '';
}
search?.addEventListener('input', filterBriefs);
topic?.addEventListener('change', filterBriefs);
const toc = document.querySelector('#toc');
if (toc) document.querySelectorAll('#report h2').forEach((heading, index) => {
  if (!heading.id) heading.id = `section-${index + 1}`;
  const link = document.createElement('a');
  link.href = `#${heading.id}`;
  link.textContent = heading.textContent;
  toc.append(link);
});

const status = document.querySelector('#action-status');
document.querySelector('#copy-link')?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(location.href.split('#')[0]);
    status.textContent = '链接已复制';
  } catch {
    status.textContent = '请从浏览器地址栏复制本期链接。';
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
  document.querySelectorAll('#report h2').forEach(heading => observer.observe(heading));
}
