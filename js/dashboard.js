// Dashboard functionality

document.addEventListener("DOMContentLoaded", () => {
  checkAuthentication()
  loadUserData()
  loadDashboardData()
  initializeLogout()
})

// Declare showNotification function
function showNotification(message, type) {
  console.log(`Notification (${type}): ${message}`)
}

// Check if user is authenticated
function checkAuthentication() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

  if (!isLoggedIn) {
    showNotification("Silakan login terlebih dahulu", "error")
    setTimeout(() => {
      window.location.href = "login.html"
    }, 1500)
    return
  }
}

// Load user data
function loadUserData() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}")

  if (userInfo.fullName) {
    const userName = document.getElementById("userName")
    const welcomeName = document.getElementById("welcomeName")

    if (userName) userName.textContent = userInfo.fullName
    if (welcomeName) welcomeName.textContent = userInfo.fullName
  }
}

// Load dashboard data
function loadDashboardData() {
  loadStats()
  loadMyClasses()
  loadRecentActivity()
}

// Load statistics
function loadStats() {
  const enrolledClasses = JSON.parse(localStorage.getItem("enrolledClasses") || "[]")
  const completedLessons = Number.parseInt(localStorage.getItem("completedLessons") || "0")
  const certificates = Number.parseInt(localStorage.getItem("certificates") || "0")
  const studyHours = Number.parseInt(localStorage.getItem("studyHours") || "0")

  // Update stats with animation
  animateStatNumber("enrolledClasses", enrolledClasses.length)
  animateStatNumber("completedLessons", completedLessons)
  animateStatNumber("certificates", certificates)
  animateStatNumber("studyHours", studyHours)
}

// Animate stat numbers
function animateStatNumber(elementId, targetValue) {
  const element = document.getElementById(elementId)
  if (!element) return

  let currentValue = 0
  const increment = targetValue / 30

  const timer = setInterval(() => {
    currentValue += increment
    if (currentValue >= targetValue) {
      currentValue = targetValue
      clearInterval(timer)
    }
    element.textContent = Math.floor(currentValue)
  }, 50)
}

// Load my classes
function loadMyClasses() {
  const enrolledClasses = JSON.parse(localStorage.getItem("enrolledClasses") || "[]")
  const myClassesGrid = document.getElementById("myClassesGrid")

  if (!myClassesGrid) return

  if (enrolledClasses.length === 0) {
    myClassesGrid.innerHTML = `
            <div class="empty-state">
                <h3>Belum Ada Kelas Terdaftar</h3>
                <p>Mulai perjalanan coding Anda dengan mendaftar kelas pertama</p>
                <a href="classes.html" class="btn btn-primary">Lihat Kelas</a>
            </div>
        `
    return
  }

  const classesData = getClassesData()
  let classesHTML = ""

  enrolledClasses.forEach((classId) => {
    const classData = classesData[classId]
    if (classData) {
      const progress = getClassProgress(classId)
      classesHTML += createClassCard(classData, progress)
    }
  })

  myClassesGrid.innerHTML = classesHTML

  // Add event listeners to class cards
  addClassCardListeners()
}

// Get classes data
function getClassesData() {
  return {
    basic: {
      id: "basic",
      title: "Basic Programming",
      description: "Kelas dasar programming untuk pemula",
      totalLessons: 24,
      duration: "3 Bulan",
    },
    frontend: {
      id: "frontend",
      title: "Frontend Development",
      description: "Pengembangan antarmuka website modern",
      totalLessons: 32,
      duration: "4 Bulan",
    },
    backend: {
      id: "backend",
      title: "Backend Development",
      description: "Pengembangan server dan database",
      totalLessons: 40,
      duration: "5 Bulan",
    },
    fullstack: {
      id: "fullstack",
      title: "Full Stack Development",
      description: "Pengembangan web lengkap frontend dan backend",
      totalLessons: 48,
      duration: "6 Bulan",
    },
    mobile: {
      id: "mobile",
      title: "Mobile App Development",
      description: "Pengembangan aplikasi mobile",
      totalLessons: 36,
      duration: "4 Bulan",
    },
    data: {
      id: "data",
      title: "Data Science & AI",
      description: "Analisis data dan kecerdasan buatan",
      totalLessons: 44,
      duration: "5 Bulan",
    },
  }
}

// Get class progress
function getClassProgress(classId) {
  const progressData = JSON.parse(localStorage.getItem("classProgress") || "{}")
  return (
    progressData[classId] || {
      completedLessons: Math.floor(Math.random() * 10), // Random for demo
      totalLessons: getClassesData()[classId]?.totalLessons || 24,
    }
  )
}

// Create class card HTML
function createClassCard(classData, progress) {
  const progressPercentage = Math.round((progress.completedLessons / progress.totalLessons) * 100)

  return `
        <div class="my-class-card" data-class-id="${classData.id}">
            <div class="class-header">
                <h3>${classData.title}</h3>
                <p>${classData.description}</p>
            </div>
            <div class="class-body">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                </div>
                <div class="progress-text">
                    ${progress.completedLessons} dari ${progress.totalLessons} pelajaran selesai (${progressPercentage}%)
                </div>
                <div class="class-actions">
                    <button class="btn btn-primary continue-btn" data-class-id="${classData.id}">
                        Lanjutkan Belajar
                    </button>
                    <button class="btn btn-outline view-materials-btn" data-class-id="${classData.id}">
                        Lihat Materi
                    </button>
                </div>
            </div>
        </div>
    `
}

// Add event listeners to class cards
function addClassCardListeners() {
  const continueButtons = document.querySelectorAll(".continue-btn")
  const viewMaterialsButtons = document.querySelectorAll(".view-materials-btn")

  continueButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const classId = this.getAttribute("data-class-id")
      openClassModal(classId, "continue")
    })
  })

  viewMaterialsButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const classId = this.getAttribute("data-class-id")
      openClassModal(classId, "materials")
    })
  })
}

// Open class modal
function openClassModal(classId, type) {
  const modal = document.getElementById("classModal")
  const modalTitle = document.getElementById("modalClassTitle")
  const modalContent = document.getElementById("modalClassContent")

  const classData = getClassesData()[classId]

  modalTitle.textContent = classData.title

  if (type === "continue") {
    modalContent.innerHTML = createContinueLearningContent(classData)
  } else {
    modalContent.innerHTML = createMaterialsContent(classData)
  }

  modal.style.display = "block"
}

// Create continue learning content
function createContinueLearningContent(classData) {
  const lessons = generateLessons(classData.id)
  const progress = getClassProgress(classData.id)

  return `
        <div class="continue-learning">
            <h3>Lanjutkan dari pelajaran terakhir:</h3>
            <div class="current-lesson">
                <h4>Pelajaran ${progress.completedLessons + 1}: ${lessons[progress.completedLessons]?.title || "Selesai"}</h4>
                <p>${lessons[progress.completedLessons]?.description || "Anda telah menyelesaikan semua pelajaran!"}</p>
                ${
                  progress.completedLessons < progress.totalLessons
                    ? '<button class="btn btn-primary" onclick="startLesson()">Mulai Pelajaran</button>'
                    : '<button class="btn btn-primary" onclick="downloadCertificate()">Download Sertifikat</button>'
                }
            </div>
            
            <h3>Progress Anda:</h3>
            <div class="lesson-list">
                ${lessons
                  .slice(0, 5)
                  .map(
                    (lesson, index) => `
                    <div class="lesson-item ${index < progress.completedLessons ? "completed" : index === progress.completedLessons ? "current" : "locked"}">
                        <span class="lesson-status">${index < progress.completedLessons ? "✅" : index === progress.completedLessons ? "▶️" : "🔒"}</span>
                        <span class="lesson-title">${lesson.title}</span>
                        <span class="lesson-duration">${lesson.duration}</span>
                    </div>
                `,
                  )
                  .join("")}
                ${lessons.length > 5 ? '<div class="lesson-item">... dan ' + (lessons.length - 5) + " pelajaran lainnya</div>" : ""}
            </div>
        </div>
    `
}

// Create materials content
function createMaterialsContent(classData) {
  const materials = generateMaterials(classData.id)

  return `
        <div class="materials-content">
            <h3>Materi Pembelajaran:</h3>
            <div class="materials-list">
                ${materials
                  .map(
                    (material) => `
                    <div class="material-item">
                        <div class="material-icon">${material.icon}</div>
                        <div class="material-info">
                            <h4>${material.title}</h4>
                            <p>${material.description}</p>
                            <span class="material-type">${material.type}</span>
                        </div>
                        <button class="btn btn-outline btn-sm" onclick="openMaterial('${material.id}')">
                            Buka
                        </button>
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </div>
    `
}

// Generate lessons for demo
function generateLessons(classId) {
  const lessonsData = {
    basic: [
      { title: "Pengenalan HTML", description: "Dasar-dasar HTML dan struktur web", duration: "45 menit" },
      { title: "CSS Fundamentals", description: "Styling dengan CSS", duration: "60 menit" },
      { title: "JavaScript Basics", description: "Pemrograman JavaScript dasar", duration: "90 menit" },
      { title: "Responsive Design", description: "Membuat website responsif", duration: "75 menit" },
      { title: "Git Version Control", description: "Mengelola kode dengan Git", duration: "50 menit" },
    ],
    frontend: [
      { title: "React Fundamentals", description: "Dasar-dasar React.js", duration: "120 menit" },
      { title: "Component Lifecycle", description: "Siklus hidup komponen React", duration: "90 menit" },
      { title: "State Management", description: "Mengelola state dengan Redux", duration: "150 menit" },
      { title: "React Hooks", description: "Menggunakan React Hooks", duration: "100 menit" },
      { title: "Next.js Framework", description: "Framework React untuk production", duration: "180 menit" },
    ],
  }

  return lessonsData[classId] || lessonsData.basic
}

// Generate materials for demo
function generateMaterials(classId) {
  return [
    {
      id: "video1",
      icon: "🎥",
      title: "Video Pembelajaran",
      description: "Koleksi video tutorial lengkap",
      type: "Video",
    },
    {
      id: "slides1",
      icon: "📊",
      title: "Slide Presentasi",
      description: "Materi presentasi untuk setiap topik",
      type: "PDF",
    },
    { id: "code1", icon: "💻", title: "Source Code", description: "Kode contoh dan template project", type: "Code" },
    {
      id: "quiz1",
      icon: "📝",
      title: "Quiz & Assignment",
      description: "Latihan soal dan tugas praktik",
      type: "Interactive",
    },
    {
      id: "resource1",
      icon: "📚",
      title: "Resource Links",
      description: "Link referensi dan dokumentasi",
      type: "Links",
    },
  ]
}

// Load recent activity
function loadRecentActivity() {
  const activityList = document.getElementById("activityList")
  if (!activityList) return

  const activities = generateRecentActivities()

  if (activities.length === 0) {
    activityList.innerHTML = `
            <div class="empty-state">
                <h3>Belum Ada Aktivitas</h3>
                <p>Mulai belajar untuk melihat aktivitas Anda</p>
            </div>
        `
    return
  }

  const activitiesHTML = activities
    .map(
      (activity) => `
        <div class="activity-item">
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
            </div>
            <div class="activity-time">${activity.time}</div>
        </div>
    `,
    )
    .join("")

  activityList.innerHTML = activitiesHTML
}

// Generate recent activities for demo
function generateRecentActivities() {
  const enrolledClasses = JSON.parse(localStorage.getItem("enrolledClasses") || "[]")

  if (enrolledClasses.length === 0) return []

  return [
    {
      icon: "📚",
      title: "Menyelesaikan Pelajaran",
      description: "JavaScript Fundamentals - Basic Programming",
      time: "2 jam lalu",
    },
    {
      icon: "🎯",
      title: "Quiz Selesai",
      description: "HTML & CSS Quiz - Skor: 85%",
      time: "1 hari lalu",
    },
    {
      icon: "💻",
      title: "Project Submitted",
      description: "Portfolio Website Project",
      time: "3 hari lalu",
    },
    {
      icon: "🏆",
      title: "Achievement Unlocked",
      description: "First Week Completed!",
      time: "1 minggu lalu",
    },
  ]
}

// Initialize logout functionality
function initializeLogout() {
  const logoutBtn = document.getElementById("logoutBtn")

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault()

      if (confirm("Apakah Anda yakin ingin keluar?")) {
        logout()
      }
    })
  }
}

// Declare logout function
function logout() {
  localStorage.setItem("isLoggedIn", "false")
  localStorage.removeItem("userInfo")
  localStorage.removeItem("enrolledClasses")
  localStorage.removeItem("classProgress")
  window.location.href = "login.html"
}

// Functions called from modal content
window.startLesson = () => {
  showNotification("Fitur pembelajaran akan segera tersedia!", "info")
  closeModal()
}

window.downloadCertificate = () => {
  showNotification("Selamat! Sertifikat Anda sedang diproses", "success")
  closeModal()
}

window.openMaterial = (materialId) => {
  showNotification("Membuka materi pembelajaran...", "info")
  closeModal()
}

// Declare closeModal function
function closeModal() {
  const modal = document.getElementById("classModal")
  if (modal) {
    modal.style.display = "none"
  }
}
