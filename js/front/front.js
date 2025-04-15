document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll(".navigation a");
    menuLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            menuLinks.forEach(link => link.classList.remove("active"));
            event.target.classList.add("active");
        });
    });
});