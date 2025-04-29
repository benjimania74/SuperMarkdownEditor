<?php
if (isset($_GET["fileID"])) {
    $fileID = $_GET["fileID"];
    $file = selectFile($conn, $fileID);
} else {
    $file = ""; // Valeur par défaut si fileID n'est pas défini
}
if (isset($_POST["content"]) && ($_POST["id"])) {
    $content = $_POST["content"];
    $id = $_POST["id"];
    updateFileContent($conn, $id, $content, );
}
?>

<head>
    <link rel="stylesheet" href="css/editor.css">
    <script src="js/front/editor.js" defer></script>
    <script src="js/mdInterpreter/tokenizer.js" defer></script>
    <script src="js/mdInterpreter/domizer.js" defer></script>
    <script src="js/mdInterpreter/textTransformer.js" defer></script>
    <script src="js/mdInterpreter/modifiers.js" defer></script>
    <script src="js/mdInterpreter/defaultBehavior.js" defer></script>
</head>
<div id="editorContainer">
    <div id="inputcontainer">
    <?php
        printf("<textarea class='inputUser' id=".$_GET["fileID"]."placeholder='Écrivez ici votre texte en Markdown...'>".$file["content"]."</textarea>");
        ?>
    </div>
    <div class="resizer"></div>
    <div id="outputMarkdown">
    </div>
</div>
<button id="convertButton">Convertir</button>
<button id="saveButton">Sauvegarder</button>