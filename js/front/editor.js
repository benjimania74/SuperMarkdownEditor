const textarea = document.getElementById('inputUser');
const editorContainer = document.getElementById('editorContainer');

textarea.addEventListener('input', function (event) {
    const target = event.target;

    target.style.height = 'auto'; // Réinitialise la hauteur du textarea
    target.style.height = target.scrollHeight + 'px'; // Ajuste à la hauteur du contenu

    // Ajuste la hauteur de la div parent
    editorContainer.style.height = target.scrollHeight + 'px';
});