// ============================================================
// Museum Karya - SMKN 4 Tasikmalaya
// app.js — gabungan seluruh script (theme, modal, counter)
// ============================================================

// ===== Dark / Light Mode =====
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

// ===== Modal Detail Karya =====
function openModal(card) {
  if (!card) return;

  const d = card.dataset;

  // Elements
  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalEvent = document.getElementById("modalEvent");
  const modalDescription = document.getElementById("modalDescription");
  const modalSiswa = document.getElementById("modalSiswa");
  const modalBiodata = document.getElementById("modalBiodata");
  const modalGuru = document.getElementById("modalGuru");
  const modalKategoriDetail = document.getElementById("modalKategoriDetail");
  const modalTahun = document.getElementById("modalTahun");
  const modalTech = document.getElementById("modalTech");
  const modalAvatar = document.getElementById("modalAvatar");
  const liveBtn = document.getElementById("liveBtn");
  const previewImage = document.getElementById("modalImagePreview");
  const previewIframe = document.getElementById("modalIframePreview");
  const previewEmpty = document.getElementById("modalPreviewEmpty");

  // Title, category, event, description
  if (modalTitle) modalTitle.textContent = d.title || "Detail Karya";
  if (modalCategory) modalCategory.textContent = d.category || "-";
  if (modalEvent) modalEvent.textContent = d.event || "-";
  if (modalDescription) modalDescription.textContent = d.desc || "Tidak ada deskripsi.";
  if (modalKategoriDetail) modalKategoriDetail.textContent = d.category || "-";
  if (modalTahun) modalTahun.textContent = d.tahun || "-";
  if (modalTech) modalTech.textContent = d.tech || "-";

  // ===== Avatar (foto atau inisial) =====
  if (modalAvatar) {
    modalAvatar.innerHTML = "";

    if (d.avatar) {
      const img = document.createElement("img");
      img.src = d.avatar;
      img.alt = d.siswa || "Avatar";
      img.className = "w-full h-full object-cover";

      // Kalau foto gagal load → fallback ke huruf
      img.onerror = function () {
        modalAvatar.innerHTML = "";
        modalAvatar.textContent = d.avatarLetter || (d.siswa ? d.siswa.charAt(0).toUpperCase() : "U");
        modalAvatar.classList.add("bg-blue-600", "text-white");
      };

      modalAvatar.appendChild(img);
      modalAvatar.classList.remove("bg-blue-600", "text-white");
    } else {
      // Tidak ada foto → tampilkan inisial
      modalAvatar.textContent = d.avatarLetter || (d.siswa ? d.siswa.charAt(0).toUpperCase() : "U");
      modalAvatar.classList.add("bg-blue-600", "text-white");
    }
  }

  // ===== Nama siswa =====
  if (modalSiswa) modalSiswa.textContent = d.siswa || "-";

  // ===== Biodata (kelas • jurusan • angkatan) =====
  if (modalBiodata) {
    const parts = [];
    if (d.kelas && d.kelas !== "-") parts.push(d.kelas);
    if (d.jurusanSiswa && d.jurusanSiswa !== "-") parts.push(d.jurusanSiswa);
    if (d.angkatan && d.angkatan !== "-") parts.push("Angkatan " + d.angkatan);
    modalBiodata.textContent = parts.length ? parts.join(" • ") : "-";
  }

  // ===== Guru =====
  if (modalGuru) {
    modalGuru.textContent = d.guru && d.guru !== "-" ? "Guru Pengampu: " + d.guru : "";
  }

  // ===== Preview (gambar / iframe / kosong) =====
  if (previewImage && previewIframe && previewEmpty) {
    const filePath = d.filePath || "";
    const fileType = d.fileType || "";
    const isImage = filePath && fileType.startsWith("image/");

    // Reset dulu
    previewImage.classList.add("hidden");
    previewIframe.classList.add("hidden");
    previewEmpty.classList.add("hidden");
    previewIframe.src = "";
    previewImage.src = "";

    if (isImage) {
      previewImage.src = filePath;
      previewImage.classList.remove("hidden");
    } else if (d.live) {
      previewIframe.src = d.live;
      previewIframe.classList.remove("hidden");
    } else {
      previewEmpty.classList.remove("hidden");
    }
  }

  // ===== Live button =====
  if (liveBtn) {
    if (d.live) {
      liveBtn.href = d.live;
      liveBtn.classList.remove("hidden");
    } else {
      liveBtn.href = "#";
      liveBtn.classList.add("hidden");
    }
  }

  document.getElementById("detailModal")?.classList.remove("hidden");
}

function closeModal() {
  const modal = document.getElementById("detailModal");
  if (modal) modal.classList.add("hidden");

  // Bersihkan iframe supaya video/audio berhenti
  const previewIframe = document.getElementById("modalIframePreview");
  if (previewIframe) previewIframe.src = "";
}

document.getElementById("detailModal")?.addEventListener("click", (e) => {
  if (e.target.id === "detailModal") closeModal();
});

// ===== Counter Angka Statistik =====
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = parseInt(counter.dataset.target) || 0;
        let current = 0;
        const duration = 1800;
        const increment = target / (duration / 16);

        function update() {
          current += increment;
          if (current >= target) {
            counter.innerText = target.toLocaleString();
          } else {
            counter.innerText = Math.floor(current).toLocaleString();
            requestAnimationFrame(update);
          }
        }

        update();
        observer.unobserve(counter);
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => observer.observe(counter));

  // ===== Animasi Card Counter (fade/slide in) =====
  const cards = document.querySelectorAll(".counter-card");
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.2 },
  );
  cards.forEach((card) => cardObserver.observe(card));
});
