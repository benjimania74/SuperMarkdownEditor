<?php

$userID = -1;
if (isset($_SESSION["user"])) {
    $userID = $_SESSION["user"];
}

include __DIR__ . "/../lib/projectManager.php";

$scripts = [];

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $postJSON = file_get_contents("php://input");
    $postContent = $postJSON == "" ? [] : json_decode($postJSON, true);

    if (isset($postContent["action"]) && $postContent["action"] === "saveToSession") {
        if (isset($postContent["content"])) {
            // Sauvegarde le contenu dans la session
            $_SESSION["textarea_content"] = $postContent["content"];
            echo json_encode(["success" => true]);
            exit;
        } else {
            echo json_encode(["success" => false, "error" => "Contenu manquant."]);
            exit;
        }
    }
}

if (isset($_GET["fileID"])) {
    $fileID = $_GET["fileID"];
    $file = selectFile($conn, $fileID);

    if (selectProject($conn, $file["idProject"])["idAuthor"] == $userID) {
        $scripts = getScripts($conn, $file["idProject"]);
    } else {
        header("Location: editor");
    }
} else if (isset($_GET["template"])) {
    $templateID = intval($_GET["template"]);
    if ($userID != -1) {
        $fileID = copyTemplate($conn, $templateID, $userID);
        header("Location: editor?fileID=$fileID");
    } else {
        $file = selectFile($conn, $templateID);
        $scripts = getScripts($conn, $file["idProject"]);
    }
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

if (isset($postContent["content"]) && isset($postContent["id"])) {
    $content = $postContent["content"];
    $id = $postContent["id"];
    if (
        selectProject(
            $conn,
            selectFile($conn, $id)["idProject"]
        )["idAuthor"] == $userID
    ) {
        updateFile($conn, $id, $content);
    }
}

$replaceMap = [
    "FILE_ID" => $_GET["fileID"],
    "FILE_CONTENT" => (!isset($_GET["fileID"]) && !isset($_GET["template"]) && isset($_SESSION["textarea_content"]))
        ? $_SESSION["textarea_content"]
        : (isset($file["content"]) ? decodeDecrompress($file["content"]) : ""),
    "JSON_SCRIPT" => json_encode($scripts)
];

$pageContent = getHTMLPage("editor.html");
echo replaceMap($pageContent, $replaceMap);
?>