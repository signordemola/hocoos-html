document.addEventListener("DOMContentLoaded", () => {
  // Select all elements with kmb-widget-aligment-wrap class
  const elements = document.querySelectorAll(".kmb-widget-aligment-wrap");

  // Create Intersection Observer
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add animation classes when element is in view
          entry.target.classList.add("animate__animated", "animate__fadeInUp");
          // Stop observing after animation is applied
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null, // Use viewport as root
      rootMargin: "0px", // No extra margin
      threshold: 0.1, // Trigger when 10% of the element is visible
    }
  );

  // Observe each element
  elements.forEach((element) => {
    observer.observe(element);
  });
});
