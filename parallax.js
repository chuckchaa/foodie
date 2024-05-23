document.addEventListener('DOMContentLoaded', () => {
  const parallax = document.getElementById('parallax')
  const background = parallax.querySelector('#background')
  const products = parallax.querySelector('#products')

  window.addEventListener('scroll', () => {
    let offset = window.scrollY

    background.style.top = offset * 0.9 + 'px'
    products.style.top = offset * 0.7 + 'px'
  })
})
