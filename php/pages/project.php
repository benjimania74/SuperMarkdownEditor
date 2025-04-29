<?php
$userId = $_SESSION["user"];
if (!isset($userId)) {
    header("Location: ./login");
    exit;
}
if (!isset($_GET["projectID"])) {
    header("Location: ./manage_projects");
    exit;
}
$projects = selectProjectsByUser($conn, $userId) ?? [];

$replaceMap = [
    "JSON_PROJECTS" => json_encode($proects)
];

$pageContent = getHTMLPage("project.html");
print replaceMap($pageContent, $replaceMap);

?>