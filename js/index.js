/* Index page interactions
   - Card reveal / flip-style animation
   - FAQ accordion: only one answer opens at a time
*/

const sections = document.querySelectorAll(".card-section");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const section = entry.target;

      if (entry.isIntersecting) {
        section.classList.add("is-visible");
        section.classList.remove("is-hidden-past");
      } else {
        const sectionTop = section.getBoundingClientRect().top;

        if (sectionTop < 0) {
          section.classList.remove("is-visible");
          section.classList.add("is-hidden-past");
        } else {
          section.classList.remove("is-visible", "is-hidden-past");
        }
      }
    });
  },
  {
    threshold: 0.35,
    rootMargin: "-12% 0px -18% 0px"
  }
);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (item.open) {
      document.querySelectorAll(".faq-item").forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.removeAttribute("open");
        }
      });
    }
  });
});