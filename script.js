const navToggle = document.querySelector(".nav-toggle");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

const setActiveLink = (sectionId) => {
    navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${sectionId}`;
        link.classList.toggle("active", isActive);
        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
};

const updateActiveSection = () => {
    const offset = 140;
    const scrollPosition = window.scrollY + offset;

    let currentSection = sections[0];

    sections.forEach((section) => {
        if (scrollPosition >= section.offsetTop) {
            currentSection = section;
        }
    });

    if (currentSection) {
        setActiveLink(currentSection.id);
    }
};

window.addEventListener("scroll", updateActiveSection, { passive: true });
window.addEventListener("load", updateActiveSection);
window.addEventListener("resize", updateActiveSection);

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        if (navToggle) {
            navToggle.checked = false;
        }

        if (link.getAttribute("href") === "#home") {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            setActiveLink("home");
            return;
        }

        requestAnimationFrame(updateActiveSection);
    });
});
