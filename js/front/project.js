function folderView(folder){
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const a = document.createElement("a");
    const b = document.createElement("a");

    div.className = "projectCard";
    div.id = "projet "+ project["id"];
    h3.innerHTML = project["nameFolder"];
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

function folderPoster(folders) {
    const section = document.createElement("section");
    section.classList.add("projectsSection");
    const h2 = document.createElement("h2");

    section.className = "projectsSection";
    h2.innerHTML = "Mes dossiers";
    section.appendChild(h2);

    var folderList = document.createElement("div");

    for (let i in folders) {
        folderList.appendChild(folderView(folders[i]));
    }
    section.appendChild(folderList);

    var pc = document.querySelector(".profileContainer");
    pc.appendChild(section);
}