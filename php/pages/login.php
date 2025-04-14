<?php
if (isset($_POST["login"])) {
    if (connect($conn, $_POST["usernameLogin"], $_POST["passwordLogin"])) {
        $_SESSION["user"] = $_POST["usernameLogin"];
        header("Location: ./account");
    } else {
        echo "<script>alert('Identifiant ou mot de passe incorrect');</script>";
    }
}
?>

<head>
    <link rel="stylesheet" href="css/login.css">
    <script src="js/front/login.js" defer></script>
</head>
<?php
include "./php/db/db_connect.php";
include "./php/CRUD/user.crud.php";
?>
<div id="loginContainer">
    <div id="loginBox">
        <h1>Connexion</h1>
        <form id="loginForm" method="post" action="./login.php">
            <div class="input" id="identifiant">
                <img src="./css/img/user_01.png" class="icone" alt="user">
                <input type="identifiant" placeholder="Identifiant" name="usernameLogin">
            </div>
            <div class="input" id="password">
                <img src="./css/img/lock.png" class="icone" alt="lock">
                <input type="password" placeholder="Mot de passe" name="passwordLogin" class="password">
                <img src="./css/img/hide.png" class="toggle-eye" alt="hide">
            </div>
            <input type="submit" value="Connexion" class="submitButton">
        </form>

        <form id="signupForm" method="post" action="./signup.php" style="display: none;">
            <div class="input" id="identifiant">
                <img src="./css/img/user_01.png" class="icone" alt="user">
                <input type="text" placeholder="Identifiant" name="usernameSignup">
            </div>
            <div class="input" id="email">
                <img src="./css/img/at.png" class="icone" alt="email">
                <input type="email" placeholder="Email" name="emailSignup">
            </div>
            <div class="input" id="password">
                <img src="./css/img/lock.png" class="icone" alt="lock">
                <input type="password" placeholder="Mot de passe" name="passwordSignup" class="password">
                <img src="./css/img/hide.png" class="toggle-eye" alt="hide">
            </div>
            <input type="submit" value="Créer un compte" class="submitButton">
        </form>

        <button id="toggleFormButton" class="minimalButton toggle_button">Créer un compte</button>
    </div>
</div>