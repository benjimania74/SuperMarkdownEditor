<?php
$userId = $_SESSION["user"];
$idProject = $_GET["projectId"];
if (!isset($userId)) {
    header("Location: ./login");
    exit;
}
$files = selectFilesByProject($conn, $idProject) ?? [];
$replaceMap = [
    "JSON_PROJECTS" => json_encode($files)
];

$pageContent = getHTMLPage("folder.html");
print replaceMap($pageContent, $replaceMap);
?>