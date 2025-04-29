<?php
if (isset($_GET["fileID"])) {
    $fileID = $_GET["fileID"];
    $file = selectFile($conn, $fileID);
} else {
    $file = ""; // Valeur par défaut si fileID n'est pas défini
}
?>

<head>
    <link rel="stylesheet" href="css/editor.css">
    <script src="js/front/editor.js" defer></script>
    <script src="js/mdInterpreter/tokenizer.js" defer></script>
    <script src="js/mdInterpreter/domizer.js" defer></script>
</head>
<div id="editorContainer">
    <div id="inputcontainer">
        <?php
        printf("<textarea id="inputUser" placeholder="Écrivez ici votre texte en Markdown...">"$file"</textarea>")
        ?>
    </div>
    <div class="resizer" classe="resizer"></div>
    <div id="outputMarkdown">
    </div>
</div>
<button id="convertButton">Convertir</button>