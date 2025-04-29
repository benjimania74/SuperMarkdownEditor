// fct for add public project in the index

function projectViewPublic(projectPub){
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const a = document.createElement("a");

    div.ClassName="projectCard"; // update class ?
    div.id = "projet "+ projectPub["id"];
    h3.innerHTML = projectPub["name"];
    div.appendChild(h3);
    a.className = "button"; // update class ?
    a.href = "";
    a.innerHTML = "Ouvrir";
    div.appendChild(a);
}

function projectPosterPublic(projectsPub) {
    const section = document.createElement("section");
    const h2 = document.createElement("h2");

    section.className = "projectsSection"; // update class ?
    h2.innerHTML = "Projets publics";
    section.appendChild(h2);
    for(let i in projectsPub) {
        projectViewPublic(projectsPub[i]);
    }
}