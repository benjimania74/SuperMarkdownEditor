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

function projectPoster(projects) {
    const section = document.querySelector(".projectsSection");
    section.innerHTML = "";

    const h2 = document.createElement("h2");
    h2.textContent = "Mes projets";
    section.appendChild(h2);

    const projectList = document.createElement("div");
    projectList.className = "projectsList";

    for (let i in projects) {
        projectList.appendChild(projectView(projects[i]));
    }


    section.appendChild(projectList);
}

function projectView(project) {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const a = document.createElement("a");
    const b = document.createElement("a");

    div.className = "projectCard";
    div.id = "projet " + project["id"];
    h3.innerHTML = project["nameProject"];
    div.appendChild(h3);
    a.className = "button";
    a.href = "folder?projectId=" + project["id"];
    a.innerHTML = "Ouvrir";
    div.appendChild(a);
    b.className = "button";
    b.href = "editFolder?projectId=" + project["id"];
    b.innerHTML = "Manage";
    div.appendChild(b);
    return div;
}