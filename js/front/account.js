document.addEventListener("DOMContentLoaded", () => {
    const editButton = document.getElementById("editProfileButton");
    const editForm = document.getElementById("editProfileForm");
    const cancelButton = document.getElementById("cancelEditButton");
    const profileDetails = document.querySelector(".profileDetails");

    editButton.addEventListener("click", () => {
        profileDetails.style.display = "none";
        editForm.style.display = "block";
    });

    cancelButton.addEventListener("click", () => {
        editForm.style.display = "none";
        profileDetails.style.display = "block";
    });
});

function projectView(project) {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const a = document.createElement("a");
    const b = document.createElement("a");

    div.className = "projectCard";
    div.id = "projet "+ project["id"];
    h3.innerHTML = project["nameProject"];
    div.appendChild(h3);
    a.className = "button";
    a.href = "";
    a.innerHTML = "Ouvrir";
    div.appendChild(a);
    b.className = "button";
    b.href = "";
    b.innerHTML = "Manage";
    div.appendChild(b);
    return div;
}

function projectPoster(projects) {
    const section = document.createElement("section");
    section.classList.add("projectsSection");
    const h2 = document.createElement("h2");

    section.className = "projectsSection";
    h2.innerHTML = "Mes projets";
    section.appendChild(h2);

    var projectList = document.createElement("div");

    for (let i in projects) {
        projectList.appendChild(projectView(projects[i]));
    }
    section.appendChild(projectList);

    var pc = document.querySelector(".profileContainer");
    pc.appendChild(section);
}