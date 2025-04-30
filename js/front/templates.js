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

function fileView(file) {
    const div = document.createElement("div");
    const div2 = document.createElement("div");
    const h3 = document.createElement("h3");
    const a = document.createElement("a");

    div.className = "fileCard";
    div.id = "projet "+ file["id"];
    h3.innerHTML = file["nameFile"];
    div.appendChild(h3);

    div2.className = "fileCardContent";

    const content = getDOM(file["content"]);
    if (content instanceof HTMLElement) {
        // If getDOM returns a DOM element, append it directly
        div2.appendChild(content);
    } else {
        // Otherwise, assume it's a string and set it as innerHTML
        div2.innerHTML = content;
    }
    div.appendChild(div2);
    
    a.className = "button";
    a.href = "editor?templates=" + file["id"];
    a.innerHTML = "Ouvrir";
    div.appendChild(a);
    return div;
}

function treatFiles(files) {
    const mdFiles = [];
    for(let i in files) {
        var file = files[i];
        switch(file["type"]) {
            case "script":
                var scriptTag = document.createElement("script");
                scriptTag.id = file["nameFile"];
                scriptTag.text = file["content"];
                document.head.appendChild(scriptTag);
                break;
            case "txt":
                mdFiles.push(file);
                break;
        }
    }
    filePoster(mdFiles);
}

window.addEventListener("DOMContentLoaded", () => {
    console.log("Projets reçus :", files);
    treatFiles(files);
});