// Kramdown's math/tex nodes are converted before MathJax runs.
const nodes = document.querySelectorAll('script[type^="math/tex"]');
for (const node of nodes) {
  const display = node.type.includes('mode=display');
  const fallback = document.createElement(display ? 'div' : 'span');
  fallback.className = display ? 'math-source math-block' : 'math-source';
  fallback.textContent = display ? `\\[${node.textContent}\\]` : `\\(${node.textContent}\\)`;
  node.replaceWith(fallback);
}
if (nodes.length || document.querySelector('.math')) {
  window.MathJax = {
    tex: {inlineMath: [['\\(', '\\)']], displayMath: [['\\[', '\\]']], processEscapes: true},
    options: {skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']},
    startup: {pageReady() {
      return MathJax.startup.defaultPageReady().then(() => {
        document.querySelectorAll('.math-source').forEach(el => el.classList.remove('math-source'));
      });
    }}
  };
  const script = document.createElement('script');
  script.id = 'MathJax-script';
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-chtml.js';
  script.async = true;
  script.onerror = () => {
    const notice = document.createElement('p');
    notice.className = 'math-notice';
    notice.textContent = '公式排版资源暂未加载，已保留公式原文。请联网后刷新页面。';
    document.querySelector('#report')?.prepend(notice);
  };
  document.head.append(script);
}
