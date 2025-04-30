function filePoster(files) {
    const section = document.querySelector(".filesSection");
    section.innerHTML = "";

    const fileList = document.createElement("div");
    fileList.className = "fileList";

    for (let i in files) {
        fileList.appendChild(fileView(files[i]));
    }
    section.appendChild(fileList);
}

function fileView(files) {
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    const h3 = document.createElement("h3");
    const a = document.createElement("a");

    div.className = "fileCard";
    div.id = "projet "+ files["id"];
    h3.innerHTML = files["nameFile"];
    div.appendChild(h3);

    div2.className = "fileCardContent";

    const content = getDOM(files["content"]);
    if (content instanceof HTMLElement) {
        // If getDOM returns a DOM element, append it directly
        div2.appendChild(content);
    } else {
        // Otherwise, assume it's a string and set it as innerHTML
        div2.innerHTML = content;
    }
    div.appendChild(div2);
    
    a.className = "button";
    a.href = "editor?templates=" + files["id"];
    a.innerHTML = "Ouvrir";
    div.appendChild(a);
    return div;
}