document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    const target = document.querySelector(
      link.getAttribute('href')
    );

    target?.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero img');

  hero.style.transform =
    `translateY(${window.scrollY * 0.15}px)`;
});
