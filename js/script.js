window.onbeforeunload = function () {
  window.scrollTo(0, 0); // Scroll to the top before the page is unloaded (refreshed)
};

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

//Smooth Scrolling

const allLinks = document.querySelectorAll("a");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    if (href !== "#" && !href.startsWith("#")) {
      window.open(href);
    }

    //scrtoll to secction with id

    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});

const sectionHeroEl = document.querySelector(".section-hero");

const observer = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    threshold: 0,
    root: null,
    rootMargin: "-80px",
  }
);
observer.observe(sectionHeroEl);

//Lazy Loading
const allProjectImages = document.querySelectorAll(".project-image");
const loadImage = (entries, observer) => {
  const [entry1, entry2] = entries;
  if (entry1?.isIntersecting && entry2?.isIntersecting) {
    entry1?.target.classList.remove("lazy-img");
    entry2?.target.classList.remove("lazy-img");
    observer.unobserve(entry1?.target);
    observer.unobserve(entry2?.target);
  }
};
const imgOptions = {
  root: null,
  threshold: 0,
  rootMargin: "-150px",
};
const imageObserver = new IntersectionObserver(loadImage, imgOptions);
allProjectImages.forEach((img) => imageObserver.observe(img));
