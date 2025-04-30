<?php

include __DIR__ . "/../lib/projectManager.php";

if (isset($_GET["fileID"])) {
    $fileID = $_GET["fileID"];
    $file = selectFile($conn, $fileID);
} else {
    $file = ""; // Valeur par défaut si fileID n'est pas défini
}

$postJSON = file_get_contents("php://input");
$postContent = $postJSON == "" ? [] : json_decode($postJSON, true);

if (isset($postContent["content"]) && ($postContent["id"])) {
    $content = $postContent["content"];
    $id = $postContent["id"];
    updateFile($conn, $id, $content);
} 

$replaceMap = [
    "FILE_ID" => $_GET["fileID"],
    "FILE_CONTENT" => decodeDecrompress($file["content"])
];

$pageContent = getHTMLPage("editor.html");
echo replaceMap($pageContent, $replaceMap);
?>