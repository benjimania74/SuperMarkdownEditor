<?php
include __DIR__ . "/../lib/projectManager.php";

$userId = $_SESSION["user"];
if (!isset($userId)) {
    header("Location: ./login");
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if ($_POST["action"] === "delete"){
        $idProject = $_POST["idProject"];
        delProject($conn, $idProject);
    }
}
$projects = getProjectsByUser($conn, $userId) ?? [];

$replaceMap = [
    "JSON_PROJECTS" => json_encode($projects)
];

$pageContent = getHTMLPage("manageProject.html");
print replaceMap($pageContent, $replaceMap);
?>