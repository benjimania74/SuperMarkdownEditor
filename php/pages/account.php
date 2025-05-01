<?php
include __DIR__ . "/../lib/projectManager.php";

$userId = $_SESSION["user"];
if (!isset($userId)) {
    header("Location: ./login");
    exit;
}
if ($userId == 1) {
    $_SESSION["admin"] = 1;
}
$isAdmin = isset($_SESSION['admin']) && $_SESSION['admin'] == 1;
$user = selectUser($conn, $userId);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $newPseudo = $_POST["pseudo"];
    $newMail = $_POST["mail"];

    $updateSuccess = updateUser($conn, $userId, $newPseudo, $user["name"], $user["firstName"], $newMail, $user["pswd"]);

    if ($updateSuccess) {
        $user = selectUser($conn, $userId);
        echo "<script>alert('Profil mis à jour avec succès');</script>";
    } else {
        echo "<script>alert('Erreur lors de la mise à jour du profil');</script>";
    }
}

$replaceMap = [
    "PSEUDO" => $user["pseudo"],
    "MAIL" => $user["mail"],
    "JSON_PROJECTS" => json_encode(getProjectsByUser($conn, $userId)),
    "ADMIN_DISPLAY" => ($admin == 1) ? 'block' : 'none',
];
$pageContent = getHTMLPage("account.html");
echo replaceMap($pageContent, $replaceMap);

?>