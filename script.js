// Jeden adres zakupu dla wszystkich przycisków kierujących do zamówienia.
const CHECKOUT_URL = 'https://www.naffy.io/brajan-kaczmarek/dieta-jed';
document.querySelectorAll('[data-buy], #buy').forEach((button) => {
  button.setAttribute('href', CHECKOUT_URL);
  button.removeAttribute('target');
  button.setAttribute('rel', 'noopener noreferrer');
});
document.querySelector('#year').textContent = new Date().getFullYear();
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
  }), { threshold: 0.12 });
  items.forEach((item) => io.observe(item));
} else { items.forEach((item) => item.classList.add('visible')); }
