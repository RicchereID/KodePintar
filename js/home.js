// ========================================
// JAVASCRIPT KHUSUS HALAMAN BERANDA
// ========================================

// Event listener ketika DOM sudah siap
document.addEventListener("DOMContentLoaded", () => {
  // Animasi statistik hero
  animateStats()

  // Tambah hover effects pada program cards
  addProgramCardEffects()

  // Inisialisasi testimonial slider
  initTestimonialSlider()

  // Inisialisasi CTA button handlers
  initializeCTAButtons()

  // Tambah parallax effect
  initializeParallaxEffect()
})

// ========================================
// STATS ANIMATION - ANIMASI ANGKA STATISTIK
// ========================================

// Animasi angka statistik dari 0 ke target
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number")

  // Fungsi untuk animasi angka
  const animateNumber = (element, target) => {
    const duration = 2000 // 2 detik
    const start = 0
    const increment = target / (duration / 16) // 60fps
    let current = start

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }

      // Format angka berdasarkan target
      if (target >= 1000) {
        element.textContent = Math.floor(current / 1000) + "K+"
      } else {
        element.textContent = Math.floor(current) + "%"
      }
    }, 16)
  }

  // Gunakan Intersection Observer untuk trigger animasi
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const text = entry.target.textContent
        let target = 0

        // Tentukan target berdasarkan text content
        if (text.includes("5000+")) target = 5000
        else if (text.includes("50+")) target = 50
        else if (text.includes("95%")) target = 95

        if (target > 0) {
          animateNumber(entry.target, target)
          observer.unobserve(entry.target) // Hanya animasi sekali
        }
      }
    })
  })

  // Observe semua stat numbers
  statNumbers.forEach((stat) => observer.observe(stat))
}

// ========================================
// PROGRAM CARDS - INTERAKSI CARD PROGRAM
// ========================================

// Tambah interactive effects pada program cards
function addProgramCardEffects() {
  const programCards = document.querySelectorAll(".program-card")

  programCards.forEach((card) => {
    // Hover effect - scale dan translate
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })

    // Click handler untuk tombol "Pelajari Lebih Lanjut"
    const learnMoreBtn = card.querySelector(".btn")
    if (learnMoreBtn) {
      learnMoreBtn.addEventListener("click", function (e) {
        e.preventDefault()
        const href = this.getAttribute("href")

        // Tambah loading state
        this.innerHTML = '<span class="loading"></span> Loading...'

        // Redirect setelah delay
        setTimeout(() => {
          window.location.href = href
        }, 500)
      })
    }
  })
}

// ========================================
// TESTIMONIAL SLIDER - SLIDER TESTIMONIAL
// ========================================

// Inisialisasi testimonial slider (untuk testimonial tambahan)
function initTestimonialSlider() {
  const testimonialGrid = document.querySelector(".testimonial-grid")
  if (!testimonialGrid) return

  // Data testimonial tambahan
  const additionalTestimonials = [
    {
      text: "Materi di KodePintar sangat terstruktur dan mudah dipahami. Sekarang saya bekerja sebagai Backend Developer di startup yang sedang berkembang pesat.",
      author: "Andi Pratama",
      position: "Backend Developer di Bukalapak",
      image: "../images/cowo.jpeg",
    },
    {
      text: "Komunitas di KodePintar sangat supportif. Mentor dan teman-teman selalu siap membantu ketika ada kesulitan dalam belajar.",
      author: "Sari Indah",
      position: "Mobile Developer di Traveloka",
      image: "../images/cewe.png",
    },
  ]

  // Logic untuk carousel atau load more testimonials bisa ditambah di sini
}

// ========================================
// CTA BUTTONS - CALL TO ACTION HANDLERS
// ========================================

// Inisialisasi CTA button handlers
function initializeCTAButtons() {
  // Handler untuk tombol CTA primary
  document.addEventListener("click", (e) => {
    if (e.target.matches(".cta .btn-primary")) {
      e.preventDefault()

      // Animasi button press
      e.target.style.transform = "scale(0.95)"
      setTimeout(() => {
        e.target.style.transform = "scale(1)"
        window.location.href = "pages/register.html"
      }, 150)
    }

    // Handler untuk tombol CTA secondary
    if (e.target.matches(".cta .btn-secondary")) {
      e.preventDefault()

      e.target.style.transform = "scale(0.95)"
      setTimeout(() => {
        e.target.style.transform = "scale(1)"
        window.location.href = "pages/contact.html"
      }, 150)
    }
  })
}

// ========================================
// PARALLAX EFFECT - EFEK PARALLAX HERO
// ========================================

// Inisialisasi parallax effect pada hero section
function initializeParallaxEffect() {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const hero = document.querySelector(".hero")

    if (hero) {
      const rate = scrolled * -0.5 // Kecepatan parallax
      hero.style.transform = `translateY(${rate}px)`
    }
  })
}

// ========================================
// TYPING EFFECT - EFEK MENGETIK (OPSIONAL)
// ========================================

// Tambah typing effect pada hero title
function addTypingEffect() {
  const heroTitle = document.querySelector(".hero-content h2")
  if (!heroTitle) return

  const text = heroTitle.textContent
  heroTitle.textContent = ""

  let i = 0
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i)
      i++
      setTimeout(typeWriter, 50) // Kecepatan mengetik
    }
  }

  // Mulai typing effect setelah delay
  setTimeout(typeWriter, 1000)
}

// Uncomment untuk mengaktifkan typing effect
// addTypingEffect();
