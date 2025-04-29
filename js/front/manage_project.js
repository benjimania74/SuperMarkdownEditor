const projectList = document.getElementById("projectList");

function renderProjects(projects) {
    if (!Array.isArray(projects) || projects.length === 0) {
        projectList.innerHTML = "<p>Aucun projet trouvé.</p>";
        return;
    }

    projectList.innerHTML = "";

    projects.forEach(project => {
        const listItem = document.createElement("li");
        listItem.className = "project-item";

        const projectName = document.createElement("span");
        projectName.textContent = project.name;
        projectName.className = "project-name";

        const openButton = document.createElement("button");
        openButton.textContent = "Ouvrir";
        openButton.className = "open-button";
        openButton.addEventListener("click", () => {
            window.location.href = `./editor?fileID=${project.id}`;
        });

        // Bouton pour modifier le projet
        const editButton = document.createElement("button");
        editButton.textContent = "Modifier";
        editButton.className = "edit-button";
        editButton.addEventListener("click", () => {
            window.location.href = `./editProject?fileID=${project.id}`;
        });

        listItem.appendChild(projectName);
        listItem.appendChild(openButton);
        listItem.appendChild(editButton);

        projectList.appendChild(listItem);
    });
}

// Appeler la fonction pour afficher les projets
renderProjects(projects);