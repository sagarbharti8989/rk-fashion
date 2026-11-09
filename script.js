
// ==========================================
// RK FASHION - MAIN JAVASCRIPT
// Vanilla JavaScript
// ==========================================

(function () {
    "use strict";

    // ======================================
    // 1. SELECT HTML ELEMENTS
    // ======================================

    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    // ======================================
    // 2. MOBILE NAVIGATION
    // ======================================

    function setMenuState(isOpen, restoreFocus = false) {

        if (!menuToggle || !mobileMenu) return;

        mobileMenu.classList.toggle("active", isOpen);
        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        mobileMenu.setAttribute(
            "aria-hidden",
            String(!isOpen)
        );

        if (restoreFocus) {
            menuToggle.focus();
        }
    }

    if (menuToggle && mobileMenu) {

        // Toggle hamburger menu

        menuToggle.addEventListener("click", function () {

            const isOpen =
                mobileMenu.classList.contains("active");

            setMenuState(!isOpen);

        });

        // Close menu after navigation

        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(function (link) {

            link.addEventListener("click", function () {
                setMenuState(false, true);
            });

        });

        // Close menu when clicking outside

        document.addEventListener("click", function (event) {

            const clickedInsideMenu =
                mobileMenu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                setMenuState(false);
            }

        });

        // Close menu using Escape

        document.addEventListener("keydown", function (event) {

            if (
                event.key === "Escape" &&
                mobileMenu.classList.contains("active")
            ) {
                setMenuState(false, true);
            }

        });

        // Close mobile menu when switching to desktop

        window.addEventListener("resize", function () {

            if (window.innerWidth > 768) {
                setMenuState(false);
            }

        });

    }

    // ======================================
    // 3. NAVBAR SCROLL EFFECT
    // ======================================

    function updateHeader() {

        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 50
        );

    }

    // Initialize immediately

    updateHeader();

    // Update while scrolling

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    // ======================================
    // 4. SCROLL REVEAL ANIMATIONS
    // ======================================

    const revealElements =
        document.querySelectorAll(".reveal");

    const prefersReducedMotion =
        typeof window.matchMedia === "function" &&
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    // Add JavaScript-enabled class

    document.documentElement.classList.add("js-enabled");

    // Show elements immediately when necessary

    if (
        prefersReducedMotion ||
        !("IntersectionObserver" in window)
    ) {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });

    } else {

        // Initialize Intersection Observer

        const revealObserver = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.15
            }

        );

        // Observe all reveal elements

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    }

})();
