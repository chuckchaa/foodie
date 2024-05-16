document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.querySelector('[data-burger]')
  const headerNav = document.querySelector('.header__nav')

  burgerBtn.addEventListener('click', function () {
    this.classList.toggle('burger_active')
    headerNav.classList.toggle('header__nav_active')
  })

  const form = document.forms['contact-form']

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault()
      let isError = false

      const name = this.elements.name.value.trim()
      const nameError = document.querySelector('#name + .errorMessage')
      if (name === '') {
        nameError.textContent = 'Name is required.'
        isError = true
      } else {
        nameError.textContent = ''
      }

      const email = this.elements.email.value.trim()
      const emailError = document.querySelector('#email + .errorMessage')
      if (email === '') {
        emailError.textContent = 'Email is required.'
        isError = true
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailError.textContent = 'Please enter a valid email address.'
        isError = true
      } else {
        emailError.textContent = ''
      }

      const message = this.elements.message.value.trim()
      const messageError = document.querySelector('#message + .errorMessage')
      if (message === '') {
        messageError.textContent = 'Message is required.'
        isError = true
      } else {
        messageError.textContent = ''
      }

      if (!isError) {
        alert(`Name: ${name}, email: ${email}, message: ${message}`)
      }
    })
  }
})
