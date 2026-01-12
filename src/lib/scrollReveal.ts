export function initScrollReveal() {
  if (typeof window === 'undefined') return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          entry.target.classList.remove('reveal-hidden');
        }
      });
    },
    { threshold: 0.08 }
  );

  document.querySelectorAll('[data-slot="card"]').forEach((el) => {
    el.classList.add('reveal-hidden');
    observer.observe(el);
  });
}
