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

function openModal(card) {
  if (!card) return;
  const d = card.dataset;

  if (document.getElementById("modalTitle")) document.getElementById("modalTitle").textContent = d.title || "";
  if (document.getElementById("modalCategory")) document.getElementById("modalCategory").textContent = d.category || "";
  if (document.getElementById("modalEvent")) document.getElementById("modalEvent").textContent = d.event || "";
  if (document.getElementById("modalDescription")) document.getElementById("modalDescription").textContent = d.desc || "";
  if (document.getElementById("modalKategoriDetail")) document.getElementById("modalKategoriDetail").textContent = d.category || "";
  if (document.getElementById("modalTahun")) document.getElementById("modalTahun").textContent = d.tahun || "";
  if (document.getElementById("modalTech")) document.getElementById("modalTech").textContent = d.tech || "";
  if (document.getElementById("liveBtn")) document.getElementById("liveBtn").href = d.live || "#";

  const modalAvatar = document.getElementById("modalAvatar");
  if (modalAvatar) {
    modalAvatar.innerHTML = "";
    modalAvatar.textContent = d.avatarLetter || (d.siswa ? d.siswa.charAt(0).toUpperCase() : "U");
    modalAvatar.classList.add("bg-blue-700", "text-white");
  }

  if (document.getElementById("modalSiswa")) {
    document.getElementById("modalSiswa").textContent = d.siswa || "-";
  }

  const modalBiodata = document.getElementById("modalBiodata");
  if (modalBiodata) {
    const parts = [];
    if (d.kelas && d.kelas !== "-") parts.push(d.kelas);
    if (d.jurusanSiswa && d.jurusanSiswa !== "-") parts.push(d.jurusanSiswa);
    if (d.angkatan && d.angkatan !== "-") parts.push("Angkatan " + d.angkatan);
    modalBiodata.textContent = parts.length ? parts.join(" • ") : "-";
  }

  if (document.getElementById("modalGuru")) {
    document.getElementById("modalGuru").textContent = d.guru && d.guru !== "-" ? "Guru: " + d.guru : "";
  }

  const modal = document.getElementById("detailModal");
  if (modal) modal.classList.remove("hidden");
}

function closeModal() {
  const modal = document.getElementById("detailModal");
  if (modal) modal.classList.add("hidden");
}

document.getElementById("detailModal")?.addEventListener("click", (e) => {
  if (e.target.id === "detailModal") closeModal();
});

const searchInput = document.getElementById("searchInput");
const filterPills = document.querySelectorAll(".filter-pill");
const allCards = document.querySelectorAll(".karya-card");
const resultCounter = document.getElementById("resultCounter");
const emptyState = document.getElementById("emptyState");
let activeCategory = "all";

function normalize(text) {
  return (text || "").toLowerCase();
}

function runFilter() {
  const query = normalize(searchInput?.value.trim() || "");
  let visibleCount = 0;

  allCards.forEach((card) => {
    const d = card.dataset;
    const haystack = normalize(`${d.title} ${d.siswa} ${d.tech} ${d.category} ${d.desc}`);
    const matchesQuery = query === "" || haystack.includes(query);
    const matchesCategory = activeCategory === "all" || normalize(d.category) === normalize(activeCategory);
    const isMatch = matchesQuery && matchesCategory;

    card.classList.toggle("card-filtered-out", !isMatch);
    if (isMatch) visibleCount++;
  });

  if (resultCounter) {
    resultCounter.textContent = visibleCount === allCards.length ? `Menampilkan semua ${allCards.length} karya` : `Menampilkan ${visibleCount} dari ${allCards.length} karya`;
  }

  if (emptyState) {
    emptyState.classList.toggle("hidden", visibleCount > 0);
  }
}

if (searchInput) searchInput.addEventListener("input", runFilter);

filterPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    filterPills.forEach((p) => p.classList.remove("active"));
    pill.classList.add("active");
    activeCategory = pill.dataset.filter;
    runFilter();
  });
});

runFilter();
