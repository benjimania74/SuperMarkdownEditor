function modelPoster(models) {
    const section = document.querySelector(".filesSection");
    section.innerHTML = "";

    const h2 = document.createElement("h2");
    h2.textContent = "Modèles";
    section.appendChild(h2);


    const fileList = document.createElement("div");
    fileList.className = "fileList";

    for (let i in models) {
        fileList.appendChild(modelView(models[i]));
    }


    section.appendChild(fileList);
}

function modelView(model) {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const a = document.createElement("a");

    div.className = "fileCard";
    div.id = "Fichier_" + model["id"];
    h3.innerHTML = model["nameFile"];
    div.appendChild(h3);
    a.className = "button";
    a.href = "editor?fileID=" + model["id"];
    a.innerHTML = "Ouvrir";
    div.appendChild(a);
    return div;
}