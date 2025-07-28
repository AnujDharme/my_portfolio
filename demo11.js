
document.addEventListener("DOMContentLoaded", function () {
  const typingText = "I am a cricketer";
  const rBio = document.querySelector(".rbio");
  let index = 0;

  function type() {
    if (index < typingText.length) {
      rBio.textContent += typingText.charAt(index);
      index++;
      setTimeout(type, 100);
    }
  }

  type();

  function toggleSection(section) {
    document.querySelectorAll("section").forEach(sec => {
      if (sec !== section) {
        sec.classList.remove("visible");
      }
    });
    section.classList.toggle("visible");
    if (section.classList.contains("visible")) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  const aboutLink = document.getElementById("aboutLink");
  const aboutSection = document.getElementById("about");

  if (aboutLink && aboutSection) {
    aboutLink.addEventListener("click", function (e) {
      e.preventDefault();
      toggleSection(aboutSection);
    });
  }


  const educationLink = document.getElementById("educationLink");
  const educationSection = document.getElementById("education");

  if (educationLink && educationSection) {
    educationLink.addEventListener("click", function (e) {
      e.preventDefault();
      toggleSection(educationSection);
    });
  }


  const servicesLink = document.getElementById("servicesLink");
  const servicesSection = document.getElementById("services");

  if (servicesLink && servicesSection) {
    servicesLink.addEventListener("click", function (e) {
      e.preventDefault();
      toggleSection(servicesSection);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  const scrollBtn = document.getElementById("scrollTopBtn");

  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
