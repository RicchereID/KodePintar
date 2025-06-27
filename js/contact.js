// Contact page functionality

document.addEventListener("DOMContentLoaded", () => {
  initializeContactForm()
  initializeFAQ()
  addSmoothAnimationsToContactItems()
  addHoverEffectsToContactInfo()
})

// Initialize contact form
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      if (validateContactForm()) {
        processContactForm()
      }
    })

    // Real-time validation
    const inputs = contactForm.querySelectorAll("input, select, textarea")
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateContactField(this)
      })

      input.addEventListener("input", function () {
        clearContactError(this)
      })
    })
  }
}

// Validate contact form
function validateContactForm() {
  let isValid = true

  const name = document.getElementById("name")
  const email = document.getElementById("email")
  const subject = document.getElementById("subject")
  const message = document.getElementById("message")

  // Validate name
  if (!name.value.trim()) {
    showContactFieldError(name, "Nama lengkap harus diisi")
    isValid = false
  } else if (name.value.trim().length < 3) {
    showContactFieldError(name, "Nama lengkap minimal 3 karakter")
    isValid = false
  }

  // Validate email
  if (!email.value.trim()) {
    showContactFieldError(email, "Email harus diisi")
    isValid = false
  } else if (!validateEmail(email.value)) {
    showContactFieldError(email, "Format email tidak valid")
    isValid = false
  }

  // Validate subject
  if (!subject.value) {
    showContactFieldError(subject, "Pilih subjek pesan")
    isValid = false
  }

  // Validate message
  if (!message.value.trim()) {
    showContactFieldError(message, "Pesan harus diisi")
    isValid = false
  } else if (message.value.trim().length < 10) {
    showContactFieldError(message, "Pesan minimal 10 karakter")
    isValid = false
  }

  return isValid
}

// Validate individual contact field
function validateContactField(field) {
  const fieldName = field.name
  const value = field.value.trim()

  switch (fieldName) {
    case "name":
      if (!value) {
        showContactFieldError(field, "Nama lengkap harus diisi")
      } else if (value.length < 3) {
        showContactFieldError(field, "Nama lengkap minimal 3 karakter")
      } else {
        clearContactError(field)
      }
      break

    case "email":
      if (!value) {
        showContactFieldError(field, "Email harus diisi")
      } else if (!validateEmail(value)) {
        showContactFieldError(field, "Format email tidak valid")
      } else {
        clearContactError(field)
      }
      break

    case "phone":
      if (value && !validatePhone(value)) {
        showContactFieldError(field, "Format nomor telepon tidak valid")
      } else {
        clearContactError(field)
      }
      break

    case "subject":
      if (!field.value) {
        showContactFieldError(field, "Pilih subjek pesan")
      } else {
        clearContactError(field)
      }
      break

    case "message":
      if (!value) {
        showContactFieldError(field, "Pesan harus diisi")
      } else if (value.length < 10) {
        showContactFieldError(field, "Pesan minimal 10 karakter")
      } else {
        clearContactError(field)
      }
      break
  }
}

// Show contact field error
function showContactFieldError(field, message) {
  const formGroup = field.closest(".form-group")
  let errorElement = formGroup.querySelector(".error-message")

  if (!errorElement) {
    errorElement = document.createElement("span")
    errorElement.className = "error-message"
    formGroup.appendChild(errorElement)
  }

  formGroup.classList.add("error")
  errorElement.textContent = message
}

// Clear contact field error
function clearContactError(field) {
  const formGroup = field.closest(".form-group")
  const errorElement = formGroup.querySelector(".error-message")

  formGroup.classList.remove("error")
  if (errorElement) {
    errorElement.textContent = ""
  }
}

// Process contact form
function processContactForm() {
  const submitBtn = document.querySelector('#contactForm button[type="submit"]')
  const originalText = submitBtn.textContent

  // Show loading state
  submitBtn.innerHTML = '<span class="loading"></span> Mengirim...'
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    const formData = new FormData(document.getElementById("contactForm"))
    const contactData = {
      id: generateId(),
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      sentAt: new Date().toISOString(),
    }

    // Save contact data (in real app, this would be sent to server)
    const contacts = JSON.parse(localStorage.getItem("contacts") || "[]")
    contacts.push(contactData)
    localStorage.setItem("contacts", JSON.stringify(contacts))

    // Reset button
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false

    // Show success message
    showContactSuccess()

    // Reset form
    document.getElementById("contactForm").reset()
  }, 2000)
}

// Show contact success message
function showContactSuccess() {
  const contactForm = document.getElementById("contactForm")
  const successMessage = document.createElement("div")
  successMessage.className = "form-success"
  successMessage.innerHTML = `
        <strong>Pesan Terkirim!</strong><br>
        Terima kasih telah menghubungi kami. Tim kami akan merespons dalam 1x24 jam.
    `

  contactForm.parentNode.insertBefore(successMessage, contactForm)

  // Remove success message after 5 seconds
  setTimeout(() => {
    if (successMessage.parentNode) {
      successMessage.parentNode.removeChild(successMessage)
    }
  }, 5000)

  showNotification("Pesan berhasil dikirim!", "success")
}

// Initialize FAQ
function initializeFAQ() {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      // Close all FAQ items
      faqItems.forEach((faq) => faq.classList.remove("active"))

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active")
      }
    })
  })
}

// Add smooth animations to contact items
function addSmoothAnimationsToContactItems() {
  const contactItems = document.querySelectorAll(".contact-item")

  contactItems.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(20px)"

    setTimeout(() => {
      item.style.transition = "all 0.6s ease"
      item.style.opacity = "1"
      item.style.transform = "translateY(0)"
    }, index * 200)
  })
}

// Add hover effects to contact info
function addHoverEffectsToContactInfo() {
  const contactItems = document.querySelectorAll(".contact-item")
  contactItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(10px)"
      this.style.transition = "transform 0.3s ease"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)"
    })
  })
}

// Declare validateEmail function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// Declare validatePhone function
function validatePhone(phone) {
  const re = /^\+?[0-9]{7,15}$/
  return re.test(phone)
}

// Declare generateId function
function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

// Declare showNotification function
function showNotification(message, type) {
  console.log(`Notification (${type}): ${message}`)
}
