<?php
$userId = $_SESSION["user"];
if (!isset($userId)) {
    header("Location: ./login");
    exit;
}
$projects = selectProjectsByUser($conn, $userId) ?? [];
?>

<head>
    <link rel="stylesheet" href="css/manage_project.css">
    <script>
        const projects = <?php echo json_encode($projects); ?> || [];
    </script>
    <script src="./js/front/manage_project.js" defer></script>
</head>

<div id="projectListContainer" onload="projectPoster($project);">
    <h2>Mes Projets</h2>
    <ul id="projectList"></ul>
</div>