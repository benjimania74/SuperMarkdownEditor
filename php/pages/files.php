<?php
$userId = $_SESSION["user"];
$user = selectUser($conn, $userId);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $newPseudo = $_POST["pseudo"];
    $newMail = $_POST["mail"];

    $updateSuccess = updateUser($conn, $userId, $newPseudo, $user["name"], $user["firstName"], $newMail, $user["pswd"]);

    if ($updateSuccess) {
        // Recharge les informations utilisateur après la mise à jour
        $user = selectUser($conn, $userId);
        echo "<script>alert('Profil mis à jour avec succès');</script>";
    } else {
        echo "<script>alert('Erreur lors de la mise à jour du profil');</script>";
    }
}
?>

<head>
    <link rel="stylesheet" href="css/files.css">
    <script src="js/front/files.js"></script> 
</head>
<div class="profileContainer">
    <script>
        const files = <?php echo json_encode(selectFilesByFolder($conn,$idFolder)); ?>;
        filePoster(files);
    </script>
</div>