<?php
$userId = $_SESSION["user"];
$idProject = $_GET["projectId"];
if (!isset($userId)) {
    header("Location: ./login");
    exit;
}
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if ($_POST["action"] === "delete"){
        $idFile = $_POST["idFile"];
        deleteFile($conn, $idFile);
    } else if ($_POST["action"] === "create"){
        $nameFile = $_POST["name"];
        $type = $_POST["type"];
        createFile($conn, $nameFile, $idProject, "", $type);
    }
}
$files = selectFilesByProject($conn, $idProject) ?? [];
$replaceMap = [
    "IDPROJECT" => $idProject,
    "JSON_PROJECTS" => json_encode($files)
];

$pageContent = getHTMLPage("folder.html");
print replaceMap($pageContent, $replaceMap);
?>