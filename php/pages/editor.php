<?php

include __DIR__ . "/../lib/projectManager.php";

$scripts = [];

if (isset($_GET["fileID"])) {
    $fileID = $_GET["fileID"];
    $file = selectFile($conn, $fileID);
    $scripts = getScripts($conn, $file["idProject"]);
}else if (isset($_GET["template"])) {
    $file = selectFile($conn, $_GET["template"]);
    $scripts = getScripts($conn, $_GET["template"]);
} else {
    $file = ""; // Valeur par défaut si fileID n'est pas défini
    $scripts = [
        [
            "nameFile" => "defaultBehavior",
            "content" => file_get_contents(__DIR__ . "/../../defaultProject/defaultBehavior.js")
        ]
    ];
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
    "FILE_CONTENT" => decodeDecrompress($file["content"]),
    "JSON_SCRIPT" => json_encode($scripts)
];

$pageContent = getHTMLPage("editor.html");
echo replaceMap($pageContent, $replaceMap);
?>
