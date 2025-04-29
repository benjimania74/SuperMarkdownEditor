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

$replaceMap = [
    "PSEUDO" => $user["pseudo"],
    "MAIL" => $user["mail"],
    "JSON_PROJECTS" => json_encode(selectProjectsByUser($conn, $userId))
];

$pageContent = getHTMLPage("account.html");
echo replaceMap($pageContent, $replaceMap);

?>