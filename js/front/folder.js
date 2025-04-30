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
    const a = document.createElement("a");

    div.className = "fileCard";
    div.id = "Fichier_" + file["id"];
    h3.innerHTML = file["nameFile"];
    div.appendChild(h3);
    a.className = "button";
    a.href = "editor?fileID=" + file["id"];
    a.innerHTML = "Ouvrir";
    div.appendChild(a);
    return div;
}