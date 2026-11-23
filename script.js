const cutCollections = [
  [
    "arquivos/cortes/1/SaveClip.App_888065786_18443613994196993_8817005907882299979_n.jpg",
    "arquivos/cortes/1/SaveClip.App_892740090_18443613985196993_7345044357889306546_n.jpg",
    "arquivos/cortes/1/SaveClip.App_892848294_18443614009196993_5244658464449591908_n.jpg"
  ],
  [
    "arquivos/cortes/2/SaveClip.App_628630117_17888661363428103_3944159136889105203_n.jpg",
    "arquivos/cortes/2/SaveClip.App_630130558_17888661372428103_7816793562048301015_n.jpg"
  ],
  [
    "arquivos/cortes/3/SaveClip.App_876261734_18442753072196993_4010786852088534901_n.jpg",
    "arquivos/cortes/3/SaveClip.App_883559115_18442753039196993_4611369542774328107_n.jpg",
    "arquivos/cortes/3/SaveClip.App_885931502_18442753048196993_1674338713821067957_n.jpg"
  ],
  [
    "arquivos/cortes/4/SaveClip.App_840205784_18438499498196993_1471964724451944169_n.jpg",
    "arquivos/cortes/4/SaveClip.App_842328865_18438499483196993_7012753720123384114_n.jpg"
  ],
  [
    "arquivos/cortes/5/SaveClip.App_863564053_18442384237196993_3097266971190667185_n.jpg",
    "arquivos/cortes/5/SaveClip.App_874186208_18442384276196993_3069673764356596273_n.jpg",
    "arquivos/cortes/5/SaveClip.App_876310530_18442384246196993_4409260891434980253_n.jpg"
  ],
  [
    "arquivos/cortes/6/SaveClip.App_869840171_18441527557196993_2380810192770412955_n.jpg",
    "arquivos/cortes/6/SaveClip.App_869843623_18441527569196993_5324039620873364516_n.jpg"
  ],
  [
    "arquivos/cortes/7/SaveClip.App_902825509_18446459557196993_4845283109486202520_n.jpg",
    "arquivos/cortes/7/SaveClip.App_902948991_18446459554196993_4297910156274374663_n.jpg"
  ],
  [
    "arquivos/cortes/8/SaveClip.App_652775985_17893139676428103_9142399531775635388_n.jpg",
    "arquivos/cortes/8/SaveClip.App_655803037_17893139667428103_5057461273187436605_n.jpg"
  ],
  [
    "arquivos/cortes/9/SaveClip.App_838909962_18438692116196993_7808990149721954922_n.jpg",
    "arquivos/cortes/9/SaveClip.App_844890046_18438692119196993_7599724641836865502_n.jpg"
  ],
  [
    "arquivos/cortes/10/SaveClip.App_772708074_18427914325196993_7456070754066013298_n.jpg",
    "arquivos/cortes/10/SaveClip.App_772854185_18427914334196993_1425325012445677335_n.jpg",
    "arquivos/cortes/10/SaveClip.App_772956494_18427914343196993_8164739366973278328_n.jpg"
  ]
];

const gallery = document.querySelector("#gallery-grid");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxCaption = document.querySelector(".lightbox-caption");
const lightboxThumbnails = document.querySelector(".lightbox-thumbnails");
let activeCollection = [];
let activePhotoIndex = 0;

function showCollectionPhoto(index) {
  activePhotoIndex = (index + activeCollection.length) % activeCollection.length;
  const src = activeCollection[activePhotoIndex];
  const label = `Foto ${activePhotoIndex + 1} de ${activeCollection.length}`;

  lightboxImage.src = src;
  lightboxImage.alt = label;
  lightboxCaption.textContent = `${String(activePhotoIndex + 1).padStart(2, "0")} / ${String(activeCollection.length).padStart(2, "0")}`;
  lightboxCaption.setAttribute("aria-label", label);
  lightboxImage.classList.remove("is-changing");
  void lightboxImage.offsetWidth;
  lightboxImage.classList.add("is-changing");
  lightboxThumbnails.querySelectorAll("button").forEach((thumbnail, thumbnailIndex) => {
    const isActive = thumbnailIndex === activePhotoIndex;
    thumbnail.classList.toggle("is-active", isActive);
    thumbnail.setAttribute("aria-pressed", String(isActive));
  });
}

cutCollections.forEach((photos) => {
  const button = document.createElement("button");
  const image = document.createElement("img");
  const cardInfo = document.createElement("span");
  const photoCount = document.createElement("span");

  button.className = "gallery-item";
  button.type = "button";
  button.setAttribute("aria-label", `Abrir galeria de fotos, ${photos.length} fotos`);
  image.src = photos[0];
  image.alt = `Exemplo de corte, foto 1 de ${photos.length}`;
  image.loading = "lazy";
  cardInfo.className = "gallery-card-info";
  cardInfo.setAttribute("aria-hidden", "true");
  photoCount.textContent = `${photos.length} fotos`;
  cardInfo.append(photoCount);
  button.append(image, cardInfo);
  button.addEventListener("click", () => {
    activeCollection = photos;
    lightboxThumbnails.replaceChildren();
    photos.forEach((photo, photoIndex) => {
      const thumbnail = document.createElement("button");
      const thumbnailImage = document.createElement("img");
      thumbnail.className = "lightbox-thumbnail";
      thumbnail.type = "button";
      thumbnail.setAttribute("aria-label", `Ver foto ${photoIndex + 1} de ${photos.length}`);
      thumbnail.setAttribute("aria-pressed", "false");
      thumbnailImage.src = photo;
      thumbnailImage.alt = "";
      thumbnail.append(thumbnailImage);
      thumbnail.addEventListener("click", () => showCollectionPhoto(photoIndex));
      lightboxThumbnails.append(thumbnail);
    });
    showCollectionPhoto(0);
    lightbox.showModal();
  });
  gallery.append(button);
});

document.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
document.querySelector(".lightbox-previous").addEventListener("click", () => showCollectionPhoto(activePhotoIndex - 1));
document.querySelector(".lightbox-next").addEventListener("click", () => showCollectionPhoto(activePhotoIndex + 1));
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  mainNav.classList.remove("is-open");
  document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
  mainNav.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.querySelector("#current-year").textContent = new Date().getFullYear();

const serviceCarousel = document.querySelector(".service-carousel");
const serviceGrid = serviceCarousel.querySelector(".service-grid");
const serviceCards = Array.from(serviceGrid.querySelectorAll(".service-card"));
const servicePrevious = serviceCarousel.querySelector(".service-carousel-previous");
const serviceNext = serviceCarousel.querySelector(".service-carousel-next");
const serviceStatus = serviceCarousel.querySelector(".service-carousel-status");
const serviceCarouselMedia = window.matchMedia("(max-width: 820px)");
let activeServiceIndex = 0;
let touchStartX = 0;
let suppressServiceClickUntil = 0;

function updateServiceCarousel() {
  const isMobile = serviceCarouselMedia.matches;
  serviceCarousel.classList.toggle("is-enabled", isMobile);

  serviceCards.forEach((card, index) => {
    card.classList.remove("is-active", "is-previous", "is-next", "is-hidden");
    card.removeAttribute("aria-current");
    if (!isMobile) return;

    const position = (index - activeServiceIndex + serviceCards.length) % serviceCards.length;
    if (position === 0) {
      card.classList.add("is-active");
      card.setAttribute("aria-current", "true");
    } else if (position === 1) {
      card.classList.add("is-next");
    } else if (position === serviceCards.length - 1) {
      card.classList.add("is-previous");
    } else {
      card.classList.add("is-hidden");
    }
  });

  serviceStatus.textContent = `${String(activeServiceIndex + 1).padStart(2, "0")} / ${String(serviceCards.length).padStart(2, "0")}`;
}

function moveServiceCarousel(direction) {
  activeServiceIndex = (activeServiceIndex + direction + serviceCards.length) % serviceCards.length;
  updateServiceCarousel();
}

serviceCards.forEach((card, index) => {
  card.addEventListener("click", (event) => {
    if (Date.now() < suppressServiceClickUntil) {
      event.preventDefault();
      return;
    }
    if (!serviceCarouselMedia.matches || index === activeServiceIndex) return;
    event.preventDefault();
    activeServiceIndex = index;
    updateServiceCarousel();
  });
});

servicePrevious.addEventListener("click", () => moveServiceCarousel(-1));
serviceNext.addEventListener("click", () => moveServiceCarousel(1));
serviceGrid.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].clientX;
}, { passive: true });
serviceGrid.addEventListener("touchend", (event) => {
  const swipeDistance = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(swipeDistance) < 40) return;
  suppressServiceClickUntil = Date.now() + 500;
  moveServiceCarousel(swipeDistance < 0 ? 1 : -1);
}, { passive: true });

if (typeof serviceCarouselMedia.addEventListener === "function") {
  serviceCarouselMedia.addEventListener("change", updateServiceCarousel);
} else {
  serviceCarouselMedia.addListener(updateServiceCarousel);
}
window.addEventListener("resize", updateServiceCarousel, { passive: true });
updateServiceCarousel();

const reducedMotionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");

if ("IntersectionObserver" in window && !reducedMotionPreference.matches) {
  const revealTargets = document.querySelectorAll(
    ".section-heading, .story-photo-wrap, .story-copy, .service-card, .gallery-item, .visit-card, .footer-brand, .footer-message, .footer-links a"
  );
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });

  document.documentElement.classList.add("motion-enabled");
  revealTargets.forEach((element) => {
    const siblingIndex = Array.prototype.indexOf.call(element.parentElement.children, element);
    element.classList.add("scroll-reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(siblingIndex, 3) * 90}ms`);
    revealObserver.observe(element);
  });
}
