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

<section class="projectsSection"></section>
<script>
    const projects = <?php echo json_encode($projects); ?>;
    window.addEventListener("DOMContentLoaded", () => {
        console.log("Projets reçus :", projects);
        folderPoster(projects);
    });
</script>