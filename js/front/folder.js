function filePoster(files) {
    const section = document.querySelector(".filesSection");
    section.innerHTML = "";

    const h2 = document.createElement("h2");
    h2.textContent = "Mes fichiers";
    section.appendChild(h2);


    const fileList = document.createElement("div");
    fileList.className = "fileList";

    for (let i in files) {
        fileList.appendChild(fileView(files[i]));
    }


    section.appendChild(fileList);
}

function fileView(file) {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const openButton = document.createElement("a");
    const deleteButton = document.createElement("button");

    div.className = "fileCard";
    div.id = "Fichier_" + file["id"];
    h3.innerHTML = file["nameFile"];
    div.appendChild(h3);
    // Bouton "Ouvrir"
    openButton.className = "button openButton";
    openButton.href = "editor?fileID=" + file["id"];
    openButton.innerHTML = "Ouvrir";
    div.appendChild(openButton);

    deleteButton.className = "button deleteButton";
    deleteButton.innerHTML = "Supprimer";
    deleteButton.addEventListener("click", () => {
        if (confirm(`Voulez-vous vraiment supprimer le fichier "${file["nameFile"]}" ?`)) {
            // Crée un formulaire pour envoyer une requête POST
            const form = document.createElement("form");
            form.method = "post";
            form.action = "./folder?projectId=" + file["idProject"]; // URL pour traiter la suppression

            // Champ caché pour l'ID du fichier
            const fileIdInput = document.createElement("input");
            fileIdInput.type = "hidden";
            fileIdInput.name = "idFile";
            fileIdInput.value = file["id"];
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

function addProject() {
    const createFileForm = document.getElementById("createfile");
    createFileForm.style.display = "block";

    const addProjectButton = document.getElementById("addProject");
    addProjectButton.style.display = "none";

    const cancelEditButton = document.getElementById("cancelEditButton");
    cancelEditButton.addEventListener("click", () => {
        createFileForm.style.display = "none";
        addProjectButton.style.display = "block";
    });
}