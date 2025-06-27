// ========================================
// JAVASCRIPT GLOBAL - DIGUNAKAN DI SEMUA HALAMAN
// ========================================

// Event listener ketika DOM sudah siap
document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi mobile menu toggle
  initializeMobileMenu()

  // Inisialisasi smooth scrolling
  initializeSmoothScrolling()

  // Inisialisasi intersection observer untuk animasi
  initializeScrollAnimations()

  // Inisialisasi modal functionality
  initializeModals()

  // Cek status autentikasi user
  checkAuthStatus()
})

// ========================================
// MOBILE MENU - HAMBURGER MENU FUNCTIONALITY
// ========================================

// Inisialisasi mobile menu toggle
function initializeMobileMenu() {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const navMenu = document.querySelector(".nav ul")

  // Toggle mobile menu ketika hamburger diklik
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })
  }

  // Tutup mobile menu ketika link diklik
  const navLinks = document.querySelectorAll(".nav ul li a")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu) {
        navMenu.classList.remove("active")
      }
    })
  })
}

// ========================================
// SMOOTH SCROLLING - SCROLL HALUS UNTUK ANCHOR LINKS
// ========================================

// Inisialisasi smooth scrolling untuk anchor links
function initializeSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]')

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetElement = document.querySelector(targetId)

      // Scroll ke target element dengan animasi halus
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })
}

// ========================================
// SCROLL ANIMATIONS - ANIMASI SAAT SCROLL
// ========================================

// Inisialisasi animasi fade-in saat element masuk viewport
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  // Observer untuk trigger animasi
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Observe elements yang akan dianimasi
  const animateElements = document.querySelectorAll(
    ".program-card, .feature-item, .testimonial-card, .class-card, .value-card, .team-card",
  )
  animateElements.forEach((el) => {
    observer.observe(el)
  })
}

// ========================================
// MODAL FUNCTIONALITY - POPUP WINDOWS
// ========================================

// Inisialisasi modal functionality
function initializeModals() {
  const modals = document.querySelectorAll(".modal")
  const closeButtons = document.querySelectorAll(".modal .close")

  // Event listener untuk tombol close modal
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".modal")
      if (modal) {
        modal.style.display = "none"
      }
    })
  })

  // Tutup modal ketika klik di luar modal content
  window.addEventListener("click", (e) => {
    modals.forEach((modal) => {
      if (e.target === modal) {
        modal.style.display = "none"
      }
    })
  })
}

// ========================================
// AUTHENTICATION - MANAJEMEN STATUS LOGIN
// ========================================

// Cek status autentikasi user
function checkAuthStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")

  // Update header jika user sudah login
  if (isLoggedIn && userInfo.fullName) {
    updateHeaderForLoggedInUser(userInfo)
  }
}

// Update header untuk user yang sudah login
function updateHeaderForLoggedInUser(userInfo) {
  const loginBtn = document.querySelector(".btn-login")
  const registerBtn = document.querySelector(".btn-register")
  const nav = document.querySelector(".nav ul")

  // Sembunyikan tombol login dan register
  if (loginBtn) loginBtn.style.display = "none"
  if (registerBtn) registerBtn.style.display = "none"

  // Tambah link dashboard dan tombol logout
  if (nav && !document.querySelector(".dashboard-link")) {
    const dashboardLi = document.createElement("li")
    dashboardLi.innerHTML = '<a href="pages/dashboard.html" class="dashboard-link">Dashboard</a>'

    const logoutLi = document.createElement("li")
    logoutLi.innerHTML = '<a href="#" class="btn-logout" id="logoutBtn">Keluar</a>'

    nav.appendChild(dashboardLi)
    nav.appendChild(logoutLi)

    // Tambah functionality logout
    document.getElementById("logoutBtn").addEventListener("click", (e) => {
      e.preventDefault()
      logout()
    })
  }
}

// ========================================
// LOGOUT FUNCTIONALITY - FUNGSI LOGOUT
// ========================================

// Fungsi logout user
function logout() {
  // Hapus data user dari localStorage
  localStorage.removeItem("isLoggedIn")
  localStorage.removeItem("userInfo")
  localStorage.removeItem("enrolledClasses")

  // Redirect ke halaman utama
  window.location.href = "../index.html"
}

// ========================================
// NOTIFICATION SYSTEM - SISTEM NOTIFIKASI
// ========================================

// Tampilkan notifikasi ke user
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message

  // Styling notifikasi
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 6px;
        color: white;
        font-weight: 500;
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `

  // Set warna berdasarkan type
  if (type === "success") {
    notification.style.background = "#10b981"
  } else if (type === "error") {
    notification.style.background = "#ef4444"
  } else {
    notification.style.background = "#3b82f6"
  }

  document.body.appendChild(notification)

  // Animasi masuk
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Hapus notifikasi setelah 3 detik
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// ========================================
// UTILITY FUNCTIONS - FUNGSI BANTUAN
// ========================================

// Format mata uang Rupiah
function formatCurrency(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount)
}

// Validasi format email
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Validasi nomor telepon Indonesia
function validatePhone(phone) {
  const re = /^(\+62|62|0)[0-9]{9,13}$/
  return re.test(phone.replace(/\s/g, ""))
}

// Generate ID unik
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}
