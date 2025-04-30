<?php

$userId = $_SESSION["user"];
if (!isset($userId)) {
    header("Location: ./login");
    exit;
}

include __DIR__ . "/../lib/projectManager.php";

if(isset($_POST["projectName"])) {
    $projectName = $_POST["projectName"];
    $isPublic = isset($_POST["isPublic"]);

    $projectID = createNewProject(
        $conn,
        $userId,
        $projectName,
        $isPublic
    );

    header("Location: ./folder?projectId=$projectID");
}

$pageContent = getHTMLPage("newProject.html");

print $pageContent;

/*createNewProject(
    $conn,
    36,
    "bonjour !",
    false
);*/

?>