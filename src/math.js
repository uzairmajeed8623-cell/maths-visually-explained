// KaTeX and its auto-render extension are deferred ahead of this script.
(() => {
  const regions = [...document.querySelectorAll('[data-math]')];
  if (!regions.length) return;
  const notice = document.querySelector('[data-math-notice]');
  if (typeof window.renderMathInElement !== 'function') {
    if (notice) { notice.hidden = false; notice.textContent = 'Maths formatting could not load. The equations are shown in their original notation; refresh to try again.'; }
    return;
  }
  let invalid = false;
  for (const region of regions) window.renderMathInElement(region, {
    delimiters: [{left:'$$',right:'$$',display:true},{left:'\\[',right:'\\]',display:true},{left:'\\(',right:'\\)',display:false}],
    throwOnError: true,
    trust: false,
    errorCallback: () => { invalid = true; }
  });
  if (invalid && notice) { notice.hidden = false; notice.textContent = 'Some equations could not be formatted and are shown in their original notation.'; }
})();
