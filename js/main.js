// Configuração do AOS (Animate On Scroll)
document.addEventListener("DOMContentLoaded", function () {
  try {
    if (window.AOS && typeof AOS.init === "function") {
      AOS.init({
        duration: 800,
        once: true,
        offset: 100,
      });
    }
  } catch (e) {
    console.warn("AOS init falhou:", e);
  }

  // Hero Slider - Imagens rotativas (assets locais)
  const heroImages = [
    "assets/heroimg/01%20(2).png",
    "assets/heroimg/01.png",
    "assets/heroimg/03.png",
    "assets/heroimg/05-2.png",
    "assets/heroimg/06%20(1).png",
    "assets/heroimg/07.png",
    "assets/heroimg/09%20(1).png",
  ];

  let currentImageIndex = 0;
  const heroImgEl = document.getElementById("hero-image");
  const heroContainer = heroImgEl ? heroImgEl.parentElement : null;
  if (heroImgEl && heroContainer) {
    // usar crossfade com duas imagens sobrepostas
    const slideA = heroImgEl;
    slideA.classList.add("hero-slide");
    slideA.src = heroImages[0];
    slideA.classList.add("active");

    const slideB = document.createElement("img");
    slideB.className = slideA.className; // mantém ratio-fill w-full h-full object-cover
    slideB.classList.add("hero-slide");
    slideB.classList.remove("active");
    heroContainer.appendChild(slideB);

    setInterval(() => {
      const nextIndex = (currentImageIndex + 1) % heroImages.length;
      const preloader = new Image();
      preloader.src = heroImages[nextIndex];
      preloader.onload = () => {
        // preparar slideB com próxima imagem e ativar
        slideB.src = preloader.src;
        slideB.classList.add("active");
        slideA.classList.remove("active");
        // após transição, trocar referências
        setTimeout(() => {
          currentImageIndex = nextIndex;
          const tmp = slideA.src;
          slideA.src = slideB.src;
          slideB.classList.remove("active");
          // mantém slideB como próximo buffer
        }, 800);
      };
    }, 5000);
  }

  // Smooth scroll para links de navegação
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href") || "";
      const id = href.startsWith("#") ? href.slice(1) : "";
      if (!id) return;
      e.preventDefault();
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Formulário de contato
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Obter dados do formulário
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Aqui você pode adicionar o código para enviar o formulário
      // Por enquanto, apenas mostrar um alerta de sucesso
      alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
      this.reset();
    });
  }

  // Animação de hover nos projetos
  const projectItems = document.querySelectorAll(".project-item");
  projectItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.querySelector(".project-overlay").style.opacity = "1";
    });

    item.addEventListener("mouseleave", function () {
      this.querySelector(".project-overlay").style.opacity = "0";
    });
  });

  // Menu móvel acessível
  const menuButton = document.querySelector(".menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuClose = document.querySelector(".menu-close");
  const mobileLinks = document.querySelectorAll("#mobile-menu .mobile-link");

  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("translate-x-full");
    mobileMenu.classList.add("translate-x-0");
    mobileMenu.setAttribute("aria-hidden", "false");
    if (menuButton) {
      menuButton.setAttribute("aria-expanded", "true");
      menuButton.setAttribute("aria-label", "fechar menu");
    }
    document.body.classList.add("menu-open");
  }

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add("translate-x-full");
    mobileMenu.classList.remove("translate-x-0");
    mobileMenu.setAttribute("aria-hidden", "true");
    if (menuButton) {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "abrir menu");
    }
    document.body.classList.remove("menu-open");
  }

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      if (expanded) closeMenu();
      else openMenu();
    });
  }

  if (menuClose) {
    menuClose.addEventListener("click", closeMenu);
  }

  // Fechar ao selecionar um item
  mobileLinks.forEach((link) => link.addEventListener("click", closeMenu));

  // Fechar com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Reset ao mudar para desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) closeMenu();
  });

  // Submenu de Projeto (desktop)
  const projectsToggle = document.querySelector(".projects-toggle");
  const projectsSubmenu = document.getElementById("projects-submenu");

  function openProjects() {
    if (!projectsSubmenu || !projectsToggle) return;
    projectsSubmenu.classList.remove("hidden");
    projectsToggle.setAttribute("aria-expanded", "true");
  }

  function closeProjects() {
    if (!projectsSubmenu || !projectsToggle) return;
    projectsSubmenu.classList.add("hidden");
    projectsToggle.setAttribute("aria-expanded", "false");
  }

  let submenuHideTimer = null;
  if (projectsToggle && projectsSubmenu) {
    // Hover open
    projectsToggle.addEventListener("mouseenter", openProjects);
    projectsSubmenu.addEventListener("mouseenter", () => {
      if (submenuHideTimer) {
        clearTimeout(submenuHideTimer);
        submenuHideTimer = null;
      }
      openProjects();
    });
    projectsToggle.addEventListener("mouseleave", () => {
      submenuHideTimer = setTimeout(closeProjects, 500);
    });
    projectsSubmenu.addEventListener("mouseleave", () => {
      submenuHideTimer = setTimeout(closeProjects, 500);
    });
    // Click toggling for devices without hover
    projectsToggle.addEventListener("click", (e) => {
      e.preventDefault();
      const expanded = projectsToggle.getAttribute("aria-expanded") === "true";
      if (expanded) closeProjects();
      else openProjects();
    });
    // Outside click
    document.addEventListener("click", (e) => {
      if (
        !projectsSubmenu.contains(e.target) &&
        !projectsToggle.contains(e.target)
      ) {
        closeProjects();
      }
    });
    // Keyboard
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeProjects();
      const items = projectsSubmenu.querySelectorAll(".submenu-item");
      if (!items.length) return;
      const focusIndex = Array.from(items).findIndex(
        (el) => el === document.activeElement
      );
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next =
          items[Math.max(0, Math.min(items.length - 1, focusIndex + 1))];
        (next || items[0]).focus();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = items[Math.max(0, focusIndex - 1)];
        (prev || items[items.length - 1]).focus();
      }
    });
    // Mark dropdown as open for CSS animation
    const observer = new MutationObserver(() => {
      const expanded = projectsToggle.getAttribute("aria-expanded") === "true";
      if (expanded) projectsSubmenu.classList.add("open");
      else projectsSubmenu.classList.remove("open");
    });
    observer.observe(projectsToggle, {
      attributes: true,
      attributeFilter: ["aria-expanded"],
    });
  }

  // Estado ativo de itens do submenu (header e índice)
  const submenuItems = document.querySelectorAll(
    "#projects-submenu .submenu-item, #projects-index-dropdown .submenu-item"
  );
  const path = window.location.pathname;
  submenuItems.forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;
    // match simples por fim do caminho
    if (
      path.endsWith(href) ||
      (path.includes("/projects/") && path.endsWith(href.split("/").pop()))
    ) {
      a.setAttribute("aria-current", "page");
    }
    // Context menu custom
    a.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      let menu = document.getElementById("context-menu");
      if (!menu) {
        menu = document.createElement("div");
        menu.id = "context-menu";
        menu.className = "context-menu";
        menu.innerHTML =
          '<a href="#" data-action="open">abrir</a><a href="#" data-action="newtab">abrir em nova aba</a>';
        document.body.appendChild(menu);
      }
      menu.style.left = e.clientX + "px";
      menu.style.top = e.clientY + "px";
      menu.style.display = "block";
      const closeCtx = () => {
        menu.style.display = "none";
        document.removeEventListener("click", closeCtx);
      };
      document.addEventListener("click", closeCtx);
      menu.querySelectorAll("a").forEach((item) => {
        item.onclick = (ev) => {
          ev.preventDefault();
          const action = item.getAttribute("data-action");
          if (action === "open") window.location.href = href;
          if (action === "newtab") window.open(href, "_blank");
          closeCtx();
        };
      });
    });
  });

  // Dropdown de índice na página de projetos
  const projectsIndexToggle = document.querySelector(".projects-index-toggle");
  const projectsIndexDropdown = document.getElementById(
    "projects-index-dropdown"
  );

  function openProjectsIndex() {
    if (!projectsIndexDropdown || !projectsIndexToggle) return;
    projectsIndexDropdown.classList.remove("hidden");
    projectsIndexToggle.setAttribute("aria-expanded", "true");
  }

  function closeProjectsIndex() {
    if (!projectsIndexDropdown || !projectsIndexToggle) return;
    projectsIndexDropdown.classList.add("hidden");
    projectsIndexToggle.setAttribute("aria-expanded", "false");
  }

  if (projectsIndexToggle && projectsIndexDropdown) {
    projectsIndexToggle.addEventListener("click", (e) => {
      e.preventDefault();
      const expanded =
        projectsIndexToggle.getAttribute("aria-expanded") === "true";
      if (expanded) closeProjectsIndex();
      else openProjectsIndex();
    });

    document.addEventListener("click", (e) => {
      if (
        !projectsIndexDropdown.contains(e.target) &&
        !projectsIndexToggle.contains(e.target)
      ) {
        closeProjectsIndex();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeProjectsIndex();
    });
  }

  const projectOpeners = document.querySelectorAll(
    ".project-open[data-project]"
  );
  const carouselModal = document.getElementById("carousel-modal");
  const carouselImg = document.getElementById("carousel-image");
  const carouselPrev = document.getElementById("carousel-prev");
  const carouselNext = document.getElementById("carousel-next");
  const carouselClose = document.getElementById("carousel-close");
  const projectImages = {
    casaLima: [
      "../../assets/arquiimg/casaLima/01.png",
      "../../assets/arquiimg/casaLima/02.png",
      "../../assets/arquiimg/casaLima/03.png",
      "../../assets/arquiimg/casaLima/04%20(1).png",
    ],
    casaOlena: [
      "../../assets/arquiimg/casaOlena/01%20(2).png",
      "../../assets/arquiimg/casaOlena/02%20(1).png",
      "../../assets/arquiimg/casaOlena/03%20(1).png",
      "../../assets/arquiimg/casaOlena/04.png",
    ],
    casaTambau: [
      "../../assets/arquiimg/casaTambau/06%20(1).png",
      "../../assets/arquiimg/casaTambau/07.png",
      "../../assets/arquiimg/casaTambau/08%20(1).png",
      "../../assets/arquiimg/casaTambau/09%20(1).png",
      "../../assets/arquiimg/casaTambau/10%20(1)%20(1).png",
      "../../assets/arquiimg/casaTambau/WhatsApp%20Image%202025-08-09%20at%209.35.57%20AM%20(1).jpeg",
      "../../assets/arquiimg/casaTambau/WhatsApp%20Image%202025-08-09%20at%209.35.57%20AM%20(2).jpeg",
      "../../assets/arquiimg/casaTambau/WhatsApp%20Image%202025-08-09%20at%209.35.57%20AM.jpeg",
    ],
    hospCoracaojesus: [
      "../../assets/arquiimg/hospCoracaojesus/03%20(2).png",
      "../../assets/arquiimg/hospCoracaojesus/04%20(2).png",
      "../../assets/arquiimg/hospCoracaojesus/05-2.png",
      "../../assets/arquiimg/hospCoracaojesus/INTERIOR01.png",
      "../../assets/arquiimg/hospCoracaojesus/INTERIOR02.png",
    ],
    "consRi-so": [
      "../../assets/arqint/consRi-so/IMG_1306.PNG",
      "../../assets/arqint/consRi-so/IMG_1307.PNG",
      "../../assets/arqint/consRi-so/IMG_1308.PNG",
    ],
  };
  let carouselList = [];
  let carouselIndex = 0;
  function openCarousel(list) {
    carouselList = list || [];
    carouselIndex = 0;
    if (!carouselList.length || !carouselModal || !carouselImg) return;
    carouselImg.src = carouselList[carouselIndex];
    carouselModal.classList.remove("hidden");
  }
  function closeCarousel() {
    if (!carouselModal) return;
    carouselModal.classList.add("hidden");
  }
  function nextCarousel() {
    if (!carouselList.length) return;
    carouselIndex = (carouselIndex + 1) % carouselList.length;
    carouselImg.src = carouselList[carouselIndex];
  }
  function prevCarousel() {
    if (!carouselList.length) return;
    carouselIndex =
      (carouselIndex - 1 + carouselList.length) % carouselList.length;
    carouselImg.src = carouselList[carouselIndex];
  }
  projectOpeners.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const key = el.getAttribute("data-project");
      openCarousel(projectImages[key]);
    });
  });
  if (carouselPrev) carouselPrev.addEventListener("click", prevCarousel);
  if (carouselNext) carouselNext.addEventListener("click", nextCarousel);
  if (carouselClose) carouselClose.addEventListener("click", closeCarousel);
  if (carouselModal) {
    carouselModal.addEventListener("click", (e) => {
      if (e.target === carouselModal) closeCarousel();
    });
    document.addEventListener("keydown", (e) => {
      if (carouselModal.classList.contains("hidden")) return;
      if (e.key === "Escape") closeCarousel();
      if (e.key === "ArrowRight") nextCarousel();
      if (e.key === "ArrowLeft") prevCarousel();
    });
  }
});

// Função para carregar mais projetos (se houver)
function loadMoreProjects() {
  const projectGrid = document.querySelector(".project-grid");
  if (projectGrid) {
    // Adicionar mais projetos aqui se necessário
    console.log("Carregar mais projetos...");
  }
}

// Função para inicializar mapa (se necessário)
function initMap() {
  const mapContainer = document.querySelector(".map-container");
  if (mapContainer) {
    // O mapa já está embedado via iframe, mas pode adicionar funcionalidades extras aqui
    console.log("Mapa inicializado");
  }
}
