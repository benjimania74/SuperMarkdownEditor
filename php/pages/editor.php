<head>
    <link rel="stylesheet" href="css/editor.css">
    <script src="js/front/editor.js" defer></script>
    <script src="js/mdInterpreter/tokenizer.js" defer></script>
    <script src="js/mdInterpreter/domizer.js" defer></script>
</head>
<div id="editorContainer">
    <div id="inputcontainer">
        <textarea id="inputUser" placeholder="Écrivez ici votre texte en Markdown..."></textarea>
    </div>
    <div class="resizer" classe="resizer"></div>
    <div id="outputMarkdown">
        getDOM
    </div>
</div>
<button id="convertButton">Convertir</button>