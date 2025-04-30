<?php
$userId = $_SESSION["user"];
$user = selectUser($conn, $userId);
if (!isset($userId)) {
    header("Location: ./login");
    exit;
}
$idProject = $_GET["projectId"];
?>

<head>
    <link rel="stylesheet" href="css/files.css">
    <script src="js/front/files.js"></script> 
</head>
<div class="profileContainer">
    <script>
        const files = <?php echo json_encode(selectFilesByProject($conn,$idProject)); ?>;
        filePoster(files);
    </script>
</div>