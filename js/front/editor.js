const textarea = document.getElementById('inputUser');
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
    const inputText = textarea.value;
    const outputDOM = getDOM(inputText);
    outputMarkdown.innerHTML = outputDOM;
});