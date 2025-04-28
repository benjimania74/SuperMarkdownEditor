<?php
$userId = $_SESSION["user"];
if (!isset($userId)) {
    header("Location: ./login");
    exit;
}
$project = selectProjectsByUser($conn, $userId);

echo $project[0]["nameProject"];
?>