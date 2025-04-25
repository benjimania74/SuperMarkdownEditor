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
    <link rel="stylesheet" href="css/account.css">
    <script src="js/front/account.js" defer></script>
</head>
<div class="profileContainer">
    <div class="profilHeader">
        <div class="profileInfo">
            <img src="./css/img/user_01.png" alt="Avatar" class="profileAvatar">
            <div class="profileDetails">
                <h1 id="profileName">
                    <?php
                    echo ($user["pseudo"])
                        ?>
                </h1>
                <p id="profileEmail">
                    <?php
                    echo ($user["mail"])
                        ?>
                </p>
                <button id="editProfileButton" class="button">Modifier le profil</button>
                <a id="logOut" href="./logout" class="button">Déconnexion</a>
            </div>
            <!-- Formulaire de modification -->
            <div id="editProfileForm">
                <form method="post" action="./account" style="display: none;">
                    <div class="input">
                        <label for="pseudo">Pseudo :</label>
                        <input type="text" id="pseudo" name="pseudo"
                            value="<?php echo htmlspecialchars($user["pseudo"]); ?>" required>
                    </div>
                    <div class="input">
                        <label for="mail">Email :</label>
                        <input type="email" id="mail" name="mail" value="<?php echo htmlspecialchars($user["mail"]); ?>"
                            required>
                    </div>
                    <input type="submit" value="Enregistrer" class="button">
                    <button type="button" id="cancelEditButton" class="button">Annuler</button>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- à changé pour du dom qui génère en fonction du nombre de projet -->
<section class="projectsSection">
    <h2>Mes Projets</h2>
    <div class="projectsList">
        <div class="projectCard">
            <h3>Projet 1</h3>
            <p>Dernière modification : 12/04/2025</p>
            <a href="" class="button">Ouvrir</a>
        </div>
        <div class="projectCard">
            <h3>Projet 2</h3>
            <p>Dernière modification : 10/04/2025</p>
            <a href="" class="button">Ouvrir</a>
        </div>
        <div class="projectCard">
            <h3>Projet 3</h3>
            <p>Dernière modification : 08/04/2025</p>
            <a href="" class="button">Ouvrir</a>
        </div>
    </div>
</section>
</div>