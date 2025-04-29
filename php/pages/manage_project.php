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

<head>
    <link rel="stylesheet" href="css/manage_project.css">
    <script src="./js/front/manage_project.js" defer></script>
</head>

<section class="projectsSection">

</section>
<script>
    const projects = <?php echo json_encode($projects); ?>;
    window.addEventListener("DOMContentLoaded", () => {
        console.log("Projets reçus :", projects);
        projectPoster(projects);
    });
</script>