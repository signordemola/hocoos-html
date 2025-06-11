document.addEventListener("DOMContentLoaded", () => {
  // Function to initialize a slider
  const initSlider = (containerId, cloneCount) => {
    const container = document.querySelector(`#${containerId}`);
    const slider = container.querySelector(".kmb-site-slider");
    const stage = container.querySelector(".kmb-slider-stage");
    const slides = container.querySelectorAll(
      ".kmb-site-slider-item:not(.is-clone)"
    );
    const totalSlides = slides.length;
    const prevBtn = container.querySelector(".kmb-slide-prev-btn");
    const nextBtn = container.querySelector(".kmb-slide-next-btn");
    const indicators = container.querySelectorAll(".kmb-site-slider-indicator");
    let currentIndex = cloneCount; // Start after clones
    const transitionTime = 400; // Transition duration in ms
    let slideWidth = slides[0]?.offsetWidth || 1679.9; // Fallback width

    // Update slide width on resize
    const updateSlideWidth = () => {
      slideWidth = slides[0]?.offsetWidth || slideWidth;
      console.log(`Slider ${containerId}: SlideWidth ${slideWidth}px`);
      updateSliderPosition(); // Recalculate position
    };

    // Fix cloned slide images
    const fixCloneImages = () => {
      const mainSlides = container.querySelectorAll(
        ".kmb-site-slider-item:not(.is-clone)"
      );
      const cloneSlides = container.querySelectorAll(
        ".kmb-site-slider-item.is-clone"
      );
      cloneSlides.forEach((clone, i) => {
        const mainIndex = i % totalSlides;
        const mainImg = mainSlides[mainIndex].querySelector(
          ".kmb-widget-image-item"
        );
        const cloneImg = clone.querySelector(".kmb-widget-image-item");
        if (mainImg && cloneImg) {
          cloneImg.src = mainImg.src;
          cloneImg.srcset = mainImg.srcset || "";
          console.log(`Clone ${i}: Copied src ${mainImg.src}`);
        }
      });
    };

    // Ensure slide visibility
    const ensureSlideVisibility = () => {
      const allSlides = container.querySelectorAll(".kmb-site-slider-item");
      allSlides.forEach((slide) => {
        slide.style.visibility = "visible";
        slide.style.display = "block";
      });
    };

    // Preload images
    const preloadImages = () => {
      const images = container.querySelectorAll(".kmb-widget-image-item");
      images.forEach((img) => {
        if (img.getAttribute("loading") === "lazy") {
          img.setAttribute("loading", "eager");
        }
        img.src = img.src; // Trigger reload
        console.log(`Image src: ${img.src}, Visible: ${img.offsetWidth > 0}`);
      });
    };

    // Set slide position
    const updateSliderPosition = () => {
      stage.style.transition = `all ${transitionTime}ms ease`;
      const translateX = -currentIndex * slideWidth;
      stage.style.transform = `translate3d(${translateX}px, 0, 0)`;
      console.log(
        `Slider ${containerId}: Index ${currentIndex}, TranslateX ${translateX}px`
      );
      updateIndicators();
      setTimeout(() => {
        preloadImages();
        ensureSlideVisibility();
      }, transitionTime);
    };

    // Update active indicator
    const updateIndicators = () => {
      const indicatorIndex = currentIndex % totalSlides;
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle("active", index === indicatorIndex);
        indicator.style.background =
          index === indicatorIndex ? "rgb(33, 63, 153)" : "transparent";
      });
    };

    // Move to specific slide
    const moveToSlide = (index) => {
      currentIndex = index;
      if (currentIndex >= totalSlides + cloneCount) {
        currentIndex = cloneCount; // Jump to first main slide
        setTimeout(() => {
          stage.style.transition = "none";
          stage.style.transform = `translate3d(${
            -currentIndex * slideWidth
          }px, 0, 0)`;
          preloadImages();
          ensureSlideVisibility();
        }, transitionTime);
      } else if (currentIndex < cloneCount) {
        currentIndex = totalSlides + cloneCount - 1; // Jump to last main slide
        setTimeout(() => {
          stage.style.transition = "none";
          stage.style.transform = `translate3d(${
            -currentIndex * slideWidth
          }px, 0, 0)`;
          preloadImages();
          ensureSlideVisibility();
        }, transitionTime);
      }
      updateSliderPosition();
    };

    // Previous button click
    prevBtn.addEventListener("click", () => {
      moveToSlide(currentIndex - 1);
    });

    // Next button click
    nextBtn.addEventListener("click", () => {
      moveToSlide(currentIndex + 1);
    });

    // Indicator click
    indicators.forEach((indicator, index) => {
      indicator.addEventListener("click", () => {
        moveToSlide(cloneCount + index);
      });
    });

    // Handle window resize
    window.addEventListener("resize", updateSlideWidth);

    // Initialize slider
    fixCloneImages();
    preloadImages();
    ensureSlideVisibility();
    updateSlideWidth();
    updateSliderPosition();
  };

  // Initialize gallery slider (5 clones before main slides)
  initSlider("GallerySettingsT4V1_7302599227931", 5);

  // Initialize testimonials slider (4 clones before main slides)
  initSlider("TestimonialsSettingsT3V1_7301823248921", 4);
});
