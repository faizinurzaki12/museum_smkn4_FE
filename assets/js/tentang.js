const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
       menuToggle.addEventListener('click', () => {
          const isHidden = navLinks.classList.toggle('hidden');
          navLinks.classList.toggle('flex');
          menuToggle.setAttribute('aria-expanded', String(!isHidden));
      });
  }
       


function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}
function toggleTheme() {
  const isDark = document.documentElement.classList.contains("dark");
  const next = isDark ? "light" : "dark";
  localStorage.setItem("theme", next);
  applyTheme(next);
}
(function initTheme() {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));
})();
