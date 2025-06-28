// Authentication functionality

document.addEventListener("DOMContentLoaded", () => {
  initializeAuthForms()
})

// Initialize authentication forms
function initializeAuthForms() {
  const registerForm = document.getElementById("registerForm")
  const loginForm = document.getElementById("loginForm")

  if (registerForm) {
    initializeRegisterForm(registerForm)
  }

  if (loginForm) {
    initializeLoginForm(loginForm)
  }
}

// Initialize register form
function initializeRegisterForm(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    if (validateRegisterForm()) {
      processRegistration()
    }
  })

  // Real-time validation
  const inputs = form.querySelectorAll("input, select")
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this)
    })

    input.addEventListener("input", function () {
      clearError(this)
    })
  })
}

// Initialize login form
function initializeLoginForm(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    if (validateLoginForm()) {
      processLogin()
    }
  })

  // Real-time validation
  const inputs = form.querySelectorAll("input")
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this)
    })

    input.addEventListener("input", function () {
      clearError(this)
    })
  })
}

// Validate register form
function validateRegisterForm() {
  let isValid = true

  const fullName = document.getElementById("fullName")
  const email = document.getElementById("email")
  const phone = document.getElementById("phone")
  const password = document.getElementById("password")
  const confirmPassword = document.getElementById("confirmPassword")
  const experience = document.getElementById("experience")
  const interest = document.getElementById("interest")
  const terms = document.getElementById("terms")

  // Validate full name
  if (!fullName.value.trim()) {
    showFieldError(fullName, "Nama lengkap harus diisi")
    isValid = false
  } else if (fullName.value.trim().length < 3) {
    showFieldError(fullName, "Nama lengkap minimal 3 karakter")
    isValid = false
  }

  // Validate email
  if (!email.value.trim()) {
    showFieldError(email, "Email harus diisi")
    isValid = false
  } else if (!validateEmail(email.value)) {
    showFieldError(email, "Format email tidak valid")
    isValid = false
  }

  // Validate phone
  if (!phone.value.trim()) {
    showFieldError(phone, "Nomor telepon harus diisi")
    isValid = false
  } else if (!validatePhone(phone.value)) {
    showFieldError(phone, "Format nomor telepon tidak valid")
    isValid = false
  }

  // Validate password
  if (!password.value) {
    showFieldError(password, "Password harus diisi")
    isValid = false
  } else if (password.value.length < 8) {
    showFieldError(password, "Password minimal 8 karakter")
    isValid = false
  } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password.value)) {
    showFieldError(password, "Password harus mengandung huruf dan angka")
    isValid = false
  }

  // Validate confirm password
  if (!confirmPassword.value) {
    showFieldError(confirmPassword, "Konfirmasi password harus diisi")
    isValid = false
  } else if (password.value !== confirmPassword.value) {
    showFieldError(confirmPassword, "Password tidak cocok")
    isValid = false
  }

  // Validate experience
  if (!experience.value) {
    showFieldError(experience, "Pilih pengalaman programming Anda")
    isValid = false
  }

  // Validate interest
  if (!interest.value) {
    showFieldError(interest, "Pilih kelas yang diminati")
    isValid = false
  }

  // Validate terms
  if (!terms.checked) {
    showFieldError(terms, "Anda harus menyetujui syarat dan ketentuan")
    isValid = false
  }

  return isValid
}

// Validate login form
function validateLoginForm() {
  let isValid = true

  const email = document.getElementById("loginEmail")
  const password = document.getElementById("loginPassword")

  // Validate email
  if (!email.value.trim()) {
    showFieldError(email, "Email harus diisi")
    isValid = false
  } else if (!validateEmail(email.value)) {
    showFieldError(email, "Format email tidak valid")
    isValid = false
  }

  // Validate password
  if (!password.value) {
    showFieldError(password, "Password harus diisi")
    isValid = false
  }

  return isValid
}

// Validate individual field
function validateField(field) {
  const fieldName = field.name
  const value = field.value.trim()

  switch (fieldName) {
    case "fullName":
      if (!value) {
        showFieldError(field, "Nama lengkap harus diisi")
      } else if (value.length < 3) {
        showFieldError(field, "Nama lengkap minimal 3 karakter")
      } else {
        clearError(field)
      }
      break

    case "email":
      if (!value) {
        showFieldError(field, "Email harus diisi")
      } else if (!validateEmail(value)) {
        showFieldError(field, "Format email tidak valid")
      } else {
        clearError(field)
      }
      break

    case "phone":
      if (!value) {
        showFieldError(field, "Nomor telepon harus diisi")
      } else if (!validatePhone(value)) {
        showFieldError(field, "Format nomor telepon tidak valid")
      } else {
        clearError(field)
      }
      break

    case "password":
      if (!field.value) {
        showFieldError(field, "Password harus diisi")
      } else if (field.value.length < 8) {
        showFieldError(field, "Password minimal 8 karakter")
      } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(field.value)) {
        showFieldError(field, "Password harus mengandung huruf dan angka")
      } else {
        clearError(field)
      }
      break

    case "confirmPassword":
      const passwordField = document.getElementById("password")
      if (!field.value) {
        showFieldError(field, "Konfirmasi password harus diisi")
      } else if (passwordField && passwordField.value !== field.value) {
        showFieldError(field, "Password tidak cocok")
      } else {
        clearError(field)
      }
      break
  }
}

// Show field error
function showFieldError(field, message) {
  const formGroup = field.closest(".form-group")
  const errorElement = formGroup.querySelector(".error-message")

  formGroup.classList.add("error")
  if (errorElement) {
    errorElement.textContent = message
  }
}

// Clear field error
function clearError(field) {
  const formGroup = field.closest(".form-group")
  const errorElement = formGroup.querySelector(".error-message")

  formGroup.classList.remove("error")
  if (errorElement) {
    errorElement.textContent = ""
  }
}

// Proses registrasi - simpan data ke localStorage
function processRegistration() {
  const submitBtn = document.querySelector('#registerForm button[type="submit"]')
  const originalText = submitBtn.textContent

  // Show loading state
  submitBtn.classList.add("loading")
  submitBtn.textContent = "Mendaftar..."
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    const formData = new FormData(document.getElementById("registerForm"))
    const userData = {
      id: generateId(),
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"), // Simpan password untuk login
      experience: formData.get("experience"),
      interest: formData.get("interest"),
      newsletter: formData.get("newsletter") === "on",
      registeredAt: new Date().toISOString(),
    }

    // Simpan data user ke localStorage
    localStorage.setItem("userInfo", JSON.stringify(userData))
    localStorage.setItem("isLoggedIn", "true")

    // Inisialisasi data pembelajaran kosong
    localStorage.setItem("enrolledClasses", JSON.stringify([]))
    localStorage.setItem("completedLessons", "0")
    localStorage.setItem("certificates", "0")
    localStorage.setItem("studyHours", "0")

    // Reset button
    submitBtn.classList.remove("loading")
    submitBtn.textContent = originalText
    submitBtn.disabled = false

    showNotification("Registrasi berhasil! Selamat datang di KodePintar", "success")

    // Redirect to dashboard
    setTimeout(() => {
      window.location.href = "dashboard.html"
    }, 1500)
  }, 2000)
}

// Proses login - cek data dari localStorage
function processLogin() {
  const submitBtn = document.querySelector('#loginForm button[type="submit"]')
  const originalText = submitBtn.textContent

  // Show loading state
  submitBtn.classList.add("loading")
  submitBtn.textContent = "Masuk..."
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    const email = document.getElementById("loginEmail").value
    const password = document.getElementById("loginPassword").value

    // Ambil data user yang tersimpan
    const savedUser = JSON.parse(localStorage.getItem("userInfo") || "{}")

    // Validasi email dan password
    if (savedUser.email === email && savedUser.password === password) {
      // Login berhasil
      localStorage.setItem("isLoggedIn", "true")

      showNotification("Login berhasil! Selamat datang kembali", "success")

      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = "dashboard.html"
      }, 1500)
    } else {
      // Login gagal
      if (savedUser.email !== email) {
        showNotification("Email tidak terdaftar", "error")
      } else {
        showNotification("Password salah", "error")
      }
    }

    // Reset button
    submitBtn.classList.remove("loading")
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 1500)
}

// Declare validateEmail function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Validasi nomor telepon Indonesia - format yang lebih fleksibel
function validatePhone(phone) {
  // Hapus semua spasi, tanda hubung, dan karakter non-digit kecuali +
  const cleanPhone = phone.replace(/[\s\-()]/g, "")

  // Pattern untuk nomor Indonesia:
  // - Dimulai dengan +62, 62, atau 0
  // - Diikuti 8-12 digit
  // - Total panjang 10-15 karakter
  const patterns = [
    /^\+62[0-9]{8,12}$/, // +62812345678
    /^62[0-9]{8,12}$/, // 62812345678
    /^0[0-9]{9,12}$/, // 0812345678
    /^[0-9]{10,12}$/, // 812345678 (tanpa kode negara/0)
  ]

  return patterns.some((pattern) => pattern.test(cleanPhone))
}

// Declare generateId function
function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

// Declare showNotification function
function showNotification(message, type) {
  const notification = document.createElement("div")
  notification.classList.add("notification", type)
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
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 3000)
}
