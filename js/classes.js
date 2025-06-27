// ========================================
// JAVASCRIPT KHUSUS HALAMAN DAFTAR KELAS
// ========================================

// Event listener ketika DOM sudah siap
document.addEventListener("DOMContentLoaded", () => {
  // Inisialisasi filter functionality
  initializeFilters()

  // Inisialisasi tombol pendaftaran
  initializeEnrollButtons()

  // Inisialisasi tombol preview
  initializePreviewButtons()

  // Inisialisasi FAQ accordion
  initializeFAQ()
})

// ========================================
// FILTER FUNCTIONALITY - FILTER KELAS
// ========================================

// Inisialisasi filter berdasarkan level kelas
function initializeFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const classCards = document.querySelectorAll(".class-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Hapus active class dari semua tombol
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Tambah active class ke tombol yang diklik
      this.classList.add("active")

      const filter = this.getAttribute("data-filter")

      // Filter class cards berdasarkan level
      classCards.forEach((card) => {
        const level = card.getAttribute("data-level")

        if (filter === "all" || level === filter) {
          card.classList.remove("hidden")
          card.classList.add("show")
        } else {
          card.classList.add("hidden")
          card.classList.remove("show")
        }
      })
    })
  })
}

// ========================================
// ENROLLMENT - PENDAFTARAN KELAS
// ========================================

// Inisialisasi tombol pendaftaran kelas
function initializeEnrollButtons() {
  const enrollButtons = document.querySelectorAll(".enroll-btn")

  enrollButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const className = this.getAttribute("data-class")
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

      // Cek apakah user sudah login
      if (!isLoggedIn) {
        alert("Silakan login terlebih dahulu untuk mendaftar kelas")
        setTimeout(() => {
          window.location.href = "login.html"
        }, 1500)
        return
      }

      // Proses pendaftaran kelas
      enrollInClass(className)
    })
  })
}

// Proses pendaftaran kelas
function enrollInClass(className) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")
  const enrolledClasses = JSON.parse(localStorage.getItem("enrolledClasses") || "[]")

  // Cek apakah sudah terdaftar di kelas ini
  if (enrolledClasses.includes(className)) {
    alert("Anda sudah terdaftar di kelas ini")
    return
  }

  // Tambah kelas ke daftar kelas yang diikuti
  enrolledClasses.push(className)
  localStorage.setItem("enrolledClasses", JSON.stringify(enrolledClasses))

  alert("Berhasil mendaftar kelas! Silakan cek dashboard Anda")

  // Redirect ke dashboard setelah 2 detik
  setTimeout(() => {
    window.location.href = "dashboard.html"
  }, 2000)
}

// ========================================
// PREVIEW FUNCTIONALITY - PREVIEW KELAS
// ========================================

// Inisialisasi tombol preview kelas
function initializePreviewButtons() {
  const previewButtons = document.querySelectorAll(".preview-btn")
  const modal = document.getElementById("previewModal")
  const modalTitle = document.getElementById("modalTitle")
  const modalBody = document.getElementById("modalBody")

  previewButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const className = this.getAttribute("data-preview")
      showPreview(className, modal, modalTitle, modalBody)
    })
  })
}

// Tampilkan preview kelas dalam modal
function showPreview(className, modal, modalTitle, modalBody) {
  const classData = getClassData(className)

  modalTitle.textContent = `Preview: ${classData.title}`
  modalBody.innerHTML = `
        <div class="preview-content">
            <h3>Apa yang akan Anda pelajari:</h3>
            <ul class="preview-topics">
                ${classData.topics.map((topic) => `<li>✓ ${topic}</li>`).join("")}
            </ul>
            
            <h3>Video Preview:</h3>
            <div class="video-preview">
                <div class="video-placeholder">
                    <p>🎥 Video preview akan tersedia setelah Anda mendaftar</p>
                </div>
            </div>
            
            <h3>Mentor:</h3>
            <div class="mentor-info">
                <p><strong>${classData.mentor}</strong></p>
                <p>${classData.mentorBio}</p>
            </div>
            
            <div class="preview-actions">
                <button class="btn btn-primary" onclick="enrollFromPreview('${className}')">
                    Daftar Sekarang
                </button>
                <button class="btn btn-outline" onclick="closeModal()">
                    Tutup
                </button>
            </div>
        </div>
    `

  modal.style.display = "block"
}

// ========================================
// CLASS DATA - DATA KELAS DAN MATERI
// ========================================

// Ambil data kelas berdasarkan className
function getClassData(className) {
  const classesData = {
    basic: {
      title: "Basic Programming",
      topics: [
        "HTML5 dan CSS3 Fundamentals",
        "JavaScript ES6+ Basics",
        "Responsive Web Design",
        "Git Version Control",
        "Project: Personal Portfolio Website",
      ],
      mentor: "Budi Santoso",
      mentorBio: "Senior Frontend Developer di Gojek dengan 5+ tahun pengalaman",
    },
    frontend: {
      title: "Frontend Development",
      topics: [
        "React.js dan Hooks",
        "State Management dengan Redux",
        "Next.js Framework",
        "TypeScript Integration",
        "Testing dengan Jest",
        "Project: E-commerce Website",
      ],
      mentor: "Sarah Wijaya",
      mentorBio: "Tech Lead di Tokopedia, spesialis React dan Vue.js",
    },
    backend: {
      title: "Backend Development",
      topics: [
        "Node.js dan Express.js",
        "Database Design (MySQL, MongoDB)",
        "RESTful API Development",
        "Authentication & Authorization",
        "Cloud Deployment (AWS, GCP)",
        "Project: Social Media API",
      ],
      mentor: "Ahmad Rizki",
      mentorBio: "Backend Engineer di Shopee, expert dalam microservices",
    },
    fullstack: {
      title: "Full Stack Development",
      topics: [
        "MERN Stack Development",
        "DevOps dan CI/CD",
        "Testing Strategy",
        "Performance Optimization",
        "Security Best Practices",
        "Capstone Project: Complete Web Application",
      ],
      mentor: "Ricky Tri Setiawan",
      mentorBio: "Full Stack Architect dengan 8+ tahun pengalaman",
    },
    mobile: {
      title: "Mobile App Development",
      topics: [
        "React Native Fundamentals",
        "Flutter dan Dart",
        "Native iOS (Swift)",
        "Native Android (Kotlin)",
        "App Store Deployment",
        "Project: Cross-platform Mobile App",
      ],
      mentor: "Dewi Lestari",
      mentorBio: "Mobile Developer di Traveloka, expert React Native",
    },
    data: {
      title: "Data Science & AI",
      topics: [
        "Python for Data Science",
        "Machine Learning Algorithms",
        "Deep Learning dengan TensorFlow",
        "Data Visualization",
        "Big Data Processing",
        "Project: AI-powered Web Application",
      ],
      mentor: "Dr. Andi Pratama",
      mentorBio: "Data Scientist di Grab, PhD in Computer Science",
    },
  }

  return classesData[className] || classesData.basic
}

// Pendaftaran dari preview modal
function enrollFromPreview(className) {
  closeModal()
  enrollInClass(className)
}

// Tutup modal
function closeModal() {
  const modal = document.getElementById("previewModal")
  if (modal) {
    modal.style.display = "none"
  }
}

// ========================================
// FAQ ACCORDION - PERTANYAAN UMUM
// ========================================

// Inisialisasi FAQ accordion
function initializeFAQ() {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      // Tutup semua FAQ items
      faqItems.forEach((faq) => faq.classList.remove("active"))

      // Buka item yang diklik jika belum aktif
      if (!isActive) {
        item.classList.add("active")
      }
    })
  })
}

// ========================================
// SMOOTH SCROLL - SCROLL KE SECTION KELAS
// ========================================

// Tambah smooth scroll ke class sections
document.addEventListener("click", (e) => {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault()
    const targetId = e.target.getAttribute("href")
    const targetElement = document.querySelector(targetId)

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }
})
