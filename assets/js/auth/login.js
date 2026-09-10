function toggleTheme() {
  document.documentElement.classList.toggle("dark");
  localStorage.theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
}
if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

function showComingSoonModal() {
  document.getElementById("comingSoonModal").classList.add("show");
}
function closeComingSoonModal() {
  document.getElementById("comingSoonModal").classList.remove("show");
}
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeComingSoonModal();
});
document.getElementById("show-password").addEventListener("change", function () {
  document.getElementById("password").type = this.checked ? "text" : "password";
});
document.querySelector(".login-form").addEventListener("submit", function (e) {
  const b = this.querySelector(".login-button");
  b.classList.add("loading");
  b.disabled = true;
  b.textContent = "Tunggu bentar....";
});
document.getElementById("email").addEventListener("blur", function () {
  this.classList.toggle("error", !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value) && this.value);
});
document.getElementById("password").addEventListener("blur", function () {
  this.classList.toggle("error", this.value.length < 6 && this.value);
});
