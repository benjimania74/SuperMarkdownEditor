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
?>
<head>
    <link rel="stylesheet" href="css/project.css">
    <script>
        const projects = <?php echo json_encode($projects); ?> || [];
    </script>
    <script src="./js/front/project.js" defer></script>
</head>

<div id="projectListContainer" onload="renderFolder($project);">
    <h2>Mes Folder</h2>
    <ul id="folderList"></ul>
</div>