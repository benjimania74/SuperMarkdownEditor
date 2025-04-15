function projectView(project) {
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const a = document.createElement("a");

    div.className = "projectCard";
    div.id = "projet "+ project["id"];
    h3.innerHTML = project["name"];
    div.appendChild(h3);
    a.className = "button";
    a.href = "";
    a.innerHTML = "Ouvrir";
    div.appendChild(a);
}

function projectsView(projects) {
    for (let i in projects) {
        projectView(project[i]);
    }
}