<?php
$userId = $_SESSION["user"];
if (!isset($userId)) {
    header("Location: ./login");
    exit;
}
$projects = selectProjectsByUser($conn, $userId) ?? [];

$replaceMap = [
    "JSON_PROJECTS" => json_encode($projects)
];

$pageContent = getHTMLPage("manageProject.html");
print replaceMap($pageContent, $replaceMap);
?>