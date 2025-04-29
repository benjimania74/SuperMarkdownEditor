<?php
$userId = $_SESSION["user"];
if (!isset($userId)) {
    header("Location: ./login");
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

<div id="projectListContainer" onload="renderProjects($project);">
    <h2>Mes Projets</h2>
    <ul id="projectList"></ul>
</div>