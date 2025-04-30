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
    updateFileContent($conn, $id, $content);
    exit(0);
}

$replaceMap = [
    "FILE_ID" => $_GET["fileID"],
    "FILE_CONTENT" => $file["content"]
];

$pageContent = getHTMLPage("editor.html");
echo replaceMap($pageContent, $replaceMap);

?>