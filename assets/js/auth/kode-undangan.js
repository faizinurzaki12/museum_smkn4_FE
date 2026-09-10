function toggleTheme() {
  document.documentElement.classList.toggle("dark");
  localStorage.theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
}
if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

// Loading state saat submit
document.querySelector(".login-form").addEventListener("submit", function () {
  const b = this.querySelector(".login-button");
  b.classList.add("loading");
  b.disabled = true;
  b.textContent = "Tunggu Bentar yaa.....";
});
