function projectPoster(projects) {
    const section = document.querySelector(".projectsSection");
    section.innerHTML = "";

    const h2 = document.createElement("h2");
    h2.textContent = "Mes projets";
    section.appendChild(h2);

    const projectList = document.createElement("div");
    projectList.className = "projectList";
    
    for (let i in projects) {
        projectList.appendChild(projectView(projects[i]));
    }


    section.appendChild(projectList);
}

function projectView(project) {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const a = document.createElement("a");
    const deleteButton = document.createElement("button");

    div.className = "projectCard";
    div.id = "projet "+ project["id"];
    h3.innerHTML = project["nameProject"];
    div.appendChild(h3);
    a.className = "button";
    a.href = "folder?projectId=" + project["id"];
    a.innerHTML = "Ouvrir";
    div.appendChild(a);
    deleteButton.className = "button deleteButton";
    deleteButton.innerHTML = "Supprimer";
    deleteButton.addEventListener("click", () => {
        if (confirm(`Voulez-vous vraiment supprimer le projet "${project["nameProject"]}" ?`)) {
            // Crée un formulaire pour envoyer une requête POST
            const form = document.createElement("form");
            form.method = "post";
            form.action = "./manage_project"; // URL pour traiter la suppression

            // Champ caché pour l'ID du fichier
            const fileIdInput = document.createElement("input");
            fileIdInput.type = "hidden";
            fileIdInput.name = "idProject";
            fileIdInput.value = project["id"];
            form.appendChild(fileIdInput);

            // Champ caché pour l'action
            const actionInput = document.createElement("input");
            actionInput.type = "hidden";
            actionInput.name = "action";
            actionInput.value = "delete";
            form.appendChild(actionInput);

            // Ajoute le formulaire au document et le soumet
            document.body.appendChild(form);
            form.submit(); // Soumet le formulaire
        }
    });
    div.appendChild(deleteButton);

    return div;
}