document.documentElement.classList.add('js');

const themeButton = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
let savedTheme;
try { savedTheme = localStorage.getItem('theme'); } catch { /* Storage can be disabled. */ }
function applyTheme(dark) {
  document.body.classList.toggle('dark-mode', dark);
  themeIcon.className = dark ? 'fa fa-sun-o' : 'fa fa-moon-o';
  themeButton.setAttribute('aria-pressed', String(dark));
  themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}
applyTheme(savedTheme ? savedTheme === 'dark' : systemTheme.matches);
themeButton.addEventListener('click', () => {
  const dark = !document.body.classList.contains('dark-mode');
  applyTheme(dark);
  savedTheme = dark ? 'dark' : 'light';
  try { localStorage.setItem('theme', savedTheme); } catch { /* Keep the in-memory choice. */ }
});
systemTheme.addEventListener('change', event => {
  if (!savedTheme) applyTheme(event.matches);
});

const menuButton = document.querySelector('.menu-toggle');
const menu = document.getElementById('site-menu');
const navigation = document.querySelector('.site-nav');
function setMenu(open) {
  menu.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
}
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
menu.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!navigation.contains(event.target)) setMenu(false);
});
window.matchMedia('(min-width: 1024px)').addEventListener('change', () => setMenu(false));

const backToTop = document.querySelector('.back-to-top');
function updateBackToTop() { backToTop.hidden = window.scrollY <= 220; }
window.addEventListener('scroll', updateBackToTop, { passive: true });
backToTop.addEventListener('click', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
});
updateBackToTop();
