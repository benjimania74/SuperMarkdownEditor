<?php
if (isset($_POST["usernameLogin"]) && isset($_POST["passwordLogin"])) {
    $t = connect($conn, $_POST["usernameLogin"], $_POST["passwordLogin"]);
    if ($t["correct"]) {
        $_SESSION["user"] = $t["id"];
        header("Location: ./account");

    } else {
        echo "<script>alert('Identifiant ou mot de passe incorrect');</script>";
    }
}
if (isset($_POST["usernameSignup"]) && isset($_POST["passwordSignup"]) && isset($_POST["emailSignup"])) {
    createUser($conn, $_POST["usernameSignup"], $_POST["usernameSignup"], $_POST["usernameSignup"], $_POST["emailSignup"], $_POST["passwordSignup"]);
    $t = connect($conn, $_POST["usernameSignup"], $_POST["passwordSignup"]);
    if ($t["correct"]) {
        $_SESSION["user"] = $t["id"];
        header("Location: ./account");
    } else {
        echo "<script>alert('echec de la création de compte');</script>";
    }
}
?>

<head>
    <link rel="stylesheet" href="css/login.css">
    <script src="js/front/login.js" defer></script>
</head>

<div id="loginContainer">
    <div id="loginBox">
        <h1>Connexion</h1>
        <form id="loginForm" method="post" action="./login">
            <div class="input" id="identifiant">
                <img src="./css/img/user_01.png" class="icone" alt="user">
                <input type="identifiant" placeholder="Identifiant" name="usernameLogin">
            </div>
            <div class="input" id="password">
                <img src="./css/img/lock.png" class="icone" alt="lock">
                <input type="password" placeholder="Mot de passe" name="passwordLogin" class="password">
                <img src="./css/img/hide.png" class="toggleEye" alt="hide">
            </div>
            <input type="submit" value="Connexion" class="submitButton">
        </form>

        <form id="signupForm" method="post" action="./login" style="display: none;">
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
                <img src="./css/img/hide.png" class="toggleEye" alt="hide">
            </div>
            <input type="submit" value="Créer un compte" class="submitButton">
        </form>

        <button id="toggleFormButton" class="minimalButton toggle_button">Créer un compte</button>
    </div>
</div>