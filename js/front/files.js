function fileView(file){
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const a = document.createElement("a");

    div.className = "projectCard";
    div.id = "Fichier "+ file["id"];
    h3.innerHTML = file["nameFile"];
    div.appendChild(h3);
    a.className = "button";
    a.href = "editor?fileID=" + file["id"];
    a.innerHTML = "Ouvrir";
    div.appendChild(a);
    return div;
}

function filePoster(files) {
    const section = document.createElement("section");
    section.classList.add("projectsSection");
    const h2 = document.createElement("h2");

    section.className = "projectsSection";
    h2.innerHTML = "Mes fichiers";
    section.appendChild(h2);

    var fileList = document.createElement("div");

    for (let i in files) {
        fileList.appendChild(fileView(files[i]));
    }
    section.appendChild(fileList);

    var pc = document.querySelector(".profileContainer");
    pc.apppendChild(section);
}