const textarea = document.querySelector('.inputUser');
const editorContainer = document.getElementById('editorContainer');

textarea.addEventListener('input', function (event) {
    resizeTextarea();
    updateDOM(textarea.value);
});

function resizeTextarea() {
    textarea.style.height = 'auto'; // Réinitialise la hauteur du textarea
    textarea.style.height = textarea.scrollHeight + 'px'; // Ajuste à la hauteur du contenu

    // Ajuste la hauteur de la div parent
    editorContainer.style.height = textarea.scrollHeight + 'px';
}

const resizer = document.querySelector('.resizer');
const inputContainer = document.getElementById('inputcontainer');
const outputMarkdown = document.getElementById('outputMarkdown');

resizer.addEventListener('mousedown', (e) => {
    e.preventDefault();

    const onMouseMove = (event) => {
        const containerWidth = resizer.parentElement.offsetWidth;
        const newInputWidth = (event.clientX - resizer.parentElement.offsetLeft) / containerWidth * 100;

        // Limite les largeurs pour éviter des tailles extrêmes
        if (newInputWidth > 10 && newInputWidth < 90) {
            inputContainer.style.flex = `${newInputWidth}`;
            outputMarkdown.style.flex = `${100 - newInputWidth}`;
        }
    };

    const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

function updateDOM(md) {
    const outputDOM = getDOM(md);
    outputMarkdown.innerHTML = '';
    outputMarkdown.appendChild(outputDOM);
}

const saveButton = document.getElementById('saveButton');

saveButton.addEventListener('click', async function () {
    const md = textarea.value;
    const id = textarea.id;

    const response = await fetch("editor", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ "content": md, "id": id }),
    }).then(res => {
        console.log("sauvegardé !");
    });
});

function insertScript() {
    scripts.forEach(script => {
        var scriptTag = document.createElement("script");
        scriptTag.id = script["nameFile"];
        scriptTag.text = script["content"];
        document.head.appendChild(scriptTag);

    });
}

document.addEventListener("readystatechange", () => {
    insertScript();
    resizeTextarea();
    updateDOM(textarea.value);
});


const converter = document.getElementById('convertButton');

converter.addEventListener('click', function () {
    updateDOM(textarea.value);
});

const downloadButton = document.getElementById("downloadButton");
const downloadOptions = document.getElementById("downloadOptions");
const downloadPDFButton = document.getElementById("downloadPDFButton");
const downloadHTMLButton = document.getElementById("downloadHTMLButton");

downloadButton.addEventListener("click", () => {
    downloadOptions.classList.toggle("hidden");
});

downloadPDFButton.addEventListener("click", () => {
    updateDOM(textarea.value);
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.html(outputMarkdown.firstChild, {
        callback: function (doc) {
            doc.save("markdown.pdf");
        },
        x: 10,
        y: 10
    });
    downloadOptions.classList.add("hidden");
});

downloadHTMLButton.addEventListener("click", () => {
    updateDOM(textarea.value);
    const html = outputMarkdown.firstChild.innerHTML;
    const blob = new Blob([html], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "markdown.html";
    a.click();

    URL.revokeObjectURL(url);
    downloadOptions.classList.add("hidden");
});

document.addEventListener("click", (event) => {
    if (!downloadButton.contains(event.target) && !downloadOptions.contains(event.target)) {
        downloadOptions.classList.add("hidden");
    }
});

// Bouton Italique
const Italique = document.getElementById("italicButton")
Italique.addEventListener("click", () => {
    insertMarkdownSyntax(textarea, "*", "*");
});

// Bouton Gras
const Gras = document.getElementById("boldButton")
Gras.addEventListener("click", () => {
    insertMarkdownSyntax(textarea, "**", "**");
});

// Bouton Titre
const Titre = document.getElementById("titleButton")
Titre.addEventListener("click", () => {
    insertMarkdownSyntax(textarea, "# ", "");
});

// Fonction pour insérer du Markdown
function insertMarkdownSyntax(textarea, prefix, suffix) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    // Insère le préfixe et le suffixe autour du texte sélectionné
    textarea.value =
        text.substring(0, start) +
        prefix +
        text.substring(start, end) +
        suffix +
        text.substring(end);

    // Replace le curseur après le suffixe
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = end + prefix.length + suffix.length;
}