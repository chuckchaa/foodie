document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.querySelector('[data-burger]')
  const headerNav = document.querySelector('.header__nav')

  burgerBtn.addEventListener('click', function () {
    this.classList.toggle('burger_active')
    headerNav.classList.toggle('header__nav_active')
  })
})
