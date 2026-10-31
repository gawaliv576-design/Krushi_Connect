(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const getSavedTheme = () => {
        try {
            return window.localStorage.getItem("krushi-seva-theme");
        } catch (error) {
            console.warn("Theme preference could not be read from local storage.", error);
            return null;
        }
    };

    const saveTheme = (theme) => {
        try {
            window.localStorage.setItem("krushi-seva-theme", theme);
        } catch (error) {
            console.warn("Theme preference could not be saved to local storage.", error);
        }
    };

    const getSavedLanguage = () => {
        try {
            return window.localStorage.getItem("krushi-seva-language");
        } catch (error) {
            console.warn("Language preference could not be read from local storage.", error);
            return null;
        }
    };

    const setupLanguageSwitcher = () => {
        const switcher = document.querySelector("[data-language-switcher]");
        if (!switcher) {
            return;
        }

        const savedLanguage = getSavedLanguage();
        if (savedLanguage === "en" || savedLanguage === "mr") {
            switcher.value = savedLanguage;
            root.lang = savedLanguage === "mr" ? "mr" : "en";
        }

        switcher.addEventListener("change", () => {
            const language = switcher.value === "mr" ? "mr" : "en";
            root.lang = language;
            try {
                window.localStorage.setItem("krushi-seva-language", language);
            } catch (error) {
                console.warn("Language preference could not be saved to local storage.", error);
            }
        });
    };

    const setTheme = (theme) => {
        root.dataset.theme = theme;
        const toggle = document.querySelector("[data-theme-toggle]");
        if (toggle) {
            const dark = theme === "dark";
            toggle.setAttribute("aria-pressed", String(dark));
            toggle.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
            toggle.innerHTML = dark
                ? '<i class="bi bi-sun-fill" aria-hidden="true"></i>'
                : '<i class="bi bi-moon-stars-fill" aria-hidden="true"></i>';
        }
    };

    setTheme(getSavedTheme() === "dark" ? "dark" : "light");

    const createThemeToggle = () => {
        if (document.querySelector("[data-theme-toggle]")) {
            return;
        }
        const navbar = document.querySelector(".navbar");
        if (!navbar) {
            return;
        }

        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "premium-theme-toggle";
        toggle.dataset.themeToggle = "";
        toggle.setAttribute("aria-pressed", "false");
        toggle.setAttribute("aria-label", "Switch to dark theme");
        (navbar.querySelector(".container-fluid") || navbar).append(toggle);
        setTheme(root.dataset.theme);
    };

    const setupThemeToggle = () => {
        createThemeToggle();
        const toggle = document.querySelector("[data-theme-toggle]");
        if (!toggle) {
            return;
        }
        toggle.addEventListener("click", () => {
            const theme = root.dataset.theme === "dark" ? "light" : "dark";
            setTheme(theme);
            saveTheme(theme);
        });
    };

    const setupReveal = () => {
        const targets = document.querySelectorAll(
            "[data-reveal], .card, .feature-box, .stat-card, .category-pill-card, .public-product-card, .tip-card, .service-grid article, .seasonal-offer-notes article"
        );
        targets.forEach((target, index) => {
            target.classList.add("reveal");
            target.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
        });

        if (reducedMotion || !("IntersectionObserver" in window)) {
            targets.forEach((target) => target.classList.add("is-visible", "in"));
            return;
        }

        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible", "in");
                    currentObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });

        targets.forEach((target) => observer.observe(target));
    };

    const animateCount = (element) => {
        const target = Number(element.dataset.countup ?? element.textContent.trim().replace(/[^\d.-]/g, ""));
        if (!Number.isFinite(target)) {
            return;
        }
        const initialText = element.textContent.trim();
        const prefix = initialText.match(/^[^\d-]*/)?.[0] ?? "";
        const suffix = initialText.match(/[^\d.]*$/)?.[0] ?? "";
        const decimals = (String(target).split(".")[1] || "").length;
        const duration = 1100;
        const startTime = performance.now();
        const formatter = new Intl.NumberFormat("en-IN", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });

        const update = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const value = target * eased;
            element.textContent = `${prefix}${formatter.format(value)}${suffix}`;
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = `${prefix}${formatter.format(target)}${suffix}`;
            }
        };

        if (reducedMotion) {
            element.textContent = `${prefix}${formatter.format(target)}${suffix}`;
            return;
        }
        requestAnimationFrame(update);
    };

    const setupCountUp = () => {
        const counters = document.querySelectorAll("[data-countup], .count-up");
        if (reducedMotion || !("IntersectionObserver" in window)) {
            counters.forEach(animateCount);
            return;
        }

        const observer = new IntersectionObserver((entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateCount(entry.target);
                    currentObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });
        counters.forEach((counter) => observer.observe(counter));
    };

    const setupNavbar = () => {
        const navbar = document.querySelector(".navbar");
        if (!navbar) {
            return;
        }
        const updateNavbar = () => {
            const scrolled = window.scrollY > 12;
            navbar.classList.toggle("is-scrolled", scrolled);
            navbar.classList.toggle("scrolled", scrolled);
        };
        updateNavbar();
        window.addEventListener("scroll", updateNavbar, { passive: true });
    };

    const setupAdminSidebar = () => {
        const sidebar = document.querySelector(".sidebar-krushi");
        if (!sidebar) {
            return;
        }

        const toggle = document.createElement("button");
        toggle.type = "button";
        toggle.className = "admin-sidebar-toggle";
        toggle.setAttribute("aria-controls", sidebar.id || "adminSidebar");
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = '<i class="bi bi-list" aria-hidden="true"></i><span>Menu</span>';

        const scrim = document.createElement("div");
        scrim.className = "admin-sidebar-scrim";
        scrim.setAttribute("aria-hidden", "true");
        document.body.append(scrim);
        sidebar.before(toggle);

        const close = () => {
            sidebar.classList.remove("is-open");
            scrim.classList.remove("is-visible");
            toggle.setAttribute("aria-expanded", "false");
            document.body.classList.remove("admin-sidebar-open");
        };
        const open = () => {
            sidebar.classList.add("is-open");
            scrim.classList.add("is-visible");
            toggle.setAttribute("aria-expanded", "true");
            document.body.classList.add("admin-sidebar-open");
            sidebar.querySelector("a")?.focus();
        };

        toggle.addEventListener("click", () => {
            if (sidebar.classList.contains("is-open")) {
                close();
            } else {
                open();
            }
        });
        scrim.addEventListener("click", close);
        sidebar.addEventListener("click", (event) => {
            if (event.target instanceof Element
                && event.target.closest("a")
                && window.matchMedia("(max-width: 767.98px)").matches) {
                close();
            }
        });
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && sidebar.classList.contains("is-open")) {
                close();
                toggle.focus();
            }
        });
    };

    const setupRipples = () => {
        document.addEventListener("click", (event) => {
            const button = event.target.closest("button, .btn");
            if (!button || button.disabled || reducedMotion) {
                return;
            }
            const bounds = button.getBoundingClientRect();
            const diameter = Math.max(bounds.width, bounds.height);
            const ripple = document.createElement("span");
            ripple.className = "premium-ripple";
            ripple.setAttribute("aria-hidden", "true");
            ripple.style.width = `${diameter}px`;
            ripple.style.height = `${diameter}px`;
            ripple.style.left = `${event.clientX - bounds.left - diameter / 2}px`;
            ripple.style.top = `${event.clientY - bounds.top - diameter / 2}px`;
            button.classList.add("ripple-host");
            button.append(ripple);
            ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
        });
    };

    const setupHeroFallback = () => {
        document.querySelectorAll("video[data-hero-media], video.hero-video").forEach((video) => {
            const fallback = video.parentElement?.querySelector("[data-hero-fallback]");
            if (fallback) {
                fallback.hidden = true;
            }
            const showFallback = () => {
                video.hidden = true;
                if (fallback) {
                    fallback.hidden = false;
                }
            };
            video.addEventListener("error", showFallback, { once: true });
            video.addEventListener("abort", showFallback, { once: true });
            try {
                const playAttempt = video.play();
                if (playAttempt && typeof playAttempt.catch === "function") {
                    playAttempt.catch(showFallback);
                }
            } catch (error) {
                console.warn("Hero video could not be played; using its fallback.", error);
                showFallback();
            }
        });

        document.querySelectorAll("img[data-hero-fallback-src]").forEach((image) => {
            image.addEventListener("error", () => {
                const fallbackSrc = image.dataset.heroFallbackSrc;
                if (fallbackSrc && image.src !== new URL(fallbackSrc, window.location.href).href) {
                    image.src = fallbackSrc;
                }
            }, { once: true });
        });
    };

    document.addEventListener("DOMContentLoaded", () => {
        setupThemeToggle();
        setupLanguageSwitcher();
        setupReveal();
        setupCountUp();
        setupNavbar();
        setupAdminSidebar();
        setupRipples();
        setupHeroFallback();
    });
})();
