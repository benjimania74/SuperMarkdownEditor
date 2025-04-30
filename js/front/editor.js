const textarea = document.querySelector('.inputUser');
const editorContainer = document.getElementById('editorContainer');

textarea.addEventListener('input', function (event) {
    const target = event.target;

    target.style.height = 'auto'; // Réinitialise la hauteur du textarea
    target.style.height = target.scrollHeight + 'px'; // Ajuste à la hauteur du contenu

    // Ajuste la hauteur de la div parent
    editorContainer.style.height = target.scrollHeight + 'px';
});

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

const converter = document.getElementById('convertButton');

converter.addEventListener('click', function () {
    updateDOM(textarea.value);
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
        body: JSON.stringify({"content": md, "id": id}),
    }).then(res => {
        console.log("sauvegardé !");
    });
});

function insertScript() {
    scripts.forEach( script => {
        var scriptTag = document.createElement("script");
        scriptTag.id = script["nameFile"];
        scriptTag.text = script["content"];
        document.head.appendChild(scriptTag);
        
    });
}

document.addEventListener("readystatechange", () => {
    insertScript();
});

//insertScript();